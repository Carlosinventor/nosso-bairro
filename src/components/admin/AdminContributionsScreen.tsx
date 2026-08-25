import React, { useState } from 'react';
import {
  Inbox,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Camera,
  Edit3,
  Star,
  PlusCircle,
  User,
  Mail,
  Store,
  Eye,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { AdminHeader } from './AdminHeader';
import { useApp } from '../../context/AppContext';
import { Contribution } from '../../types';

export const AdminContributionsScreen: React.FC = () => {
  const { adminContributions, updateContributionStatus, deleteContribution } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'under_review' | 'published'>('all');
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);

  const filtered = adminContributions.filter(item => {
    const matchesSearch =
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.establishmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.suggestedUpdate && item.suggestedUpdate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.reviewComment && item.reviewComment.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = adminContributions.filter(c => c.status === 'under_review').length;
  const publishedCount = adminContributions.filter(c => c.status === 'published').length;

  const getTypeLabel = (type: Contribution['type']) => {
    switch (type) {
      case 'photos':
        return { label: 'Fotos', icon: Camera, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'update_info':
        return { label: 'Atualização de Dados', icon: Edit3, color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'review':
        return { label: 'Avaliação & Nota', icon: Star, color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'new_place':
        return { label: 'Novo Estabelecimento', icon: PlusCircle, color: 'bg-purple-50 text-purple-800 border-purple-200' };
      default:
        return { label: 'Contribuição', icon: Inbox, color: 'bg-gray-50 text-gray-800 border-gray-200' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#1E2522] flex flex-col font-sans pb-12">
      <AdminHeader
        title="Contribuições"
        subtitle={`${adminContributions.length} contribuições recebidas`}
        badge={`${pendingCount} pendentes`}
      />

      <main className="p-4 space-y-4 max-w-md mx-auto w-full">
        {/* Status Filter Tabs */}
        <div className="flex bg-white p-1 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#1B3F18] text-white shadow-xs'
                : 'text-[#4A5568] hover:text-[#1A202C]'
            }`}
          >
            Todas ({adminContributions.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('under_review')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              statusFilter === 'under_review'
                ? 'bg-[#1B3F18] text-white shadow-xs'
                : 'text-orange-700 hover:text-orange-800'
            }`}
          >
            <span>Em Análise</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-extrabold">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('published')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              statusFilter === 'published'
                ? 'bg-[#1B3F18] text-white shadow-xs'
                : 'text-emerald-700 hover:text-emerald-800'
            }`}
          >
            Publicadas ({publishedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718096]" />
          <input
            type="text"
            placeholder="Buscar por usuário, e-mail, local ou conteúdo..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#1A202C] focus:outline-none focus:border-[#1B3F18]"
          />
        </div>

        {/* List of Contributions */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E2E8F0]">
              <Inbox size={36} className="mx-auto text-[#A0AEC0] mb-2" />
              <h3 className="text-sm font-bold text-[#1A202C]">Nenhuma contribuição encontrada</h3>
              <p className="text-xs text-[#718096] mt-1">Tente mudar o filtro de status.</p>
            </div>
          ) : (
            filtered.map(contrib => {
              const typeInfo = getTypeLabel(contrib.type);
              const TypeIcon = typeInfo.icon;
              const isUnderReview = contrib.status === 'under_review';

              return (
                <div
                  key={contrib.id}
                  className={`bg-white rounded-2xl p-4 border transition-all ${
                    isUnderReview
                      ? 'border-orange-300 bg-orange-50/15 shadow-xs'
                      : 'border-[#E2E8F0] shadow-xs'
                  }`}
                >
                  {/* Top Bar: Type & Status */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#F0F0F0]">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 border ${typeInfo.color}`}
                    >
                      <TypeIcon size={12} />
                      <span>{typeInfo.label}</span>
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10.5px] font-extrabold flex items-center gap-1 ${
                        isUnderReview
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {isUnderReview ? <Clock size={11} /> : <CheckCircle size={11} />}
                      <span>{isUnderReview ? 'Em Análise' : 'Publicada'}</span>
                    </span>
                  </div>

                  {/* Establishment & User Info */}
                  <div className="pt-2.5 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A202C]">
                      <Store size={14} className="text-[#1B3F18] shrink-0" />
                      <span className="truncate">{contrib.establishmentName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#718096]">
                      <span className="flex items-center gap-1 truncate font-medium text-[#4A5568]">
                        <User size={11} className="shrink-0" />
                        {contrib.userName}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <Mail size={11} className="shrink-0" />
                        {contrib.userEmail}
                      </span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="mt-2.5 p-2.5 bg-[#F8FAF8] rounded-xl border border-[#E2E8F0] space-y-2">
                    {contrib.suggestedUpdate && (
                      <p className="text-xs text-[#2D3436] leading-relaxed">
                        <span className="font-bold text-[#1A202C] block text-[10.5px] uppercase tracking-wider text-[#718096] mb-0.5">
                          Sugestão de alteração:
                        </span>
                        "{contrib.suggestedUpdate}"
                      </p>
                    )}

                    {contrib.reviewComment && (
                      <div className="space-y-1">
                        {contrib.rating && (
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star
                                key={s}
                                size={12}
                                className={s <= contrib.rating! ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                              />
                            ))}
                            <span className="text-[11px] font-bold text-[#1A202C] ml-1">
                              {contrib.rating}.0
                            </span>
                          </div>
                        )}
                        <p className="text-xs text-[#2D3436] leading-relaxed italic">
                          "{contrib.reviewComment}"
                        </p>
                      </div>
                    )}

                    {contrib.photos && contrib.photos.length > 0 && (
                      <div>
                        <span className="font-bold text-[10.5px] uppercase tracking-wider text-[#718096] block mb-1">
                          Fotos enviadas ({contrib.photos.length}):
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {contrib.photos.map((p, idx) => (
                            <img
                              key={idx}
                              src={p}
                              alt={`Foto ${idx + 1}`}
                              className="w-16 h-16 rounded-xl object-cover border border-[#CBD5E1] shrink-0"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] text-[#A0AEC0] text-right font-medium">
                      Enviado {contrib.createdAt}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#F0F0F0]">
                    {isUnderReview ? (
                      <button
                        type="button"
                        onClick={() => updateContributionStatus(contrib.id, 'published')}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#1B3F18] hover:bg-[#152D12] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Check size={14} strokeWidth={2.5} />
                        <span>Aprovar & Publicar</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => updateContributionStatus(contrib.id, 'under_review')}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-[#F8FAF8] hover:bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Clock size={13} />
                        <span>Marcar Em Análise</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Deseja realmente excluir a contribuição de "${contrib.userName}"?`)) {
                          deleteContribution(contrib.id);
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
    </div>
  );
};
