import React from 'react';
import { Trash2, Heart, MapPin, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { RatingStars } from '../common/RatingStars';

export const FavoritesScreen: React.FC = () => {
  const {
    establishments,
    favorites,
    toggleFavorite,
    navigateTo
  } = useApp();

  const favoriteEstablishments = establishments.filter(e => favorites.includes(e.id));

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header title="Meus favoritos" showBack={true} />

      <main className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest">
            {favoriteEstablishments.length} {favoriteEstablishments.length === 1 ? 'local salvo' : 'locais salvos'}
          </p>
          <span className="text-xs text-[#2D5A27] font-semibold">Sincronizado no Supabase</span>
        </div>

        {favoriteEstablishments.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-3 bg-white rounded-[28px] border border-[#F0F0F0] p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
              <Heart size={32} />
            </div>
            <h3 className="font-bold text-[#2D3436] text-sm">
              Você ainda não tem favoritos
            </h3>
            <p className="text-xs text-[#636E72] max-w-xs mx-auto">
              Toque no coração nos estabelecimentos que você mais gosta para acessá-los rapidamente aqui.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('discover')}
              className="mt-3 px-5 py-2.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold shadow-sm hover:bg-[#1E3F1A]"
            >
              Explorar estabelecimentos
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {favoriteEstablishments.map(est => (
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
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Remover dos favoritos"
                        aria-label="Remover dos favoritos"
                      >
                        <Trash2 size={16} className="transition-transform group-hover/btn:scale-110" />
                      </button>
                    </div>

                    <p className="text-xs text-[#636E72] font-medium truncate mt-0.5">
                      {est.category}
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
