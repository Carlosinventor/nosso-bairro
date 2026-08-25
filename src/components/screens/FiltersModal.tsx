import React, { useState } from 'react';
import { X, Star, Check, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FilterState } from '../../types';

export const FiltersModal: React.FC = () => {
  const { filters, setFilters, resetFilters, searchQuery, navigateTo, goBack } = useApp();
  const [localFilters, setLocalFilters] = useState<FilterState>({ ...filters });

  const RATING_OPTIONS = [
    { label: 'Qualquer', value: 0 },
    { label: '3.5+', value: 3.5 },
    { label: '4.0+', value: 4.0 },
    { label: '4.5+', value: 4.5 },
    { label: '5.0', value: 5.0 }
  ];

  const DISTANCE_OPTIONS = [
    { label: 'Qualquer', value: 0 },
    { label: '1 km', value: 1 },
    { label: '3 km', value: 3 },
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 }
  ];

  const handleApply = () => {
    setFilters(localFilters);
    // Se não houver texto no input de busca, volta para a tela do input de busca (Descobrir)
    if (!searchQuery.trim()) {
      navigateTo('discover');
    } else {
      // Se houver busca digitada, vai para a tela de resultados
      navigateTo('results');
    }
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({
      category: '',
      minRating: 0,
      openNow: false,
      maxDistanceKm: 0,
      delivery: false,
      breakfast: false,
      acceptsPix: false,
      parking: false,
      accessible: false
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex flex-col justify-between pb-8 animate-fadeIn">
      {/* Header */}
      <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10 shadow-xs">
        <h2 className="text-lg font-bold text-[#2D3436]">
          Filtros
        </h2>
        <button
          type="button"
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-[#F1F3F0] hover:bg-[#E8EFE6] text-[#2D3436] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Avaliação mínima */}
        <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
          <label className="block text-xs font-bold text-[#95A5A6] uppercase tracking-widest mb-3">
            Avaliação mínima
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {RATING_OPTIONS.map(opt => {
              const isSelected = localFilters.minRating === opt.value;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setLocalFilters(prev => ({ ...prev, minRating: opt.value }))}
                  className={`py-2.5 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-0.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D5A27] text-white shadow-xs'
                      : 'bg-[#F1F3F0] text-[#2D3436] hover:bg-[#E8EFE6]'
                  }`}
                >
                  {opt.value > 0 && <Star size={11} className={isSelected ? 'fill-white' : 'fill-amber-400 text-amber-400'} />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aberto agora Toggle */}
        <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-[#2D3436] block">
              Aberto agora
            </span>
            <span className="text-xs text-[#636E72]">
              Mostrar apenas estabelecimentos em funcionamento
            </span>
          </div>
          <button
            type="button"
            onClick={() => setLocalFilters(prev => ({ ...prev, openNow: !prev.openNow }))}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none ${
              localFilters.openNow ? 'bg-[#2D5A27]' : 'bg-[#E5E7EB]'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                localFilters.openNow ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Distância máxima */}
        <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
          <label className="block text-xs font-bold text-[#95A5A6] uppercase tracking-widest mb-3">
            Distância máxima
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {DISTANCE_OPTIONS.map(opt => {
              const isSelected = localFilters.maxDistanceKm === opt.value;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setLocalFilters(prev => ({ ...prev, maxDistanceKm: opt.value }))}
                  className={`py-2.5 px-1 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#2D5A27] text-white shadow-xs'
                      : 'bg-[#F1F3F0] text-[#2D3436] hover:bg-[#E8EFE6]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comodidades & Atributos */}
        <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm space-y-3">
          <label className="block text-xs font-bold text-[#95A5A6] uppercase tracking-widest">
            Comodidades e Serviços
          </label>

          {[
            { key: 'delivery', label: 'Entrega disponível' },
            { key: 'breakfast', label: 'Café da manhã' },
            { key: 'acceptsPix', label: 'Aceita Pix' },
            { key: 'parking', label: 'Estacionamento' },
            { key: 'accessible', label: 'Acessível para PCD' }
          ].map(item => {
            const isChecked = !!localFilters[item.key as keyof FilterState];
            return (
              <label
                key={item.key}
                onClick={() =>
                  setLocalFilters(prev => ({
                    ...prev,
                    [item.key]: !prev[item.key as keyof FilterState]
                  }))
                }
                className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9F5] hover:bg-[#F1F3F0] border border-[#E5E7EB] transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold text-[#2D3436]">{item.label}</span>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-[#2D5A27] text-white' : 'border-2 border-[#CBD5E1] bg-white'
                  }`}
                >
                  {isChecked && <Check size={14} strokeWidth={3} />}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="p-4 space-y-2.5 border-t border-[#E5E7EB] bg-white sticky bottom-0">
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-sm shadow-sm transition-all active:scale-98 cursor-pointer"
        >
          Aplicar filtros
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-full py-2.5 text-[#636E72] hover:text-[#2D3436] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          Limpar filtros
        </button>
      </div>
    </div>
  );
};
