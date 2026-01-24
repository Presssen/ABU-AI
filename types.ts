
export type Language = 'es' | 'en';
export type ViewState = 'landing' | 'privacy' | 'terms' | 'contact' | 'blog' | 'login' | 'dashboard';

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface DetailedFeatureItem {
  title: string;
  description: string;
  tag?: string;
}

export interface LegalSection {
  heading: string;
  content: string;
}

export interface Review {
  storeName: string;
  author: string;
  comment: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // Array of paragraphs
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CookieCategory {
  id: 'necessary' | 'analytics' | 'marketing';
  title: string;
  description: string;
  required: boolean;
}

export interface Content {
  nav: {
    features: string;
    details: string;
    pricing: string;
    testimonials: string;
    blog: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      users: string;
      rating: string;
    }
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      fbt: Feature;
      popup: Feature;
      postPurchase: Feature;
    }
  };
  detailedFeatures: {
    title: string;
    subtitle: string;
    ai: DetailedFeatureItem;
    widgets: DetailedFeatureItem;
    design: DetailedFeatureItem;
    bundles: DetailedFeatureItem;
    data: DetailedFeatureItem;
    translation: DetailedFeatureItem;
    support: DetailedFeatureItem;
  };
  reviews: {
    title: string;
    items: Review[];
  };
  trust: {
    title: string;
    partners: string[];
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    plans: PricingPlan[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  blog: {
    title: string;
    subtitle: string;
    backButton: string;
    readMore: string;
    posts: BlogPost[];
  };
  footer: {
    rights: string;
    terms: string;
    privacy: string;
    contact: string;
    blog: string;
  };
  privacyPage: {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
    backButton: string;
  };
  termsPage: {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
    backButton: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    backButton: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      successTitle: string;
      successMessage: string;
      error: string;
    }
  };
  cookieConsent: {
    text: string;
    privacyLink: string;
    accept: string;
    decline: string;
    customize: string;
    modal: {
        title: string;
        description: string;
        save: string;
        categories: CookieCategory[];
    }
  };
}
