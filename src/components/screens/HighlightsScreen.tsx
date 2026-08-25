import React from 'react';
import { Trophy, Star, ChevronRight, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

export const HighlightsScreen: React.FC = () => {
  const { highlights, establishments, navigateTo } = useApp();

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header title="Destaques do Bairro" showBack={true} />

      <main className="px-4 py-4 space-y-4">
        {/* Intro banner */}
        <div className="p-4 rounded-[24px] bg-white border border-[#F0F0F0] shadow-sm text-[#2D3436] space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
            <Trophy size={15} />
            <span>Em Evidência na Comunidade</span>
          </div>
          <p className="text-xs text-[#636E72] leading-relaxed">
            Locais, produtos artesanais e iniciativas que mais receberam elogios, fotos e avaliações dos moradores nesta semana.
          </p>
        </div>

        {/* Highlights Cards List */}
        <div className="space-y-4">
          {highlights.map((item) => {
            const linkedEst = establishments.find(e => e.id === item.establishmentId);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (linkedEst) {
                    navigateTo('establishment_detail', linkedEst);
                  }
                }}
                className="bg-white rounded-[28px] border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/30 transition-all overflow-hidden cursor-pointer group"
              >
                <div className="relative h-44 w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#2D3436] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Flame size={14} className="text-amber-500 fill-amber-500" />
                    <span>{item.tag}</span>
                  </div>

                  {item.rating && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2.5">
                  <div>
                    <h3 className="text-base font-bold text-[#2D3436] group-hover:text-[#2D5A27] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#2D5A27]">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-[#636E72] bg-[#F1F3F0] p-3 rounded-2xl border border-[#E5E7EB] leading-relaxed">
                    💡 <strong className="text-[#2D3436]">Por que é destaque:</strong> {item.highlightReason}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#F0F0F0] text-xs font-bold text-[#2D5A27]">
                    <span>Ver detalhes do local</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
