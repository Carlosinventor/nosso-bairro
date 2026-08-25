import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Check, Bookmark, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { InteractiveMap } from '../common/InteractiveMap';
import { CommunityEvent } from '../../types';

export const EventsScreen: React.FC = () => {
  const {
    events,
    selectedEvent,
    toggleEventInterest,
    toggleSaveCommunityItem,
    isCommunityItemSaved,
    shareContent
  } = useApp();

  const [activeEvent, setActiveEvent] = useState<CommunityEvent | null>(selectedEvent);

  if (activeEvent) {
    const isInterested = activeEvent.isUserInterested;
    const isSaved = isCommunityItemSaved(activeEvent.id);

    return (
      <div className="min-h-screen bg-[#F8F9F5] pb-28 animate-fadeIn">
        {/* Cover Banner */}
        <div className="relative h-64 w-full bg-[#1E3F1A]">
          <img
            src={activeEvent.imageUrl}
            alt={activeEvent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
          
          <button
            type="button"
            onClick={() => setActiveEvent(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer z-10"
            aria-label="Voltar"
          >
            <ArrowLeft size={19} />
          </button>

          {/* Top Right Quick Actions: Save & Share */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => toggleSaveCommunityItem(activeEvent.id, activeEvent.title)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              title={isSaved ? 'Salvo' : 'Salvar evento'}
              aria-label={isSaved ? 'Salvo' : 'Salvar evento'}
            >
              <Bookmark size={18} className={isSaved ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#2D3436]'} />
            </button>
            <button
              type="button"
              onClick={() => shareContent({
                title: activeEvent.title,
                text: `Confira o evento "${activeEvent.title}" no nosso bairro: ${activeEvent.date} às ${activeEvent.time} em ${activeEvent.location}.`
              })}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              title="Compartilhar evento"
              aria-label="Compartilhar evento"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <main className="px-4 py-5 space-y-4 -mt-4 bg-white rounded-t-[32px] shadow-sm relative z-10 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#F1F3F0] text-[#2D5A27] text-xs font-bold rounded-full border border-[#2D5A27]/20">
              {activeEvent.category}
            </span>
            <span className="text-xs font-bold text-[#2D5A27] bg-[#E8EFE6] px-2.5 py-1 rounded-full border border-[#2D5A27]/20">
              {activeEvent.price || 'Gratuito'}
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#2D3436] leading-snug">
            {activeEvent.title}
          </h1>

          {/* Details Card */}
          <div className="p-4 bg-[#F1F3F0] rounded-[24px] border border-[#E5E7EB] space-y-3">
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-[#2D5A27] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#2D3436] block">Data</span>
                <span className="text-xs text-[#636E72]">{activeEvent.date}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#E5E7EB]">
              <Clock size={18} className="text-[#2D5A27] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#2D3436] block">Horário</span>
                <span className="text-xs text-[#636E72]">{activeEvent.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#E5E7EB]">
              <MapPin size={18} className="text-[#2D5A27] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#2D3436] block">{activeEvent.location}</span>
                <span className="text-xs text-[#636E72]">{activeEvent.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#E5E7EB]">
              <Users size={18} className="text-[#2D5A27] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#2D3436] block">Organização</span>
                <span className="text-xs text-[#636E72]">{activeEvent.organizer}</span>
              </div>
            </div>
          </div>

          {/* About Event */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-sm font-bold text-[#2D3436]">Sobre o evento</h3>
            <p className="text-xs text-[#636E72] leading-relaxed">
              {activeEvent.description}
            </p>
          </div>

          {/* Map Preview */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-sm font-bold text-[#2D3436]">Localização</h3>
            <div className="rounded-[24px] overflow-hidden border border-[#E5E7EB]">
              <InteractiveMap height="130px" showControls={false} />
            </div>
          </div>
        </main>

        {/* Bottom Fixed Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E7EB] p-3 shadow-lg max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="text-xs text-[#636E72] pl-2">
            <strong className="text-[#2D3436] block text-sm">{activeEvent.interestedCount}</strong>
            moradores confirmaram
          </div>

          <button
            type="button"
            onClick={() => {
              toggleEventInterest(activeEvent.id);
              setActiveEvent(prev =>
                prev
                  ? {
                      ...prev,
                      isUserInterested: !prev.isUserInterested,
                      interestedCount: prev.interestedCount + (prev.isUserInterested ? -1 : 1)
                    }
                  : null
              );
            }}
            className={`py-3.5 px-6 rounded-2xl font-bold text-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5 shadow-sm ${
              isInterested
                ? 'bg-[#E8EFE6] text-[#2D5A27] border border-[#2D5A27]'
                : 'bg-[#2D5A27] hover:bg-[#1E3F1A] text-white'
            }`}
          >
            {isInterested ? <Check size={16} /> : <Calendar size={16} />}
            <span>{isInterested ? 'Tenho interesse ✓' : 'Tenho interesse'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn font-sans">
      <Header title="Eventos do Bairro" showBack={true} />

      <main className="px-4 py-4 space-y-4">
        <p className="text-xs text-[#636E72]">
          Encontros culturais, feiras, esportes e atividades de lazer na nossa comunidade.
        </p>

        <div className="space-y-3">
          {events.map(item => {
            const month = item.date.includes('Out') ? 'OUT' : 'NOV';
            const day = item.date.match(/\d+/)?.[0] || '15';
            const saved = isCommunityItemSaved(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveEvent(item)}
                className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/30 transition-all overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#F8F9F5] border border-[#2D5A27]/20 px-3 py-1.5 rounded-xl shadow-md text-center">
                    <span className="text-[10px] font-bold text-[#2D5A27] uppercase block leading-none">
                      {month} {day}
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {item.price || 'Grátis'}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#2D3436] group-hover:text-[#2D5A27] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <div className="space-y-1 text-xs text-[#636E72] mt-1.5">
                      <p className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#95A5A6] shrink-0" />
                        {item.time}
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <MapPin size={13} className="text-[#95A5A6] shrink-0" />
                        {item.location}
                      </p>
                    </div>
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
                        title={saved ? 'Salvo' : 'Salvar evento'}
                        aria-label={saved ? 'Salvo' : 'Salvar evento'}
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
                            text: `Confira o evento "${item.title}" no nosso bairro: ${item.date} às ${item.time} em ${item.location}.`
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#636E72] hover:bg-[#F1F3F0] hover:text-[#2D5A27] transition-all cursor-pointer"
                        title="Compartilhar evento"
                        aria-label="Compartilhar evento"
                      >
                        <Share2 size={13} className="text-[#95A5A6]" />
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    <span className="font-bold text-[#2D5A27] text-xs">
                      Ver detalhes →
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
