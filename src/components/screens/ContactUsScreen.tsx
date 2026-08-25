import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Flag,
  Paperclip,
  Mail,
  ShieldCheck,
  Info,
  X,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { supabaseService } from '../../services/supabase';

type ContactType = 'duvida' | 'sugestao' | 'erro' | 'outro';

interface ContactTypeOption {
  id: ContactType;
  label: string;
  sublabel: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CONTACT_TYPES: ContactTypeOption[] = [
  {
    id: 'duvida',
    label: 'Dúvida',
    sublabel: 'Tire suas dúvidas.',
    iconBg: 'bg-[#EAF3EB]',
    iconColor: 'text-[#1B4323]',
    icon: HelpCircle
  },
  {
    id: 'sugestao',
    label: 'Sugestão',
    sublabel: 'Envie suas ideias.',
    iconBg: 'bg-[#F7FAFC]',
    iconColor: 'text-[#4A5568]',
    icon: Lightbulb
  },
  {
    id: 'erro',
    label: 'Relatar erro',
    sublabel: 'Nos avise sobre problemas.',
    iconBg: 'bg-[#FEE2E2]',
    iconColor: 'text-[#DC2626]',
    icon: AlertTriangle
  },
  {
    id: 'outro',
    label: 'Outro',
    sublabel: 'Outros assuntos.',
    iconBg: 'bg-[#F3E8FF]',
    iconColor: 'text-[#9333EA]',
    icon: Flag
  }
];

export const ContactUsScreen: React.FC = () => {
  const { goBack, showSuccessModal } = useApp();
  const { user } = useAuth();

  const [selectedType, setSelectedType] = useState<ContactType>('duvida');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [wantFeedback, setWantFeedback] = useState(true);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; preview?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith('image/');
      const preview = isImg ? URL.createObjectURL(file) : undefined;
      setAttachedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(0) + ' KB',
        preview
      });
    }
  };

  const handleRemoveAttachment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    const categoryName = CONTACT_TYPES.find(t => t.id === selectedType)?.label || 'Dúvida';

    supabaseService.sendSupportMessage({
      category: categoryName,
      message: message.trim(),
      email: email.trim() || user?.email || 'anônimo',
      name: user?.name || 'Morador'
    });

    setIsSubmitting(false);

    showSuccessModal(
      'Mensagem enviada!',
      wantFeedback && email.trim()
        ? 'Sua mensagem foi enviada à nossa equipe. Responderemos em até 48h úteis.'
        : 'Sua mensagem foi registrada com sucesso. Agradecemos sua contribuição para a comunidade!',
      'Voltar',
      () => goBack()
    );
  };

  return (
    <div className="min-h-screen bg-white pb-24 font-sans select-none animate-fadeIn flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#F0F2F0] px-4 py-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-[#F5F7F5] hover:bg-[#EAEFEA] text-[#1A202C] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Voltar"
        >
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-[16px] font-bold text-[#1A202C]">
          Fale conosco
        </h1>

        <div className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 py-4 space-y-5 max-w-md mx-auto w-full">
        {/* Illustration & Hero Title */}
        <div className="text-center pt-2 pb-1">
          {/* Friendly Hero Illustration */}
          <div className="relative w-36 h-36 mx-auto mb-3 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-xs"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circular soft aura & leaves */}
              <circle cx="100" cy="100" r="85" fill="#F4F8F4" />
              <path
                d="M50 140 C45 110, 60 85, 75 75 C70 95, 75 120, 50 140 Z"
                fill="#C6E2C9"
                opacity="0.8"
              />
              <path
                d="M150 140 C155 110, 140 85, 125 75 C130 95, 125 120, 150 140 Z"
                fill="#C6E2C9"
                opacity="0.8"
              />

              {/* Character Hair Back */}
              <path
                d="M72 90 C65 115, 65 145, 78 160 C80 140, 78 115, 80 90 Z"
                fill="#1E293B"
              />
              <path
                d="M128 90 C135 115, 135 145, 122 160 C120 140, 122 115, 120 90 Z"
                fill="#1E293B"
              />

              {/* Character Body / Green Shirt */}
              <path
                d="M60 185 C60 145, 80 135, 100 135 C120 135, 140 145, 140 185 Z"
                fill="#1B4323"
              />
              {/* Collar */}
              <path
                d="M90 135 C95 143, 105 143, 110 135 Z"
                fill="#F8D3B4"
              />

              {/* Neck */}
              <rect x="92" y="120" width="16" height="18" rx="4" fill="#F8D3B4" />

              {/* Head & Face */}
              <ellipse cx="100" cy="95" rx="24" ry="26" fill="#F8D3B4" />

              {/* Hair Front */}
              <path
                d="M76 92 C74 72, 85 58, 100 58 C115 58, 126 72, 124 92 C120 78, 112 70, 100 70 C88 70, 80 78, 76 92 Z"
                fill="#1E293B"
              />
              <path
                d="M76 86 C82 74, 94 72, 100 75 C100 75, 86 78, 80 92 Z"
                fill="#1E293B"
              />

              {/* Eyes & Smile */}
              <circle cx="92" cy="94" r="2.5" fill="#1E293B" />
              <circle cx="108" cy="94" r="2.5" fill="#1E293B" />
              <path
                d="M94 104 Q100 109 106 104"
                stroke="#1E293B"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Cheeks */}
              <ellipse cx="88" cy="99" rx="3" ry="1.5" fill="#FCA5A5" opacity="0.6" />
              <ellipse cx="112" cy="99" rx="3" ry="1.5" fill="#FCA5A5" opacity="0.6" />

              {/* Hand holding phone */}
              <path
                d="M116 160 C125 148, 135 142, 138 152 C135 158, 125 168, 116 160 Z"
                fill="#F8D3B4"
              />

              {/* Smartphone */}
              <rect
                x="128"
                y="110"
                width="20"
                height="34"
                rx="4"
                transform="rotate(12 128 110)"
                fill="#1E293B"
              />
              <rect
                x="130"
                y="113"
                width="16"
                height="28"
                rx="2"
                transform="rotate(12 130 113)"
                fill="#F1F5F9"
              />

              {/* Speech Bubble with 3 Dots */}
              <g transform="translate(125, 45)">
                <rect x="0" y="0" width="38" height="26" rx="13" fill="#1B4323" />
                <path d="M12 24 L10 32 L20 25 Z" fill="#1B4323" />
                <circle cx="12" cy="13" r="2.2" fill="#FFFFFF" />
                <circle cx="19" cy="13" r="2.2" fill="#FFFFFF" />
                <circle cx="26" cy="13" r="2.2" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          <h2 className="text-[18px] font-extrabold text-[#1A202C] leading-snug tracking-tight">
            Como podemos ajudar?
          </h2>
          <p className="text-[12px] text-[#718096] mt-1 font-medium">
            Escolha o tipo de contato e envie sua mensagem.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section: Tipo de contato */}
          <div className="space-y-2">
            <label className="block text-[12.5px] font-bold text-[#1A202C]">
              Tipo de contato
            </label>
            
            <div className="grid grid-cols-4 gap-2">
              {CONTACT_TYPES.map(type => {
                const isSelected = selectedType === type.id;
                const IconComponent = type.icon;

                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-start transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-[#1B4323] bg-[#FAFCFA] shadow-xs ring-1 ring-[#1B4323]/20'
                        : 'border-[#E5E7EB] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAF8]'
                    }`}
                  >
                    {/* Circle Icon */}
                    <div
                      className={`w-9 h-9 rounded-full ${type.iconBg} ${type.iconColor} flex items-center justify-center mb-1.5 shadow-2xs`}
                    >
                      <IconComponent size={18} className="stroke-[2]" />
                    </div>

                    <span className="text-[11px] font-bold text-[#1A202C] leading-tight block">
                      {type.label}
                    </span>
                    <span className="text-[8.5px] text-[#718096] leading-tight mt-0.5 block">
                      {type.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Sua mensagem */}
          <div className="space-y-1.5">
            <label className="block text-[12.5px] font-bold text-[#1A202C]">
              Sua mensagem
            </label>

            <div className="relative">
              <textarea
                rows={4}
                maxLength={1000}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Descreva aqui sua mensagem..."
                required
                className="w-full p-3.5 pb-7 text-[12.5px] bg-white border border-[#E5E7EB] focus:border-[#1B4323] text-[#1A202C] rounded-2xl focus:outline-none transition-all placeholder:text-[#A0AEC0] resize-none leading-relaxed"
              />
              <span className="absolute right-3 bottom-2 text-[10px] text-[#A0AEC0] font-medium">
                {message.length}/1000
              </span>
            </div>
          </div>

          {/* Section: Enviar anexos (opcional) */}
          <div className="space-y-1.5">
            <label className="block text-[12.5px] font-bold text-[#1A202C]">
              Enviar anexos (opcional)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />

            {!attachedFile ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F8FAF8] hover:border-[#CBD5E1] text-[#4A5568] text-[12px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Paperclip size={15} className="text-[#718096]" />
                <span>Adicionar arquivo ou imagem</span>
              </button>
            ) : (
              <div className="p-2.5 rounded-xl border border-[#CDE5D1] bg-[#FAFCFA] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {attachedFile.preview ? (
                    <img
                      src={attachedFile.preview}
                      alt="Anexo"
                      className="w-8 h-8 rounded-lg object-cover border border-[#E5E7EB] shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-[#EAF3EB] text-[#1B4323] flex items-center justify-center shrink-0">
                      <FileText size={16} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-bold text-[#1A202C] truncate">
                      {attachedFile.name}
                    </p>
                    <p className="text-[10px] text-[#718096]">{attachedFile.size}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveAttachment}
                  className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remover anexo"
                >
                  <X size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Section: Seu e-mail */}
          <div className="space-y-1.5">
            <label className="block text-[12.5px] font-bold text-[#1A202C]">
              Seu e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Informe seu e-mail (opcional)"
              className="w-full px-3.5 py-3 text-[12.5px] bg-white border border-[#E5E7EB] focus:border-[#1B4323] text-[#1A202C] rounded-xl focus:outline-none transition-all placeholder:text-[#A0AEC0]"
            />
          </div>

          {/* Section: Deseja receber retorno? */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <label className="block text-[12.5px] font-bold text-[#1A202C]">
                Deseja receber retorno?
              </label>
              <button
                type="button"
                onClick={() => setShowInfoModal(prev => !prev)}
                className="text-[#718096] hover:text-[#1B4323] cursor-pointer"
                title="Informações sobre o retorno"
              >
                <Info size={13} />
              </button>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#E5E7EB] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#F8FAF8] border border-[#E5E7EB] flex items-center justify-center text-[#1A202C] shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[12px] font-bold text-[#1A202C] leading-snug">
                    Sim, quero receber retorno
                  </h4>
                  <p className="text-[10.5px] text-[#718096] leading-tight mt-0.5">
                    Responderemos em até 48h úteis.
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={wantFeedback}
                onClick={() => setWantFeedback(prev => !prev)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  wantFeedback ? 'bg-[#1B4323]' : 'bg-[#E2E8F0]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    wantFeedback ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {showInfoModal && (
              <p className="text-[10.5px] text-[#4A5568] bg-[#F8FAF8] p-2.5 rounded-xl border border-[#E5E7EB] animate-fadeIn">
                Caso ativado e com seu e-mail informado, nossa equipe enviará uma resposta detalhada sobre sua solicitação no prazo informado.
              </p>
            )}
          </div>

          {/* Green Notice Banner */}
          <div className="p-3 bg-[#EAF3EB] border border-[#CDE5D1] rounded-2xl flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-[#1B4323] shrink-0" />
            <p className="text-[11px] text-[#1B4323] font-medium leading-snug">
              Todas as mensagens são analisadas com atenção pela nossa equipe.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] text-white font-bold text-[13.5px] shadow-xs transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
