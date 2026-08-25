import React from 'react';
import { SlidersHorizontal, Heart, MapPin, Navigation, Inbox } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { RatingStars } from '../common/RatingStars';

export const ResultsScreen: React.FC = () => {
  const {
    filteredEstablishments,
    filters,
    searchQuery,
    navigateTo,
    toggleFavorite,
    isFavorite
  } = useApp();

  const titleContext = filters.category
    ? filters.category.toLowerCase()
    : searchQuery
    ? `"${searchQuery}"`
    : 'locais';

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header
        title="Resultados"
        showBack={true}
        rightAction={
          <button
            type="button"
            onClick={() => navigateTo('filters')}
            className="w-10 h-10 rounded-full bg-[#F1F3F0] hover:bg-[#E8EFE6] text-[#2D3436] hover:text-[#2D5A27] flex items-center justify-center transition-colors cursor-pointer"
            title="Ajustar filtros"
          >
            <SlidersHorizontal size={18} />
          </button>
        }
      />

      <main className="px-4 py-4 space-y-4">
        {/* Results Count Header */}
        <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm flex items-center justify-between">
          <p className="text-xs font-bold text-[#2D3436]">
            {filteredEstablishments.length}{' '}
            {filteredEstablishments.length === 1
              ? `resultado de ${titleContext} encontrado`
              : `resultados de ${titleContext} encontrados`}
          </p>
          <button
            type="button"
            onClick={() => navigateTo('filters')}
            className="text-xs text-[#2D5A27] font-bold hover:underline"
          >
            Filtros
          </button>
        </div>

        {/* Empty state */}
        {filteredEstablishments.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3 bg-white rounded-[28px] border border-[#F0F0F0]">
            <div className="w-16 h-16 rounded-full bg-[#F1F3F0] text-[#95A5A6] flex items-center justify-center mx-auto">
              <Inbox size={32} />
            </div>
            <h3 className="font-bold text-[#2D3436] text-sm">
              Nenhum estabelecimento encontrado
            </h3>
            <p className="text-xs text-[#636E72] max-w-xs mx-auto">
              Tente remover alguns filtros ou buscar por outro termo ou categoria.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('filters')}
              className="mt-2 px-5 py-2.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold shadow-sm hover:bg-[#1E3F1A]"
            >
              Ajustar filtros
            </button>
          </div>
        ) : (
          /* Cards list */
          <div className="space-y-3">
            {filteredEstablishments.map(est => {
              const favorited = isFavorite(est.id);

              return (
                <div
                  key={est.id}
                  onClick={() => navigateTo('establishment_detail', est)}
                  className="p-3.5 rounded-[24px] bg-white border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/30 transition-all cursor-pointer flex gap-3.5 group"
                >
                  <img
                    src={est.imageUrl}
                    alt={est.name}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 group-hover:scale-102 transition-transform"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-[#2D3436] text-sm truncate leading-tight group-hover:text-[#2D5A27] transition-colors">
                          {est.name}
                        </h4>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(est.id);
                          }}
                          className="text-[#95A5A6] hover:text-rose-500 p-0.5 cursor-pointer shrink-0"
                        >
                          <Heart
                            size={17}
                            className={favorited ? 'fill-rose-500 text-rose-500' : ''}
                          />
                        </button>
                      </div>

                      <p className="text-xs text-[#636E72] font-medium truncate mt-0.5">
                        {est.category} {est.subCategory ? `• ${est.subCategory}` : ''}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        <RatingStars rating={est.rating} size={13} showValue={true} reviewCount={est.reviewsCount} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#636E72] pt-1.5 border-t border-[#F0F0F0]">
                      <span className="flex items-center gap-1 truncate max-w-[140px]">
                        <MapPin size={12} className="text-[#95A5A6] shrink-0" />
                        {est.address.split('-')[0]}
                      </span>
                      <span className="font-bold text-[#2D5A27] shrink-0 flex items-center gap-0.5">
                        <Navigation size={10} /> {est.distanceMeters}m
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
