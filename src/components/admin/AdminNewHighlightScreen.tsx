import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  Flame,
  Star,
  Sparkles,
  Camera,
  Upload,
  Save,
  Send,
  X,
  AlertCircle,
  Tag,
  ChevronRight,
  Bookmark,
  Share2,
  Store,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DEFAULT_HIGHLIGHT_TAGS = [
  'Destaque da Semana',
  'Top Recomendado',
  'Mais Bem Avaliado',
  'Queridinho da Comunidade',
  'Novidade no Bairro',
  'Mais Votado'
];

const PRESET_HIGHLIGHT_IMAGES = [
  {
    label: 'Gastronomia & Padaria',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop'
  },
  {
    label: 'Restaurante & Buffet',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    label: 'Café & Confeitaria',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    label: 'Pet Shop & Serviços',
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop'
  },
  {
    label: 'Saúde & Bem-Estar',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop'
  },
  {
    label: 'Comércio & Flores',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1000&auto=format&fit=crop'
  }
];

export const AdminNewHighlightScreen: React.FC = () => {
  const { navigateTo, createAdminHighlight, showSuccessModal, establishments } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states placed directly in their visual positions matching the public Highlight layout
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tag, setTag] = useState('Destaque da Semana');
  const [customTag, setCustomTag] = useState('');
  const [highlightReason, setHighlightReason] = useState('');
  const [rating, setRating] = useState<string>('4.8');
  const [imageUrl, setImageUrl] = useState(PRESET_HIGHLIGHT_IMAGES[0].url);
  const [establishmentId, setEstablishmentId] = useState<string>('');

  // UI state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When an establishment is picked from the quick select, auto-populate helper
  const handleSelectEstablishment = (id: string) => {
    setEstablishmentId(id);
    if (!id) return;
    const est = establishments.find(e => e.id === id);
    if (est) {
      if (!title) setTitle(est.name);
      if (!subtitle) setSubtitle(`${est.category} • ${est.neighborhood || 'Bairro'}`);
      if (est.imageUrl && !imageUrl) setImageUrl(est.imageUrl);
      if (est.rating) setRating(est.rating.toFixed(1));
    }
  };

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

  const parsedRating = rating.trim() ? parseFloat(rating.replace(',', '.')) : undefined;
  const activeTag = tag === 'Outro' ? customTag.trim() || 'Destaque' : tag;

  const handleSave = async (publishImmediately: boolean) => {
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Por favor, informe o título ou nome do local em destaque.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!highlightReason.trim()) {
      setErrorMessage('Por favor, preencha a justificativa ("Por que é destaque").');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      await createAdminHighlight({
        title: title.trim(),
        subtitle: subtitle.trim() || '',
        tag: activeTag,
        highlightReason: highlightReason.trim(),
        rating: parsedRating && !isNaN(parsedRating) ? parsedRating : undefined,
        imageUrl: imageUrl || PRESET_HIGHLIGHT_IMAGES[0].url,
        establishmentId: establishmentId.trim() || undefined,
        published: publishImmediately
      });

      showSuccessModal(
        publishImmediately ? 'Destaque Publicado!' : 'Rascunho Salvo!',
        publishImmediately
          ? `O destaque "${title}" foi publicado com sucesso e já está em evidência para a comunidade.`
          : `O destaque "${title}" foi salvo como rascunho.`,
        'Ver Destaques',
        () => navigateTo('admin_highlights')
      );
    } catch {
      setErrorMessage('Ocorreu um erro ao salvar o destaque. Tente novamente.');
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
            onClick={() => navigateTo('admin_highlights')}
            className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Voltar para Destaques"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-300" />
            <span className="text-xs font-bold tracking-tight">Novo Destaque do Bairro</span>
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

      {/* Main Container */}
      <main className="px-4 py-4 space-y-4 max-w-md mx-auto">
        {/* Quick Link with Registered Establishment (Helper) */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D5A27] flex items-center gap-1.5">
              <Store size={14} />
              <span>Vincular Estabelecimento Cadastrado (Opcional)</span>
            </label>
          </div>
          <select
            value={establishmentId}
            onChange={e => handleSelectEstablishment(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8FAF8] text-xs font-medium text-[#2D3436] rounded-xl border border-[#CBD5E1] focus:outline-none focus:border-[#2D5A27] cursor-pointer"
          >
            <option value="">-- Nenhum (Destaque avulso ou livre) --</option>
            {establishments.map(est => (
              <option key={est.id} value={est.id}>
                {est.name} ({est.category})
              </option>
            ))}
          </select>
          <p className="text-[10.5px] text-[#718096]">
            Ao selecionar um estabelecimento, o clique no destaque redirecionará o morador diretamente para a página de detalhes dele.
          </p>
        </div>

        {/* Public Screen Intro Banner preview */}
        <div className="p-4 rounded-[24px] bg-white border border-[#F0F0F0] shadow-sm text-[#2D3436] space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
            <Sparkles size={14} className="text-amber-500" />
            <span>Em Evidência na Comunidade</span>
          </div>
          <p className="text-xs text-[#636E72] leading-relaxed">
            Prévia de como este destaque será exibido na listagem de Destaques do Bairro e na Comunidade.
          </p>
        </div>

        {/* ========================================================
            CARD DO DESTAQUE: REPRODUÇÃO EXATA DA TELA PÚBLICA DE DESTAQUE
            COM CAMPOS DIRETAMENTE EM MODO DE PREENCHIMENTO VISUAL
           ======================================================== */}
        <div className="bg-white rounded-[28px] border-2 border-[#2D5A27]/25 shadow-md overflow-hidden relative group">
          {/* Cover Image & Overlays */}
          <div className="relative h-48 w-full bg-slate-900 group">
            <img
              src={imageUrl}
              alt={title || 'Prévia do Destaque'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Tag / Selo do Destaque (Flame Tag) - Top Left (Exact Public Position) */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#2D3436] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 z-10">
              <Flame size={14} className="text-amber-500 fill-amber-500 shrink-0" />
              <select
                value={tag}
                onChange={e => setTag(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#2D3436] focus:outline-none cursor-pointer pr-1"
              >
                {DEFAULT_HIGHLIGHT_TAGS.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
                <option value="Outro">+ Personalizar Selo</option>
              </select>
            </div>

            {/* Custom tag input if "Outro" selected */}
            {tag === 'Outro' && (
              <div className="absolute top-12 left-3 z-20">
                <input
                  type="text"
                  value={customTag}
                  onChange={e => setCustomTag(e.target.value)}
                  placeholder="Nome do selo (ex: Mais Votado)"
                  className="px-2.5 py-1 text-[11px] font-bold bg-white text-[#2D3436] rounded-lg shadow-md border border-amber-300 focus:outline-none"
                />
              </div>
            )}

            {/* Rating Badge (Star + Note) - Top Right (Exact Public Position - Optional) */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
              {/* Optional Rating Input / Display */}
              <div className="bg-black/75 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star size={13} className="fill-amber-400 text-amber-400 shrink-0" />
                <input
                  type="text"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  placeholder="Nota (opc)"
                  title="Nota de avaliação (deixe em branco se não houver)"
                  className="w-8 bg-transparent text-xs font-bold text-white placeholder:text-gray-300 text-center focus:outline-none"
                />
              </div>
            </div>

            {/* Change Cover Photo Button */}
            <button
              type="button"
              onClick={() => setIsPhotoModalOpen(true)}
              className="absolute bottom-3 right-3 bg-black/75 hover:bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-md z-20 cursor-pointer border border-white/20 active:scale-95"
            >
              <Camera size={14} className="text-emerald-300" />
              <span>Trocar Foto</span>
            </button>
          </div>

          {/* Card Body (Exact Public Structure) */}
          <div className="p-4 space-y-3">
            {/* Title & Subtitle in-place inputs */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D5A27] block">
                Título / Nome do Destaque *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Padaria Cantinho do Pão ou Feira Noturna"
                className="w-full text-base font-bold text-[#2D3436] bg-transparent border-b border-dashed border-[#CBD5E1] focus:border-[#2D5A27] focus:outline-none placeholder:text-gray-400 py-0.5"
              />

              <label className="text-[10px] font-semibold text-[#718096] uppercase tracking-wider block pt-1">
                Subtítulo / Elogio Principal (Opcional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="Ex: Eleito o melhor pão artesanal e café pelo bairro"
                className="w-full text-xs font-semibold text-[#2D5A27] bg-transparent border-b border-dashed border-[#CBD5E1] focus:border-[#2D5A27] focus:outline-none placeholder:text-gray-400 py-0.5"
              />
            </div>

            {/* Highlight Reason / Por que é destaque (Exact Public Layout) */}
            <div className="space-y-1 pt-1">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436] flex items-center gap-1">
                <span>💡 Por que é destaque: *</span>
              </label>
              <div className="bg-[#F1F3F0] p-3 rounded-2xl border border-[#E5E7EB]">
                <textarea
                  value={highlightReason}
                  onChange={e => setHighlightReason(e.target.value)}
                  placeholder="Descreva a razão do destaque (ex: Mais de 120 avaliações com nota média 4.8 na comunidade, atendimento acolhedor e produtos frescos)..."
                  rows={3}
                  className="w-full text-xs text-[#2D3436] leading-relaxed bg-transparent focus:outline-none placeholder:text-gray-400 resize-none font-medium"
                />
              </div>
            </div>

            {/* Bottom Link & Public Action Buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-[#F0F0F0] text-xs font-bold text-[#2D5A27]">
              <div className="flex items-center gap-1">
                <span>Ver detalhes do local</span>
                <ChevronRight size={15} />
              </div>

              {/* Save & Share actions (Content actions) */}
              <div className="flex items-center gap-2">
                <div
                  className="p-1.5 rounded-full bg-[#F8F9F5] text-[#2D3436] hover:bg-[#EDF3EE] transition-colors cursor-default"
                  title="Salvar destaque (Prévia do usuário)"
                >
                  <Bookmark size={15} />
                </div>
                <div
                  className="p-1.5 rounded-full bg-[#F8F9F5] text-[#2D3436] hover:bg-[#EDF3EE] transition-colors cursor-default"
                  title="Compartilhar destaque (Prévia do usuário)"
                >
                  <Share2 size={15} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Composition Notice */}
        <div className="bg-[#EDF3EE] border border-[#2D5A27]/20 rounded-2xl p-3 text-xs text-[#2D3436] flex items-start gap-2">
          <Sparkles size={16} className="text-[#2D5A27] shrink-0 mt-0.5" />
          <p className="text-[11.5px] leading-relaxed">
            <strong>Composição dinâmica:</strong> O selo e o motivo do destaque são ajustados automaticamente. Se a nota de avaliação for preenchida, o selo com a estrela aparecerá no canto superior da imagem; se estiver vazia, o selo não será exibido.
          </p>
        </div>

        {/* Admin Action Buttons: Publicar, Salvar Rascunho, Cancelar */}
        <div className="pt-4 space-y-2.5 pb-8 border-t border-gray-100">
          {/* Botão Principal: Publicar Destaque */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Publicando...' : 'Publicar Destaque'}</span>
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
              onClick={() => navigateTo('admin_highlights')}
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
                <h3 className="text-sm font-bold text-[#1A202C]">Foto do Destaque</h3>
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
                  placeholder="https://exemplo.com/destaque.jpg"
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

            {/* Option 3: Presets */}
            <div>
              <label className="block text-xs font-bold text-[#4A5568] mb-1.5">
                3. Fotos de exemplo sugeridas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_HIGHLIGHT_IMAGES.map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setImageUrl(item.url);
                      setIsPhotoModalOpen(false);
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-20 ${
                      imageUrl === item.url ? 'border-[#1B4323] ring-2 ring-emerald-300' : 'border-transparent'
                    }`}
                  >
                    <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/65 text-[9.5px] font-bold text-white text-center py-0.5 truncate px-1">
                      {item.label}
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
