import React, { useState } from 'react';
import {
  Store,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  EyeOff,
  Eye,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Star,
  Info,
  X
} from 'lucide-react';
import { AdminHeader } from './AdminHeader';
import { useApp } from '../../context/AppContext';
import { Establishment } from '../../types';

export const AdminEstablishmentsScreen: React.FC = () => {
  const { adminEstablishments, toggleEstablishmentPublication, deleteEstablishment, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [showNoticeModal, setShowNoticeModal] = useState<{ isOpen: boolean; action: string }>({
    isOpen: false,
    action: ''
  });

  const categories = ['Todas', 'Padaria', 'Restaurante', 'Farmácia', 'Mercado', 'Pet Shop', 'Cafeteria', 'Salão de Beleza', 'Academia', 'Serviços'];

  const filtered = adminEstablishments.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = categoryFilter === 'Todas' || item.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCat;
  });

  const publishedCount = adminEstablishments.filter(e => e.published !== false).length;
  const unpublishedCount = adminEstablishments.length - publishedCount;

  const handleOpenNotice = (action: string) => {
    setShowNoticeModal({ isOpen: true, action });
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#1E2522] flex flex-col font-sans pb-12">
      <AdminHeader
        title="Estabelecimentos"
        subtitle={`${adminEstablishments.length} estabelecimentos cadastrados`}
        badge={`${publishedCount} publicados`}
      />

      <main className="p-4 space-y-4 max-w-md mx-auto w-full">
        {/* Top Action & Summary */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#4A5568]">
              {filtered.length} {filtered.length === 1 ? 'local' : 'locais'}
            </span>
            {unpublishedCount > 0 && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                {unpublishedCount} despublicados
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigateTo('admin_new_establishment')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1B3F18] hover:bg-[#152D12] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>+ Novo Estabelecimento</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718096]" />
            <input
              type="text"
              placeholder="Buscar por nome, endereço ou categoria..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#1A202C] focus:outline-none focus:border-[#1B3F18]"
            />
          </div>

          {/* Quick Category Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-[11.5px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#1B3F18] text-white'
                    : 'bg-white text-[#4A5568] border border-[#E2E8F0] hover:bg-[#F8FAF8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List of Establishments */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E2E8F0]">
              <Store size={36} className="mx-auto text-[#A0AEC0] mb-2" />
              <h3 className="text-sm font-bold text-[#1A202C]">Nenhum estabelecimento encontrado</h3>
              <p className="text-xs text-[#718096] mt-1">Tente ajustar a busca ou os filtros.</p>
            </div>
          ) : (
            filtered.map(est => {
              const isPublished = est.published !== false;

              return (
                <div
                  key={est.id}
                  className={`bg-white rounded-2xl p-4 border transition-all ${
                    isPublished
                      ? 'border-[#E2E8F0] shadow-xs'
                      : 'border-amber-200 bg-amber-50/20 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={est.imageUrl}
                      alt={est.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E2E8F0] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-[#1B3F18] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 truncate">
                          {est.category}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shrink-0 ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {isPublished ? <CheckCircle size={11} /> : <EyeOff size={11} />}
                          <span>{isPublished ? 'Publicado' : 'Despublicado'}</span>
                        </span>
                      </div>

                      <h3 className="text-[14.5px] font-bold text-[#1A202C] mt-1 truncate leading-tight">
                        {est.name}
                      </h3>

                      <div className="flex items-center gap-1 text-[11.5px] text-[#718096] mt-1 truncate">
                        <MapPin size={12} className="shrink-0 text-[#1B3F18]" />
                        <span className="truncate">{est.address}</span>
                      </div>

                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#718096]">
                        <span className="flex items-center gap-1 font-bold text-[#1A202C]">
                          <Star size={11} className="fill-amber-400 text-amber-400" />
                          {est.rating} ({est.reviewsCount})
                        </span>
                        {est.phone && (
                          <span className="flex items-center gap-1 truncate">
                            <Phone size={11} />
                            {est.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#F0F0F0]">
                    <button
                      type="button"
                      onClick={() => toggleEstablishmentPublication(est.id)}
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isPublished
                          ? 'bg-[#F8FAF8] hover:bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {isPublished ? (
                        <>
                          <EyeOff size={13} />
                          <span>Despublicar</span>
                        </>
                      ) : (
                        <>
                          <Eye size={13} />
                          <span>Publicar</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenNotice(`Editar ${est.name}`)}
                      className="py-1.5 px-3 rounded-xl bg-[#F8FAF8] hover:bg-[#F1F3F0] text-[#2D3436] text-xs font-bold border border-[#E2E8F0] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit2 size={13} />
                      <span>Editar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Deseja realmente remover o estabelecimento "${est.name}"?`)) {
                          deleteEstablishment(est.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                      title="Excluir"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Notice Modal informing next stage */}
      {showNoticeModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#E2E8F0] animate-scaleUp text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#1B3F18] flex items-center justify-center mx-auto mb-3">
              <Info size={28} />
            </div>

            <h3 className="text-base font-bold text-[#1A202C]">
              {showNoticeModal.action}
            </h3>

            <p className="text-xs text-[#718096] leading-relaxed mt-2">
              A navegação do Painel Administrativo está pronta! Os formulários detalhados de cadastro e edição de cada módulo serão definidos e implementados individualmente na próxima etapa, conforme as regras de desenvolvimento.
            </p>

            <button
              type="button"
              onClick={() => setShowNoticeModal({ isOpen: false, action: '' })}
              className="w-full mt-5 py-3 rounded-xl bg-[#1B3F18] text-white font-bold text-xs hover:bg-[#152D12] transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
