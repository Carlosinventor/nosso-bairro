import React from 'react';
import { Camera, Pencil, MessageSquare, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContributeModalPrompt: React.FC = () => {
  const { existingPlaceModal, closeExistingPlaceModal, navigateTo } = useApp();

  if (!existingPlaceModal.isOpen || !existingPlaceModal.existingEstablishment) {
    return null;
  }

  const est = existingPlaceModal.existingEstablishment;

  const handleProceed = () => {
    closeExistingPlaceModal();
    navigateTo('contribute', est);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 sm:pt-12 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn font-sans select-none">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] w-full max-w-sm p-5 sm:p-6 shadow-2xl border border-[#E5E7EB] my-2 max-h-[calc(100vh-2rem)] overflow-y-auto animate-scaleUp">
        {/* Top Checkmark Icon */}
        <div className="text-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#EAF3EB] text-[#1B4323] flex items-center justify-center mx-auto mb-2.5 shadow-2xs">
            <Check size={28} className="stroke-[2.5]" />
          </div>
          
          <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#1B4323] leading-snug">
            Este estabelecimento já faz parte da comunidade.
          </h3>
          
          <p className="text-[12px] text-[#4A5568] mt-1.5 font-medium">
            Como você gostaria de contribuir?
          </p>
        </div>

        {/* 3 Static Informational Cards */}
        <div className="space-y-2.5 mb-5">
          {/* Card 1: Adicionar novas fotos */}
          <div className="w-full p-2.5 rounded-2xl border border-[#E2E8F0] bg-[#FAFCFA] text-left flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EAF3EB] text-[#1B4323] flex items-center justify-center shrink-0">
              <Camera size={20} className="stroke-[1.8]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[12.5px] font-bold text-[#1A202C] leading-snug">
                Adicionar novas fotos
              </h4>
              <p className="text-[10.5px] text-[#718096] leading-snug mt-0.5">
                Compartilhe fotos e mostre como é este lugar para a comunidade.
              </p>
            </div>
          </div>

          {/* Card 2: Sugerir atualização de informações */}
          <div className="w-full p-2.5 rounded-2xl border border-[#E2E8F0] bg-[#FAFCFA] text-left flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <Pencil size={18} className="stroke-[1.8]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[12.5px] font-bold text-[#1A202C] leading-snug">
                Sugerir atualização de informações
              </h4>
              <p className="text-[10.5px] text-[#718096] leading-snug mt-0.5">
                Ajude a manter os dados deste estabelecimento sempre atualizados.
              </p>
            </div>
          </div>

          {/* Card 3: Enviar mensagem / avaliação */}
          <div className="w-full p-2.5 rounded-2xl border border-[#E2E8F0] bg-[#FAFCFA] text-left flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center shrink-0">
              <MessageSquare size={18} className="stroke-[1.8]" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[12.5px] font-bold text-[#1A202C] leading-snug">
                Enviar mensagem / avaliação
              </h4>
              <p className="text-[10.5px] text-[#718096] leading-snug mt-0.5">
                Deixe sua avaliação ou envie uma mensagem para este estabelecimento.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions: Cancelar and Contribuir */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={closeExistingPlaceModal}
            className="flex-1 py-3 px-3 rounded-xl border border-[#E2E8F0] bg-white text-[#2D3436] font-bold text-[12.5px] hover:bg-[#F8FAF8] transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="flex-1 py-3 px-3 rounded-xl bg-[#1B4323] hover:bg-[#15341B] text-white font-bold text-[12.5px] shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            Contribuir
          </button>
        </div>
      </div>
    </div>
  );
};
