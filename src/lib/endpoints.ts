/* Endpoints used across the site */
export const API = {
  hero: "/api/hero?is_active=true&limit=10",
  settings: "/api/settings",
  about: "/api/about",
  aboutValues: "/api/about-values",
  timeline: "/api/timeline",
  stats: "/api/statistics/public",
  courses: "/api/courses/offers?is_active=true&limit=100",
  course: (id: string | number) => `/api/courses/offers/${id}`,
  teachers: "/api/teachers?is_active=true&limit=100",
  team: "/api/team?limit=100",
  results: "/api/results?limit=100",
  testimonials: "/api/testimonials?limit=100",
  videoReviews: "/api/video-reviews?limit=100",
  news: "/api/news?status=published&limit=100",
  newsOne: (id: string | number) => `/api/news/${id}`,
  faq: "/api/faq",
  vacancies: "/api/vacancies?limit=100",
  social: "/api/social-links",
};

/** Endpoints rendered into the HTML on the server (see lib/server-data.ts). */
export const SEED_ENDPOINTS = [
  API.hero, API.settings, API.about, API.aboutValues, API.timeline, API.stats, API.courses, API.teachers,
  API.team, API.results, API.testimonials, API.videoReviews, API.news, API.faq, API.vacancies, API.social,
];
