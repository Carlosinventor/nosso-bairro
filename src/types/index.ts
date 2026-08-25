export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  phone?: string;
  neighborhood?: string;
  avatarUrl?: string;
  memberSince: string;
  preferences?: string[];
  searchRadius?: number; // in km
}

export interface Review {
  id: string;
  establishmentId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  photos?: string[];
  createdAt: string;
  helpfulCount?: number;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  website?: string;
  whatsapp?: string;
}

export interface Establishment {
  id: string;
  name: string;
  category: string; // 'Padaria' | 'Restaurante' | 'Farmácia' | 'Mercado' | 'Pet Shop' | 'Cafeteria' | 'Salão de Beleza' | 'Academia' | 'Serviços'
  subCategory?: string;
  description: string;
  address: string;
  neighborhood: string;
  distanceMeters: number;
  latitude: number;
  longitude: number;
  phone: string;
  hours: string;
  isOpenNow: boolean;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  photos: string[];
  socialLinks?: SocialLinks;
  published?: boolean;
  features: {
    delivery?: boolean;
    breakfast?: boolean;
    acceptsPix?: boolean;
    parking?: boolean;
    accessible?: boolean;
    wifi?: boolean;
    petFriendly?: boolean;
    outdoorSeating?: boolean;
  };
  addedByUserId?: string;
  createdAt: string;
}

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  establishmentId?: string;
  establishmentName: string;
  type: 'new_place' | 'photos' | 'update_info' | 'review';
  photos?: string[];
  suggestedUpdate?: string;
  rating?: number;
  reviewComment?: string;
  status: 'published' | 'under_review';
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string; // 'Aviso Comunitário' | 'Nova Abertura' | 'Cultura & Lazer' | 'Melhorias'
  imageUrl: string;
  date: string;
  author: string;
  readTime: string;
  location?: string;
  address?: string;
  eventDate?: string;
  time?: string;
  published?: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  imageUrl: string;
  organizer: string;
  interestedCount: number;
  isUserInterested?: boolean;
  price?: string;
  phone?: string;
  contact?: string;
  published?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  organization: string;
  goal: string;
  currentProgress: number; // percentage 0 - 100
  imageUrl: string;
  deadline: string;
  category: string;
  contact: string;
  donorCount: number;
  location?: string;
  address?: string;
  date?: string;
  time?: string;
  phone?: string;
  published?: boolean;
}

export interface NeighborhoodHighlight {
  id: string;
  title: string;
  subtitle: string;
  establishmentId?: string;
  imageUrl: string;
  tag: string;
  highlightReason: string;
  rating?: number;
  published?: boolean;
}

export interface FilterState {
  category: string;
  minRating: number; // 0 for any
  openNow: boolean;
  maxDistanceKm: number; // 0 for any
  delivery: boolean;
  breakfast: boolean;
  acceptsPix: boolean;
  parking: boolean;
  accessible: boolean;
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  likes: boolean;
  comments: boolean;
  messages: boolean;
  neighborhoodNews: boolean;
  eventsReminders: boolean;
}
