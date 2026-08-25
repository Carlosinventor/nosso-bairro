import React, { useState } from 'react';
import { Database, Key, Globe, Check, AlertCircle, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const SupabaseConfigModal: React.FC = () => {
  const { supabaseConfig, updateSupabaseCredentials } = useAuth();
  const { isSupabaseModalOpen, setIsSupabaseModalOpen, reloadEstablishments } = useApp();

  const [url, setUrl] = useState(supabaseConfig.url || '');
  const [anonKey, setAnonKey] = useState(supabaseConfig.anonKey || '');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isSupabaseModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      setStatusMsg({ type: 'error', text: 'Por favor, preencha a URL e a Anon Key do Supabase.' });
      return;
    }

    const success = updateSupabaseCredentials(url.trim(), anonKey.trim());
    if (success) {
      setStatusMsg({ type: 'success', text: 'Supabase conectado com sucesso! Dados sincronizados.' });
      reloadEstablishments();
      setTimeout(() => {
        setIsSupabaseModalOpen(false);
      }, 1200);
    } else {
      setStatusMsg({ type: 'error', text: 'Falha ao validar credenciais do Supabase.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-6 sm:pt-12 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn select-none">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] w-full max-w-md p-5 sm:p-6 shadow-2xl border border-[#E5E7EB] relative my-2 max-h-[calc(100vh-2rem)] overflow-y-auto animate-scaleUp">
        <button
          type="button"
          onClick={() => setIsSupabaseModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F1F3F0] text-[#2D3436] hover:bg-[#E8EFE6] flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#EAF3EB] text-[#1B4323] flex items-center justify-center shrink-0">
            <Database size={24} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#1A202C]">Integração Supabase</h3>
            <p className="text-[11.5px] text-[#718096]">Banco de dados & Autenticação persistente</p>
          </div>
        </div>

        <div className="p-3 bg-[#FAFCFA] rounded-2xl border border-[#E2E8F0] mb-4 flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-[#1B4323] shrink-0 mt-0.5" />
          <div className="text-[11.5px] text-[#4A5568] leading-relaxed">
            <span className="font-bold text-[#1A202C]">Persistência ativa:</span> O aplicativo grava e sincroniza automaticamente seus estabelecimentos, avaliações, favoritos e perfil no Supabase & armazenamento local seguro.
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5">
          <div>
            <label className="block text-[12px] font-bold text-[#1A202C] mb-1 flex items-center gap-1.5">
              <Globe size={13} className="text-[#1B4323]" />
              URL do Projeto Supabase
            </label>
            <input
              type="text"
              placeholder="https://seu-projeto.supabase.co"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-[12.5px] bg-[#F8FAF8] border border-[#E2E8F0] focus:border-[#1B4323] focus:bg-white text-[#1A202C] rounded-xl focus:outline-none transition-all placeholder:text-[#A0AEC0]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#1A202C] mb-1 flex items-center gap-1.5">
              <Key size={13} className="text-[#1B4323]" />
              Supabase Anon Key (Chave Pública)
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              className="w-full px-3.5 py-2.5 text-[12.5px] bg-[#F8FAF8] border border-[#E2E8F0] focus:border-[#1B4323] focus:bg-white text-[#1A202C] rounded-xl focus:outline-none transition-all placeholder:text-[#A0AEC0]"
            />
          </div>

          {statusMsg && (
            <div
              className={`p-2.5 rounded-xl text-[11.5px] flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-[#EAF3EB] text-[#1B4323] border border-[#CDE5D1] font-semibold'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 font-semibold'
              }`}
            >
              {statusMsg.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsSupabaseModalOpen(false)}
              className="flex-1 py-2.5 px-3 rounded-xl border border-[#E2E8F0] text-[#2D3436] font-bold text-[12px] hover:bg-[#F8FAF8] transition-colors cursor-pointer"
            >
              Fechar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#1B4323] hover:bg-[#15341B] text-white font-bold text-[12px] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={14} />
              Salvar & Conectar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
