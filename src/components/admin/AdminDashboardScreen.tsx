import React, { useState } from 'react';
import {
  Store,
  Newspaper,
  Calendar,
  HeartHandshake,
  Sparkles,
  Inbox,
  ChevronRight,
  Database,
  Eye,
  LogOut,
  RefreshCw,
  LayoutGrid,
  List,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboardScreen: React.FC = () => {
  const {
    navigateTo,
    adminEstablishments,
    adminNews,
    adminEvents,
    adminCampaigns,
    adminHighlights,
    adminContributions,
    reloadAdminData,
    setIsSupabaseModalOpen
  } = useApp();
  const { user, signOut } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Metrics calculation
  const totalEst = adminEstablishments.length;
  const publishedEst = adminEstablishments.filter(e => e.published !== false).length;

  const totalNews = adminNews.length;
  const publishedNews = adminNews.filter(n => n.published !== false).length;

  const totalEvents = adminEvents.length;
  const publishedEvents = adminEvents.filter(e => e.published !== false).length;

  const totalCampaigns = adminCampaigns.length;
  const publishedCampaigns = adminCampaigns.filter(c => c.published !== false).length;

  const totalHighlights = adminHighlights.length;
  const publishedHighlights = adminHighlights.filter(h => h.published !== false).length;

  const totalContributions = adminContributions.length;
  const pendingContributions = adminContributions.filter(c => c.status === 'under_review').length;

  // The 6 distinct card modules with custom palettes, icons and badges
  const modules = [
    {
      id: 'admin_establishments',
      navTarget: 'admin_establishments' as const,
      title: 'Estabelecimentos',
      subtitle: 'Comércios e serviços',
      description: 'Gerenciar comércios, padarias, serviços e locais cadastrados.',
      icon: Store,
      cardBg: 'bg-white hover:bg-emerald-50/40',
      borderClass: 'border-emerald-200/80 hover:border-emerald-400',
      accentColor: 'text-emerald-800',
      iconContainerBg: 'bg-emerald-100/90 text-emerald-800 ring-4 ring-emerald-50',
      tagBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      countBg: 'bg-emerald-50 text-emerald-900',
      totalCount: totalEst,
      publishedCount: publishedEst,
      statsLabel: `${publishedEst} publicados`,
      statNumber: totalEst,
      statTag: `${publishedEst}/${totalEst}`
    },
    {
      id: 'admin_news',
      navTarget: 'admin_news' as const,
      title: 'Novidades',
      subtitle: 'Notícias e avisos',
      description: 'Publicar avisos, matérias e comunicados da comunidade.',
      icon: Newspaper,
      cardBg: 'bg-white hover:bg-blue-50/40',
      borderClass: 'border-blue-200/80 hover:border-blue-400',
      accentColor: 'text-blue-800',
      iconContainerBg: 'bg-blue-100/90 text-blue-800 ring-4 ring-blue-50',
      tagBg: 'bg-blue-100 text-blue-800 border-blue-200',
      countBg: 'bg-blue-50 text-blue-900',
      totalCount: totalNews,
      publishedCount: publishedNews,
      statsLabel: `${publishedNews} publicadas`,
      statNumber: totalNews,
      statTag: `${publishedNews}/${totalNews}`
    },
    {
      id: 'admin_events',
      navTarget: 'admin_events' as const,
      title: 'Eventos',
      subtitle: 'Agenda comunitária',
      description: 'Gerenciar agenda de feiras, cultura e eventos do bairro.',
      icon: Calendar,
      cardBg: 'bg-white hover:bg-purple-50/40',
      borderClass: 'border-purple-200/80 hover:border-purple-400',
      accentColor: 'text-purple-800',
      iconContainerBg: 'bg-purple-100/90 text-purple-800 ring-4 ring-purple-50',
      tagBg: 'bg-purple-100 text-purple-800 border-purple-200',
      countBg: 'bg-purple-50 text-purple-900',
      totalCount: totalEvents,
      publishedCount: publishedEvents,
      statsLabel: `${publishedEvents} publicados`,
      statNumber: totalEvents,
      statTag: `${publishedEvents}/${totalEvents}`
    },
    {
      id: 'admin_campaigns',
      navTarget: 'admin_campaigns' as const,
      title: 'Campanhas',
      subtitle: 'Solidariedade e metas',
      description: 'Administrar campanhas solidárias e metas comunitárias.',
      icon: HeartHandshake,
      cardBg: 'bg-white hover:bg-rose-50/40',
      borderClass: 'border-rose-200/80 hover:border-rose-400',
      accentColor: 'text-rose-800',
      iconContainerBg: 'bg-rose-100/90 text-rose-800 ring-4 ring-rose-50',
      tagBg: 'bg-rose-100 text-rose-800 border-rose-200',
      countBg: 'bg-rose-50 text-rose-900',
      totalCount: totalCampaigns,
      publishedCount: publishedCampaigns,
      statsLabel: `${publishedCampaigns} ativas`,
      statNumber: totalCampaigns,
      statTag: `${publishedCampaigns}/${totalCampaigns}`
    },
    {
      id: 'admin_highlights',
      navTarget: 'admin_highlights' as const,
      title: 'Destaques do Bairro',
      subtitle: 'Curadoria local',
      description: 'Selecionar e manter em evidência os melhores locais.',
      icon: Sparkles,
      cardBg: 'bg-white hover:bg-amber-50/40',
      borderClass: 'border-amber-200/80 hover:border-amber-400',
      accentColor: 'text-amber-900',
      iconContainerBg: 'bg-amber-100/90 text-amber-900 ring-4 ring-amber-50',
      tagBg: 'bg-amber-100 text-amber-900 border-amber-200',
      countBg: 'bg-amber-50 text-amber-950',
      totalCount: totalHighlights,
      publishedCount: publishedHighlights,
      statsLabel: `${publishedHighlights} em destaque`,
      statNumber: totalHighlights,
      statTag: `${publishedHighlights}/${totalHighlights}`
    },
    {
      id: 'admin_contributions',
      navTarget: 'admin_contributions' as const,
      title: 'Contribuições',
      subtitle: 'Envios de moradores',
      description: 'Analisar sugestões, fotos e avaliações de moradores.',
      icon: Inbox,
      cardBg: 'bg-white hover:bg-orange-50/40',
      borderClass: 'border-orange-200/80 hover:border-orange-400',
      accentColor: 'text-orange-900',
      iconContainerBg: 'bg-orange-100/90 text-orange-900 ring-4 ring-orange-50',
      tagBg: pendingContributions > 0 ? 'bg-orange-500 text-white border-orange-600' : 'bg-orange-100 text-orange-900 border-orange-200',
      countBg: 'bg-orange-50 text-orange-950',
      totalCount: totalContributions,
      pendingCount: pendingContributions,
      statsLabel: pendingContributions > 0 ? `${pendingContributions} pendentes` : 'Todas revisadas',
      statNumber: totalContributions,
      statTag: pendingContributions > 0 ? `${pendingContributions} pend.` : `${totalContributions} total`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#1E2522] flex flex-col font-sans pb-12">
      {/* Admin Top Header */}
      <header className="bg-[#1B3F18] text-white pt-5 pb-6 px-4 shadow-lg sticky top-0 z-30">
        <div className="flex items-center justify-between pb-3 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-[#1B3F18] flex items-center justify-center font-black text-sm shadow-xs">
              NB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block leading-none">
                  Área Administrativa
                </span>
              </div>
              <span className="text-xs font-semibold text-white/90">
                Nosso Bairro
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Eye size={14} />
              <span>Ver App</span>
            </button>

            <button
              type="button"
              onClick={reloadAdminData}
              title="Recarregar dados"
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="pt-3.5 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Painel Administrativo
            </h1>
            <p className="text-xs text-emerald-100/80 mt-0.5 font-medium">
              Controle e gerenciamento dos 6 módulos do aplicativo
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 space-y-4 max-w-md mx-auto w-full">
        {/* Database & Sync Status */}
        <div className="bg-white rounded-2xl p-3.5 border border-[#E2E8F0] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1B3F18] flex items-center justify-center">
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#1A202C]">Banco de Dados Supabase</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-[11px] text-[#718096]">Sincronização persistente conectada</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSupabaseModalOpen(true)}
            className="text-[11px] text-[#1B3F18] font-bold hover:underline px-2 py-1 cursor-pointer"
          >
            Configurações
          </button>
        </div>

        {/* Section Header with View Toggle (Grid / List) */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div>
            <h2 className="text-xs font-extrabold text-[#4A5568] uppercase tracking-wider">
              Módulos de Gestão (6)
            </h2>
            <p className="text-[11px] text-[#718096]">Escolha uma seção para gerenciar</p>
          </div>

          <div className="flex items-center bg-white p-1 rounded-xl border border-[#E2E8F0] shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#1B3F18] text-white shadow-xs'
                  : 'text-[#718096] hover:text-[#1A202C]'
              }`}
              title="Visualização em Grade"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#1B3F18] text-white shadow-xs'
                  : 'text-[#718096] hover:text-[#1A202C]'
              }`}
              title="Visualização em Lista"
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* 6 Visual Cards Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {modules.map(mod => {
              const Icon = mod.icon;
              const isPendingAlert = mod.pendingCount !== undefined && mod.pendingCount > 0;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => navigateTo(mod.navTarget)}
                  className={`${mod.cardBg} rounded-2xl p-4 border ${mod.borderClass} shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-[0.98] min-h-[160px] relative overflow-hidden`}
                >
                  {/* Top: Icon & Count Badge */}
                  <div className="flex items-start justify-between w-full">
                    <div
                      className={`w-11 h-11 rounded-2xl ${mod.iconContainerBg} flex items-center justify-center transition-transform group-hover:scale-108 duration-200 shadow-2xs`}
                    >
                      <Icon size={22} strokeWidth={2.2} />
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        isPendingAlert
                          ? 'bg-orange-500 text-white border-orange-600 animate-pulse'
                          : mod.tagBg
                      }`}
                    >
                      {mod.statTag}
                    </span>
                  </div>

                  {/* Middle & Bottom: Title, Subtitle and Stats */}
                  <div className="mt-3 w-full">
                    <h3 className={`text-[14.5px] font-extrabold ${mod.accentColor} group-hover:underline leading-tight`}>
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-[#718096] font-medium mt-0.5 line-clamp-1">
                      {mod.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-black/5">
                      <span className="text-[11px] font-bold text-[#4A5568] truncate">
                        {mod.statsLabel}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-black/5 group-hover:bg-[#1B3F18] group-hover:text-white text-[#718096] flex items-center justify-center transition-colors shrink-0">
                        <ChevronRight size={12} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* List View fallback */
          <div className="grid grid-cols-1 gap-3">
            {modules.map(mod => {
              const Icon = mod.icon;
              const isPendingAlert = mod.pendingCount !== undefined && mod.pendingCount > 0;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => navigateTo(mod.navTarget)}
                  className={`w-full ${mod.cardBg} rounded-2xl p-4 border ${mod.borderClass} hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer active:scale-[0.99]`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl ${mod.iconContainerBg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs`}
                    >
                      <Icon size={24} strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-[15px] font-extrabold ${mod.accentColor} leading-snug`}>
                          {mod.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10.5px] font-extrabold border ${
                            isPendingAlert
                              ? 'bg-orange-500 text-white border-orange-600 animate-pulse'
                              : mod.tagBg
                          }`}
                        >
                          {mod.statTag}
                        </span>
                      </div>

                      <p className="text-[11.5px] text-[#718096] leading-snug mt-0.5 line-clamp-1">
                        {mod.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] font-bold text-[#4A5568]">
                          {mod.statsLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#1B3F18] text-[#718096] group-hover:text-white flex items-center justify-center transition-colors shrink-0 ml-2">
                    <ChevronRight size={16} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Footer info & Logout */}
        <div className="pt-4 pb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1.5 text-[11px] text-[#718096] font-medium">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span>Sessão de Administrador ativa</span>
          </div>

          <button
            type="button"
            onClick={async () => {
              await signOut();
              navigateTo('home');
            }}
            className="flex items-center gap-1.5 text-xs text-rose-600 font-bold hover:bg-rose-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-rose-200 bg-white shadow-2xs"
          >
            <LogOut size={14} />
            <span>Sair do Modo Administrador</span>
          </button>
        </div>
      </main>
    </div>
  );
};
