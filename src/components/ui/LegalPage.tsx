import { PageHeader } from "./PageHeader";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHeader title={title} crumbs={[{ label: title }]} />
      <section className="section">
        <div className="shell max-w-3xl">
          <p className="text-sm font-semibold text-ink-muted">{updated}</p>
          <div className="mt-8 space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl font-semibold">{s.h}</h2>
                <p className="prose-tls mt-3">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
