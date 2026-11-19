"use client";

import { useEffect, useRef, useState } from "react";
import type { Branch, Lang } from "@/lib/constants";
import { tr } from "@/lib/content";

/* Minimal typing for the parts of the Yandex Maps 2.1 API we use. */
/* eslint-disable @typescript-eslint/no-explicit-any */
type YMaps = any;
declare global {
  interface Window { ymaps?: YMaps }
}

const LOCALE: Record<Lang, string> = { UZ: "uz_UZ", RU: "ru_RU", EN: "en_US" };
let loader: Promise<YMaps> | null = null;

function loadYmaps(lang: Lang): Promise<YMaps> {
  if (window.ymaps?.ready) return new Promise((res) => window.ymaps.ready(() => res(window.ymaps)));
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;
    const s = document.createElement("script");
    s.src = `https://api-maps.yandex.ru/2.1/?lang=${LOCALE[lang]}${key ? `&apikey=${key}` : ""}`;
    s.async = true;
    const timer = window.setTimeout(() => reject(new Error("ymaps timeout")), 15000);
    s.onload = () => {
      if (!window.ymaps) { window.clearTimeout(timer); reject(new Error("ymaps missing")); return; }
      window.ymaps.ready(() => { window.clearTimeout(timer); resolve(window.ymaps); });
    };
    s.onerror = () => { window.clearTimeout(timer); loader = null; reject(new Error("ymaps load error")); };
    document.head.appendChild(s);
  });
  return loader;
}

const TASHKENT_ZOOM = 15;
const OTHER_ZOOM = 13;

/**
 * One Yandex map with every branch marked by the school crest.
 * Opens on Tashkent (both city branches in view); selecting a branch flies to it.
 * Falls back to the keyless Yandex widget if the JS API cannot load.
 */
export function YandexMap({
  branches,
  activeId,
  onSelect,
  lang,
  className = "",
}: {
  branches: Branch[];
  activeId: string | null;
  onSelect: (id: string) => void;
  lang: Lang;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<YMaps>(null);
  const marks = useRef<Record<string, YMaps>>({});
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const tashkent = branches.filter((b) => b.city.uz === "Toshkent");

  // Load the API only when the map is about to scroll into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setVisible(true); io.disconnect(); } }, { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || failed) return;
    let destroyed = false;
    loadYmaps(lang)
      .then((ymaps) => {
        if (destroyed || !box.current || mapRef.current) return;
        const map = new ymaps.Map(
          box.current,
          { center: [41.316, 69.25], zoom: 12, controls: ["zoomControl"] },
          { suppressMapOpenBlock: true, yandexMapDisablePoiInteractivity: true },
        );
        map.behaviors.disable("scrollZoom");
        if (window.matchMedia("(hover: none)").matches) map.behaviors.disable("drag");

        const Pin = ymaps.templateLayoutFactory.createClass(
          '<div class="tls-pin{% if properties.active %} is-active{% endif %}">' +
            '<div class="tls-pin__badge"><img src="/images/logo-192.png" alt="" /></div>' +
            '<div class="tls-pin__tip"></div>' +
            '<div class="tls-pin__label">{{ properties.label }}</div>' +
          "</div>",
        );

        branches.forEach((b) => {
          const pm = new ymaps.Placemark(
            b.coords,
            { label: tr(b.short, lang), hintContent: tr(b.name, lang), active: false },
            {
              iconLayout: Pin,
              iconShape: { type: "Rectangle", coordinates: [[-34, -100], [34, 0]] },
              hasBalloon: false,
            },
          );
          pm.events.add("click", () => onSelectRef.current(b.id));
          map.geoObjects.add(pm);
          marks.current[b.id] = pm;
        });

        // Start on Tashkent with both city branches in view.
        if (tashkent.length > 1) {
          const lats = tashkent.map((b) => b.coords[0]);
          const lngs = tashkent.map((b) => b.coords[1]);
          map.setBounds([[Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]], { checkZoomRange: true, zoomMargin: [90, 60, 40, 60] });
        }
        mapRef.current = map;
        setReady(true);
      })
      .catch(() => !destroyed && setFailed(true));
    return () => {
      destroyed = true;
      if (mapRef.current) { mapRef.current.destroy(); mapRef.current = null; marks.current = {}; setReady(false); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, failed, lang]);

  // Fly to the selected branch and highlight its pin.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    Object.entries(marks.current).forEach(([id, pm]) => pm.properties.set("active", id === activeId));
    const b = branches.find((x) => x.id === activeId);
    if (!b) return;
    const zoom = b.city.uz === "Toshkent" ? TASHKENT_ZOOM : OTHER_ZOOM;
    map.setCenter(b.coords, zoom, { duration: 600, checkZoomRange: true });
  }, [activeId, ready, branches]);

  if (failed) {
    const pts = branches.map((b) => `${b.coords[1]},${b.coords[0]},pm2rdm`).join("~");
    return (
      <iframe
        title="Tashkent Law School"
        className={`absolute inset-0 h-full w-full [filter:grayscale(.5)_invert(.92)_hue-rotate(180deg)_brightness(.92)] ${className}`}
        src={`https://yandex.uz/map-widget/v1/?ll=69.25,41.316&z=11&pt=${pts}&lang=${LOCALE[lang]}`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`ymap absolute inset-0 ${className}`}>
      <div ref={box} className="absolute inset-0" />
      {!ready && <div className="absolute inset-0 animate-pulse bg-white/[.04]" />}
    </div>
  );
}
