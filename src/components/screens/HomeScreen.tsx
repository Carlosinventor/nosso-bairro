import React from 'react';
import {
  MapPin,
  ChevronDown,
  Bell,
  Star,
  ChevronRight,
  Utensils,
  Wrench,
  Scissors,
  Navigation
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Establishment } from '../../types';

export const HomeScreen: React.FC = () => {
  const { establishments, navigateTo } = useApp();
  const { user } = useAuth();

  // Featured establishment (Padaria Cantinho do Pão)
  const featuredEstablishment: Establishment = establishments.find(
    e => e.id === 'est-1' || e.name.toLowerCase().includes('cantinho do pão')
  ) || establishments[0];

  // Specific discovery items matching the approved reference
  const discoveryEstablishments: Establishment[] = [
    establishments.find(e => e.name.toLowerCase().includes('oficina do carlos')) || {
      id: 'est-oficina',
      name: 'Oficina do Carlos',
      category: 'Serviços',
      subCategory: 'Mecânica e Manutenção',
      description: 'Mecânica honesta e de confiança.',
      address: 'Rua dos Pinheiros, 140 - Zona Sul',
      neighborhood: 'Zona Sul - Jardim Primavera',
      distanceMeters: 450,
      latitude: -23.5492,
      longitude: -46.6321,
      phone: '(11) 3456-1122',
      hours: 'Seg a Sex: 08h às 18h',
      isOpenNow: true,
      rating: 4.8,
      reviewsCount: 94,
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
      photos: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'],
      features: { acceptsPix: true, parking: true },
      createdAt: '2023-02-14T09:00:00Z'
    },
    establishments.find(e => e.name.toLowerCase().includes('cabeleireira talita')) || {
      id: 'est-cabeleireira',
      name: 'Cabeleireira Talita',
      category: 'Serviços',
      subCategory: 'Cortes e Coloração',
      description: 'Cortes e coloração personalizados.',
      address: 'Av. das Flores, 88 - Zona Sul',
      neighborhood: 'Zona Sul - Jardim Primavera',
      distanceMeters: 280,
      latitude: -23.551,
      longitude: -46.6341,
      phone: '(11) 3222-7788',
      hours: 'Ter a Sáb: 09h às 19h',
      isOpenNow: true,
      rating: 4.9,
      reviewsCount: 112,
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
      photos: ['https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop'],
      features: { acceptsPix: true, wifi: true },
      createdAt: '2023-03-10T10:00:00Z'
    },
    establishments.find(e => e.name.toLowerCase().includes('feira orgânica') || e.name.toLowerCase().includes('feira organica')) || {
      id: 'est-feira',
      name: 'Feira Orgânica',
      category: 'Gastronomia',
      subCategory: 'Produtos Frescos Direto do Produtor',
      description: 'Produtos frescos direto do produtor.',
      address: 'Praça Central - Zona Sul',
      neighborhood: 'Zona Sul - Jardim Primavera',
      distanceMeters: 600,
      latitude: -23.553,
      longitude: -46.635,
      phone: '(11) 3344-9988',
      hours: 'Quartas e Sábados: 07h às 13h',
      isOpenNow: true,
      rating: 4.7,
      reviewsCount: 67,
      imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=600&auto=format&fit=crop',
      photos: ['https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=600&auto=format&fit=crop'],
      features: { acceptsPix: true, outdoorSeating: true },
      createdAt: '2023-01-28T07:00:00Z'
    }
  ];

  const getCategoryIcon = (category: string, name: string) => {
    if (category.toLowerCase().includes('gastro') || name.toLowerCase().includes('padaria') || name.toLowerCase().includes('feira')) {
      return <Utensils size={11} className="text-[#2D5A27]" />;
    }
    if (name.toLowerCase().includes('oficina')) {
      return <Wrench size={11} className="text-[#2D5A27]" />;
    }
    if (name.toLowerCase().includes('cabeleireira') || name.toLowerCase().includes('salão') || name.toLowerCase().includes('salao')) {
      return <Scissors size={11} className="text-[#2D5A27]" />;
    }
    return <Utensils size={11} className="text-[#2D5A27]" />;
  };

  return (
    <div className="pb-28 bg-[#FAFAF8] min-h-screen animate-fadeIn text-[#2D3436]">
      {/* Top Header: Nosso Bairro, Bairro selector, Bell & Profile Avatar */}
      <header className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#1E2522] tracking-tight leading-tight">
            Nosso Bairro
          </h1>
          <button
            type="button"
            onClick={() => navigateTo('discover')}
            className="flex items-center gap-1 text-xs text-[#525F58] font-medium mt-0.5 hover:text-[#1E3F1A] transition-colors cursor-pointer"
          >
            <MapPin size={13} className="text-[#1E3F1A]" />
            <span>{user?.neighborhood?.split('-')[0]?.trim() || 'Zona Sul'}</span>
            <ChevronDown size={12} className="text-[#525F58]" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('notifications')}
            className="w-10 h-10 rounded-full bg-white border border-[#EBEBEB] flex items-center justify-center text-[#2D3436] hover:bg-[#F1F3F0] transition-colors relative cursor-pointer shadow-2xs"
            title="Notificações"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#E74C3C] rounded-full ring-2 ring-white" />
          </button>

          <button
            type="button"
            onClick={() => navigateTo('profile')}
            className="relative cursor-pointer focus:outline-none"
            title="Meu Perfil"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop'}
              alt={user?.name || 'Perfil'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1E3F1A]/20 hover:ring-[#1E3F1A] transition-all"
            />
          </button>
        </div>
      </header>

      <main className="px-5 space-y-4 pt-2">
        {/* Saudação ao usuário */}
        <div>
          <h2 className="text-xl font-bold text-[#1E2522] leading-tight">
            Bom dia, {user?.name ? user.name.split(' ')[0] : 'João'}! 👋
          </h2>
          <p className="text-xs text-[#636E72] mt-0.5 font-normal">
            Confira o que há de melhor no seu bairro hoje.
          </p>
        </div>

        {/* Card Destaque do Dia */}
        {featuredEstablishment && (
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] shadow-sm overflow-hidden transition-all">
            {/* Imagem com badges sobrepostos */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden">
              <img
                src={featuredEstablishment.imageUrl}
                alt={featuredEstablishment.name}
                className="w-full h-full object-cover"
              />

              {/* Badge Top-Left: DESTAQUE DO DIA */}
              <div className="absolute top-3 left-3 bg-[#1E3F1A] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={11} className="fill-white text-white" />
                <span>DESTAQUE DO DIA</span>
              </div>

              {/* Badge Top-Right: Rating 4,9 */}
              <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span>{featuredEstablishment.rating.toFixed(1).replace('.', ',')}</span>
              </div>

              {/* Badge Bottom-Right: Distância A 320 m */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#1E2522] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Navigation size={11} className="text-[#1E3F1A]" />
                <span>A {featuredEstablishment.distanceMeters} m</span>
              </div>
            </div>

            {/* Conteúdo do Destaque */}
            <div className="p-4 space-y-2.5">
              <div>
                <h3 className="text-base font-bold text-[#1E2522] leading-tight">
                  {featuredEstablishment.name}
                </h3>
                <p className="text-xs text-[#525F58] mt-0.5">
                  {featuredEstablishment.description}
                </p>
              </div>

              {/* Categoria e Avaliações */}
              <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0F5EE] text-[#1E3F1A] border border-[#1E3F1A]/20">
                  <Utensils size={12} className="text-[#1E3F1A]" />
                  <span>{featuredEstablishment.category || 'Gastronomia'}</span>
                </span>

                <div className="flex items-center gap-1 text-xs text-[#636E72]">
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <Star size={12} className="fill-amber-500 text-amber-500" />
                    {featuredEstablishment.rating.toFixed(1).replace('.', ',')}
                  </span>
                  <span className="text-[#95A5A6]">
                    ({featuredEstablishment.reviewsCount} avaliações)
                  </span>
                </div>
              </div>

              {/* Botão Ver descoberta */}
              <button
                type="button"
                onClick={() => navigateTo('discover')}
                className="w-full mt-2 py-3 px-4 rounded-2xl bg-[#1E3F1A] hover:bg-[#152D12] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-99"
              >
                <span>Ver descoberta</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Seção Descobertas próximas */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1E2522]">
              Descobertas próximas
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('discover')}
              className="text-xs font-bold text-[#1E3F1A] hover:underline cursor-pointer"
            >
              Ver todas
            </button>
          </div>

          {/* Cards compactos das descobertas */}
          <div className="space-y-2.5">
            {discoveryEstablishments.map(est => (
              <div
                key={est.id}
                onClick={() => navigateTo('establishment_detail', est)}
                className="p-3 rounded-2xl bg-white border border-[#EAEAEA] shadow-2xs hover:border-[#1E3F1A]/30 transition-all cursor-pointer flex items-center gap-3 group"
              >
                <img
                  src={est.imageUrl}
                  alt={est.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-102 transition-transform"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#1E2522] text-xs sm:text-sm truncate group-hover:text-[#1E3F1A] transition-colors leading-tight">
                    {est.name}
                  </h4>
                  <p className="text-[11px] text-[#636E72] truncate mt-0.5">
                    {est.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-[#636E72] mt-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F0F5EE] text-[#1E3F1A] border border-[#1E3F1A]/15">
                      {getCategoryIcon(est.category, est.name)}
                      <span>{est.category}</span>
                    </span>

                    <span className="flex items-center gap-0.5 text-amber-500 font-bold text-[11px]">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      {est.rating.toFixed(1).replace('.', ',')}
                    </span>

                    <span className="text-[#95A5A6]">•</span>

                    <span className="text-[#636E72] font-medium text-[11px]">
                      {est.distanceMeters} m
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
