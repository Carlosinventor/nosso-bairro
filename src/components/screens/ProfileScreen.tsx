import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  MessageCircle,
  Info,
  LogOut,
  ChevronRight,
  Sparkles,
  Lock,
  Heart,
  ShieldCheck,
  LayoutDashboard,
  KeyRound,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../common/Header';

export const ProfileScreen: React.FC = () => {
  const { user, signOut, signIn } = useAuth();
  const { navigateTo, userContributions, favorites } = useApp();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@nossobairro.com.br');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [adminError, setAdminError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.email === 'admin@nossobairro.com.br' || user?.email?.includes('admin');

  const handleLogout = async () => {
    navigateTo('home');
    await signOut();
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setIsSubmitting(true);
    try {
      await signIn(adminEmail, adminPassword);
      setIsAdminModalOpen(false);
      navigateTo('admin_dashboard');
    } catch (err: any) {
      setAdminError('Credenciais inválidas. Utilize o e-mail de administrador.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contributionsCount = userContributions.length;
  const favoritesCount = favorites.length;

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header title="Perfil" showBack={false} />

      <main className="px-4 py-4 space-y-4">
        {/* User Card matching Natural Tones style */}
        <div className="bg-white rounded-[28px] p-5 shadow-sm border border-[#F0F0F0] flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'}
              alt={user?.name || 'Perfil'}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#2D5A27]/20"
            />
            {isAdmin ? (
              <span className="absolute -bottom-1 -right-1 bg-[#1B3F18] text-white p-1 rounded-full border-2 border-white shadow-xs" title="Administrador">
                <ShieldCheck size={12} />
              </span>
            ) : (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#2D5A27] border-2 border-white rounded-full"></span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#2D3436] truncate">
                {user?.name || 'Morador'}
              </h2>
              {isAdmin && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-[#1B3F18] text-[10px] font-extrabold border border-emerald-300 shrink-0">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-[#636E72] truncate">
              {user?.email || 'email@exemplo.com'}
            </p>
            <span className="inline-block text-[11px] font-bold text-[#2D5A27] bg-[#F1F3F0] px-2.5 py-0.5 rounded-full mt-1 border border-[#2D5A27]/20">
              Membro desde {user?.memberSince || 'Outubro de 2023'}
            </span>
          </div>
        </div>

        {/* Exclusive Admin Card for Authorized Accounts */}
        {isAdmin && (
          <div className="bg-[#1B3F18] text-white rounded-[28px] p-5 shadow-md border border-emerald-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                  <LayoutDashboard size={22} className="text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold leading-tight">
                      Painel Administrativo
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400/25 text-emerald-200 text-[10px] font-bold">
                      Ativo
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    Gerencie estabelecimentos, novidades e eventos
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('admin_dashboard')}
              className="mt-3.5 w-full py-2.5 rounded-xl bg-white text-[#1B3F18] font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer"
            >
              <span>Acessar Painel de Gestão</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Minhas Contribuições Banner in Natural Tones Forest Green */}
        <div
          onClick={() => navigateTo('my_contributions')}
          className="bg-[#2D5A27] text-white rounded-[28px] p-5 shadow-sm cursor-pointer hover:bg-[#1E3F1A] transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/15 text-emerald-200 flex items-center justify-center">
                <Sparkles size={22} className="text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  Minhas Contribuições
                </h3>
                <p className="text-xs text-white/80 mt-0.5">
                  Você tem {contributionsCount} {contributionsCount === 1 ? 'contribuição' : 'contribuições'} no bairro
                </p>
              </div>
            </div>
            <div className="flex items-center text-xs font-bold text-white/90 group-hover:text-white transition-colors">
              <ChevronRight size={18} />
            </div>
          </div>
        </div>

        {/* Section: Conta */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest px-2">
            Conta
          </h3>

          <div className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm divide-y divide-[#F0F0F0] overflow-hidden">
            <button
              type="button"
              onClick={() => navigateTo('edit_profile')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Settings size={18} />
                </div>
                <span className="text-xs font-bold text-[#2D3436]">
                  Editar perfil e Preferências
                </span>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            {/* Meus favoritos */}
            <button
              type="button"
              onClick={() => navigateTo('favorites')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-rose-500 flex items-center justify-center group-hover:bg-rose-50 transition-colors">
                  <Heart size={18} className="fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block leading-tight">
                    Meus favoritos
                  </span>
                  <span className="text-[10.5px] text-[#95A5A6] block mt-0.5">
                    {favoritesCount} {favoritesCount === 1 ? 'local salvo' : 'locais salvos'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <ChevronRight size={16} className="text-[#95A5A6] group-hover:text-[#2D5A27] transition-colors" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('notifications')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Bell size={18} />
                </div>
                <span className="text-xs font-bold text-[#2D3436]">
                  Notificações
                </span>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('security_privacy')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Shield size={18} />
                </div>
                <span className="text-xs font-bold text-[#2D3436]">
                  Segurança e privacidade
                </span>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>
          </div>
        </div>

        {/* Section: Suporte */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest px-2">
            Suporte
          </h3>

          <div className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm divide-y divide-[#F0F0F0] overflow-hidden">
            <button
              type="button"
              onClick={() => navigateTo('help_center')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <HelpCircle size={18} />
                </div>
                <span className="text-xs font-bold text-[#2D3436]">
                  Central de ajuda
                </span>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            <button
              type="button"
              onClick={() => navigateTo('contact_us')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <span className="text-xs font-bold text-[#2D3436]">
                  Fale conosco
                </span>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            <div className="w-full p-4 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Info size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block leading-tight">
                    Sobre o app
                  </span>
                  <span className="text-[10px] text-[#95A5A6]">Nosso Bairro • Conexão Comunitária</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#636E72] bg-[#F1F3F0] px-2.5 py-0.5 rounded-lg border border-[#E5E7EB]">
                v1.0.0
              </span>
            </div>
          </div>
        </div>

        {/* Section: Sair da conta / Acesso Admin */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full p-3.5 rounded-[24px] bg-white border border-rose-200 text-rose-600 hover:bg-rose-50/50 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sair da conta</span>
          </button>

          {!isAdmin && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="text-[11px] text-[#95A5A6] hover:text-[#1B3F18] font-bold flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer py-1"
              >
                <KeyRound size={12} />
                <span>Acesso Administrativo</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Admin Login Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#E2E8F0] animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#1B3F18] flex items-center justify-center font-bold">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-sm font-bold text-[#1A202C]">
                  Acesso Administrativo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="text-[#A0AEC0] hover:text-[#2D3436] p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-3.5 pt-4">
              {adminError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {adminError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#4A5568] mb-1">
                  E-mail do Administrador
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF8] border border-[#CBD5E1] rounded-xl text-xs text-[#1A202C] focus:outline-none focus:border-[#1B3F18]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A5568] mb-1">
                  Senha de Acesso
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAF8] border border-[#CBD5E1] rounded-xl text-xs text-[#1A202C] focus:outline-none focus:border-[#1B3F18]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#1B3F18] text-white font-bold text-xs hover:bg-[#152D12] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck size={16} />
                  <span>{isSubmitting ? 'Verificando...' : 'Entrar no Painel Administrativo'}</span>
                </button>
              </div>

              <p className="text-[10.5px] text-[#A0AEC0] text-center pt-1">
                Área de uso exclusivo da moderação e administração do Nosso Bairro.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
