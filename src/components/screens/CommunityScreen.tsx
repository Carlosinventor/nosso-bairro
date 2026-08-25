import React, { useState } from 'react';
import {
  Users,
  Bell,
  Search,
  Plus,
  Trophy,
  Megaphone,
  ChevronRight,
  Star,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  Bookmark,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CommunityScreen: React.FC = () => {
  const {
    navigateTo,
    establishments,
    events,
    campaigns,
    news,
    toggleFavorite,
    isFavorite,
    toggleSaveCommunityItem,
    isCommunityItemSaved,
    shareContent
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'tudo' | 'destaques' | 'eventos' | 'campanhas' | 'novidades'>('tudo');
  const [searchQuery, setSearchQuery] = useState('');

  // Destaques do Bairro matching the original design print
  const neighborhoodHighlights = [
    {
      id: 'hl-cafe',
      name: 'Café do Bairro',
      category: 'Gastronomia',
      badge: 'Mais bem avaliado',
      rating: 4.9,
      reviewsCount: 128,
      address: 'Rua das Flores, 123',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop',
      establishmentId: 'est-11'
    },
    {
      id: 'hl-studio',
      name: 'Studio Fit',
      category: 'Bem-estar',
      badge: '🔥 Mais comentado',
      rating: 4.8,
      reviewsCount: 76,
      address: 'Av. Central, 456',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
      establishmentId: 'est-8'
    },
    {
      id: 'hl-pet',
      name: 'Pet Feliz',
      category: 'Serviços',
      badge: '⭐ Em alta',
      rating: 4.9,
      reviewsCount: 74,
      address: 'Rua das Acácias, 78',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop',
      establishmentId: 'est-5'
    },
    {
      id: 'hl-flor',
      name: 'Flor & Cor',
      category: 'Comércio',
      badge: '🌿 Novidade',
      rating: 4.7,
      reviewsCount: 52,
      address: 'Av. das Palmeiras, 89',
      imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop',
      establishmentId: 'est-3'
    }
  ];

  // Novidades da comunidade
  const newsList = [
    {
      id: 'news-mutirao',
      title: 'Mutirão de limpeza no bairro',
      description: 'Venha participar! Vamos deixar nosso bairro ainda mais bonito e limpo.',
      date: '22 Mai',
      tag: 'Comunidade',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop',
      type: 'community'
    },
    {
      id: 'news-foodtruck',
      title: 'Festival de Food Truck',
      description: 'Música, boa comida e muita diversão neste fim de semana!',
      date: '20 Mai',
      tag: 'Eventos',
      imageUrl: 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=400&auto=format&fit=crop',
      type: 'event'
    },
    {
      id: 'news-bicicletas',
      title: 'Oficina de bicicletas gratuita',
      description: 'Aprenda a fazer pequenos reparos e mantenha sua bike sempre em dia.',
      date: '18 Mai',
      tag: 'Serviços',
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&auto=format&fit=crop',
      type: 'service'
    }
  ];

  const filterTabs = [
    { id: 'tudo', label: 'Tudo' },
    { id: 'destaques', label: 'Destaques do Bairro' },
    { id: 'eventos', label: 'Eventos' },
    { id: 'campanhas', label: 'Campanhas' },
    { id: 'novidades', label: 'Novidades' }
  ] as const;

  const handleCardClick = (establishmentId: string) => {
    const est = establishments.find(e => e.id === establishmentId);
    if (est) {
      navigateTo('establishment_detail', est);
    } else {
      navigateTo('highlights');
    }
  };

  const filteredHighlights = neighborhoodHighlights.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCampaigns = campaigns.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = newsList.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-white pb-28 font-sans select-none animate-fadeIn flex flex-col">
      {/* Top Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={24} className="text-[#1B4323] shrink-0" />
            <h1 className="text-[22px] sm:text-[24px] font-extrabold text-[#1B4323] leading-tight tracking-tight">
              Comunidade
            </h1>
          </div>

          {/* Notifications bell icon with red badge */}
          <button
            type="button"
            onClick={() => navigateTo('notifications')}
            className="relative p-1.5 text-[#1A202C] hover:text-[#1B4323] transition-colors cursor-pointer shrink-0"
            aria-label="Notificações"
          >
            <Bell size={20} className="stroke-[1.8]" />
            <span className="absolute top-1 right-0.5 w-3.5 h-3.5 bg-[#E53E3E] text-white text-[8.5px] font-bold rounded-full flex items-center justify-center border border-white">
              3
            </span>
          </button>
        </div>

        <p className="text-[12.5px] text-[#4A5568] mt-0.5 font-medium leading-tight">
          Conecte-se, participe e fortaleça nosso bairro
        </p>
      </div>

      {/* Search Bar & Criar publicação Button Row */}
      <div className="px-4 mt-1.5 flex items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] pointer-events-none">
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Buscar na comunidade..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1.5 text-[12.5px] bg-white border border-[#E2E8F0] focus:border-[#1B4323] rounded-full focus:outline-none transition-all placeholder:text-[#A0AEC0] text-[#1A202C] truncate"
          />
        </div>

        {/* Criar publicação button */}
        <button
          type="button"
          onClick={() => navigateTo('share')}
          className="px-3 py-1.5 bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white rounded-full text-[11.5px] font-semibold flex items-center gap-1 shadow-xs transition-all shrink-0 whitespace-nowrap cursor-pointer"
        >
          <Plus size={13} className="stroke-[2.5] shrink-0" />
          <span>Criar publicação</span>
        </button>
      </div>

      {/* Pill Filter Tabs - Scrollable horizontal container */}
      <div className="w-full mt-3">
        <div 
          tabIndex={0}
          aria-label="Filtros de categoria"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 pb-1.5 pt-0.5 scroll-smooth overscroll-x-contain touch-pan-x cursor-grab active:cursor-grabbing focus:outline-none"
        >
          {filterTabs.map(tab => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#1B4323] text-white shadow-xs scale-100'
                    : 'bg-[#F2F4F2] text-[#4A5568] hover:bg-[#EAEFEA] hover:text-[#1B4323]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
          {/* Spacer to allow full scroll */}
          <div className="w-2 shrink-0 pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* SECTION: Destaques do Bairro (Show in 'tudo' or 'destaques') */}
      {(activeFilter === 'tudo' || activeFilter === 'destaques') && (
        <div className="mt-4">
          <div className="px-4 flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Trophy size={16} className="text-[#1B4323] shrink-0" />
              <h2 className="text-[14px] font-bold text-[#1A202C]">
                Destaques do Bairro
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('highlights')}
              className="text-[11.5px] font-semibold text-[#1B4323] hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <span>Ver todos</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Horizontal Carousel of Highlights */}
          <div className="w-full">
            <div 
              tabIndex={0}
              aria-label="Carrossel de destaques"
              className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-3 pt-0.5 scroll-smooth overscroll-x-contain touch-pan-x cursor-grab active:cursor-grabbing focus:outline-none"
            >
              {filteredHighlights.map(item => {
                const favorited = isFavorite(item.establishmentId);

                return (
                  <div
                    key={item.id}
                    onClick={() => handleCardClick(item.establishmentId)}
                    className="w-[142px] min-w-[142px] max-w-[142px] shrink-0 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col group select-none"
                  >
                    {/* Card Image */}
                    <div className="relative h-[95px] w-full bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badge */}
                      <div className="absolute top-1.5 left-1.5 max-w-[65%] z-10">
                        <span className="inline-block truncate px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-[#1B4323]/95 text-white shadow-xs backdrop-blur-xs leading-tight">
                          {item.badge}
                        </span>
                      </div>

                      {/* Heart Favorite Icon */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.establishmentId);
                        }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 z-20"
                        aria-label="Favoritar"
                      >
                        <Heart
                          size={11}
                          className={favorited ? 'fill-rose-500 text-rose-500' : 'text-white'}
                        />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[12px] font-bold text-[#1A202C] leading-snug truncate">
                          {item.name}
                        </h3>
                        <span className="text-[10.5px] font-medium text-[#1B4323] block leading-tight truncate mt-0.5">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-gray-100 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <Star size={10} className="fill-[#F5A623] text-[#F5A623] shrink-0" />
                          <span className="text-[10.5px] font-bold text-[#1A202C] shrink-0">
                            {item.rating.toString().replace('.', ',')}
                          </span>
                          <span className="text-[9.5px] text-[#718096] shrink-0">
                            ({item.reviewsCount})
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[#718096]">
                          <MapPin size={9.5} className="shrink-0 text-[#A0AEC0]" />
                          <span className="text-[9.5px] truncate block max-w-[100px]">{item.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="w-3 shrink-0 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Eventos do Bairro (Show in 'tudo' or 'eventos') */}
      {(activeFilter === 'tudo' || activeFilter === 'eventos') && (
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-[#1B4323] shrink-0" />
              <h2 className="text-[14px] font-bold text-[#1A202C]">
                Eventos do Bairro
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('events')}
              className="text-[11.5px] font-semibold text-[#1B4323] hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <span>Ver todos</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {filteredEvents.map(event => {
              const saved = isCommunityItemSaved(event.id);

              return (
                <div
                  key={event.id}
                  onClick={() => navigateTo('event_detail', event)}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#1B4323]/40 transition-all overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-32 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[#1B4323] text-[10.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {event.category}
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {event.price || 'Grátis'}
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-[13px] font-bold text-[#1A202C] group-hover:text-[#1B4323] transition-colors leading-snug line-clamp-1">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-[#718096]">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#1B4323]" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#1B4323]" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-[150px]">
                        <MapPin size={12} className="text-[#1B4323]" />
                        {event.location}
                      </span>
                    </div>

                    {/* Action Bar: Compartilhar & Salvar */}
                    <div className="mt-3 pt-2 border-t border-[#F1F3F0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Botão Salvar */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveCommunityItem(event.id, event.title);
                          }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            saved
                              ? 'bg-[#EAF3EB] text-[#1B4323] font-bold'
                              : 'text-[#4A5568] hover:bg-[#F1F3F0] hover:text-[#1B4323]'
                          }`}
                          title={saved ? 'Salvo' : 'Salvar evento'}
                          aria-label={saved ? 'Salvo' : 'Salvar evento'}
                        >
                          <Bookmark
                            size={13}
                            className={saved ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#718096]'}
                          />
                          <span>{saved ? 'Salvo' : 'Salvar'}</span>
                        </button>

                        {/* Botão Compartilhar */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareContent({
                              title: event.title,
                              text: `Confira o evento "${event.title}" no nosso bairro: ${event.date} às ${event.time} em ${event.location}.`
                            });
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#4A5568] hover:bg-[#F1F3F0] hover:text-[#1B4323] transition-all cursor-pointer"
                          title="Compartilhar evento"
                          aria-label="Compartilhar evento"
                        >
                          <Share2 size={13} className="text-[#718096]" />
                          <span>Compartilhar</span>
                        </button>
                      </div>

                      <span className="text-[11px] font-bold text-[#1B4323] flex items-center gap-0.5">
                        Ver detalhes →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: Campanhas (Show in 'tudo' or 'campanhas') */}
      {(activeFilter === 'tudo' || activeFilter === 'campanhas') && (
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <HeartHandshake size={16} className="text-[#1B4323] shrink-0" />
              <h2 className="text-[14px] font-bold text-[#1A202C]">
                Campanhas do Bairro
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('campaigns')}
              className="text-[11.5px] font-semibold text-[#1B4323] hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <span>Ver todas</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {filteredCampaigns.map(camp => {
              const saved = isCommunityItemSaved(camp.id);

              return (
                <div
                  key={camp.id}
                  onClick={() => navigateTo('campaign_detail', camp)}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#1B4323]/40 transition-all overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-28 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={camp.imageUrl}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[#1B4323] text-[10.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {camp.category}
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-[13px] font-bold text-[#1A202C] group-hover:text-[#1B4323] transition-colors leading-snug line-clamp-1">
                      {camp.title}
                    </h3>
                    <p className="text-[11px] text-[#718096] line-clamp-2 mt-0.5 leading-snug">
                      {camp.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[10.5px] font-medium text-[#718096]">
                        <span>Meta: {camp.goal}</span>
                        <span className="font-bold text-[#1B4323]">{camp.currentProgress}% atingido</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#1B4323] h-full rounded-full transition-all duration-500"
                          style={{ width: `${camp.currentProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Bar: Compartilhar & Salvar */}
                    <div className="mt-3 pt-2 border-t border-[#F1F3F0] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Botão Salvar */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveCommunityItem(camp.id, camp.title);
                          }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                            saved
                              ? 'bg-[#EAF3EB] text-[#1B4323] font-bold'
                              : 'text-[#4A5568] hover:bg-[#F1F3F0] hover:text-[#1B4323]'
                          }`}
                          title={saved ? 'Salvo' : 'Salvar campanha'}
                          aria-label={saved ? 'Salvo' : 'Salvar campanha'}
                        >
                          <Bookmark
                            size={13}
                            className={saved ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#718096]'}
                          />
                          <span>{saved ? 'Salvo' : 'Salvar'}</span>
                        </button>

                        {/* Botão Compartilhar */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareContent({
                              title: camp.title,
                              text: `Apoie a campanha comunitária "${camp.title}": ${camp.description}`
                            });
                          }}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#4A5568] hover:bg-[#F1F3F0] hover:text-[#1B4323] transition-all cursor-pointer"
                          title="Compartilhar campanha"
                          aria-label="Compartilhar campanha"
                        >
                          <Share2 size={13} className="text-[#718096]" />
                          <span>Compartilhar</span>
                        </button>
                      </div>

                      <span className="text-[11px] font-bold text-[#1B4323] flex items-center gap-0.5">
                        Apoiar →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: Novidades (Show in 'tudo' or 'novidades') */}
      {(activeFilter === 'tudo' || activeFilter === 'novidades') && (
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Megaphone size={16} className="text-[#1B4323] shrink-0" />
              <h2 className="text-[14px] font-bold text-[#1A202C]">
                Novidades
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('news')}
              className="text-[11.5px] font-semibold text-[#1B4323] hover:underline flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <span>Ver todas</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* List of News Cards */}
          <div className="space-y-2.5">
            {filteredNews.map(item => {
              const saved = isCommunityItemSaved(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => navigateTo('news')}
                  className="p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#1B4323]/40 transition-all flex flex-col gap-2.5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    {/* Thumbnail */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-102 transition-transform"
                    />

                    {/* Information */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="text-[12.5px] font-bold text-[#1A202C] leading-snug line-clamp-1 group-hover:text-[#1B4323] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#718096] line-clamp-2 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    {/* Right metadata badge */}
                    <div className="flex flex-col items-end justify-between shrink-0 pl-1 self-stretch py-0.5">
                      <div className="flex items-center gap-1 text-[10.5px] font-medium text-[#718096]">
                        <Calendar size={10.5} className="text-[#718096]" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 mt-auto">
                        <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-[#EAF3EB] text-[#1B4323]">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar: Compartilhar & Salvar */}
                  <div className="pt-2 border-t border-[#F1F3F0] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Botão Salvar */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveCommunityItem(item.id, item.title);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                          saved
                            ? 'bg-[#EAF3EB] text-[#1B4323] font-bold'
                            : 'text-[#4A5568] hover:bg-[#F1F3F0] hover:text-[#1B4323]'
                        }`}
                        title={saved ? 'Salvo' : 'Salvar novidade'}
                        aria-label={saved ? 'Salvo' : 'Salvar novidade'}
                      >
                        <Bookmark
                          size={13}
                          className={saved ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#718096]'}
                        />
                        <span>{saved ? 'Salvo' : 'Salvar'}</span>
                      </button>

                      {/* Botão Compartilhar */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareContent({
                            title: item.title,
                            text: `${item.title}: ${item.description}`
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#4A5568] hover:bg-[#F1F3F0] hover:text-[#1B4323] transition-all cursor-pointer"
                        title="Compartilhar novidade"
                        aria-label="Compartilhar novidade"
                      >
                        <Share2 size={13} className="text-[#718096]" />
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    <span className="text-[11px] font-bold text-[#1B4323] flex items-center gap-0.5">
                      Ler mais →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
