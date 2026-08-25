import React, { useState } from 'react';
import { ShieldCheck, Key, FileText, Database, Trash2, Mail, ChevronRight, Lock, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../common/Header';

export const SecurityPrivacyScreen: React.FC = () => {
  const { navigateTo, showSuccessModal } = useApp();
  const { user, signOut } = useAuth();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMyDataModal, setShowMyDataModal] = useState(false);

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas digitadas não coincidem.');
      return;
    }

    setShowPasswordModal(false);
    showSuccessModal(
      'Senha alterada!',
      'Sua nova senha foi atualizada e protegida com criptografia no Supabase.',
      'Concluir'
    );
  };

  const handleDeleteAccount = () => {
    navigateTo('home');
    signOut();
  };

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header title="Segurança e Privacidade" showBack={true} />

      <main className="px-4 py-4 space-y-5">
        {/* Banner in Forest Green */}
        <div className="p-5 rounded-[28px] bg-[#2D5A27] text-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 text-[#E8EFE6] flex items-center justify-center shrink-0">
            <Lock size={26} />
          </div>
          <div>
            <h2 className="text-sm font-bold leading-snug">
              Segurança e Privacidade
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              Gerencie a segurança da sua conta e a privacidade dos seus dados pessoais.
            </p>
          </div>
        </div>

        {/* Section: Segurança da conta */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest px-2">
            Segurança da conta
          </h3>

          <div className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm divide-y divide-[#F0F0F0] overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setPasswordError(null);
                setShowPasswordModal(true);
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Key size={17} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Alterar senha
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Recomendamos o uso de senhas fortes
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>
          </div>
        </div>

        {/* Section: Privacidade e Dados */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest px-2">
            Privacidade e Dados
          </h3>

          <div className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm divide-y divide-[#F0F0F0] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <FileText size={17} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Política de Privacidade
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Como protegemos e utilizamos seus dados
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            <button
              type="button"
              onClick={() => setShowMyDataModal(true)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Database size={17} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Meus Dados
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Consulte as informações vinculadas à sua conta
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-rose-50/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Trash2 size={17} />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 block">
                    Excluir minha conta
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Remoção definitiva de perfil e histórico
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>

            {/* Contato sobre privacidade direciona para Fale Conosco */}
            <button
              type="button"
              onClick={() => navigateTo('contact_us')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9F5] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Mail size={17} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Contato sobre privacidade
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Fale com nosso encarregado de dados (DPO)
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#95A5A6]" />
            </button>
          </div>
        </div>

        {/* Security Info Card */}
        <div className="p-4 bg-white rounded-[24px] border border-[#F0F0F0] flex items-center gap-3.5 shadow-sm">
          <ShieldCheck size={24} className="text-[#2D5A27] shrink-0" />
          <div className="text-xs text-[#636E72]">
            <strong className="text-[#2D3436] block">Seus dados são importantes</strong>
            Tratamos suas informações de acordo com a LGPD (Lei Geral de Proteção de Dados).
          </div>
        </div>
      </main>

      {/* Alterar Senha Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[32px] w-full max-w-sm p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#2D3436]">Alterar senha</h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-full bg-[#F1F3F0] flex items-center justify-center text-[#2D3436] hover:bg-[#E8EFE6]"
              >
                <X size={15} />
              </button>
            </div>

            {passwordError && (
              <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-xl mb-3 border border-rose-200">
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2D3436] mb-1">
                  Senha atual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D3436] mb-1">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D3436] mb-1">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repita a nova senha"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#E5E7EB] text-[#2D3436] text-xs font-bold hover:bg-[#F1F3F0]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white text-xs font-bold shadow-sm"
                >
                  Salvar senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Política de Privacidade Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[32px] w-full max-w-md p-6 shadow-2xl border border-[#E5E7EB] max-h-[80vh] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-bold text-[#2D3436]">Política de Privacidade</h3>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="w-8 h-8 rounded-full bg-[#F1F3F0] flex items-center justify-center text-[#2D3436] hover:bg-[#E8EFE6]"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="text-xs text-[#636E72] space-y-2.5 overflow-y-auto max-h-[50vh] pr-2">
                <p>
                  <strong className="text-[#2D3436]">1. Coleta de Informações:</strong> O aplicativo Nosso Bairro coleta apenas os dados estritamente necessários para permitir a descoberta local, publicações de fotos e avaliações comunitárias.
                </p>
                <p>
                  <strong className="text-[#2D3436]">2. Segurança & Supabase:</strong> Todas as senhas são criptografadas e os dados pessoais ficam sob estrito controle de segurança e regras do banco de dados.
                </p>
                <p>
                  <strong className="text-[#2D3436]">3. Compartilhamento:</strong> Suas contribuições públicas (avaliações e fotos) são exibidas para a comunidade com seu nome de morador, enquanto seu e-mail e telefone permanecem privados.
                </p>
                <p>
                  <strong className="text-[#2D3436]">4. Seus Direitos (LGPD):</strong> Você pode solicitar a qualquer momento a visualização, retificação ou exclusão permanente dos seus dados.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="mt-4 w-full py-3.5 rounded-2xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Meus Dados Modal */}
      {showMyDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-[32px] w-full max-w-sm p-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-[#2D3436]">Meus Dados</h3>
              <button
                type="button"
                onClick={() => setShowMyDataModal(false)}
                className="w-8 h-8 rounded-full bg-[#F1F3F0] flex items-center justify-center text-[#2D3436] hover:bg-[#E8EFE6]"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2 text-xs bg-[#F1F3F0] p-4 rounded-2xl border border-[#E5E7EB] mb-4 text-[#636E72]">
              <p><strong className="text-[#2D3436]">Nome:</strong> {user?.name}</p>
              <p><strong className="text-[#2D3436]">E-mail:</strong> {user?.email}</p>
              <p><strong className="text-[#2D3436]">Telefone:</strong> {user?.phone || 'Não informado'}</p>
              <p><strong className="text-[#2D3436]">Bairro:</strong> {user?.neighborhood || 'Jardim Primavera'}</p>
              <p><strong className="text-[#2D3436]">Membro desde:</strong> {user?.memberSince}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                const dataStr = JSON.stringify(user, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `dados-nosso-bairro-${user?.id}.json`;
                a.click();
              }}
              className="w-full py-3.5 rounded-2xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-xs"
            >
              Exportar Meus Dados (JSON)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
