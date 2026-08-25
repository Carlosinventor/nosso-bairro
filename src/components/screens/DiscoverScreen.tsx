import React from 'react';
import { Search, SlidersHorizontal, ChevronRight, Store, Utensils, Pill, ShoppingBag, Scissors, Dog, Dumbbell, Coffee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { InteractiveMap } from '../common/InteractiveMap';
import { RatingStars } from '../common/RatingStars';

const POPULAR_SUGGESTIONS = [
  { id: 'Padaria', label: 'Padaria', icon: <Store size={18} className="text-[#2D5A27]" /> },
  { id: 'Restaurante', label: 'Restaurante', icon: <Utensils size={18} className="text-[#2D5A27]" /> },
  { id: 'Farmácia', label: 'Farmácia', icon: <Pill size={18} className="text-blue-600" /> },
  { id: 'Mercado', label: 'Mercado', icon: <ShoppingBag size={18} className="text-[#2D5A27]" /> },
  { id: 'Salão de Beleza', label: 'Salão de beleza', icon: <Scissors size={18} className="text-purple-600" /> },
  { id: 'Pet Shop', label: 'Pet Shop', icon: <Dog size={18} className="text-amber-700" /> },
  { id: 'Academia', label: 'Academia', icon: <Dumbbell size={18} className="text-rose-600" /> },
  { id: 'Cafeteria', label: 'Cafeteria', icon: <Coffee size={18} className="text-[#2D5A27]" /> }
];

export const DiscoverScreen: React.FC = () => {
  const {
    establishments,
    searchQuery,
    setSearchQuery,
    setFilters,
    navigateTo
  } = useApp();

  const handleSelectSuggestion = (catId: string) => {
    setFilters(prev => ({ ...prev, category: catId }));
    setSearchQuery('');
    navigateTo('results');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('results');
    }
  };

  const mapPins = establishments.map(e => ({
    id: e.id,
    name: e.name,
    category: e.category,
    latitude: e.latitude,
    longitude: e.longitude
  }));

  return (
    <div className="pb-28 animate-fadeIn bg-[#F8F9F5]">
      <Header title="Descobrir" showBack={false} />

      <main className="px-4 py-4 space-y-5">
        {/* Title matching Natural Tones style */}
        <div>
          <h2 className="text-xl font-bold text-[#2D3436] tracking-tight">
            O que você procura?
          </h2>
          <p className="text-xs text-[#636E72] mt-0.5">
            Encontre locais, serviços e conveniências no seu bairro
          </p>
        </div>

        {/* Search Bar with Filters button */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#95A5A6]" />
            <input
              type="text"
              placeholder="Buscar padarias, mercados, lojas..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#F1F3F0] focus:bg-white text-sm text-[#2D3436] rounded-full border border-transparent focus:border-[#2D5A27] focus:outline-none transition-all placeholder:text-[#95A5A6] shadow-xs"
            />
          </div>
          <button
            type="button"
            onClick={() => navigateTo('filters')}
            className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <SlidersHorizontal size={15} />
            <span>Filtros</span>
          </button>
        </form>

        {/* Interactive Neighborhood Map */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#2D3436]">Explorar no Mapa</span>
            <span className="text-[#95A5A6] font-medium">Toque nos pinos</span>
          </div>
          <div className="rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-sm">
            <InteractiveMap
              height="180px"
              pins={mapPins}
              onPinClick={(id) => {
                const found = establishments.find(e => e.id === id);
                if (found) navigateTo('establishment_detail', found);
              }}
            />
          </div>
        </div>

        {/* Sugestões populares in Natural Tones */}
        <div className="space-y-3 pt-1">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest">
            Sugestões populares
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {POPULAR_SUGGESTIONS.map(sug => (
              <button
                key={sug.id}
                type="button"
                onClick={() => handleSelectSuggestion(sug.id)}
                className="p-3.5 rounded-[24px] bg-white border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/40 hover:shadow-md flex items-center justify-between transition-all group cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] group-hover:bg-[#E8EFE6] flex items-center justify-center transition-colors">
                    {sug.icon}
                  </div>
                  <span className="text-xs font-bold text-[#2D3436] group-hover:text-[#2D5A27] transition-colors">
                    {sug.label}
                  </span>
                </div>
                <ChevronRight size={15} className="text-[#95A5A6] group-hover:text-[#2D5A27] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Locais Próximos de Você */}
        <div className="pt-2 space-y-3">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest">
            Próximos de você
          </h3>

          <div className="space-y-2.5">
            {establishments.slice(0, 3).map(est => (
              <div
                key={est.id}
                onClick={() => navigateTo('establishment_detail', est)}
                className="p-3.5 bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/30 flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={est.imageUrl}
                    alt={est.name}
                    className="w-13 h-13 rounded-2xl object-cover shrink-0 group-hover:scale-102 transition-transform"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#2D3436] text-xs truncate group-hover:text-[#2D5A27] transition-colors">
                      {est.name}
                    </h4>
                    <p className="text-[11px] text-[#636E72] truncate">
                      {est.category} • {est.distanceMeters}m
                    </p>
                    <RatingStars rating={est.rating} size={11} showValue={true} />
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#95A5A6] shrink-0 group-hover:text-[#2D5A27]" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
