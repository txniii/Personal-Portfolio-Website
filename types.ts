
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  // New fields for advanced UI
  logo?: string; // Emoji or URL
  color?: string; // Theme color (e.g., 'blue', 'purple')
  skills?: string[];
  metrics?: { label: string; value: string }[];
  location?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string; // Short summary for card
  longDescription?: string; // Detailed text for modal
  technologies: string[];
  link?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface EventItem {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  status: 'upcoming' | 'past';
  link?: string;
  logo?: string; // e.g., 'shpe', 'alpfa'
  // Extended features
  extendedDescription?: string; // Personal experience narrative
  recommendations?: string[];   // Tips for others
  keyTakeaways?: string[];      // Bullet points of what was learned
  objectives?: string[];        // For upcoming events: what you plan to do
  stats?: { label: string; value: string; icon?: string }[];
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  avatarUrl: string; // The user's face/portrait
  logoUrl: string;   // The user's brand logo
}

export interface SyncedProfileData extends ProfileData {
  company?: string;
  lastSynced?: Date;
  sourceUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}
