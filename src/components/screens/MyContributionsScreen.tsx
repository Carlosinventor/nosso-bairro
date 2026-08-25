import React, { useState } from 'react';
import {
  ChevronLeft,
  Info,
  MapPin,
  Star,
  Camera,
  MessageSquare,
  Trophy,
  Users,
  Crown,
  Lightbulb,
  CheckCircle2,
  Clock,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyContributionsScreen: React.FC = () => {
  const { navigateTo, userContributions, establishments } = useApp();
  const [activeTab, setActiveTab] = useState<'compartilhados' | 'avaliacoes' | 'fotos' | 'sugestoes' | 'conquistas'>('conquistas');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<any | null>(null);

  // Stats from reference print
  const stats = {
    sharedPlaces: 15,
    reviews: 87,
    photos: 126,
    suggestions: 9,
    achievements: 6
  };

  // Achievements data matching the print exactly
  const achievements = [
    {
      id: 'ach-1',
      title: 'Explorador de Bairro',
      description: 'Compartilhou seus 5 primeiros lugares.',
      date: '12/03/2025',
      status: 'conquistada',
      icon: MapPin,
      bgColor: 'bg-[#2E7D32]',
      borderColor: 'border-[#2E7D32]',
      textColor: 'text-white'
    },
    {
      id: 'ach-2',
      title: 'Olhar Atento',
      description: 'Publicou 10 fotos da comunidade.',
      date: '25/03/2025',
      status: 'conquistada',
      icon: Camera,
      bgColor: 'bg-[#E69138]',
      borderColor: 'border-[#E69138]',
      textColor: 'text-white'
    },
    {
      id: 'ach-3',
      title: 'Avaliador Top',
      description: 'Fez 50 avaliações de lugares.',
      date: '18/04/2025',
      status: 'conquistada',
      icon: Star,
      bgColor: 'bg-[#8E7CC3]',
      borderColor: 'border-[#8E7CC3]',
      textColor: 'text-white'
    },
    {
      id: 'ach-4',
      title: 'Ouvido Ativo',
      description: 'Enviou 5 sugestões para o bairro.',
      date: '02/05/2025',
      status: 'conquistada',
      icon: MessageSquare,
      bgColor: 'bg-[#4A90E2]',
      borderColor: 'border-[#4A90E2]',
      textColor: 'text-white'
    },
    {
      id: 'ach-5',
      title: 'Colaborador',
      description: 'Contribuiu em 30 ações diferentes.',
      date: '09/05/2025',
      status: 'conquistada',
      icon: Users,
      bgColor: 'bg-[#E67E22]',
      borderColor: 'border-[#E67E22]',
      textColor: 'text-white'
    },
    {
      id: 'ach-6',
      title: 'Vizinho Destaque',
      description: 'Reconhecimento especial da comunidade.',
      date: '',
      status: 'analise',
      icon: Crown,
      bgColor: 'bg-[#D4AC0D]',
      borderColor: 'border-[#D4AC0D]',
      textColor: 'text-white'
    }
  ];

  // Upcoming achievements matching the print
  const upcomingAchievements = [
    {
      id: 'up-1',
      title: 'Mestre Explorador',
      description: 'Compartilhe 20 lugares diferentes.',
      current: 15,
      target: 20,
      icon: MapPin
    },
    {
      id: 'up-2',
      title: 'Referência do Bairro',
      description: 'Alcance 100 avaliações feitas.',
      current: 87,
      target: 100,
      icon: Star
    },
    {
      id: 'up-3',
      title: 'Fotógrafo da Comunidade',
      description: 'Publique 200 fotos.',
      current: 126,
      target: 200,
      icon: Camera
    }
  ];

  // Shared places for the 'compartilhados' tab
  const sharedPlaces = establishments.slice(0, 5);

  // Hexagonal Badge Component
  const HexagonBadge: React.FC<{
    icon: any;
    colorClass: string;
    size?: 'sm' | 'md' | 'lg';
    isUnlocked?: boolean;
  }> = ({ icon: Icon, colorClass, size = 'md', isUnlocked = true }) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-11 h-11',
      lg: 'w-14 h-14'
    };

    const iconSizes = {
      sm: 14,
      md: 18,
      lg: 24
    };

    return (
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center shrink-0`}>
        {/* Hexagon shape using SVG */}
        <svg viewBox="0 0 100 115" className={`w-full h-full drop-shadow-xs transition-transform ${isUnlocked ? 'scale-100' : 'opacity-40 grayscale'}`}>
          <polygon
            points="50 3, 95 28, 95 87, 50 112, 5 87, 5 28"
            fill={isUnlocked ? 'currentColor' : '#94A3B8'}
            className={colorClass}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
          <Icon size={iconSizes[size]} className="stroke-[2.2]" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-28 font-sans select-none animate-fadeIn flex flex-col text-[#1A202C]">
      {/* Top Header matching print: < Minhas contribuições (i) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('profile')}
          className="p-1 -ml-1 text-[#1A202C] hover:text-[#1B4323] transition-colors cursor-pointer"
          aria-label="Voltar"
        >
          <ChevronLeft size={24} className="stroke-[2.5]" />
        </button>

        <h1 className="text-[17px] font-bold text-[#1A202C] tracking-tight">
          Minhas contribuições
        </h1>

        <button
          type="button"
          onClick={() => setShowInfoModal(true)}
          className="p-1 -mr-1 text-[#1A202C] hover:text-[#1B4323] transition-colors cursor-pointer"
          aria-label="Informações sobre contribuições"
        >
          <Info size={20} className="stroke-[2]" />
        </button>
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* Top Hero Banner */}
        <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-[#E8F0E8] flex items-center gap-3.5 shadow-2xs">
          {/* Green Rosette / Seal with Star */}
          <div className="w-12 h-12 rounded-full bg-[#1B4323] flex items-center justify-center text-white shrink-0 shadow-xs relative">
            <div className="w-10 h-10 rounded-full border border-dashed border-white/40 flex items-center justify-center">
              <Star size={18} className="fill-white text-white" />
            </div>
            {/* Ribbons */}
            <div className="absolute -bottom-1.5 flex gap-1">
              <div className="w-2.5 h-3 bg-[#1B4323] clip-ribbon" />
              <div className="w-2.5 h-3 bg-[#1B4323] clip-ribbon" />
            </div>
          </div>

          <div>
            <h2 className="text-[14px] font-bold text-[#1A202C] leading-snug">
              Obrigado por fazer a diferença!
            </h2>
            <p className="text-[11.5px] text-[#4A5568] mt-0.5 leading-tight">
              Suas ações tornam nosso bairro um lugar melhor para todos.
            </p>
          </div>
        </div>

        {/* Section: Resumo das suas contribuições */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-[14px] font-bold text-[#1A202C]">
              Resumo das suas contribuições
            </h3>
            <button
              type="button"
              onClick={() => setActiveTab('compartilhados')}
              className="text-[11.5px] font-semibold text-[#1B4323] hover:underline cursor-pointer"
            >
              Ver detalhes
            </button>
          </div>

          {/* 5 Stats Cards Grid */}
          <div className="grid grid-cols-5 gap-1.5">
            {/* Locais compartilhados */}
            <div 
              onClick={() => setActiveTab('compartilhados')}
              className="bg-[#F8FAF8] rounded-xl p-2 flex flex-col items-center text-center border border-[#EDF2ED] cursor-pointer hover:border-[#1B4323]/30 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#1B4323] flex items-center justify-center mb-1">
                <MapPin size={13} className="text-[#1B4323]" />
              </div>
              <span className="text-[14px] font-extrabold text-[#1A202C] leading-tight">
                {stats.sharedPlaces}
              </span>
              <span className="text-[8.5px] font-medium text-[#718096] leading-tight mt-0.5">
                Locais compartilhados
              </span>
            </div>

            {/* Avaliações feitas */}
            <div 
              onClick={() => setActiveTab('avaliacoes')}
              className="bg-[#F8FAF8] rounded-xl p-2 flex flex-col items-center text-center border border-[#EDF2ED] cursor-pointer hover:border-[#1B4323]/30 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 text-[#E69138] flex items-center justify-center mb-1">
                <Star size={13} className="text-[#E69138]" />
              </div>
              <span className="text-[14px] font-extrabold text-[#1A202C] leading-tight">
                {stats.reviews}
              </span>
              <span className="text-[8.5px] font-medium text-[#718096] leading-tight mt-0.5">
                Avaliações feitas
              </span>
            </div>

            {/* Fotos publicadas */}
            <div 
              onClick={() => setActiveTab('fotos')}
              className="bg-[#F8FAF8] rounded-xl p-2 flex flex-col items-center text-center border border-[#EDF2ED] cursor-pointer hover:border-[#1B4323]/30 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-purple-50 text-[#8E7CC3] flex items-center justify-center mb-1">
                <Camera size={13} className="text-[#8E7CC3]" />
              </div>
              <span className="text-[14px] font-extrabold text-[#1A202C] leading-tight">
                {stats.photos}
              </span>
              <span className="text-[8.5px] font-medium text-[#718096] leading-tight mt-0.5">
                Fotos publicadas
              </span>
            </div>

            {/* Sugestões enviadas */}
            <div 
              onClick={() => setActiveTab('sugestoes')}
              className="bg-[#F8FAF8] rounded-xl p-2 flex flex-col items-center text-center border border-[#EDF2ED] cursor-pointer hover:border-[#1B4323]/30 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-blue-50 text-[#4A90E2] flex items-center justify-center mb-1">
                <MessageSquare size={13} className="text-[#4A90E2]" />
              </div>
              <span className="text-[14px] font-extrabold text-[#1A202C] leading-tight">
                0{stats.suggestions}
              </span>
              <span className="text-[8.5px] font-medium text-[#718096] leading-tight mt-0.5">
                Sugestões enviadas
              </span>
            </div>

            {/* Conquistas alcançadas */}
            <div 
              onClick={() => setActiveTab('conquistas')}
              className="bg-[#F8FAF8] rounded-xl p-2 flex flex-col items-center text-center border border-[#EDF2ED] cursor-pointer hover:border-[#1B4323]/30 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-amber-50 text-[#D4AC0D] flex items-center justify-center mb-1">
                <Trophy size={13} className="text-[#D4AC0D]" />
              </div>
              <span className="text-[14px] font-extrabold text-[#1A202C] leading-tight">
                0{stats.achievements}
              </span>
              <span className="text-[8.5px] font-medium text-[#718096] leading-tight mt-0.5">
                Conquistas alcançadas
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Icons with Active Underline Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pt-1 pb-0.5">
          {[
            { id: 'compartilhados', label: 'Compartilhados', icon: MapPin, color: 'text-emerald-700' },
            { id: 'avaliacoes', label: 'Avaliações', icon: Star, color: 'text-amber-500' },
            { id: 'fotos', label: 'Fotos', icon: Camera, color: 'text-purple-600' },
            { id: 'sugestoes', label: 'Sugestões', icon: MessageSquare, color: 'text-blue-500' },
            { id: 'conquistas', label: 'Conquistas', icon: Trophy, color: 'text-[#1B4323]' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center pb-2 relative transition-all cursor-pointer ${
                  isActive ? 'text-[#1B4323] font-bold' : 'text-[#718096] font-medium hover:text-[#1A202C]'
                }`}
              >
                <Icon size={16} className={`mb-1 ${isActive ? tab.color : 'text-[#718096]'}`} />
                <span className="text-[10.5px]">{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#1B4323] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: CONQUISTAS (Default view as shown in print) */}
        {activeTab === 'conquistas' && (
          <div className="space-y-4 pt-1">
            {/* Section: Suas conquistas */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[14px] font-bold text-[#1A202C]">
                  Suas conquistas
                </h3>
                <span className="text-[11px] font-bold text-[#1B4323]">
                  6 de 20 conquistadas
                </span>
              </div>

              {/* 3 Columns x 2 Rows Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {achievements.map(ach => {
                  return (
                    <div
                      key={ach.id}
                      onClick={() => setSelectedAchievement(ach)}
                      className="bg-white rounded-2xl p-2.5 border border-[#E2E8F0] shadow-xs flex flex-col items-center text-center cursor-pointer hover:border-[#1B4323]/40 transition-all group"
                    >
                      {/* Hexagon Shield */}
                      <div className="my-1">
                        <HexagonBadge
                          icon={ach.icon}
                          colorClass={ach.textColor === 'text-white' ? ach.bgColor.replace('bg-', 'text-') : 'text-emerald-700'}
                          size="md"
                        />
                      </div>

                      {/* Title */}
                      <h4 className="text-[11.5px] font-extrabold text-[#1A202C] leading-snug mt-1 group-hover:text-[#1B4323] transition-colors">
                        {ach.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[9px] text-[#718096] leading-tight mt-1 line-clamp-2 h-[22px]">
                        {ach.description}
                      </p>

                      {/* Date or space */}
                      <div className="mt-1.5 text-[8.5px] text-[#A0AEC0] font-medium h-[12px]">
                        {ach.date}
                      </div>

                      {/* Status pill */}
                      <div className="mt-1">
                        {ach.status === 'conquistada' ? (
                          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-bold bg-[#EAF3EB] text-[#1B4323]">
                            Conquistada
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[8.5px] font-bold bg-[#FEF3C7] text-[#D97706]">
                            Em análise
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section: Próximas conquistas */}
            <div>
              <h3 className="text-[14px] font-bold text-[#1A202C] mb-2.5">
                Próximas conquistas
              </h3>

              {/* 3 Columns Progress Grid */}
              <div className="grid grid-cols-3 gap-2">
                {upcomingAchievements.map(item => {
                  const progressPct = Math.round((item.current / item.target) * 100);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-2.5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        {/* Grey Hexagon Badge */}
                        <div className="flex justify-center mb-1">
                          <HexagonBadge
                            icon={item.icon}
                            colorClass="text-[#CBD5E1]"
                            size="sm"
                            isUnlocked={false}
                          />
                        </div>

                        <h4 className="text-[10.5px] font-bold text-[#1A202C] text-center leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[8px] text-[#718096] text-center leading-tight mt-1 h-[20px] line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-2 pt-1">
                        <div className="flex items-center justify-between text-[8.5px] font-bold text-[#4A5568] mb-1">
                          <span>{item.current}/{item.target}</span>
                        </div>
                        <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#1B4323] h-full rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Encouragement Banner */}
            <div className="p-3 bg-[#F4F8F4] rounded-2xl border border-[#E0ECE0] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#1B4323] flex items-center justify-center shrink-0">
                <Lightbulb size={16} className="text-[#1B4323]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11.5px] font-bold text-[#1A202C] leading-snug">
                  Continue contribuindo e ganhe novas conquistas!
                </h4>
                <p className="text-[10px] text-[#718096] mt-0.5 leading-tight">
                  Cada ação conta para deixar nosso bairro ainda melhor.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPARTILHADOS */}
        {activeTab === 'compartilhados' && (
          <div className="space-y-3 pt-1 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#1A202C]">
                Locais que você compartilhou (15)
              </span>
              <button
                type="button"
                onClick={() => navigateTo('share')}
                className="text-[11px] font-bold text-[#1B4323] hover:underline"
              >
                + Adicionar novo
              </button>
            </div>

            <div className="space-y-2">
              {sharedPlaces.map(place => (
                <div
                  key={place.id}
                  onClick={() => navigateTo('establishment_detail', place)}
                  className="p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-3 cursor-pointer hover:border-[#1B4323]/40 transition-all"
                >
                  <img
                    src={place.coverImage}
                    alt={place.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-[#1A202C] truncate">
                      {place.name}
                    </h4>
                    <span className="text-[11px] font-medium text-[#1B4323] block">
                      {place.category}
                    </span>
                    <span className="text-[10px] text-[#718096] truncate block mt-0.5">
                      {place.address}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EAF3EB] text-[#1B4323]">
                      Aprovado
                    </span>
                    <ChevronRight size={14} className="text-[#A0AEC0]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AVALIAÇÕES */}
        {activeTab === 'avaliacoes' && (
          <div className="space-y-3 pt-1 animate-fadeIn">
            <span className="text-[13px] font-bold text-[#1A202C] block">
              Suas avaliações recentes ({stats.reviews})
            </span>
            <div className="space-y-2">
              {[
                { place: 'Café do Bairro', rating: 5, comment: 'Melhor café da região, atendimento excelente e ambiente super acolhedor!', date: 'Ontem' },
                { place: 'Padaria Pão Dourado', rating: 5, comment: 'Pão francês quentinho e croissants deliciosos todos os dias.', date: '3 dias atrás' },
                { place: 'Pet Feliz', rating: 4, comment: 'Ótimo atendimento veterinário com muito carinho aos animais.', date: '1 semana atrás' }
              ].map((rev, i) => (
                <div key={i} className="p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[12.5px] font-bold text-[#1A202C]">{rev.place}</h4>
                    <span className="text-[10px] text-[#718096]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#F5A623]">
                    {Array.from({ length: rev.rating }).map((_, rIdx) => (
                      <Star key={rIdx} size={11} className="fill-[#F5A623]" />
                    ))}
                  </div>
                  <p className="text-[11px] text-[#4A5568] bg-[#F8FAF8] p-2 rounded-xl border border-gray-100">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FOTOS */}
        {activeTab === 'fotos' && (
          <div className="space-y-3 pt-1 animate-fadeIn">
            <span className="text-[13px] font-bold text-[#1A202C] block">
              Fotos enviadas ({stats.photos})
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=300&auto=format&fit=crop'
              ].map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-100 relative group">
                  <img src={img} alt="Foto enviada" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SUGESTÕES */}
        {activeTab === 'sugestoes' && (
          <div className="space-y-3 pt-1 animate-fadeIn">
            <span className="text-[13px] font-bold text-[#1A202C] block">
              Sugestões enviadas ({stats.suggestions})
            </span>
            <div className="space-y-2">
              {[
                { title: 'Melhoria na iluminação da Praça Central', status: 'Em análise', date: '02/05/2025' },
                { title: 'Atualização de horário da Farmácia Popular', status: 'Aprovada', date: '28/04/2025' },
                { title: 'Novo ponto de coleta seletiva na Rua das Flores', status: 'Aprovada', date: '15/04/2025' }
              ].map((sug, i) => (
                <div key={i} className="p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-[12px] font-bold text-[#1A202C] truncate">{sug.title}</h4>
                    <span className="text-[10px] text-[#718096]">{sug.date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    sug.status === 'Aprovada' ? 'bg-[#EAF3EB] text-[#1B4323]' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {sug.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-gray-100 text-center space-y-3 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF3EB] text-[#1B4323] flex items-center justify-center mx-auto">
              <Trophy size={24} />
            </div>
            <h3 className="text-[16px] font-bold text-[#1A202C]">
              Sistema de Conquistas
            </h3>
            <p className="text-[12px] text-[#718096] leading-relaxed">
              Cada contribuição sua (avaliações, fotos, cadastro de locais e sugestões) soma pontos e desbloqueia medalhas exclusivas de reconhecimento para você na comunidade do bairro.
            </p>
            <button
              type="button"
              onClick={() => setShowInfoModal(false)}
              className="w-full py-2.5 bg-[#1B4323] hover:bg-[#15341B] text-white text-[13px] font-bold rounded-xl shadow-sm cursor-pointer"
            >
              Entendi!
            </button>
          </div>
        </div>
      )}

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-2xl border border-gray-100 text-center space-y-3 relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex justify-center my-2">
              <HexagonBadge
                icon={selectedAchievement.icon}
                colorClass={selectedAchievement.bgColor.replace('bg-', 'text-')}
                size="lg"
              />
            </div>

            <div>
              <h3 className="text-[16px] font-extrabold text-[#1A202C]">
                {selectedAchievement.title}
              </h3>
              <p className="text-[12px] text-[#718096] mt-1">
                {selectedAchievement.description}
              </p>
            </div>

            <div className="pt-2">
              {selectedAchievement.status === 'conquistada' ? (
                <div className="p-2.5 bg-[#EAF3EB] text-[#1B4323] rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Conquistada em {selectedAchievement.date}</span>
                </div>
              ) : (
                <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <Clock size={14} />
                  <span>Em análise pelos moderadores</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedAchievement(null)}
              className="w-full py-2 bg-[#1B4323] text-white text-[12px] font-bold rounded-xl cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
