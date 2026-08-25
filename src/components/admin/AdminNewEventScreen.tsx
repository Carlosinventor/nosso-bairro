import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Bookmark,
  Share2,
  Camera,
  Upload,
  Image as ImageIcon,
  Save,
  Send,
  X,
  Sparkles,
  AlertCircle,
  Tag,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../common/InteractiveMap';

const EVENT_CATEGORIES = [
  'Cultura & Arte',
  'Gastronomia & Feiras',
  'Esporte & Saúde',
  'Família & Infantil',
  'Música & Shows',
  'Educação & Workshops',
  'Comunitário'
];

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  'Cultura & Arte': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
  'Gastronomia & Feiras': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
  'Esporte & Saúde': 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=1000&auto=format&fit=crop',
  'Família & Infantil': 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000&auto=format&fit=crop',
  'Música & Shows': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
  'Educação & Workshops': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
  'Comunitário': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop'
};

export const AdminNewEventScreen: React.FC = () => {
  const { navigateTo, createAdminEvent, showSuccessModal } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states placed directly in their visual positions matching the public Event Detail layout
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cultura & Arte');
  const [price, setPrice] = useState('Gratuito');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [organizer, setOrganizer] = useState('Associação de Moradores');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState(DEFAULT_CATEGORY_IMAGES['Cultura & Arte']);

  // UI state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic conditions
  const hasDate = Boolean(date.trim());
  const hasTime = Boolean(time.trim());
  const hasLocationOrAddress = Boolean(location.trim() || address.trim());
  const hasOrganizer = Boolean(organizer.trim());
  const hasPhone = Boolean(phone.trim());

  const hasAnyCardInfo = hasDate || hasTime || hasLocationOrAddress || hasOrganizer || hasPhone;

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
      setErrorMessage('Por favor, informe o título do evento.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!description.trim()) {
      setErrorMessage('Por favor, descreva o evento no campo "Sobre o evento".');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      await createAdminEvent({
        title: title.trim(),
        category,
        price: price.trim() || 'Gratuito',
        description: description.trim(),
        date: date.trim() || 'Em breve',
        time: time.trim() || 'A definir',
        location: location.trim() || (address.trim() ? address.trim() : 'Local a confirmar'),
        address: address.trim() || location.trim() || 'Bairro',
        organizer: organizer.trim() || 'Comunidade do Bairro',
        phone: phone.trim() || undefined,
        contact: phone.trim() || undefined,
        imageUrl: imageUrl || DEFAULT_CATEGORY_IMAGES[category] || DEFAULT_CATEGORY_IMAGES['Cultura & Arte'],
        interestedCount: 1,
        published: publishImmediately
      });

      showSuccessModal(
        publishImmediately ? 'Evento Publicado!' : 'Rascunho Salvo!',
        publishImmediately
          ? `O evento "${title}" foi publicado e já está visível para os moradores na agenda do bairro.`
          : `O evento "${title}" foi salvo como rascunho com sucesso.`,
        'Ver Eventos',
        () => navigateTo('admin_events')
      );
    } catch {
      setErrorMessage('Ocorreu um erro ao salvar o evento. Tente novamente.');
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
            onClick={() => navigateTo('admin_events')}
            className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Voltar para Eventos"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-300" />
            <span className="text-xs font-bold tracking-tight">Novo Evento</span>
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
      <div className="relative h-64 sm:h-72 w-full bg-[#1E3F1A] group">
        <img
          src={imageUrl}
          alt={title || 'Prévia da Imagem do Evento'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />

        {/* Back Button (Exact Public Position) */}
        <button
          type="button"
          onClick={() => navigateTo('admin_events')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer z-10"
          title="Cancelar e Voltar"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Top Right Quick Actions: Save & Share (Exact Public Actions) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md opacity-80 cursor-default"
            title="Salvar evento (Prévia do usuário)"
          >
            <Bookmark size={18} className="text-[#2D3436]" />
          </div>
          <div
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md opacity-80 cursor-default"
            title="Compartilhar evento (Prévia do usuário)"
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
          <span>Alterar Imagem do Evento</span>
        </button>

        {/* Quick hint badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white/90 px-2.5 py-1 rounded-lg text-[10.5px] font-medium hidden sm:flex items-center gap-1.5 pointer-events-none">
          <span>Foto de capa do evento</span>
        </div>
      </div>

      {/* Main Content Area (Exact public layout & hierarchy) */}
      <main className="px-4 py-5 space-y-4 -mt-4 bg-white rounded-t-[32px] shadow-sm relative z-10 border-t border-[#E5E7EB] max-w-md mx-auto">
        {/* Top Badges Row: Category + Price / Entry */}
        <div className="flex items-center justify-between gap-2">
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
              {EVENT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price / Entry input */}
          <div className="flex items-center gap-1 bg-[#E8EFE6] px-2.5 py-1 rounded-full border border-[#2D5A27]/20">
            <DollarSign size={13} className="text-[#2D5A27]" />
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Gratuito / Valor"
              className="w-20 bg-transparent text-xs font-bold text-[#2D5A27] focus:outline-none text-right placeholder:text-emerald-700/60"
            />
          </div>
        </div>

        {/* Title: In-place editable headline */}
        <div className="relative">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D5A27] block mb-0.5">
            Título do Evento *
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: 3º Festival Gastronômico da Primavera"
            className="w-full text-xl font-bold text-[#2D3436] leading-snug bg-transparent border-b-2 border-dashed border-[#2D5A27]/40 focus:border-[#2D5A27] focus:outline-none placeholder:text-gray-400 py-1"
          />
        </div>

        {/* Dynamic Details Card (Exact Public Structure, auto-collapsing optional items without leaving blank space) */}
        <div className="p-4 bg-[#F1F3F0] rounded-[24px] border border-[#E5E7EB] space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#718096] block -mb-1">
            Informações e Programação (Opcionais)
          </span>

          {/* 1. Date Field */}
          <div className="flex items-start gap-3">
            <Calendar size={18} className="text-[#2D5A27] shrink-0 mt-2" />
            <div className="flex-1">
              <span className="text-xs font-bold text-[#2D3436] block">Data do Evento</span>
              <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="Ex: Sábado, 28 de Outubro"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27] mt-1"
              />
            </div>
          </div>

          {/* 2. Time Field */}
          <div className="flex items-start gap-3 pt-2.5 border-t border-[#E5E7EB]">
            <Clock size={18} className="text-[#2D5A27] shrink-0 mt-2" />
            <div className="flex-1">
              <span className="text-xs font-bold text-[#2D3436] block">Horário</span>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="Ex: das 10h às 18h"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27] mt-1"
              />
            </div>
          </div>

          {/* 3. Location & Address Fields */}
          <div className="flex items-start gap-3 pt-2.5 border-t border-[#E5E7EB]">
            <MapPin size={18} className="text-[#2D5A27] shrink-0 mt-2" />
            <div className="flex-1 space-y-1.5">
              <span className="text-xs font-bold text-[#2D3436] block">Local e Endereço</span>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Nome do local (ex: Parque Municipal)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27]"
              />
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Endereço completo (ex: Av. das Palmeiras, 500)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#636E72] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>
          </div>

          {/* 4. Organizer */}
          <div className="flex items-start gap-3 pt-2.5 border-t border-[#E5E7EB]">
            <Users size={18} className="text-[#2D5A27] shrink-0 mt-2" />
            <div className="flex-1">
              <span className="text-xs font-bold text-[#2D3436] block">Organização / Responsável</span>
              <input
                type="text"
                value={organizer}
                onChange={e => setOrganizer(e.target.value)}
                placeholder="Ex: Associação de Moradores ou Coletivo Cultural"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27] mt-1"
              />
            </div>
          </div>

          {/* 5. Contact / Phone Field (Optional for user inquiries) */}
          <div className="flex items-start gap-3 pt-2.5 border-t border-[#E5E7EB]">
            <Phone size={18} className="text-[#2D5A27] shrink-0 mt-2" />
            <div className="flex-1">
              <span className="text-xs font-bold text-[#2D3436] block">Contato / Telefone (Opcional)</span>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Telefone / WhatsApp para dúvidas (ex: (11) 98765-4321)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#2D3436] focus:outline-none focus:border-[#2D5A27] mt-1"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Card Preview (Shows how the filled items seamlessly organize without empty spaces) */}
        {hasAnyCardInfo && (
          <div className="bg-[#EDF3EE] border border-[#2D5A27]/25 rounded-2xl p-3.5 space-y-2 animate-fadeIn">
            <span className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider block">
              Prévia Dinâmica dos Detalhes Preenchidos
            </span>
            <div className="space-y-1.5 text-xs text-[#2D3436]">
              {hasDate && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Calendar size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Data:</strong> {date}</span>
                </div>
              )}
              {hasTime && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Clock size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Horário:</strong> {time}</span>
                </div>
              )}
              {hasLocationOrAddress && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <MapPin size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Local:</strong> {location || address} {location && address ? `— ${address}` : ''}</span>
                </div>
              )}
              {hasOrganizer && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Users size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Organização:</strong> {organizer}</span>
                </div>
              )}
              {hasPhone && (
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#2D5A27]/15">
                  <Phone size={13} className="text-[#2D5A27] shrink-0" />
                  <span><strong>Contato:</strong> {phone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* About Event */}
        <div className="space-y-1.5 pt-1">
          <label className="text-sm font-bold text-[#2D3436] block">
            Sobre o evento *
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Apresente os detalhes do evento, atrações, público-alvo, recomendações e o que os participantes podem esperar..."
            rows={4}
            className="w-full text-xs text-[#636E72] leading-relaxed bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl p-3 focus:outline-none focus:border-[#2D5A27] placeholder:text-gray-400"
          />
        </div>

        {/* Map Preview (Exact Public Layout) */}
        <div className="space-y-1.5 pt-1">
          <h3 className="text-sm font-bold text-[#2D3436]">Localização no Mapa</h3>
          <div className="rounded-[24px] overflow-hidden border border-[#E5E7EB]">
            <InteractiveMap height="130px" showControls={false} />
          </div>
        </div>

        {/* Final Action Buttons: Publicar, Salvar Rascunho, Cancelar */}
        <div className="pt-6 space-y-2.5 pb-8 border-t border-gray-100">
          {/* Botão Principal: Publicar Evento */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Publicando...' : 'Publicar Evento'}</span>
          </button>

          {/* Botão Secundário: Salvar como Rascunho */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50/50 active:scale-98 text-[#1B4323] font-bold text-[13.5px] border-2 border-[#1B4323] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>Salvar como Rascunho (Não Publicado)</span>
          </button>

          {/* Botão Cancelar */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => navigateTo('admin_events')}
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
                <h3 className="text-sm font-bold text-[#1A202C]">Imagem do Evento</h3>
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
                  placeholder="https://exemplo.com/evento.jpg"
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
