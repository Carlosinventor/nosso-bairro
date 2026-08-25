import React, { useState } from 'react';
import { HeartHandshake, Mail, ArrowLeft, Check, Bookmark, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Campaign } from '../../types';

export const CampaignsScreen: React.FC = () => {
  const {
    campaigns,
    selectedCampaign,
    toggleSaveCommunityItem,
    isCommunityItemSaved,
    shareContent
  } = useApp();

  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(selectedCampaign);
  const [hasContributed, setHasContributed] = useState(false);

  if (activeCampaign) {
    const isSaved = isCommunityItemSaved(activeCampaign.id);

    return (
      <div className="min-h-screen bg-[#F8F9F5] pb-28 animate-fadeIn font-sans">
        {/* Cover Banner */}
        <div className="relative h-60 w-full bg-[#1E3F1A]">
          <img
            src={activeCampaign.imageUrl}
            alt={activeCampaign.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
          
          <button
            type="button"
            onClick={() => setActiveCampaign(null)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer z-10"
            aria-label="Voltar"
          >
            <ArrowLeft size={19} />
          </button>

          {/* Top Right Actions: Save & Share */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={() => toggleSaveCommunityItem(activeCampaign.id, activeCampaign.title)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              title={isSaved ? 'Salvo' : 'Salvar campanha'}
              aria-label={isSaved ? 'Salvo' : 'Salvar campanha'}
            >
              <Bookmark size={18} className={isSaved ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#2D3436]'} />
            </button>
            <button
              type="button"
              onClick={() => shareContent({
                title: activeCampaign.title,
                text: `Apoie a campanha comunitária "${activeCampaign.title}": ${activeCampaign.description}`
              })}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer"
              title="Compartilhar campanha"
              aria-label="Compartilhar campanha"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <main className="px-4 py-5 space-y-4 -mt-4 bg-white rounded-t-[32px] shadow-sm relative z-10 border-t border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#F1F3F0] text-[#2D5A27] text-xs font-bold rounded-full border border-[#2D5A27]/20">
              {activeCampaign.category}
            </span>
            <span className="text-xs text-[#636E72] font-medium">
              Até {activeCampaign.deadline}
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#2D3436] leading-snug">
            {activeCampaign.title}
          </h1>

          {/* Progress Card */}
          <div className="p-4 bg-[#F1F3F0] rounded-2xl border border-[#E5E7EB] space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#2D3436]">Progresso da meta</span>
              <span className="font-bold text-[#2D5A27]">{activeCampaign.currentProgress}% atingido</span>
            </div>

            <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-[#E5E7EB]">
              <div
                className="bg-[#2D5A27] h-full rounded-full transition-all duration-1000"
                style={{ width: `${activeCampaign.currentProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-[#636E72] pt-1">
              <span>Meta: <strong className="text-[#2D3436]">{activeCampaign.goal}</strong></span>
              <span>{activeCampaign.donorCount} apoiadores</span>
            </div>
          </div>

          {/* About Campaign */}
          <div className="space-y-1.5 pt-1">
            <h3 className="text-sm font-bold text-[#2D3436]">Sobre a iniciativa</h3>
            <p className="text-xs text-[#636E72] leading-relaxed">
              {activeCampaign.description}
            </p>
          </div>

          {/* Organizer and Contact */}
          <div className="p-4 bg-[#F8F9F5] rounded-2xl border border-[#E5E7EB] space-y-2 text-xs">
            <span className="font-bold text-[#2D3436] block">Realização & Ponto de Entrega</span>
            <p className="text-[#636E72]">{activeCampaign.organization}</p>
            <p className="text-[#2D5A27] font-semibold flex items-center gap-1.5 pt-1">
              <Mail size={14} /> {activeCampaign.contact}
            </p>
          </div>
        </main>

        {/* Bottom Fixed Action */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E5E7EB] p-3 shadow-lg max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setHasContributed(true);
              setTimeout(() => {
                alert(`Obrigado pelo seu apoio à campanha "${activeCampaign.title}"! As instruções foram enviadas para seu e-mail.`);
              }, 300);
            }}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${
              hasContributed
                ? 'bg-[#E8EFE6] text-[#2D5A27] border border-[#2D5A27]'
                : 'bg-[#2D5A27] hover:bg-[#1E3F1A] text-white'
            }`}
          >
            {hasContributed ? <Check size={18} /> : <HeartHandshake size={18} />}
            <span>{hasContributed ? 'Apoio confirmado ✓' : 'Apoiar esta campanha'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn font-sans">
      <Header title="Campanhas do Bairro" showBack={true} />

      <main className="px-4 py-4 space-y-4">
        <p className="text-xs text-[#636E72]">
          Projetos sociais, solidariedade e melhorias comunitárias organizadas pelos moradores.
        </p>

        <div className="space-y-3">
          {campaigns.map(item => {
            const saved = isCommunityItemSaved(item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveCampaign(item)}
                className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm hover:border-[#2D5A27]/30 transition-all overflow-hidden cursor-pointer group flex flex-col"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#2D5A27] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#2D3436] group-hover:text-[#2D5A27] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#636E72] line-clamp-2 leading-relaxed mt-1">
                      {item.description}
                    </p>

                    {/* Progress bar in Natural Tones Forest Green */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-[11px] font-semibold text-[#636E72]">
                        <span>Meta: {item.goal}</span>
                        <span className="text-[#2D5A27] font-bold">{item.currentProgress}%</span>
                      </div>
                      <div className="w-full bg-[#F1F3F0] rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#2D5A27] h-full rounded-full"
                          style={{ width: `${item.currentProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions & Details row */}
                  <div className="pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
                    {/* Share & Save buttons */}
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
                        title={saved ? 'Salvo' : 'Salvar campanha'}
                        aria-label={saved ? 'Salvo' : 'Salvar campanha'}
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
                            text: `Apoie a campanha comunitária "${item.title}": ${item.description}`
                          });
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#636E72] hover:bg-[#F1F3F0] hover:text-[#2D5A27] transition-all cursor-pointer"
                        title="Compartilhar campanha"
                        aria-label="Compartilhar campanha"
                      >
                        <Share2 size={13} className="text-[#95A5A6]" />
                        <span>Compartilhar</span>
                      </button>
                    </div>

                    <span className="font-bold text-[#2D5A27] text-xs">
                      Ver campanha →
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
