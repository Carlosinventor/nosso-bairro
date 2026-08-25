import React, { useState } from 'react';
import { Calendar, Clock, ArrowLeft, User, Bookmark, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { NewsItem } from '../../types';

export const NewsScreen: React.FC = () => {
  const {
    news,
    selectedNews,
    toggleSaveCommunityItem,
    isCommunityItemSaved,
    shareContent
  } = useApp();

  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(selectedNews);

  if (activeArticle) {
    const isSaved = isCommunityItemSaved(activeArticle.id);

    return (
      <div className="min-h-screen bg-[#F8F9F5] pb-28 animate-fadeIn font-sans">
        {/* Article Header Cover */}
        <div className="relative h-60 w-full bg-[#1E3F1A]">
          <img
            src={activeArticle.imageUrl}
            alt={activeArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
          
          <button
            type="button"
            onClick={() => setActiveArticle(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer z-10"
            aria-label="Voltar"
          >
            <ArrowLeft size={19} />
          </button>

          {/* Top Right Actions: Save & Share */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => toggleSaveCommunityItem(activeArticle.id, activeArticle.title)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              title={isSaved ? 'Salvo' : 'Salvar novidade'}
              aria-label={isSaved ? 'Salvo' : 'Salvar novidade'}
            >
              <Bookmark size={18} className={isSaved ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#2D3436]'} />
            </button>
            <button
              type="button"
              onClick={() => shareContent({
                title: activeArticle.title,
                text: `${activeArticle.title}: ${activeArticle.summary}`
              })}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              title="Compartilhar novidade"
              aria-label="Compartilhar novidade"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <main className="px-4 py-5 space-y-4 -mt-4 bg-white rounded-t-[32px] shadow-sm relative z-10 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#F1F3F0] text-[#2D5A27] text-[11px] font-bold rounded-full border border-[#2D5A27]/20">
              {activeArticle.category}
            </span>
            <span className="text-xs text-[#95A5A6]">•</span>
            <span className="text-xs text-[#636E72] flex items-center gap-1">
              <Calendar size={12} /> {activeArticle.date}
            </span>
            <span className="text-xs text-[#95A5A6]">•</span>
            <span className="text-xs text-[#636E72] flex items-center gap-1">
              <Clock size={12} /> {activeArticle.readTime}
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#2D3436] leading-snug">
            {activeArticle.title}
          </h1>

          <div className="flex items-center gap-2 py-2.5 border-y border-[#F0F0F0] text-xs text-[#636E72]">
            <User size={14} className="text-[#2D5A27]" />
            <span>Publicado por: <strong className="text-[#2D3436]">{activeArticle.author}</strong></span>
          </div>

          <div className="text-[#2D3436] space-y-3 leading-relaxed text-sm">
            <p className="font-semibold text-[#2D3436]">
              {activeArticle.summary}
            </p>
            <p className="text-[#636E72]">
              {activeArticle.content}
            </p>
          </div>

          <div className="pt-4 border-t border-[#F0F0F0]">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="w-full py-3.5 rounded-2xl bg-[#F1F3F0] hover:bg-[#E8EFE6] text-[#2D3436] font-bold text-xs transition-colors cursor-pointer border border-[#E5E7EB]"
            >
              Voltar para a lista de novidades
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn font-sans">
      <Header title="Novidades do Bairro" showBack={true} />

      <main className="px-4 py-4 space-y-4">
        <p className="text-xs text-[#636E72]">
          Fique por dentro das últimas notícias, inaugurações e avisos do nosso bairro.
        </p>

        <div className="space-y-3">
          {news.map(item => {
            const saved = isCommunityItemSaved(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveArticle(item)}
                className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/30 transition-all overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-md text-[#2D5A27] text-[11px] font-bold rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#95A5A6]">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime} de leitura</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#2D3436] group-hover:text-[#2D5A27] transition-colors leading-snug mt-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#636E72] line-clamp-2 leading-relaxed mt-1">
                      {item.summary}
                    </p>
                  </div>

                  {/* Actions & Details row */}
                  <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
                    {/* Share and Save buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveCommunityItem(item.id, item.title);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                          saved
                            ? 'bg-[#E8EFE6] text-[#2D5A27] font-bold'
                            : 'text-[#636E72] hover:bg-[#F1F3F0] hover:text-[#2D5A27]'
                        }`}
                        title={saved ? 'Salvo' : 'Salvar novidade'}
                        aria-label={saved ? 'Salvo' : 'Salvar novidade'}
                      >
                        <Bookmark
                          size={13}
                          className={saved ? 'fill-[#2D5A27] text-[#2D5A27]' : 'text-[#95A5A6]'}
                        />
                        <span>{saved ? 'Salvo' : 'Salvar'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareContent({
                            title: item.title,
                            text: `${item.title}: ${item.summary}`
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#636E72] hover:bg-[#F1F3F0] hover:text-[#2D5A27] transition-all cursor-pointer"
                        title="Compartilhar novidade"
                        aria-label="Compartilhar novidade"
                      >
                        <Share2 size={13} className="text-[#95A5A6]" />
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    <span className="font-bold text-[#2D5A27] text-xs">
                      Ler notícia →
                    </span>
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
