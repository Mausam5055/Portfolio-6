export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  coverImage: string;
  coverAlt: string;
  coverPosition?: string;
  href: string;
}

export interface FactItem {
  term: string;
  description: string;
}
