import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Establishment,
  Review,
  Contribution,
  NewsItem,
  CommunityEvent,
  Campaign,
  NeighborhoodHighlight,
  FilterState,
  NotificationPreferences
} from '../types';
import { supabaseService } from '../services/supabase';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

export type ScreenType =
  | 'home'
  | 'discover'
  | 'filters'
  | 'results'
  | 'establishment_detail'
  | 'directions'
  | 'share'
  | 'contribute'
  | 'favorites'
  | 'community'
  | 'news'
  | 'news_detail'
  | 'events'
  | 'event_detail'
  | 'campaigns'
  | 'campaign_detail'
  | 'highlights'
  | 'profile'
  | 'my_contributions'
  | 'edit_profile'
  | 'notifications'
  | 'security_privacy'
  | 'help_center'
  | 'contact_us'
  | 'about'
  // Admin Screens
  | 'admin_dashboard'
  | 'admin_establishments'
  | 'admin_new_establishment'
  | 'admin_news'
  | 'admin_new_news'
  | 'admin_events'
  | 'admin_new_event'
  | 'admin_campaigns'
  | 'admin_new_campaign'
  | 'admin_highlights'
  | 'admin_new_highlight'
  | 'admin_contributions';

export type TabType = 'home' | 'discover' | 'share' | 'community' | 'profile';

const VALID_SCREENS: ScreenType[] = [
  'home',
  'discover',
  'filters',
  'results',
  'establishment_detail',
  'directions',
  'share',
  'contribute',
  'favorites',
  'community',
  'news',
  'news_detail',
  'events',
  'event_detail',
  'campaigns',
  'campaign_detail',
  'highlights',
  'profile',
  'my_contributions',
  'edit_profile',
  'notifications',
  'security_privacy',
  'help_center',
  'contact_us',
  'about',
  'admin_dashboard',
  'admin_establishments',
  'admin_new_establishment',
  'admin_news',
  'admin_new_news',
  'admin_events',
  'admin_new_event',
  'admin_campaigns',
  'admin_new_campaign',
  'admin_highlights',
  'admin_new_highlight',
  'admin_contributions'
];

