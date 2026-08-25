import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Bookmark,
  Share2,
  MapPin,
  Camera,
  Upload,
  Image as ImageIcon,
  Save,
  Send,
  X,
  Sparkles,
  AlertCircle,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = [
  'Aviso Comunitário',
  'Nova Abertura',
  'Cultura & Lazer',
  'Melhorias'
];

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  'Aviso Comunitário': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1000&auto=format&fit=crop',
  'Nova Abertura': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
  'Cultura & Lazer': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
  'Melhorias': 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1000&auto=format&fit=crop'
};

export const AdminNewNewsScreen: React.FC = () => {
  const { navigateTo, createAdminNews, showSuccessModal } = useApp();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states placed directly in their layout positions
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Aviso Comunitário');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(user?.name || 'Associação de Moradores');
  const [date, setDate] = useState('Hoje');
  const [readTime, setReadTime] = useState('3 min');
  const [imageUrl, setImageUrl] = useState(DEFAULT_CATEGORY_IMAGES['Aviso Comunitário']);

  // Practical optional fields (Local/Endereço, Data, Horário)
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [time, setTime] = useState('');

  // UI state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setErrorMessage('Por favor, informe o título da novidade.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!summary.trim() && !content.trim()) {
      setErrorMessage('Por favor, preencha o resumo ou o conteúdo da novidade.');
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      await createAdminNews({
        title: title.trim(),
        category,
        summary: summary.trim() || title.trim(),
        content: content.trim() || summary.trim() || title.trim(),
        imageUrl: imageUrl || DEFAULT_CATEGORY_IMAGES[category] || DEFAULT_CATEGORY_IMAGES['Aviso Comunitário'],
        date: date.trim() || 'Hoje',
        author: author.trim() || 'Comunidade do Bairro',
        readTime: readTime.trim() || '2 min',
        location: location.trim() || undefined,
        address: location.trim() || undefined,
        eventDate: eventDate.trim() || undefined,
        time: time.trim() || undefined,
        published: publishImmediately
      });

      showSuccessModal(
        publishImmediately ? 'Novidade Publicada!' : 'Rascunho Salvo!',
        publishImmediately
          ? `A novidade "${title}" foi publicada e já está disponível para os moradores na aba Comunidade.`
          : `A novidade "${title}" foi salva como rascunho com sucesso.`,
        'Ver Novidades',
        () => navigateTo('admin_news')
      );
    } catch {
      setErrorMessage('Ocorreu um erro ao salvar a novidade. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check which practical info is present
  const hasPracticalInfo = Boolean(location.trim() || eventDate.trim() || time.trim());

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-32 animate-fadeIn font-sans select-none">
      {/* Top Floating Admin Header Bar */}
      <div className="bg-[#1B3F18] text-white px-4 py-2.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateTo('admin_news')}
            className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Voltar para Novidades"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-300" />
            <span className="text-xs font-bold tracking-tight">Nova Novidade</span>
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

      {/* Article Header Cover (Exact Public Structure) */}
      <div className="relative h-60 sm:h-72 w-full bg-[#1E3F1A] group">
        <img
          src={imageUrl}
          alt={title || 'Prévia da Imagem'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

        {/* Back Button (Exact Public Position) */}
        <button
          type="button"
          onClick={() => navigateTo('admin_news')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md hover:bg-white cursor-pointer z-10"
          title="Cancelar e Voltar"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Top Right Actions: Save & Share (Exact Public Actions) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <div
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md opacity-80 cursor-default"
            title="Salvar novidade (Prévia do usuário)"
          >
            <Bookmark size={18} className="text-[#2D3436]" />
          </div>
          <div
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#2D3436] flex items-center justify-center shadow-md opacity-80 cursor-default"
            title="Compartilhar novidade (Prévia do usuário)"
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
          <span>Alterar Imagem de Capa</span>
        </button>

        {/* Quick hint badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white/90 px-2.5 py-1 rounded-lg text-[10.5px] font-medium hidden sm:flex items-center gap-1.5 pointer-events-none">
          <span>Imagem principal da matéria</span>
        </div>
      </div>

      {/* Main Content Area (Exact public layout & hierarchy) */}
      <main className="px-4 py-5 space-y-4 -mt-4 bg-white rounded-t-[32px] shadow-sm relative z-10 border-t border-[#E5E7EB] max-w-md mx-auto">
        {/* Meta Info Bar: Category + Date + ReadTime */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={category}
            onChange={e => {
              const newCat = e.target.value;
              setCategory(newCat);
              if (DEFAULT_CATEGORY_IMAGES[newCat]) {
                setImageUrl(DEFAULT_CATEGORY_IMAGES[newCat]);
              }
            }}
            className="px-3 py-1 bg-[#F1F3F0] text-[#2D5A27] text-[11px] font-bold rounded-full border border-[#2D5A27]/20 focus:outline-none cursor-pointer"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <span className="text-xs text-[#95A5A6]">•</span>

          <div className="text-xs text-[#636E72] flex items-center gap-1 bg-[#F8FAF8] px-2 py-0.5 rounded-md border border-[#E2E8F0]">
            <Calendar size={12} className="text-[#2D5A27] shrink-0" />
            <input
              type="text"
              value={date}
              onChange={e => setDate(e.target.value)}
              placeholder="Data (ex: Hoje)"
              className="w-16 bg-transparent text-xs text-[#636E72] focus:outline-none"
            />
          </div>

          <span className="text-xs text-[#95A5A6]">•</span>

          <div className="text-xs text-[#636E72] flex items-center gap-1 bg-[#F8FAF8] px-2 py-0.5 rounded-md border border-[#E2E8F0]">
            <Clock size={12} className="text-[#2D5A27] shrink-0" />
            <input
              type="text"
              value={readTime}
              onChange={e => setReadTime(e.target.value)}
              placeholder="Tempo de leitura"
              className="w-20 bg-transparent text-xs text-[#636E72] focus:outline-none"
            />
          </div>
        </div>

        {/* Title: In-place editable headline */}
        <div className="relative">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D5A27] block mb-0.5">
            Título da Matéria *
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Nova Feira de Orgânicos da Praça Central"
            className="w-full text-xl font-bold text-[#2D3436] leading-snug bg-transparent border-b-2 border-dashed border-[#2D5A27]/40 focus:border-[#2D5A27] focus:outline-none placeholder:text-gray-400 py-1"
          />
        </div>

        {/* Author Line */}
        <div className="flex items-center gap-2 py-2.5 border-y border-[#F0F0F0] text-xs text-[#636E72]">
          <User size={14} className="text-[#2D5A27] shrink-0" />
          <span>Publicado por:</span>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Autor ou organização (ex: Associação de Moradores)"
            className="flex-1 font-bold text-[#2D3436] bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-[#2D5A27] px-1"
          />
        </div>

        {/* Summary & Content Textareas */}
        <div className="text-[#2D3436] space-y-3 leading-relaxed text-sm">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#718096] block mb-1">
              Resumo / Destaque Principal
            </label>
            <textarea
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Resumo que aparece no cartão da novidade e na introdução em destaque..."
              rows={2}
              className="w-full font-semibold text-[#2D3436] text-sm leading-relaxed bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl p-3 focus:outline-none focus:border-[#2D5A27] placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#718096] block mb-1">
              Conteúdo Completo da Notícia
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Escreva todos os detalhes, orientações, contexto e informações relevantes para os vizinhos..."
              rows={5}
              className="w-full text-[#636E72] text-sm leading-relaxed bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl p-3 focus:outline-none focus:border-[#2D5A27] placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Practical Information Section (Local/Endereço, Data, Horário) with Dynamic Self-organizing Layout */}
        <div className="pt-2 border-t border-[#F0F0F0] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1B3F18] flex items-center gap-1.5">
              <Info size={14} className="text-[#2D5A27]" />
              <span>Informações Práticas (Opcional)</span>
            </span>
            <span className="text-[10px] text-[#718096]">
              Preencha apenas se aplicável
            </span>
          </div>

          <p className="text-[11.5px] text-[#718096] leading-relaxed">
            Se a novidade envolver um evento, inauguração ou encontro com local e hora marcados, informe abaixo. Se deixar vazio, não ocupará espaço na publicação.
          </p>

          <div className="space-y-2 bg-[#F8FAF8] p-3.5 rounded-2xl border border-[#E2E8F0]">
            {/* 1. Local / Endereço */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <MapPin size={14} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Local / Endereço (ex: Praça Central, Rua das Flores 100)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#1A202C] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* 2. Data do Acontecimento */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <Calendar size={14} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                placeholder="Data do acontecimento (ex: Todos os Sábados ou 28 de Outubro)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#1A202C] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>

            {/* 3. Horário */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                <Clock size={14} className="text-[#2D5A27]" />
              </div>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="Horário (ex: das 8h às 14h)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#1A202C] focus:outline-none focus:border-[#2D5A27]"
              />
            </div>
          </div>

          {/* Dynamic Live Visual Box showing how practical info seamlessly organizes when filled */}
          {hasPracticalInfo && (
            <div className="bg-[#EDF3EE] border border-[#2D5A27]/25 rounded-2xl p-3.5 space-y-2 animate-fadeIn">
              <span className="text-[10px] font-bold text-[#2D5A27] uppercase tracking-wider block">
                Visualização das Informações Práticas
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {location.trim() && (
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#2D5A27]/20 text-[#2D3436] font-medium shadow-2xs">
                    <MapPin size={13} className="text-[#2D5A27]" />
                    <span>{location}</span>
                  </div>
                )}
                {eventDate.trim() && (
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#2D5A27]/20 text-[#2D3436] font-medium shadow-2xs">
                    <Calendar size={13} className="text-[#2D5A27]" />
                    <span>{eventDate}</span>
                  </div>
                )}
                {time.trim() && (
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#2D5A27]/20 text-[#2D3436] font-medium shadow-2xs">
                    <Clock size={13} className="text-[#2D5A27]" />
                    <span>{time}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Final Action Buttons: Publicar, Salvar Rascunho, Cancelar */}
        <div className="pt-6 space-y-2.5 pb-8 border-t border-gray-100">
          {/* Botão Principal: Publicar */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Publicando...' : 'Publicar Novidade'}</span>
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
              onClick={() => navigateTo('admin_news')}
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
                <h3 className="text-sm font-bold text-[#1A202C]">Imagem da Novidade</h3>
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
                  placeholder="https://exemplo.com/imagem.jpg"
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

            {/* Option 3: Category Presets */}
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
