interface SEO {
  ogTitle?: string
  ogImage?: string
  title: string
  ogDescription?: string
  description?: string
  twitterCard?: "summary_large_image" | "summary" | "app" | "player" | null | undefined
  ogUrl?: string
}

export const MainSeo: SEO = {
  ogTitle: "CitizenSec - Портал от экспертов информационной безопасности",
  title: "CitizenSec - Портал от экспертов информационной безопасности",
  ogDescription: "Цель CitizenSec - достижение полной кибергигиены в обществе через создание социального института, обеспечивающее сбор, обработку и распространение информации в массовом масштабе.",
  description: "Цель CitizenSec - достижение полной кибергигиены в обществе через создание социального института, обеспечивающее сбор, обработку и распространение информации в массовом масштабе.",
  ogImage: "https://citizensec.kz/og.jpeg",
  twitterCard: "summary_large_image",
};

export const FeedSeo: SEO = {
  title: "Новости от CitizenSec",
  ogTitle: "Новости от CitizenSec",
  description: "Свежие новости, аналитика и обзоры событий в мире информационной безопасности.",
  ogDescription: "Свежие новости, аналитика и обзоры событий в мире информационной безопасности.",
  ogImage: "https://citizensec.kz/feed-og.jpg",
  ogUrl: "https://citizensec.kz/feed",
};

export const MethodologySeo: SEO = {
  ogTitle: "1.0 Методология",
  title: "Методология",
  ogDescription: "Миссия проекта состоит в том, чтобы сделать сложные стандарты ISO понятными и простыми во внедрении и использовании.",
  description: "Миссия проекта состоит в том, чтобы сделать сложные стандарты ISO понятными и простыми во внедрении и использовании.",
  ogImage: "https://citizensec.kz/methodology-og.jpg",
  twitterCard: "summary_large_image",
};

export const AwarenessSeo: SEO = {
  ogTitle: "Кибергигиена для всех",
  title: "Кибергигиена для всех",
  ogDescription: "Темы включают в себя уроки безопасного использования социальных сетей, управление паролями и общие практики цифровой гигиены.",
  description: "Темы включают в себя уроки безопасного использования социальных сетей, управление паролями и общие практики цифровой гигиены.",
  ogImage: "https://citizensec.kz/awareness-og.jpg",
  twitterCard: "summary_large_image",
  ogUrl: "https://citizensec.kz/awareness",
};

export const AllCoursesSeo: SEO = {
  title: "Все курсы",
  ogTitle: "Все курсы",
  ogDescription: "Цель CitizenSec - достижение полной кибергигиены в обществе через создание социального института, обеспечивающее сбор, обработку и распространение информации в массовом масштабе.",
  description: "Цель CitizenSec - достижение полной кибергигиены в обществе через создание социального института, обеспечивающее сбор, обработку и распространение информации в массовом масштабе.",
  ogImage: "https://citizensec.kz/og.jpeg",
  twitterCard: "summary_large_image",
};