export const getScreenFromURL = (): ScreenType => {
  if (typeof window === 'undefined') return 'home';

  try {
    // 1. Check query parameter: ?screen=admin_dashboard or ?route=admin_dashboard or ?page=admin_dashboard
    const params = new URLSearchParams(window.location.search);
    const queryScreen = params.get('screen') || params.get('route') || params.get('page');
    if (queryScreen) {
      const normalized = queryScreen.replace(/^\/+/, '').replace(/-/g, '_').toLowerCase();
      if (VALID_SCREENS.includes(normalized as ScreenType)) {
        return normalized as ScreenType;
      }
    }

    // 2. Check hash: #/admin_dashboard or #admin_dashboard
    const hash = window.location.hash.replace(/^#[\/]?/, '').split('?')[0].replace(/-/g, '_').toLowerCase();
    if (hash) {
      if (VALID_SCREENS.includes(hash as ScreenType)) {
        return hash as ScreenType;
      }
      if (hash.includes('admin_dashboard') || hash.includes('admindashboard') || hash === 'admin') {
        return 'admin_dashboard';
      }
      if (hash.startsWith('admin_')) {
        const found = VALID_SCREENS.find(s => s === hash);
        if (found) return found;
      }
    }

    // 3. Check pathname: /admin_dashboard or /admin-dashboard
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').split('?')[0].replace(/-/g, '_').toLowerCase();
    if (pathname) {
      if (VALID_SCREENS.includes(pathname as ScreenType)) {
        return pathname as ScreenType;
      }
      if (pathname.includes('admin_dashboard') || pathname.includes('admindashboard') || pathname === 'admin') {
        return 'admin_dashboard';
      }
      if (pathname.startsWith('admin_')) {
        const found = VALID_SCREENS.find(s => s === pathname);
        if (found) return found;
      }
    }
  } catch (e) {
    console.warn('Error parsing screen from URL:', e);
  }

  return 'home';
};

// Helper to normalize strings (remove accents and lower case)
export const normalizeText = (text: string = ''): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

// Check if an establishment matches a specific category strictly without cross-contamination
export const matchEstablishmentCategory = (categoryFilter: string, item: Establishment): boolean => {
  const filterNorm = normalizeText(categoryFilter);
  if (!filterNorm || filterNorm === 'todas') return true;

  const itemCatNorm = normalizeText(item.category);
  const itemSubNorm = normalizeText(item.subCategory || '');
  const itemNameNorm = normalizeText(item.name);

  // Exact category match
  if (itemCatNorm === filterNorm) return true;

  // Specific category rules to avoid cross-contamination
  if (filterNorm.includes('salao') || filterNorm.includes('beleza') || filterNorm.includes('cabelo')) {
    return (
      itemCatNorm === 'salao de beleza' ||
      itemCatNorm === 'beleza' ||
      itemSubNorm.includes('cabelo') ||
      itemSubNorm.includes('manicure') ||
      itemSubNorm.includes('estetica') ||
      itemSubNorm.includes('coloracao') ||
      itemNameNorm.includes('salao') ||
      itemNameNorm.includes('cabeleireir') ||
      itemNameNorm.includes('barbearia')
    );
  }

  if (filterNorm.includes('cafeteria') || filterNorm.includes('cafe')) {
    return (
      itemCatNorm === 'cafeteria' ||
      itemSubNorm.includes('cafe especial') ||
      itemSubNorm.includes('cafes especiais') ||
      itemSubNorm.includes('cafeteria') ||
      itemSubNorm.includes('brunch') ||
      itemNameNorm.includes('cafe &') ||
      itemNameNorm.includes('cafeteria') ||
      itemNameNorm.startsWith('cafe ')
    );
  }

  if (filterNorm.includes('padaria') || filterNorm.includes('panificadora')) {
    return (
      itemCatNorm === 'padaria' ||
      itemSubNorm.includes('padaria') ||
      itemSubNorm.includes('panificadora') ||
      itemSubNorm.includes('pao') ||
      itemNameNorm.includes('padaria') ||
      itemNameNorm.includes('cantinho do pao') ||
      itemNameNorm.includes('pao &')
    );
  }

  if (filterNorm.includes('restaurante')) {
    return (
      itemCatNorm === 'restaurante' ||
      itemSubNorm.includes('restaurante') ||
      itemSubNorm.includes('almoco executivo') ||
      itemSubNorm.includes('comida brasileira') ||
      itemNameNorm.includes('restaurante')
    );
  }

  if (filterNorm.includes('mercado') || filterNorm.includes('supermercado')) {
    return (
      itemCatNorm === 'mercado' ||
      itemCatNorm === 'supermercado' ||
      itemSubNorm.includes('supermercado') ||
      itemSubNorm.includes('hortifruti') ||
      itemSubNorm.includes('mercearia') ||
      itemNameNorm.includes('mercado') ||
      itemNameNorm.includes('feira organica') ||
      itemNameNorm.includes('supermercado')
    );
  }

  if (filterNorm.includes('farmacia') || filterNorm.includes('drogaria')) {
    return (
      itemCatNorm === 'farmacia' ||
      itemCatNorm === 'drogaria' ||
      itemSubNorm.includes('farmacia') ||
      itemSubNorm.includes('drogaria') ||
      itemSubNorm.includes('medicamento') ||
      itemNameNorm.includes('farmacia') ||
      itemNameNorm.includes('drogaria')
    );
  }

  if (filterNorm.includes('pet')) {
    return (
      itemCatNorm.includes('pet') ||
      itemSubNorm.includes('pet') ||
      itemSubNorm.includes('veterinari') ||
      itemSubNorm.includes('banho e tosa') ||
      itemNameNorm.includes('pet')
    );
  }

  if (filterNorm.includes('academia') || filterNorm.includes('fitness')) {
    return (
      itemCatNorm.includes('academia') ||
      itemSubNorm.includes('academia') ||
      itemSubNorm.includes('fitness') ||
      itemSubNorm.includes('musculacao') ||
      itemSubNorm.includes('pilates') ||
      itemNameNorm.includes('academia')
    );
  }

  if (filterNorm.includes('oficina') || filterNorm.includes('mecanica')) {
    return (
      itemCatNorm === 'oficina' ||
      itemSubNorm.includes('mecanica') ||
      itemSubNorm.includes('automotiv') ||
      itemNameNorm.includes('oficina')
    );
  }

  // Fallback: direct contains in category
  return itemCatNorm.includes(filterNorm);
};

// Check if search query matches item
const matchesSearchQuery = (query: string, item: Establishment): boolean => {
  const q = normalizeText(query);
  if (!q) return true;

  const nameNorm = normalizeText(item.name);
  const catNorm = normalizeText(item.category);
  const subNorm = normalizeText(item.subCategory || '');
  const descNorm = normalizeText(item.description || '');
  const addressNorm = normalizeText(item.address || '');

  // 1. Direct text search across all fields
  if (
    nameNorm.includes(q) ||
    catNorm.includes(q) ||
    subNorm.includes(q) ||
    descNorm.includes(q) ||
    addressNorm.includes(q)
  ) {
    return true;
  }

  // 2. Specific query terms mapped to categories
  if (matchEstablishmentCategory(q, item)) {
    return true;
  }

  return false;
};

export const INITIAL_FILTERS: FilterState = {
  category: '',
  minRating: 0,
  openNow: false,
  maxDistanceKm: 0,
  delivery: false,
  breakfast: false,
  acceptsPix: false,
  parking: false,
  accessible: false
};

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType, payload?: any) => void;
  goBack: () => void;
  screenHistory: ScreenType[];

  // Establishments
  establishments: Establishment[];
  selectedEstablishment: Establishment | null;
  setSelectedEstablishment: (est: Establishment | null) => void;
  reloadEstablishments: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredEstablishments: Establishment[];

  // Favorites
  favorites: string[];
  toggleFavorite: (establishmentId: string) => void;
  isFavorite: (establishmentId: string) => boolean;

  // Saved Community Items (News, Events, Campaigns)
  savedCommunityItems: string[];
  toggleSaveCommunityItem: (itemId: string, itemTitle?: string) => boolean;
  isCommunityItemSaved: (itemId: string) => boolean;
  shareContent: (data: { title: string; text?: string; url?: string }) => Promise<void>;

  // Reviews & Contributions
  reviews: Review[];
  userContributions: Contribution[];
  addReview: (data: { establishmentId: string; rating: number; comment: string; photos?: string[] }) => Promise<void>;
  addContribution: (data: Omit<Contribution, 'id' | 'createdAt' | 'status' | 'userId' | 'userName' | 'userEmail'>) => Promise<void>;
  addNewEstablishment: (data: Omit<Establishment, 'id' | 'createdAt' | 'rating' | 'reviewsCount' | 'isOpenNow' | 'distanceMeters'>) => Promise<Establishment>;

  // Community Content
  news: NewsItem[];
  selectedNews: NewsItem | null;
  setSelectedNews: (news: NewsItem | null) => void;
  events: CommunityEvent[];
  selectedEvent: CommunityEvent | null;
  setSelectedEvent: (event: CommunityEvent | null) => void;
  toggleEventInterest: (eventId: string) => void;
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  highlights: NeighborhoodHighlight[];

  // Admin Data & Management
  adminEstablishments: Establishment[];
  adminNews: NewsItem[];
  adminEvents: CommunityEvent[];
  adminCampaigns: Campaign[];
  adminHighlights: NeighborhoodHighlight[];
  adminContributions: Contribution[];
  createAdminEstablishment: (data: Omit<Establishment, 'id' | 'createdAt'>) => Promise<Establishment>;
  createAdminNews: (data: Omit<NewsItem, 'id'>) => Promise<NewsItem>;
  createAdminEvent: (data: Omit<CommunityEvent, 'id'>) => Promise<CommunityEvent>;
  createAdminCampaign: (data: Omit<Campaign, 'id'>) => Promise<Campaign>;
  createAdminHighlight: (data: Omit<NeighborhoodHighlight, 'id'>) => Promise<NeighborhoodHighlight>;
  toggleEstablishmentPublication: (id: string) => void;
  toggleNewsPublication: (id: string) => void;
  toggleEventPublication: (id: string) => void;
  toggleCampaignPublication: (id: string) => void;
  toggleHighlightPublication: (id: string) => void;
  updateContributionStatus: (id: string, status: 'published' | 'under_review') => void;
  deleteEstablishment: (id: string) => void;
  deleteNews: (id: string) => void;
  deleteEvent: (id: string) => void;
  deleteCampaign: (id: string) => void;
  deleteHighlight: (id: string) => void;
  deleteContribution: (id: string) => void;
  reloadAdminData: () => void;

  // Notifications preferences
  notificationPrefs: NotificationPreferences;
  updateNotificationPrefs: (prefs: NotificationPreferences) => void;

  // Modals & Feedback
  successModal: {
    isOpen: boolean;
    title: string;
    message: string;
    buttonText: string;
    onButtonClick?: () => void;
  } | null;
  showSuccessModal: (title: string, message: string, buttonText?: string, onButtonClick?: () => void) => void;
  closeSuccessModal: () => void;

  // Duplicate prompt modal
  existingPlaceModal: {
    isOpen: boolean;
    existingEstablishment: Establishment | null;
  };
  openExistingPlaceModal: (est: Establishment) => void;
  closeExistingPlaceModal: () => void;

  // Supabase Config Modal
  isSupabaseModalOpen: boolean;
  setIsSupabaseModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => getScreenFromURL());
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(() => [getScreenFromURL()]);
  const [activeTab, setActiveTabState] = useState<TabType>(() => {
    const initial = getScreenFromURL();
    if (['discover', 'filters', 'results', 'establishment_detail', 'directions'].includes(initial)) return 'discover';
    if (['share', 'contribute'].includes(initial)) return 'share';
    if (['community', 'news', 'news_detail', 'events', 'event_detail', 'campaigns', 'campaign_detail', 'highlights'].includes(initial)) return 'community';
    if (['profile', 'my_contributions', 'edit_profile', 'notifications', 'security_privacy', 'help_center', 'contact_us', 'about'].includes(initial)) return 'profile';
    return 'home';
  });

  // Data states
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userContributions, setUserContributions] = useState<Contribution[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [highlights, setHighlights] = useState<NeighborhoodHighlight[]>([]);
  const [savedCommunityItems, setSavedCommunityItems] = useState<string[]>(
    supabaseService.getSavedCommunityItems()
  );
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(
    supabaseService.getNotificationPreferences()
  );

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Admin Data states (including unpublished items)
  const [adminEstablishments, setAdminEstablishments] = useState<Establishment[]>([]);
  const [adminNews, setAdminNews] = useState<NewsItem[]>([]);
  const [adminEvents, setAdminEvents] = useState<CommunityEvent[]>([]);
  const [adminCampaigns, setAdminCampaigns] = useState<Campaign[]>([]);
  const [adminHighlights, setAdminHighlights] = useState<NeighborhoodHighlight[]>([]);
  const [adminContributions, setAdminContributions] = useState<Contribution[]>([]);

  // Modals
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    buttonText: string;
    onButtonClick?: () => void;
  } | null>(null);

  const [existingPlaceModal, setExistingPlaceModal] = useState<{
    isOpen: boolean;
    existingEstablishment: Establishment | null;
  }>({
    isOpen: false,
    existingEstablishment: null
  });

  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  const loadAllData = () => {
    const ests = supabaseService.getEstablishments(false);
    setEstablishments(ests);
    setFavorites(supabaseService.getFavorites());
    setSavedCommunityItems(supabaseService.getSavedCommunityItems());
    setReviews(supabaseService.getReviews());
    setUserContributions(supabaseService.getContributions(user?.id));
    setNews(supabaseService.getNews(false));
    setEvents(supabaseService.getEvents(false));
    setCampaigns(supabaseService.getCampaigns(false));
    setHighlights(supabaseService.getHighlights(false));

    // Admin data (all items including unpublished)
    setAdminEstablishments(supabaseService.getEstablishments(true));
    setAdminNews(supabaseService.getNews(true));
    setAdminEvents(supabaseService.getEvents(true));
    setAdminCampaigns(supabaseService.getCampaigns(true));
    setAdminHighlights(supabaseService.getHighlights(true));
    setAdminContributions(supabaseService.getContributions(undefined, true));
  };

  const reloadAdminData = () => {
    loadAllData();
  };

  // --- Admin Action Handlers ---
  const toggleEstablishmentPublication = (id: string) => {
    supabaseService.toggleEstablishmentPublication(id);
    loadAllData();
  };

  const deleteEstablishment = (id: string) => {
    supabaseService.deleteEstablishment(id);
    loadAllData();
  };

  const toggleNewsPublication = (id: string) => {
    supabaseService.toggleNewsPublication(id);
    loadAllData();
  };

  const deleteNews = (id: string) => {
    supabaseService.deleteNews(id);
    loadAllData();
  };

  const toggleEventPublication = (id: string) => {
    supabaseService.toggleEventPublication(id);
    loadAllData();
  };

  const deleteEvent = (id: string) => {
    supabaseService.deleteEvent(id);
    loadAllData();
  };

  const toggleCampaignPublication = (id: string) => {
    supabaseService.toggleCampaignPublication(id);
    loadAllData();
  };

  const deleteCampaign = (id: string) => {
    supabaseService.deleteCampaign(id);
    loadAllData();
  };

  const toggleHighlightPublication = (id: string) => {
    supabaseService.toggleHighlightPublication(id);
    loadAllData();
  };

  const deleteHighlight = (id: string) => {
    supabaseService.deleteHighlight(id);
    loadAllData();
  };

  const updateContributionStatus = (id: string, status: 'published' | 'under_review') => {
    supabaseService.updateContributionStatus(id, status);
    loadAllData();
  };

  const deleteContribution = (id: string) => {
    supabaseService.deleteContribution(id);
    loadAllData();
  };

  useEffect(() => {
    loadAllData();
  }, [user]);

  useEffect(() => {
    const handleUrlChange = () => {
      const screenFromUrl = getScreenFromURL();
      setCurrentScreen(screenFromUrl);
      setScreenHistory(prev => (prev[prev.length - 1] === screenFromUrl ? prev : [...prev, screenFromUrl]));
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    if (tab === 'home') {
      navigateTo('home');
    } else if (tab === 'discover') {
      navigateTo('discover');
    } else if (tab === 'share') {
      navigateTo('share');
    } else if (tab === 'community') {
      navigateTo('community');
    } else if (tab === 'profile') {
      navigateTo('profile');
    }
  };

  const navigateTo = (screen: ScreenType, payload?: any) => {
    if (payload) {
      if (screen === 'establishment_detail' || screen === 'directions' || screen === 'contribute') {
        if (typeof payload === 'string') {
          const found = establishments.find(e => e.id === payload);
          if (found) setSelectedEstablishment(found);
        } else {
          setSelectedEstablishment(payload);
        }
      } else if (screen === 'news_detail') {
        setSelectedNews(payload);
      } else if (screen === 'event_detail') {
        setSelectedEvent(payload);
      } else if (screen === 'campaign_detail') {
        setSelectedCampaign(payload);
      }
    }

    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);

    // Sync URL pathname
    try {
      const currentPath = window.location.pathname.replace(/^\/+|\/+$/g, '').replace(/-/g, '_').toLowerCase();
      const targetPath = screen === 'home' ? '/' : `/${screen}`;
      if (currentPath !== screen && window.history?.pushState) {
        window.history.pushState({ screen }, '', targetPath);
      }
    } catch {
      // Ignore in restrictive iframe environments
    }

    // Sync active tab
    if (['home', 'favorites'].includes(screen)) {
      setActiveTabState('home');
    } else if (['discover', 'filters', 'results', 'establishment_detail', 'directions'].includes(screen)) {
      setActiveTabState('discover');
    } else if (['share', 'contribute'].includes(screen)) {
      setActiveTabState('share');
    } else if (['community', 'news', 'news_detail', 'events', 'event_detail', 'campaigns', 'campaign_detail', 'highlights'].includes(screen)) {
      setActiveTabState('community');
    } else if (['profile', 'my_contributions', 'edit_profile', 'notifications', 'security_privacy', 'help_center', 'contact_us', 'about'].includes(screen)) {
      setActiveTabState('profile');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);

      try {
        const targetPath = prevScreen === 'home' ? '/' : `/${prevScreen}`;
        if (window.history?.pushState) {
          window.history.pushState({ screen: prevScreen }, '', targetPath);
        }
      } catch {}

      // Sync active tab with previous screen
      if (['home', 'favorites'].includes(prevScreen)) {
        setActiveTabState('home');
      } else if (['discover', 'filters', 'results', 'establishment_detail', 'directions'].includes(prevScreen)) {
        setActiveTabState('discover');
      } else if (['share', 'contribute'].includes(prevScreen)) {
        setActiveTabState('share');
      } else if (['community', 'news', 'events', 'campaigns', 'highlights'].includes(prevScreen)) {
        setActiveTabState('community');
      } else if (['profile', 'my_contributions', 'edit_profile', 'notifications', 'security_privacy', 'help_center', 'contact_us', 'about'].includes(prevScreen)) {
        setActiveTabState('profile');
      }
    } else {
      navigateTo('home');
    }
  };

  const reloadEstablishments = () => {
    setEstablishments(supabaseService.getEstablishments());
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const toggleFavorite = (establishmentId: string) => {
    const isFav = supabaseService.toggleFavorite(establishmentId);
    setFavorites(supabaseService.getFavorites());
    return isFav;
  };

  const isFavorite = (establishmentId: string) => {
    return favorites.includes(establishmentId);
  };

  const toggleSaveCommunityItem = (itemId: string, itemTitle?: string) => {
    const isSaved = supabaseService.toggleSavedCommunityItem(itemId);
    setSavedCommunityItems(supabaseService.getSavedCommunityItems());
    if (isSaved) {
      showSuccessModal('Salvo com sucesso!', `"${itemTitle || 'Item'}" foi salvo na sua lista da comunidade.`);
    }
    return isSaved;
  };

  const isCommunityItemSaved = (itemId: string) => {
    return savedCommunityItems.includes(itemId);
  };

  const shareContent = async (data: { title: string; text?: string; url?: string }) => {
    const shareUrl = data.url || window.location.href;
    const shareText = data.text || data.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }

    // Fallback: clipboard copy
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${data.title} - ${shareText}\n${shareUrl}`);
        showSuccessModal('Link copiado!', 'O link foi copiado para a área de transferência. Você pode colar e compartilhar onde quiser.');
      } else {
        showSuccessModal('Compartilhar', `Copie este link para compartilhar: ${shareUrl}`);
      }
    } catch {
      showSuccessModal('Compartilhar', `Copie este link para compartilhar: ${shareUrl}`);
    }
  };

  const addReview = async (data: {
    establishmentId: string;
    rating: number;
    comment: string;
    photos?: string[];
  }) => {
    const est = establishments.find(e => e.id === data.establishmentId);
    supabaseService.addReview({
      establishmentId: data.establishmentId,
      userId: user?.id || 'user-default',
      userName: user?.name || 'Morador(a)',
      userAvatar: user?.avatarUrl,
      rating: data.rating,
      comment: data.comment,
      photos: data.photos
    });

    // Also record in contributions
    supabaseService.addContribution({
      userId: user?.id || 'user-default',
      userName: user?.name || 'Morador(a)',
      userEmail: user?.email || '',
      establishmentId: data.establishmentId,
      establishmentName: est?.name || 'Estabelecimento Local',
      type: 'review',
      rating: data.rating,
      reviewComment: data.comment,
      photos: data.photos
    });

    loadAllData();
  };

  const addContribution = async (
    data: Omit<Contribution, 'id' | 'createdAt' | 'status' | 'userId' | 'userName' | 'userEmail'>
  ) => {
    supabaseService.addContribution({
      ...data,
      userId: user?.id || 'user-default',
      userName: user?.name || 'Morador(a)',
      userEmail: user?.email || ''
    });
    loadAllData();
  };

  const addNewEstablishment = async (
    data: Omit<Establishment, 'id' | 'createdAt' | 'rating' | 'reviewsCount' | 'isOpenNow' | 'distanceMeters'>
  ): Promise<Establishment> => {
    const newEst = supabaseService.addEstablishment({
      ...data,
      rating: 5.0,
      reviewsCount: 1,
      isOpenNow: true,
      distanceMeters: Math.floor(Math.random() * 800) + 200,
      addedByUserId: user?.id || 'user-default'
    });

    // Also register contribution
    supabaseService.addContribution({
      userId: user?.id || 'user-default',
      userName: user?.name || 'Morador(a)',
      userEmail: user?.email || '',
      establishmentId: newEst.id,
      establishmentName: newEst.name,
      type: 'new_place',
      photos: newEst.photos,
      suggestedUpdate: newEst.description
    });

    loadAllData();
    return newEst;
  };

  const createAdminEstablishment = async (
    data: Omit<Establishment, 'id' | 'createdAt'>
  ): Promise<Establishment> => {
    const newEst = supabaseService.addEstablishment(data);
    loadAllData();
    return newEst;
  };

  const createAdminNews = async (
    data: Omit<NewsItem, 'id'>
  ): Promise<NewsItem> => {
    const newNews = supabaseService.addNews(data);
    loadAllData();
    return newNews;
  };

  const createAdminEvent = async (
    data: Omit<CommunityEvent, 'id'>
  ): Promise<CommunityEvent> => {
    const newEvent = supabaseService.addEvent(data);
    loadAllData();
    return newEvent;
  };

  const createAdminCampaign = async (
    data: Omit<Campaign, 'id'>
  ): Promise<Campaign> => {
    const newCampaign = supabaseService.addCampaign(data);
    loadAllData();
    return newCampaign;
  };

  const createAdminHighlight = async (
    data: Omit<NeighborhoodHighlight, 'id'>
  ): Promise<NeighborhoodHighlight> => {
    const newHighlight = supabaseService.addHighlight(data);
    loadAllData();
    return newHighlight;
  };

  const toggleEventInterest = (eventId: string) => {
    supabaseService.toggleEventInterest(eventId);
    setEvents(supabaseService.getEvents());
  };

  const updateNotificationPrefs = (prefs: NotificationPreferences) => {
    const updated = supabaseService.updateNotificationPreferences(prefs);
    setNotificationPrefs(updated);
  };

  const showSuccessModal = (
    title: string,
    message: string,
    buttonText = 'Voltar para a Home',
    onButtonClick?: () => void
  ) => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }

    setSuccessModal({
      isOpen: true,
      title,
      message,
      buttonText,
      onButtonClick
    });
  };

  const closeSuccessModal = () => {
    setSuccessModal(null);
  };

  const openExistingPlaceModal = (est: Establishment) => {
    setExistingPlaceModal({
      isOpen: true,
      existingEstablishment: est
    });
  };

  const closeExistingPlaceModal = () => {
    setExistingPlaceModal({
      isOpen: false,
      existingEstablishment: null
    });
  };

  // Filter logic
  const filteredEstablishments = establishments.filter(item => {
    // Search query match
    if (searchQuery.trim()) {
      if (!matchesSearchQuery(searchQuery, item)) {
        return false;
      }
    }

    // Category filter
    if (filters.category && filters.category !== '' && filters.category !== 'Todas') {
      if (!matchEstablishmentCategory(filters.category, item)) {
        return false;
      }
    }

    // Rating filter
    if (filters.minRating > 0) {
      if (item.rating < filters.minRating) {
        return false;
      }
    }

    // Open now
    if (filters.openNow && !item.isOpenNow) {
      return false;
    }

    // Distance
    if (filters.maxDistanceKm > 0) {
      const distKm = item.distanceMeters / 1000;
      if (distKm > filters.maxDistanceKm) {
        return false;
      }
    }

    // Features
    if (filters.delivery && !item.features.delivery) return false;
    if (filters.breakfast && !item.features.breakfast) return false;
    if (filters.acceptsPix && !item.features.acceptsPix) return false;
    if (filters.parking && !item.features.parking) return false;
    if (filters.accessible && !item.features.accessible) return false;

    return true;
  });

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentScreen,
        navigateTo,
        goBack,
        screenHistory,

        establishments,
        selectedEstablishment,
        setSelectedEstablishment,
        reloadEstablishments,

        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        filteredEstablishments,

        favorites,
        toggleFavorite,
        isFavorite,

        savedCommunityItems,
        toggleSaveCommunityItem,
        isCommunityItemSaved,
        shareContent,

        reviews,
        userContributions,
        addReview,
        addContribution,
        addNewEstablishment,

        news,
        selectedNews,
        setSelectedNews,
        events,
        selectedEvent,
        setSelectedEvent,
        toggleEventInterest,
        campaigns,
        selectedCampaign,
        setSelectedCampaign,
        highlights,

        // Admin
        adminEstablishments,
        adminNews,
        adminEvents,
        adminCampaigns,
        adminHighlights,
        adminContributions,
        createAdminEstablishment,
        createAdminNews,
        createAdminEvent,
        createAdminCampaign,
        createAdminHighlight,
        toggleEstablishmentPublication,
        toggleNewsPublication,
        toggleEventPublication,
        toggleCampaignPublication,
        toggleHighlightPublication,
        updateContributionStatus,
        deleteEstablishment,
        deleteNews,
        deleteEvent,
        deleteCampaign,
        deleteHighlight,
        deleteContribution,
        reloadAdminData,

        notificationPrefs,
        updateNotificationPrefs,

        successModal,
        showSuccessModal,
        closeSuccessModal,

        existingPlaceModal,
        openExistingPlaceModal,
        closeExistingPlaceModal,

        isSupabaseModalOpen,
        setIsSupabaseModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
