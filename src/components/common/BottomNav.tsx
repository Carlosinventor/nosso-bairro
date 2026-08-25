import React from 'react';
import { Home, Search, Plus, Users, User } from 'lucide-react';
import { useApp, TabType } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: Array<{
    id: TabType;
    label: string;
    icon: React.ReactNode;
    isPrimaryAction?: boolean;
  }> = [
    {
      id: 'home',
      label: 'Início',
      icon: <Home size={20} />
    },
    {
      id: 'discover',
      label: 'Descobrir',
      icon: <Search size={20} />
    },
    {
      id: 'share',
      label: 'Compartilhar',
      icon: <Plus size={24} strokeWidth={2.8} />,
      isPrimaryAction: true
    },
    {
      id: 'community',
      label: 'Comunidade',
      icon: <Users size={20} />
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: <User size={20} />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto grid grid-cols-5 items-end justify-items-center px-1 py-2 safe-bottom">
        {navItems.map(item => {
          const isActive = activeTab === item.id;

          if (item.isPrimaryAction) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className="w-full flex flex-col items-center justify-center -mt-6 group cursor-pointer focus:outline-none"
              >
                <div className="w-12 h-12 bg-[#1E3F1A] hover:bg-[#2D5A27] rounded-full flex items-center justify-center shadow-md border-[3px] border-white transform group-hover:scale-105 active:scale-95 transition-all text-white">
                  <Plus size={24} strokeWidth={2.8} />
                </div>
                <span className="text-[10px] font-bold text-[#1E3F1A] mt-0.5 leading-tight">
                  Compartilhar
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex flex-col items-center justify-center py-1 transition-all cursor-pointer focus:outline-none ${
                isActive
                  ? 'text-[#1E3F1A]'
                  : 'text-[#8A959E] hover:text-[#1E3F1A]'
              }`}
            >
              <div className={`transition-transform ${isActive ? 'scale-105' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] mt-0.5 leading-tight ${isActive ? 'font-bold text-[#1E3F1A]' : 'font-medium text-[#8A959E]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
