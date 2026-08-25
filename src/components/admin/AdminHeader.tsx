import React from 'react';
import { ArrowLeft, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  badge?: string;
  rightAction?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  badge,
  rightAction
}) => {
  const { navigateTo } = useApp();
  const { user } = useAuth();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigateTo('admin_dashboard');
    }
  };

  return (
    <header className="bg-[#1B3F18] text-white p-4 pb-4 sticky top-0 z-30 shadow-md">
      {/* Top utility bar */}
      <div className="flex items-center justify-between text-[11px] font-medium text-emerald-200/90 pb-2.5 mb-2.5 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide uppercase text-[10px]">
            Área Administrativa
          </span>
          <span className="text-white/40">•</span>
          <span className="text-emerald-100/80 text-[10px] truncate max-w-[140px]">
            {user?.name || 'Administrador'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1 text-[11px] font-bold text-white bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          <span>App Público</span>
          <ExternalLink size={12} />
        </button>
      </div>

      {/* Main title bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && (
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
              aria-label="Voltar"
            >
              <ArrowLeft size={18} />
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-white tracking-tight truncate leading-tight">
                {title}
              </h1>
              {badge && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-200 text-[10.5px] font-bold border border-emerald-400/30">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11.5px] text-emerald-100/75 mt-0.5 truncate font-normal">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightAction && (
          <div className="shrink-0">
            {rightAction}
          </div>
        )}
      </div>
    </header>
  );
};
