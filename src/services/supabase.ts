import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  User,
  Establishment,
  Review,
  Contribution,
  NewsItem,
  CommunityEvent,
  Campaign,
  NeighborhoodHighlight,
  NotificationPreferences
} from '../types';
import {
  INITIAL_ESTABLISHMENTS,
  INITIAL_REVIEWS,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_CAMPAIGNS,
  INITIAL_HIGHLIGHTS,
  INITIAL_USER_CONTRIBUTIONS
} from '../data/initialData';

// Local storage keys
const STORAGE_KEYS = {
  SUPABASE_CONFIG: 'nosso_bairro_supabase_config',
  CURRENT_USER: 'nosso_bairro_current_user',
  USERS_LIST: 'nosso_bairro_users_db',
  ESTABLISHMENTS: 'nosso_bairro_establishments',
  REVIEWS: 'nosso_bairro_reviews',
  FAVORITES: 'nosso_bairro_favorites',
  CONTRIBUTIONS: 'nosso_bairro_contributions',
  NEWS: 'nosso_bairro_news',
  EVENTS: 'nosso_bairro_events',
  CAMPAIGNS: 'nosso_bairro_campaigns',
  HIGHLIGHTS: 'nosso_bairro_highlights',
  NOTIFICATIONS: 'nosso_bairro_notification_prefs',
  SUPPORT_MESSAGES: 'nosso_bairro_support_messages',
  SAVED_COMMUNITY: 'nosso_bairro_saved_community'
};

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

export const DEFAULT_USER: User = {
  id: 'user-default',
  name: 'João da Silva',
  email: 'joao.silva@email.com',
  role: 'user',
  phone: '(11) 99999-8888',
  neighborhood: 'Zona Sul - Jardim Primavera',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
  memberSince: 'Outubro de 2023',
  preferences: ['Restaurantes', 'Cafés', 'Padarias', 'Serviços'],
  searchRadius: 5
};

export const ADMIN_USER: User = {
  id: 'user-admin',
  name: 'Administrador Nosso Bairro',
  email: 'admin@nossobairro.com.br',
  role: 'admin',
  phone: '(11) 98765-4321',
  neighborhood: 'Gestão Central',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
  memberSince: 'Janeiro de 2023',
  preferences: ['Gastronomia', 'Saúde', 'Serviço', 'Compras', 'Lazer'],
  searchRadius: 10
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  pushEnabled: true,
  likes: true,
  comments: true,
  messages: true,
  neighborhoodNews: true,
  eventsReminders: true
};

class SupabaseService {
  private client: SupabaseClient | null = null;
  private config: SupabaseConfig = {
    url: '',
    anonKey: '',
    isConnected: false
  };

  constructor() {
    this.loadConfig();
    this.initLocalStorage();
  }

