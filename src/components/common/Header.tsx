import React from 'react';
import { ArrowLeft, Bell, Database, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotification?: boolean;
  showUserGreeting?: boolean;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  showNotification = true,
  showUserGreeting = false,
  rightAction,
  transparent = false
}) => {
  const { goBack, navigateTo, setIsSupabaseModalOpen } = useApp();
  const { user, supabaseConfig } = useAuth();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  if (transparent) {
    return (
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-2">
          {rightAction}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between">
        {showBack ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-[#F1F3F0] hover:bg-[#E8EFE6] text-[#2D5A27] flex items-center justify-center transition-colors cursor-pointer focus:outline-none border border-[#E5E7EB]"
            >
              <ArrowLeft size={19} />
            </button>
            {title && <h1 className="text-lg font-bold text-[#2D3436] tracking-tight">{title}</h1>}
          </div>
        ) : showUserGreeting ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className="relative group cursor-pointer focus:outline-none"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'}
                alt={user?.name || 'Perfil'}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#2D5A27]/30 group-hover:ring-[#2D5A27] transition-all"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#2D5A27] border-2 border-white rounded-full"></span>
            </button>
            <div>
              <span className="text-xs text-[#95A5A6] font-semibold uppercase tracking-wider block leading-tight">
                Nosso Bairro
              </span>
              <h2 className="text-base font-bold text-[#2D3436] leading-tight">
                Bom dia, {user?.name ? user.name.split(' ')[0] : 'Morador'}!
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              NB
            </div>
            <h1 className="text-xl font-bold text-[#2D5A27] tracking-tight">
              {title || 'Nosso Bairro'}
            </h1>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Supabase Status Indicator */}
          <button
            type="button"
            onClick={() => setIsSupabaseModalOpen(true)}
            title="Conexão com Supabase"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F3F0] text-[#2D5A27] text-[11px] font-bold hover:bg-[#E8EFE6] transition-colors border border-[#2D5A27]/20 cursor-pointer"
          >
            <Database size={12} className="text-[#2D5A27]" />
            <span>Supabase</span>
            <CheckCircle2 size={11} className="text-[#2D5A27]" />
          </button>

          {showNotification && (
            <button
              type="button"
              onClick={() => navigateTo('notifications')}
              className="w-9 h-9 rounded-full bg-[#F1F3F0] hover:bg-[#E8EFE6] border border-[#E5E7EB] text-[#2D5A27] flex items-center justify-center transition-colors relative cursor-pointer"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#2D5A27] rounded-full"></span>
            </button>
          )}

          {rightAction}
        </div>
      </div>
    </header>
  );
};
