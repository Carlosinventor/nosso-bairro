import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Bookmark,
  Share2,
  Camera,
  Upload,
  Save,
  Send,
  X,
  Sparkles,
  AlertCircle,
  Tag,
  Target,
  Users,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CAMPAIGN_CATEGORIES = [
  'Solidariedade',
  'Meio Ambiente',
  'Adoção & Causa Animal',
  'Crianças & Educação',
  'Melhorias no Bairro',
  'Saúde Comunitária'
];

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  'Solidariedade': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop',
  'Meio Ambiente': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
  'Adoção & Causa Animal': 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1000&auto=format&fit=crop',
  'Crianças & Educação': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop',
  'Melhorias no Bairro': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop',
  'Saúde Comunitária': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop'
};

export const AdminNewCampaignScreen: React.FC = () => {
  const { navigateTo, createAdminCampaign, showSuccessModal } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states placed directly in their visual positions matching public Campaign Detail layout
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Solidariedade');
  const [deadline, setDeadline] = useState('Até o fim do mês');
  const [goal, setGoal] = useState('500 doações');
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [donorCount, setDonorCount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('Associação de Moradores e Amigos');
  const [imageUrl, setImageUrl] = useState(DEFAULT_CATEGORY_IMAGES['Solidariedade']);

  // Optional fields for flexible dynamic composition
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // UI state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic conditions for optional fields
  const hasLocationOrAddress = Boolean(location.trim() || address.trim());
  const hasDate = Boolean(date.trim());
  const hasTime = Boolean(time.trim());
  const hasPhone = Boolean(phone.trim());
  const hasEmail = Boolean(contactEmail.trim());
  const hasAnyOptionalPractical = hasLocationOrAddress || hasDate || hasTime || hasPhone || hasEmail;

  // File upload handler for instant local preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
          setIsPhotoModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (publishImmediately: boolean) => {
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Por favor, informe o título da campanha.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Por favor, preencha a descrição da iniciativa.');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Formatted contact field combining phone or email if provided
      const finalContact = phone.trim()
        ? contactEmail.trim()
          ? `${phone.trim()} • ${contactEmail.trim()}`
          : phone.trim()
        : contactEmail.trim() || 'contato@bairro.com.br';

      await createAdminCampaign({
        title: title.trim(),
        category,
        description: description.trim(),
        organization: organization.trim() || 'Comunidade do Bairro',
        goal: goal.trim() || 'Meta Comunitária',
        currentProgress: Number(currentProgress) || 0,
        donorCount: Number(donorCount) || 0,
        deadline: deadline.trim() || 'Em andamento',
        contact: finalContact,
        phone: phone.trim() || undefined,
        location: location.trim() || undefined,
        address: address.trim() || location.trim() || undefined,
        date: date.trim() || undefined,
        time: time.trim() || undefined,
        imageUrl: imageUrl || DEFAULT_CATEGORY_IMAGES[category] || DEFAULT_CATEGORY_IMAGES['Solidariedade'],
        published: publishImmediately
      });

      showSuccessModal(
        publishImmediately ? 'Campanha Publicada!' : 'Rascunho Salvo!',
        publishImmediately
          ? `A campanha "${title}" foi publicada e já está disponível para os moradores no aplicativo.`
          : `A campanha "${title}" foi salva como rascunho com sucesso.`,
        'Ver Campanhas',
        () => navigateTo('admin_campaigns')
      );
    } catch {
      setErrorMessage('Ocorreu um erro ao salvar a campanha. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-32 animate-fadeIn font-sans select-none">
      {/* Top Floating Admin Notice Header Bar */}
      <div className="bg-[#1B3F18] text-white px-4 py-2.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateTo('admin_campaigns')}
            className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Voltar para Campanhas"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-300" />
            <span className="text-xs font-bold tracking-tight">Nova Campanha</span>
          </div>
        </div>

        <span className="text-[10.5px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
          Montagem Visual em Tempo Real
        </span>
      </div>

      {/* Validation Alert */}
      {errorMessage && (
        <div className="bg-rose-50 border-b border-rose-200 p-3 px-4 flex items-center gap-2 text-rose-700 text-xs font-bold animate-fadeIn">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Cover Banner (Exact Public Layout) */}
      <div className="relative h-60 sm:h-72 w-full bg-[#1E3F1A] group">
        <img
          src={imageUrl}
          alt={title || 'Prévia da Imagem da Campanha'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />

        {/* Back Button (Exact Public Position) */}
        <button
          type="button"
          onClick={() => navigateTo('admin_campaigns')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer z-10"
          title="Cancelar e Voltar"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Top Right Quick Actions: Save & Share (Exact Public Actions) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md opacity-80 cursor-default"
            title="Salvar campanha (Prévia do usuário)"
          >
            <Bookmark size={18} className="text-[#2D3436]" />
          </div>
          <div
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md opacity-80 cursor-default"
            title="Compartilhar campanha (Prévia do usuário)"
          >
            <Share2 size={18} className="text-[#2D3436]" />
          </div>
        </div>

        {/* Photo Upload & Change Overlay Trigger */}
        <button
          type="button"
          onClick={() => setIsPhotoModalOpen(true)}
          className="absolute bottom-4 right-4 bg-black/75 hover:bg-black/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-lg z-20 cursor-pointer border border-white/20 active:scale-95"
        >
          <Camera size={15} className="text-emerald-300" />
          <span>Alterar Imagem da Campanha</span>
        </button>

        {/* Quick hint badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white/90 px-2.5 py-1 rounded-lg text-[10.5px] font-medium hidden sm:flex items-center gap-1.5 pointer-events-none">
          <span>Foto principal da campanha</span>
        </div>
      </div>

      {/* Main Content Area (Exact public layout & hierarchy) */}
      <main className="px-4 py-5 space-y-4 -mt-4 bg-white rounded-t-[32px] shadow-sm relative z-10 border-t border-[#E5E7EB] max-w-md mx-auto">
        {/* Category & Deadline Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {/* Category Selector */}
          <div className="flex items-center gap-1.5">
            <Tag size={13} className="text-[#2D5A27]" />
            <select
              value={category}
              onChange={e => {
                const newCat = e.target.value;
                setCategory(newCat);
                if (DEFAULT_CATEGORY_IMAGES[newCat]) {
                  setImageUrl(DEFAULT_CATEGORY_IMAGES[newCat]);
                }
              }}
              className="px-3 py-1 bg-[#F1F3F0] text-[#2D5A27] text-xs font-bold rounded-full border border-[#2D5A27]/20 focus:outline-none cursor-pointer"
            >
              {CAMPAIGN_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline Field */}
          <div className="flex items-center gap-1 bg-[#F8FAF8] px-2.5 py-1 rounded-lg border border-[#E2E8F0] text-xs text-[#636E72]">
            <Calendar size={12} className="text-[#2D5A27] shrink-0" />
            <input
              type="text"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              placeholder="Prazo (ex: Até 15 de Nov)"
              className="w-28 bg-transparent text-xs font-medium text-[#636E72] focus:outline-none"
            />
          </div>
        </div>

        {/* Title: In-place editable headline */}
        <div className="relative">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D5A27] block mb-0.5">
            Título da Campanha *
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Campanha do Agasalho & Solidariedade 2026"
            className="w-full text-xl font-bold text-[#2D3436] leading-snug bg-transparent border-b-2 border-dashed border-[#2D5A27]/40 focus:border-[#2D5A27] focus:outline-none placeholder:text-gray-400 py-1"
          />
        </div>

        {/* Progress Card (Exact Public Structure in Fillable Mode) */}
        <div className="p-4 bg-[#F1F3F0] rounded-2xl border border-[#E5E7EB] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#2D3436] flex items-center gap-1">
              <Target size={13} className="text-[#2D5A27]" />
              <span>Progresso da meta</span>
            </span>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-[#CBD5E1]">
              <input
                type="number"
                min="0"
                max="100"
                value={currentProgress}
                onChange={e => setCurrentProgress(Math.max(0, Math.min(100, Number(e.target.value))))}
                className="w-8 text-xs font-bold text-[#2D5A27] text-right focus:outline-none"
              />
              <span className="text-xs font-bold text-[#2D5A27]">% atingido</span>
            </div>
          </div>

          {/* Progress Bar Visual */}
          <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-[#E5E7EB]">
            <div
              className="bg-[#2D5A27] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, currentProgress))}%` }}
            />
          </div>

          {/* Meta & Supporters Config Inputs */}
          <div className="flex justify-between items-center gap-2 text-xs text-[#636E72] pt-1">
            <div className="flex items-center gap-1 flex-1">
              <span className="shrink-0 font-medium">Meta:</span>
              <input
                type="text"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="Ex: 500 agasalhos"
                className="w-full bg-white border border-[#CBD5E1] rounded-lg px-2 py-1 text-xs font-bold text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Users size={12} className="text-[#2D5A27]" />
              <input
                type="number"
                min="0"
                value={donorCount}
                onChange={e => setDonorCount(Math.max(0, Number(e.target.value)))}
                className="w-12 bg-white border border-[#CBD5E1] rounded-lg px-1.5 py-1 text-xs text-center font-bold text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
              <span className="text-[11px]">apoiadores</span>
            </div>
          </div>
        </div>

        {/* About Campaign (Exact Public Structure) */}
        <div className="space-y-1.5 pt-1">
          <label className="text-sm font-bold text-[#2D3436] block">
            Sobre a iniciativa *
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Apresente os objetivos da campanha, o impacto no bairro, o que pode ser doado e como participar..."
            rows={4}
            className="w-full text-xs text-[#636E72] leading-relaxed bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl p-3 focus:outline-none focus:border-[#2D5A27] placeholder:text-gray-400"
          />
        </div>

        {/* Organizer and Delivery / Realização */}
        <div className="p-4 bg-[#F8F9F5] rounded-2xl border border-[#E5E7EB] space-y-3 text-xs">
          <span className="font-bold text-[#2D3436] block">
            Realização & Ponto de Entrega
          </span>

          {/* Organizer Name */}
          <div>
            <label className="text-[10px] font-bold text-[#718096] uppercase tracking-wider block mb-1">
              Organização / Responsável
            </label>
            <input
              type="text"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              placeholder="Ex: Associação de Moradores ou Coletivo Solidário"
              className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] font-medium focus:outline-none focus:border-[#2D5A27]"
            />
          </div>

          {/* Optional Practical Fields: Endereço/localização, Data, Horário, Contato/telefone */}
          <div className="pt-2 border-t border-[#E5E7EB] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#2D5A27]">
                Informações Complementares (Opcionais)
              </span>
              <span className="text-[9.5px] text-[#718096]">
                Preencha apenas o que houver
              </span>
            </div>

            {/* 1. Endereço / Localização */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <MapPin size={13} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={location}
                onChange={e => {
                  setLocation(e.target.value);
                  if (!address) setAddress(e.target.value);
                }}
                placeholder="Ponto de Entrega / Endereço (ex: Centro Comunitário, Rua das Flores 100)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* 2. Data / Período */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <Calendar size={13} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Data ou Período específico (ex: De 10 a 25 de Novembro)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* 3. Horário de funcionamento / atendimento */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <Clock size={13} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="Horário para entrega / dúvidas (ex: Segunda a Sexta das 9h às 17h)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* 4. Contato / Telefone */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <Phone size={13} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Telefone / WhatsApp (ex: (11) 98765-4321)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* 5. E-mail de Contato */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <Mail size={13} className="text-[#2D5A27]" />
              </div>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="E-mail de contato (ex: doacoes@bairro.com.br)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Live Visual Box showing how optional info seamlessly organizes without empty space */}
        {hasAnyOptionalPractical && (
          <div className="bg-[#EDF3EE] border border-[#2D5A27]/25 rounded-2xl p-3.5 space-y-2 animate-fadeIn">
            <span className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider block">
              Composição Dinâmica dos Detalhes Preenchidos
            </span>
            <div className="space-y-1.5 text-xs text-[#2D3436]">
              {hasLocationOrAddress && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <MapPin size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Ponto de Entrega:</strong> {location || address}</span>
                </div>
              )}
              {hasDate && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Calendar size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Data / Período:</strong> {date}</span>
                </div>
              )}
              {hasTime && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Clock size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Horário:</strong> {time}</span>
                </div>
              )}
              {hasPhone && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Phone size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Telefone:</strong> {phone}</span>
                </div>
              )}
              {hasEmail && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Mail size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>E-mail:</strong> {contactEmail}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final Action Buttons: Publicar, Salvar Rascunho, Cancelar */}
        <div className="pt-6 space-y-2.5 pb-8 border-t border-gray-100">
          {/* Botão Principal: Publicar Campanha */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Publicando...' : 'Publicar Campanha'}</span>
          </button>

          {/* Botão Secundário: Salvar como Rascunho */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50/50 active:scale-98 text-[#1B4323] font-bold text-[13.5px] border-2 border-[#1B4323] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>Salvar como Rascunho (Não Publicada)</span>
          </button>

          {/* Botão Cancelar */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => navigateTo('admin_campaigns')}
              className="text-xs font-bold text-[#718096] hover:text-rose-600 transition-colors cursor-pointer py-1.5 px-3"
            >
              Cancelar Cadastro
            </button>
          </div>
        </div>
      </main>

      {/* Photo Picker Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-[#E2E8F0] animate-scaleUp space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-[#1B4323]" />
                <h3 className="text-sm font-bold text-[#1A202C]">Imagem da Campanha</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Option 1: File Upload */}
            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-1.5">
                1. Fazer upload de foto do seu dispositivo
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#1B4323] border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload size={16} />
                <span>Escolher arquivo de imagem</span>
              </button>
            </div>

            {/* Option 2: Image URL */}
            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-1.5">
                2. Ou informe um link direto de imagem (URL)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://exemplo.com/campanha.jpg"
                  value={tempImageUrl}
                  onChange={e => setTempImageUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#F8FAF8] border border-[#CBD5E1] rounded-xl text-xs text-[#1A202C] focus:outline-none focus:border-[#1B4323]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (tempImageUrl.trim()) {
                      setImageUrl(tempImageUrl.trim());
                      setTempImageUrl('');
                      setIsPhotoModalOpen(false);
                    }
                  }}
                  className="px-3 py-2 bg-[#1B4323] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
            </div>

            {/* Option 3: Presets by category */}
            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-1.5">
                3. Fotos de exemplo sugeridas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(DEFAULT_CATEGORY_IMAGES).map(([cat, url]) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setImageUrl(url);
                      setIsPhotoModalOpen(false);
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-20 ${
                      imageUrl === url ? 'border-[#1B4323] ring-2 ring-emerald-300' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt={cat} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/65 text-[9.5px] font-bold text-white text-center py-0.5 truncate px-1">
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