  private loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      if (saved) {
        this.config = JSON.parse(saved);
        if (this.config.url && this.config.anonKey) {
          this.client = createClient(this.config.url, this.config.anonKey);
          this.config.isConnected = true;
        }
      }
    } catch {
      // Ignore fallback
    }
  }

  public setSupabaseCredentials(url: string, anonKey: string) {
    if (url && anonKey) {
      try {
        this.client = createClient(url, anonKey);
        this.config = { url, anonKey, isConnected: true };
        localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(this.config));
        return true;
      } catch (e) {
        console.error('Error connecting to Supabase', e);
        return false;
      }
    }
    return false;
  }

  public getConfig(): SupabaseConfig {
    return this.config;
  }

  private initLocalStorage() {
    // Merge or init establishments
    const storedEsts = localStorage.getItem(STORAGE_KEYS.ESTABLISHMENTS);
    if (!storedEsts) {
      localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(INITIAL_ESTABLISHMENTS));
    } else {
      try {
        const parsed: Establishment[] = JSON.parse(storedEsts);
        // Ensure every initial establishment is updated / present
        let changed = false;
        const initialMap = new Map(INITIAL_ESTABLISHMENTS.map(e => [e.id, e]));
        
        const merged = parsed.map(item => {
          const init = initialMap.get(item.id);
          if (init) {
            changed = true;
            return { ...item, category: init.category, subCategory: init.subCategory, name: init.name, description: init.description, address: init.address, imageUrl: init.imageUrl };
          }
          return item;
        });

        for (const initEst of INITIAL_ESTABLISHMENTS) {
          if (!merged.some(e => e.id === initEst.id)) {
            merged.push(initEst);
            changed = true;
          }
        }
        if (changed) {
          localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(merged));
        }
      } catch {
        localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(INITIAL_ESTABLISHMENTS));
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['est-1', 'est-5', 'est-7']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTRIBUTIONS)) {
      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(INITIAL_USER_CONTRIBUTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(INITIAL_CAMPAIGNS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS)) {
      localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(INITIAL_HIGHLIGHTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATION_PREFS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS_LIST)) {
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify([
        {
          ...DEFAULT_USER,
          password: 'password123'
        }
      ]));
    }
  }

  // --- AUTH METHODS ---
  public async getCurrentUser(): Promise<User | null> {
    try {
      if (this.client) {
        const { data: { user: authUser } } = await this.client.auth.getUser();
        if (authUser) {
          const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
          if (userJson) {
            return JSON.parse(userJson);
          }
          const defaultName = authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário';
          const newUser: User = {
            id: authUser.id,
            name: defaultName,
            email: authUser.email || '',
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(defaultName)}`,
            memberSince: new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date()),
            neighborhood: 'Zona Sul - Jardim Primavera',
            preferences: ['Gastronomia', 'Padarias', 'Serviços'],
            searchRadius: 5
          };
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
          return newUser;
        }
      }
      const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  }

  public async signUp(name: string, email: string, password: string): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (this.client) {
      const { data, error } = await this.client.auth.signUp({
        email: cleanEmail,
        password: password,
        options: {
          data: {
            name: cleanName
          }
        }
      });
      if (error) {
        console.warn('Supabase Auth signUp notice:', error.message);
      }
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanName)}`,
      memberSince: new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date()),
      neighborhood: 'Zona Sul - Jardim Primavera',
      preferences: ['Gastronomia', 'Serviços'],
      searchRadius: 5
    };

    // Save in user DB list and set current
    const usersList: any[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]');
    const existingIndex = usersList.findIndex(u => u.email?.toLowerCase() === cleanEmail);
    if (existingIndex >= 0) {
      usersList[existingIndex] = { ...newUser, password };
    } else {
      usersList.push({ ...newUser, password });
    }
    localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(usersList));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

    return newUser;
  }

  public async signIn(email: string, password = 'password123'): Promise<User> {
    const cleanEmail = email.trim().toLowerCase();

    if (this.client) {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: cleanEmail,
        password: password
      });
      if (error) {
        console.warn('Supabase Auth signIn notice:', error.message);
      }
    }

    const usersList: any[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]');
    const existing = usersList.find(u => u.email?.toLowerCase() === cleanEmail);

    if (existing) {
      const userObj: User = {
        id: existing.id || 'user-' + Date.now(),
        name: existing.name || cleanEmail.split('@')[0],
        email: existing.email || cleanEmail,
        avatarUrl: existing.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(existing.name || cleanEmail)}`,
        memberSince: existing.memberSince || 'Recente',
        neighborhood: existing.neighborhood || 'Zona Sul - Jardim Primavera',
        preferences: existing.preferences || ['Gastronomia', 'Serviços'],
        searchRadius: existing.searchRadius || 5
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userObj));
      return userObj;
    }

    // If admin user email
    if (cleanEmail === ADMIN_USER.email.toLowerCase() || cleanEmail === 'admin@nossobairro.com.br' || cleanEmail === 'carlosinventor@gmail.com') {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(ADMIN_USER));
      return ADMIN_USER;
    }

    // If default user email
    if (cleanEmail === DEFAULT_USER.email.toLowerCase()) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }

    // If logging in with new credentials, create user account
    const nameFromEmail = cleanEmail.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const isAdmin = cleanEmail.includes('admin') || cleanEmail === 'carlosinventor@gmail.com';
    const newUser = await this.signUp(capitalizedName, cleanEmail, password);
    if (isAdmin) {
      newUser.role = 'admin';
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    }
    return newUser;
  }

  public async signOut(): Promise<void> {
    if (this.client) {
      try {
        await this.client.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  public async updateProfile(user: Partial<User>): Promise<User> {
    const current = (await this.getCurrentUser()) || DEFAULT_USER;
    const updated: User = { ...current, ...user };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));

    // Update in users list as well
    const usersList: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_LIST) || '[]');
    const index = usersList.findIndex(u => u.id === updated.id);
    if (index !== -1) {
      usersList[index] = updated;
      localStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(usersList));
    }

    return updated;
  }

  // --- ESTABLISHMENTS ---
  public getEstablishments(includeUnpublished = false): Establishment[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ESTABLISHMENTS);
      const list: Establishment[] = data ? JSON.parse(data) : INITIAL_ESTABLISHMENTS;
      if (includeUnpublished) {
        return list;
      }
      return list.filter(item => item.published !== false);
    } catch {
      return INITIAL_ESTABLISHMENTS;
    }
  }

  public getEstablishmentById(id: string): Establishment | undefined {
    const list = this.getEstablishments(true);
    return list.find(item => item.id === id);
  }

  public findEstablishmentByName(name: string): Establishment | undefined {
    const list = this.getEstablishments(true);
    const clean = name.trim().toLowerCase();
    return list.find(item => item.name.toLowerCase() === clean || item.name.toLowerCase().includes(clean));
  }

  public addEstablishment(est: Omit<Establishment, 'id' | 'createdAt'>): Establishment {
    const list = this.getEstablishments(true);
    const newEst: Establishment = {
      ...est,
      id: 'est-' + Date.now(),
      published: est.published !== undefined ? est.published : true,
      createdAt: new Date().toISOString()
    };
    list.unshift(newEst);
    localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(list));
    return newEst;
  }

  public updateEstablishment(id: string, updates: Partial<Establishment>): Establishment | null {
    const list = this.getEstablishments(true);
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(list));
    return updated;
  }

  public toggleEstablishmentPublication(id: string): Establishment | null {
    const list = this.getEstablishments(true);
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;
    const current = list[index];
    const newPublished = current.published === false ? true : false;
    list[index] = { ...current, published: newPublished };
    localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(list));
    return list[index];
  }

  public deleteEstablishment(id: string): boolean {
    const list = this.getEstablishments(true);
    const filtered = list.filter(e => e.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  // --- FAVORITES ---
  public getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public toggleFavorite(establishmentId: string): boolean {
    const favs = this.getFavorites();
    const index = favs.indexOf(establishmentId);
    let isFav = false;
    if (index !== -1) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.push(establishmentId);
      isFav = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    return isFav;
  }

  public isFavorite(establishmentId: string): boolean {
    return this.getFavorites().includes(establishmentId);
  }

  // --- SAVED COMMUNITY CONTENT (News, Events, Campaigns) ---
  public getSavedCommunityItems(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_COMMUNITY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public toggleSavedCommunityItem(itemId: string): boolean {
    const saved = this.getSavedCommunityItems();
    const index = saved.indexOf(itemId);
    let isSaved = false;
    if (index !== -1) {
      saved.splice(index, 1);
      isSaved = false;
    } else {
      saved.push(itemId);
      isSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_COMMUNITY, JSON.stringify(saved));
    return isSaved;
  }

  public isCommunityItemSaved(itemId: string): boolean {
    return this.getSavedCommunityItems().includes(itemId);
  }

  // --- REVIEWS ---
  public getReviews(establishmentId?: string): Review[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      const all: Review[] = data ? JSON.parse(data) : INITIAL_REVIEWS;
      if (establishmentId) {
        return all.filter(r => r.establishmentId === establishmentId);
      }
      return all;
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  public addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
    const all = this.getReviews();
    const newReview: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      createdAt: 'Hoje'
    };
    all.unshift(newReview);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(all));

    // Update establishment rating and review count
    const establishments = this.getEstablishments();
    const est = establishments.find(e => e.id === review.establishmentId);
    if (est) {
      const estReviews = all.filter(r => r.establishmentId === review.establishmentId);
      const avg = estReviews.reduce((acc, curr) => acc + curr.rating, 0) / estReviews.length;
      est.rating = Number(avg.toFixed(1));
      est.reviewsCount = estReviews.length;
      localStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(establishments));
    }

    return newReview;
  }

  // --- CONTRIBUTIONS ---
  public getContributions(userId?: string, includeAll = false): Contribution[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONTRIBUTIONS);
      const all: Contribution[] = data ? JSON.parse(data) : INITIAL_USER_CONTRIBUTIONS;
      if (userId && !includeAll) {
        return all.filter(c => c.userId === userId);
      }
      return all;
    } catch {
      return INITIAL_USER_CONTRIBUTIONS;
    }
  }

  public addContribution(contrib: Omit<Contribution, 'id' | 'createdAt' | 'status'>): Contribution {
    const all = this.getContributions(undefined, true);
    const newContrib: Contribution = {
      ...contrib,
      id: 'cb-' + Date.now(),
      status: 'under_review',
      createdAt: 'Hoje'
    };
    all.unshift(newContrib);
    localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(all));
    return newContrib;
  }

  public updateContributionStatus(id: string, status: 'published' | 'under_review'): Contribution | null {
    const all = this.getContributions(undefined, true);
    const index = all.findIndex(c => c.id === id);
    if (index === -1) return null;
    all[index] = { ...all[index], status };
    localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(all));
    return all[index];
  }

  public deleteContribution(id: string): boolean {
    const all = this.getContributions(undefined, true);
    const filtered = all.filter(c => c.id !== id);
    if (filtered.length !== all.length) {
      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  // --- NEWS, EVENTS, CAMPAIGNS, HIGHLIGHTS ---
  public getNews(includeUnpublished = false): NewsItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NEWS);
      const list: NewsItem[] = data ? JSON.parse(data) : INITIAL_NEWS;
      if (includeUnpublished) return list;
      return list.filter(item => item.published !== false);
    } catch {
      return INITIAL_NEWS;
    }
  }

  public addNews(newsItem: Omit<NewsItem, 'id'>): NewsItem {
    const list = this.getNews(true);
    const newItem: NewsItem = {
      ...newsItem,
      id: 'news-' + Date.now(),
      published: newsItem.published !== undefined ? newsItem.published : true
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    return newItem;
  }

  public updateNews(id: string, updates: Partial<NewsItem>): NewsItem | null {
    const list = this.getNews(true);
    const index = list.findIndex(n => n.id === id);
    if (index === -1) return null;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    return updated;
  }

  public toggleNewsPublication(id: string): NewsItem | null {
    const list = this.getNews(true);
    const index = list.findIndex(n => n.id === id);
    if (index === -1) return null;
    const current = list[index];
    const newPublished = current.published === false ? true : false;
    list[index] = { ...current, published: newPublished };
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    return list[index];
  }

  public deleteNews(id: string): boolean {
    const list = this.getNews(true);
    const filtered = list.filter(n => n.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  public getEvents(includeUnpublished = false): CommunityEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      const list: CommunityEvent[] = data ? JSON.parse(data) : INITIAL_EVENTS;
      if (includeUnpublished) return list;
      return list.filter(item => item.published !== false);
    } catch {
      return INITIAL_EVENTS;
    }
  }

  public addEvent(eventItem: Omit<CommunityEvent, 'id'>): CommunityEvent {
    const list = this.getEvents(true);
    const newItem: CommunityEvent = {
      ...eventItem,
      id: 'event-' + Date.now(),
      interestedCount: eventItem.interestedCount !== undefined ? eventItem.interestedCount : 0,
      published: eventItem.published !== undefined ? eventItem.published : true
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return newItem;
  }

  public updateEvent(id: string, updates: Partial<CommunityEvent>): CommunityEvent | null {
    const list = this.getEvents(true);
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return updated;
  }

  public toggleEventPublication(id: string): CommunityEvent | null {
    const list = this.getEvents(true);
    const index = list.findIndex(e => e.id === id);
    if (index === -1) return null;
    const current = list[index];
    const newPublished = current.published === false ? true : false;
    list[index] = { ...current, published: newPublished };
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return list[index];
  }

  public deleteEvent(id: string): boolean {
    const list = this.getEvents(true);
    const filtered = list.filter(e => e.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  public toggleEventInterest(eventId: string): boolean {
    const events = this.getEvents(true);
    const evt = events.find(e => e.id === eventId);
    if (evt) {
      evt.isUserInterested = !evt.isUserInterested;
      evt.interestedCount += evt.isUserInterested ? 1 : -1;
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
      return !evt.isUserInterested;
    }
    return false;
  }

  public getCampaigns(includeUnpublished = false): Campaign[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      const list: Campaign[] = data ? JSON.parse(data) : INITIAL_CAMPAIGNS;
      if (includeUnpublished) return list;
      return list.filter(item => item.published !== false);
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  }

  public addCampaign(campaignItem: Omit<Campaign, 'id'>): Campaign {
    const list = this.getCampaigns(true);
    const newItem: Campaign = {
      ...campaignItem,
      id: 'campaign-' + Date.now(),
      currentProgress: campaignItem.currentProgress !== undefined ? campaignItem.currentProgress : 0,
      donorCount: campaignItem.donorCount !== undefined ? campaignItem.donorCount : 0,
      published: campaignItem.published !== undefined ? campaignItem.published : true
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(list));
    return newItem;
  }

  public updateCampaign(id: string, updates: Partial<Campaign>): Campaign | null {
    const list = this.getCampaigns(true);
    const index = list.findIndex(c => c.id === id);
    if (index === -1) return null;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(list));
    return updated;
  }

  public toggleCampaignPublication(id: string): Campaign | null {
    const list = this.getCampaigns(true);
    const index = list.findIndex(c => c.id === id);
    if (index === -1) return null;
    const current = list[index];
    const newPublished = current.published === false ? true : false;
    list[index] = { ...current, published: newPublished };
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(list));
    return list[index];
  }

  public deleteCampaign(id: string): boolean {
    const list = this.getCampaigns(true);
    const filtered = list.filter(c => c.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  public getHighlights(includeUnpublished = false): NeighborhoodHighlight[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      const list: NeighborhoodHighlight[] = data ? JSON.parse(data) : INITIAL_HIGHLIGHTS;
      if (includeUnpublished) return list;
      return list.filter(item => item.published !== false);
    } catch {
      return INITIAL_HIGHLIGHTS;
    }
  }

  public addHighlight(highlightItem: Omit<NeighborhoodHighlight, 'id'>): NeighborhoodHighlight {
    const list = this.getHighlights(true);
    const newItem: NeighborhoodHighlight = {
      ...highlightItem,
      id: 'hl-' + Date.now(),
      published: highlightItem.published !== undefined ? highlightItem.published : true
    };
    list.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(list));
    return newItem;
  }

  public updateHighlight(id: string, updates: Partial<NeighborhoodHighlight>): NeighborhoodHighlight | null {
    const list = this.getHighlights(true);
    const index = list.findIndex(h => h.id === id);
    if (index === -1) return null;
    const updated = { ...list[index], ...updates };
    list[index] = updated;
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(list));
    return updated;
  }

  public toggleHighlightPublication(id: string): NeighborhoodHighlight | null {
    const list = this.getHighlights(true);
    const index = list.findIndex(h => h.id === id);
    if (index === -1) return null;
    const current = list[index];
    const newPublished = current.published === false ? true : false;
    list[index] = { ...current, published: newPublished };
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(list));
    return list[index];
  }

  public deleteHighlight(id: string): boolean {
    const list = this.getHighlights(true);
    const filtered = list.filter(h => h.id !== id);
    if (filtered.length !== list.length) {
      localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  // --- NOTIFICATION PREFERENCES ---
  public getNotificationPreferences(): NotificationPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return data ? JSON.parse(data) : DEFAULT_NOTIFICATION_PREFS;
    } catch {
      return DEFAULT_NOTIFICATION_PREFS;
    }
  }

  public updateNotificationPreferences(prefs: NotificationPreferences): NotificationPreferences {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(prefs));
    return prefs;
  }

  // --- SUPPORT / CONTACT MESSAGES ---
  public sendSupportMessage(message: { category: string; message: string; email: string; name?: string }) {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUPPORT_MESSAGES) || '[]');
    existing.push({
      ...message,
      id: 'msg-' + Date.now(),
      sentAt: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.SUPPORT_MESSAGES, JSON.stringify(existing));
    return true;
  }
}

export const supabaseService = new SupabaseService();
