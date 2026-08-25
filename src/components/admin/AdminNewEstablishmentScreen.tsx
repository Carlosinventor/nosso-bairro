import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  Heart,
  Share2,
  Navigation,
  Phone,
  Globe,
  Instagram,
  Clock,
  MapPin,
  Camera,
  Star,
  Check,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Save,
  Send,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = [
  'Padaria',
  'Restaurante',
  'Farmácia',
  'Mercado',
  'Pet Shop',
  'Cafeteria',
  'Salão de Beleza',
  'Academia',
  'Serviços'
];

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  Padaria: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
  Restaurante: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
  Farmácia: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop',
  Mercado: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000&auto=format&fit=crop',
  'Pet Shop': 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=1000&auto=format&fit=crop',
  Cafeteria: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
  'Salão de Beleza': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
  Academia: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
  Serviços: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop'
};

export const AdminNewEstablishmentScreen: React.FC = () => {
  const { navigateTo, createAdminEstablishment, showSuccessModal } = useApp();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states placed directly in the layout positions
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Padaria');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('Seg a Sáb: 6h às 20h | Dom: 7h às 13h');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [rating, setRating] = useState(5.0);
  const [imageUrl, setImageUrl] = useState(DEFAULT_CATEGORY_IMAGES['Padaria']);
  const [photos, setPhotos] = useState<string[]>([]);
  const [features, setFeatures] = useState({
    delivery: true,
    breakfast: false,
    acceptsPix: true,
    parking: false,
    accessible: true,
    wifi: true,
    petFriendly: false,
    outdoorSeating: false
  });

  // UI state for photo picker modal / contact expansions
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [activeContactField, setActiveContactField] = useState<'phone' | 'website' | 'instagram' | 'whatsapp' | null>(null);
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
          if (!photos.includes(reader.result)) {
            setPhotos(prev => [reader.result as string, ...prev]);
          }
          setIsPhotoModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (publishImmediately: boolean) => {
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, informe o nome do estabelecimento.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Por favor, preencha o endereço de localização.');
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const finalPhotos = photos.length > 0 ? photos : [imageUrl];

      await createAdminEstablishment({
        name: name.trim(),
        category,
        subCategory: category,
        description: description.trim() || `${name.trim()} - Estabelecimento verificado no bairro com excelente atendimento.`,
        address: address.trim(),
        neighborhood: 'Centro / Bairro Principal',
        distanceMeters: Math.floor(Math.random() * 600) + 150,
        latitude: -23.5505,
        longitude: -46.6333,
        phone: phone.trim(),
        hours: hours.trim() || 'Seg a Sáb: 7h às 19h',
        isOpenNow: true,
        rating: rating || 5.0,
        reviewsCount: 1,
        imageUrl: imageUrl || DEFAULT_CATEGORY_IMAGES[category] || DEFAULT_CATEGORY_IMAGES['Padaria'],
        photos: finalPhotos,
        published: publishImmediately,
        socialLinks: {
          website: website.trim() || undefined,
          instagram: instagram.trim() ? (instagram.startsWith('@') ? instagram : `@${instagram}`) : undefined,
          whatsapp: whatsapp.trim() || undefined
        },
        features,
        addedByUserId: user?.id || 'admin'
      });

      showSuccessModal(
        publishImmediately ? 'Estabelecimento Publicado!' : 'Rascunho Salvo!',
        publishImmediately
          ? `O estabelecimento "${name}" foi cadastrado e já está disponível para os moradores no aplicativo.`
          : `O estabelecimento "${name}" foi salvo com sucesso na sua lista de rascunhos.`,
        'Ver Estabelecimentos',
        () => navigateTo('admin_establishments')
      );
    } catch (err: any) {
      setErrorMessage('Ocorreu um erro ao salvar o estabelecimento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 animate-fadeIn font-sans select-none">
      {/* Top Floating Admin Notice Header Bar */}
      <div className="bg-[#1B3F18] text-white px-4 py-2.5 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateTo('admin_establishments')}
            className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Voltar para Estabelecimentos"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-300" />
            <span className="text-xs font-bold tracking-tight">Novo Estabelecimento</span>
          </div>
        </div>

        <span className="text-[10.5px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
          Montagem Visual em Tempo Real
        </span>
      </div>

      {/* Validation alert banner */}
      {errorMessage && (
        <div className="bg-rose-50 border-b border-rose-200 p-3 px-4 flex items-center gap-2 text-rose-700 text-xs font-bold animate-fadeIn">
          <AlertCircle size={16} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Hero Image Container (Matching Public Layout) */}
      <div className="relative w-full h-[280px] sm:h-[320px] bg-gray-900 group">
        <img
          src={imageUrl}
          alt={name || 'Prévia do Estabelecimento'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/40 pointer-events-none" />

        {/* Top Floating Controls (Matching Public Layout) */}
        <div className="absolute top-3 left-0 right-0 px-4 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={() => navigateTo('admin_establishments')}
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1A202C] flex items-center justify-center shadow-md backdrop-blur-xs transition-all cursor-pointer"
            title="Cancelar e Voltar"
          >
            <ChevronLeft size={24} className="stroke-[2.5] -ml-0.5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/85 text-[#1A202C] flex items-center justify-center shadow-md backdrop-blur-xs opacity-70 cursor-default" title="Compartilhar (Prévia)">
              <Share2 size={19} className="text-[#1A202C]" />
            </div>

            <div className="w-10 h-10 rounded-full bg-white/85 text-[#1A202C] flex items-center justify-center shadow-md backdrop-blur-xs opacity-70 cursor-default" title="Favoritar (Prévia)">
              <Heart size={20} className="text-[#1A202C]" />
            </div>
          </div>
        </div>

        {/* Photo Upload & Change Overlay Trigger */}
        <button
          type="button"
          onClick={() => setIsPhotoModalOpen(true)}
          className="absolute bottom-4 right-4 bg-black/75 hover:bg-black/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-lg z-20 cursor-pointer border border-white/20 active:scale-95"
        >
          <Camera size={15} className="text-emerald-300" />
          <span>Alterar Foto Principal</span>
        </button>

        {/* Quick hint badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white/90 px-2.5 py-1 rounded-lg text-[10.5px] font-medium hidden sm:flex items-center gap-1.5 pointer-events-none">
          <span>Foto de capa pública</span>
        </div>
      </div>

      {/* 2. Main Content Area (Exact public spacing & hierarchy) */}
      <div className="max-w-md mx-auto px-5 pt-4 space-y-4">
        {/* Title: In-place editable Name */}
        <div className="relative">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#1B3F18] block mb-0.5">
            Nome do Estabelecimento *
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ex: Padaria Central do Bairro"
            className="w-full text-[22px] sm:text-[24px] font-extrabold text-[#1A202C] leading-snug tracking-tight bg-transparent border-b-2 border-dashed border-[#1B3F18]/40 focus:border-[#1B3F18] focus:outline-none placeholder:text-gray-400 py-1"
          />
        </div>

        {/* Tags: Category Selector & Verified Badge */}
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#718096]">Categoria:</span>
            <select
              value={category}
              onChange={e => {
                const newCat = e.target.value;
                setCategory(newCat);
                if (DEFAULT_CATEGORY_IMAGES[newCat]) {
                  setImageUrl(DEFAULT_CATEGORY_IMAGES[newCat]);
                }
              }}
              className="text-[13px] font-bold text-[#1B4323] bg-[#EDF3EE] hover:bg-[#E0ECE2] px-3 py-1 rounded-lg border border-[#1B4323]/30 focus:outline-none focus:border-[#1B4323] cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <span className="flex items-center gap-1 text-[13px] font-semibold text-[#1B4323] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 size={15} className="fill-[#1B4323] text-white" />
            <span>Verificada</span>
          </span>
        </div>

        {/* Rating Row (In-place editable initial rating) */}
        <div className="flex items-center gap-2 mt-2 pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1.5 bg-[#FFF9E6] px-2.5 py-1 rounded-lg border border-amber-200">
            <Star size={17} className="fill-[#F5A623] text-[#F5A623]" />
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={rating}
              onChange={e => setRating(parseFloat(e.target.value) || 5.0)}
              className="w-10 text-[14px] font-bold text-[#1A202C] bg-transparent text-center focus:outline-none"
            />
          </div>
          <span className="text-[12px] text-[#718096] font-medium">
            (Nota e avaliação inicial de exibição)
          </span>
        </div>

        {/* 3. Action Circle Buttons Row (Exact 5 public buttons + contact expansion) */}
        <div className="pt-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#718096] block mb-2">
            Ações e Canais de Contato
          </span>

          <div className="flex items-start justify-between px-1 gap-1">
            {/* 1. Como chegar */}
            <button
              type="button"
              onClick={() => setActiveContactField(null)}
              className="flex flex-col items-center group cursor-pointer w-16"
            >
              <div className="w-12 h-12 rounded-full bg-[#EDF3EE] group-hover:bg-[#E0ECE2] flex items-center justify-center transition-all">
                <Navigation size={20} className="text-[#1B4323] -rotate-45" />
              </div>
              <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
                Como chegar
              </span>
            </button>

            {/* 2. Ligar */}
            <button
              type="button"
              onClick={() => setActiveContactField(activeContactField === 'phone' ? null : 'phone')}
              className="flex flex-col items-center group cursor-pointer w-16"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeContactField === 'phone' || phone
                  ? 'bg-[#1B4323] text-white shadow-xs'
                  : 'bg-[#EDF3EE] text-[#1B4323] group-hover:bg-[#E0ECE2]'
              }`}>
                <Phone size={19} />
              </div>
              <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
                Ligar
              </span>
            </button>

            {/* 3. Site */}
            <button
              type="button"
              onClick={() => setActiveContactField(activeContactField === 'website' ? null : 'website')}
              className="flex flex-col items-center group cursor-pointer w-16"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeContactField === 'website' || website
                  ? 'bg-[#1B4323] text-white shadow-xs'
                  : 'bg-[#EDF3EE] text-[#1B4323] group-hover:bg-[#E0ECE2]'
              }`}>
                <Globe size={20} />
              </div>
              <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
                Site
              </span>
            </button>

            {/* 4. Redes sociais */}
            <button
              type="button"
              onClick={() => setActiveContactField(activeContactField === 'instagram' ? null : 'instagram')}
              className="flex flex-col items-center group cursor-pointer w-16"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeContactField === 'instagram' || instagram || whatsapp
                  ? 'bg-[#1B4323] text-white shadow-xs'
                  : 'bg-[#EDF3EE] text-[#1B4323] group-hover:bg-[#E0ECE2]'
              }`}>
                <Instagram size={20} />
              </div>
              <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
                Redes sociais
              </span>
            </button>

            {/* 5. Favoritar */}
            <div className="flex flex-col items-center opacity-80 cursor-default w-16">
              <div className="w-12 h-12 rounded-full bg-[#EDF3EE] flex items-center justify-center">
                <Heart size={20} className="text-[#1B4323]" />
              </div>
              <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
                Favoritar
              </span>
            </div>
          </div>

          {/* Quick Contact Input Fields corresponding to the buttons above */}
          <div className="mt-3.5 p-3.5 bg-[#F8FAF8] rounded-2xl border border-[#E2E8F0] space-y-2.5">
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-[#1B4323] shrink-0" />
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Telefone / WhatsApp (ex: (11) 98765-4321)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#1A202C] focus:outline-none focus:border-[#1B4323]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Globe size={15} className="text-[#1B4323] shrink-0" />
              <input
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="Website (ex: https://www.seuestabelecimento.com.br)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#1A202C] focus:outline-none focus:border-[#1B4323]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Instagram size={15} className="text-[#1B4323] shrink-0" />
              <input
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                placeholder="Instagram (ex: @padariacentral)"
                className="w-full bg-white border border-[#CBD5E1] rounded-xl px-3 py-1.5 text-xs text-[#1A202C] focus:outline-none focus:border-[#1B4323]"
              />
            </div>
          </div>
        </div>

        {/* 4. "Sobre o local" Section (Matching Public Layout) */}
        <div className="mt-6 space-y-3.5 pt-2 border-t border-gray-100">
          <h2 className="text-[15px] font-bold text-[#1A202C] flex items-center justify-between">
            <span>Sobre o local</span>
            <span className="text-[10px] font-normal text-[#718096]">Apresentação aos moradores</span>
          </h2>

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descreva o estabelecimento: produtos artesanais, especialidades da casa, estacionamento próprio, diferenciais e ambiente..."
            rows={3}
            className="w-full text-[13px] text-[#4A5568] leading-relaxed bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl p-3 focus:outline-none focus:border-[#1B4323] placeholder:text-gray-400"
          />

          {/* Address Line (Matching Public Layout) */}
          <div className="flex items-center gap-3 pt-1 text-[#1A202C]">
            <div className="w-6 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#1B4323]" />
            </div>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Endereço completo (ex: Rua das Flores, 120 - Centro) *"
              className="flex-1 text-[13px] text-[#2D3748] bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl px-3 py-2 focus:outline-none focus:border-[#1B4323]"
              required
            />
          </div>

          {/* Opening Hours Line (Matching Public Layout) */}
          <div className="flex items-center gap-3 text-[#1A202C]">
            <div className="w-6 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-[#1B4323]" />
            </div>
            <input
              type="text"
              value={hours}
              onChange={e => setHours(e.target.value)}
              placeholder="Horário de funcionamento (ex: Seg a Sáb: 6h às 20h | Dom: 7h às 13h)"
              className="flex-1 text-[13px] text-[#2D3748] bg-[#F8FAF8] border border-dashed border-[#CBD5E1] rounded-xl px-3 py-2 focus:outline-none focus:border-[#1B4323]"
            />
          </div>
        </div>

        {/* 5. Comodidades & Recursos (Features) */}
        <div className="pt-2">
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#718096] block mb-2">
            Comodidades & Diferenciais
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] cursor-pointer hover:bg-emerald-50/50">
              <input
                type="checkbox"
                checked={features.delivery}
                onChange={e => setFeatures(f => ({ ...f, delivery: e.target.checked }))}
                className="accent-[#1B4323] w-4 h-4 rounded"
              />
              <span className="text-[#2D3436] font-medium">Faz Entregas</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] cursor-pointer hover:bg-emerald-50/50">
              <input
                type="checkbox"
                checked={features.acceptsPix}
                onChange={e => setFeatures(f => ({ ...f, acceptsPix: e.target.checked }))}
                className="accent-[#1B4323] w-4 h-4 rounded"
              />
              <span className="text-[#2D3436] font-medium">Aceita Pix</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] cursor-pointer hover:bg-emerald-50/50">
              <input
                type="checkbox"
                checked={features.parking}
                onChange={e => setFeatures(f => ({ ...f, parking: e.target.checked }))}
                className="accent-[#1B4323] w-4 h-4 rounded"
              />
              <span className="text-[#2D3436] font-medium">Estacionamento</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] cursor-pointer hover:bg-emerald-50/50">
              <input
                type="checkbox"
                checked={features.wifi}
                onChange={e => setFeatures(f => ({ ...f, wifi: e.target.checked }))}
                className="accent-[#1B4323] w-4 h-4 rounded"
              />
              <span className="text-[#2D3436] font-medium">Wi-Fi Gratuito</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] cursor-pointer hover:bg-emerald-50/50">
              <input
                type="checkbox"
                checked={features.petFriendly}
                onChange={e => setFeatures(f => ({ ...f, petFriendly: e.target.checked }))}
                className="accent-[#1B4323] w-4 h-4 rounded"
              />
              <span className="text-[#2D3436] font-medium">Pet Friendly</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F8FAF8] border border-[#E2E8F0] cursor-pointer hover:bg-emerald-50/50">
              <input
                type="checkbox"
                checked={features.accessible}
                onChange={e => setFeatures(f => ({ ...f, accessible: e.target.checked }))}
                className="accent-[#1B4323] w-4 h-4 rounded"
              />
              <span className="text-[#2D3436] font-medium">Acessibilidade</span>
            </label>
          </div>
        </div>

        {/* 6. Ações Finais Obrigatórias: Cancelar, Salvar e Publicar */}
        <div className="pt-6 space-y-2.5 pb-8 border-t border-gray-100">
          {/* Botão Principal: Publicar Estabelecimento */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Salvando no Supabase...' : 'Publicar Estabelecimento'}</span>
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
              onClick={() => navigateTo('admin_establishments')}
              className="text-xs font-bold text-[#718096] hover:text-rose-600 transition-colors cursor-pointer py-1.5 px-3"
            >
              Cancelar Cadastro
            </button>
          </div>
        </div>
      </div>

      {/* Photo Picker Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-[#E2E8F0] animate-scaleUp space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-[#1B4323]" />
                <h3 className="text-sm font-bold text-[#1A202C]">Foto do Estabelecimento</h3>
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
                      setPhotos(prev => [tempImageUrl.trim(), ...prev]);
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
                3. Fotos de exemplo sugeridas para {category}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(DEFAULT_CATEGORY_IMAGES).slice(0, 6).map(([cat, url]) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setImageUrl(url);
                      setPhotos(prev => [url, ...prev]);
                      setIsPhotoModalOpen(false);
                    }}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-16 ${
                      imageUrl === url ? 'border-[#1B4323] ring-2 ring-emerald-300' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt={cat} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9.5px] font-bold text-white text-center py-0.5 truncate px-1">
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
