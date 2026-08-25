import React from 'react';
import { Heart, MessageSquare, Mail, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

export const NotificationsScreen: React.FC = () => {
  const { notificationPrefs, updateNotificationPrefs } = useApp();

  const handleToggle = (key: keyof typeof notificationPrefs) => {
    updateNotificationPrefs({
      ...notificationPrefs,
      [key]: !notificationPrefs[key]
    });
  };

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header title="Notificações" showBack={true} />

      <main className="px-4 py-4 space-y-5">
        {/* Main Push Toggle */}
        <div className="p-4 bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-[#2D3436] block">
              Notificações push
            </span>
            <span className="text-xs text-[#636E72]">
              Ativar notificações neste dispositivo
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('pushEnabled')}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none ${
              notificationPrefs.pushEnabled ? 'bg-[#2D5A27]' : 'bg-[#E5E7EB]'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                notificationPrefs.pushEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Tipos de notificação */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest px-1">
            Tipos de notificação
          </h3>

          <div className="divide-y divide-[#F0F0F0] border border-[#F0F0F0] rounded-[24px] overflow-hidden bg-white shadow-sm">
            {/* Curtidas */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Heart size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Curtidas
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Avisar quando curtirem suas fotos e contribuições
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('likes')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none ${
                  notificationPrefs.likes ? 'bg-[#2D5A27]' : 'bg-[#E5E7EB]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    notificationPrefs.likes ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Comentários */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Comentários
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Respostas em suas avaliações
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('comments')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none ${
                  notificationPrefs.comments ? 'bg-[#2D5A27]' : 'bg-[#E5E7EB]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    notificationPrefs.comments ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Mensagens */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2D3436] block">
                    Mensagens
                  </span>
                  <span className="text-[11px] text-[#636E72]">
                    Recados sobre o status das suas contribuições
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('messages')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none ${
                  notificationPrefs.messages ? 'bg-[#2D5A27]' : 'bg-[#E5E7EB]'
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    notificationPrefs.messages ? 'translate-x-5.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="p-4 bg-white rounded-[20px] border border-[#F0F0F0] flex items-start gap-2.5 text-xs text-[#636E72]">
          <Info size={16} className="text-[#2D5A27] shrink-0 mt-0.5" />
          <span>
            Você pode alterar sua preferência a qualquer momento. Suas escolhas são salvas automaticamente na sua conta.
          </span>
        </div>
      </main>
    </div>
  );
};
