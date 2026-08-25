import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReviewModal } from './ReviewModal';

export const EstablishmentDetailScreen: React.FC = () => {
  const {
    selectedEstablishment,
    goBack,
    navigateTo,
    toggleFavorite,
    isFavorite,
    reviews
  } = useApp();

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!selectedEstablishment) {
    return (
      <div className="p-8 text-center bg-white min-h-screen font-sans">
        <p className="text-[#2D3436]">Estabelecimento não encontrado.</p>
        <button 
          onClick={goBack} 
          className="mt-4 px-4 py-2 bg-[#1B4323] text-white rounded-xl font-bold cursor-pointer"
        >
          Voltar
        </button>
      </div>
    );
  }

  const est = selectedEstablishment;
  const favorited = isFavorite(est.id);
  const estReviews = reviews.filter(r => r.establishmentId === est.id);
  const totalReviewsCount = est.reviewsCount || (estReviews.length > 0 ? estReviews.length : 256);
  const displayRating = est.rating.toFixed(1).replace('.', ',');

  const allPhotos = est.photos && est.photos.length > 0 ? est.photos : [est.imageUrl];
  const currentPhoto = allPhotos[photoIndex] || est.imageUrl;

  const showToast = (msg: string) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: est.name,
      text: `Conheça ${est.name} no Nosso Bairro! ${est.address}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to copy link
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${est.name} - ${est.address} | Nosso Bairro`);
          showToast('Link do local copiado para a área de transferência!');
        }
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${est.name} - ${est.address}`);
      showToast('Informações do local copiadas com sucesso!');
    } else {
      showToast('Compartilhando: ' + est.name);
    }
  };

  const handlePhoneCall = () => {
    if (est.phone) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(est.phone);
      }
      showToast(`Telefone ${est.phone} copiado!`);
      // Open dialer if mobile
      window.location.href = `tel:${est.phone.replace(/\D/g, '')}`;
    } else {
      showToast('Telefone não disponível');
    }
  };

  const handleWebsite = () => {
    if (est.socialLinks?.website) {
      window.open(est.socialLinks.website, '_blank');
    } else {
      showToast(`Site: www.${est.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`);
    }
  };

  const handleSocialMedia = () => {
    if (est.socialLinks?.instagram) {
      const handle = est.socialLinks.instagram.replace('@', '');
      window.open(`https://instagram.com/${handle}`, '_blank');
    } else if (est.socialLinks?.whatsapp) {
      const num = est.socialLinks.whatsapp.replace(/\D/g, '');
      window.open(`https://wa.me/55${num}`, '_blank');
    } else {
      showToast(`Redes sociais de ${est.name}`);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <div className="min-h-screen bg-white pb-24 animate-fadeIn font-sans select-none">
      {/* Toast alert */}
      {copiedToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1B4323] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <Check size={15} className="text-emerald-300" />
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Hero Image Container */}
      <div className="relative w-full h-[280px] sm:h-[320px] bg-gray-900">
        <img
          src={currentPhoto}
          alt={est.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsGalleryOpen(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-0 right-0 px-4 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1A202C] flex items-center justify-center shadow-md backdrop-blur-xs transition-all cursor-pointer"
            aria-label="Voltar"
          >
            <ChevronLeft size={24} className="stroke-[2.5] -ml-0.5" />
          </button>

          <div className="flex items-center gap-2">
            {/* Share Button with full functionality */}
            <button
              type="button"
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1A202C] flex items-center justify-center shadow-md backdrop-blur-xs transition-all cursor-pointer"
              title="Compartilhar estabelecimento"
              aria-label="Compartilhar"
            >
              <Share2 size={19} className="text-[#1A202C]" />
            </button>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={() => toggleFavorite(est.id)}
              className="w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-md backdrop-blur-xs transition-all cursor-pointer"
              title="Favoritar"
              aria-label="Favoritar"
            >
              <Heart
                size={20}
                className={favorited ? 'fill-rose-500 text-rose-500' : 'text-[#1A202C]'}
              />
            </button>
          </div>
        </div>

        {/* Photo Counter Badge (e.g. 📷 1/6) */}
        <div 
          onClick={() => setIsGalleryOpen(true)}
          className="absolute bottom-4 right-4 bg-black/65 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-black/80 transition-colors shadow-md z-10"
        >
          <Camera size={14} />
          <span>{photoIndex + 1}/{allPhotos.length > 1 ? allPhotos.length : 6}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto px-5 pt-4">
        {/* Title */}
        <h1 className="text-[22px] sm:text-[24px] font-extrabold text-[#1A202C] leading-snug tracking-tight">
          {est.name}
        </h1>

        {/* Tags: Category and Verified Badge */}
        <div className="flex items-center gap-4 mt-1.5">
          <span className="text-[13px] font-semibold text-[#1B4323]">
            {est.category || 'Gastronomia'}
          </span>
          <span className="flex items-center gap-1 text-[13px] font-semibold text-[#1B4323]">
            <CheckCircle2 size={15} className="fill-[#1B4323] text-white" />
            <span>Verificada</span>
          </span>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mt-2">
          <Star size={17} className="fill-[#F5A623] text-[#F5A623]" />
          <span className="text-[14px] font-bold text-[#1A202C]">
            {displayRating}
          </span>
          <span className="text-[13px] text-[#718096]">
            ({totalReviewsCount} avaliações)
          </span>
        </div>

        {/* Action Circle Buttons Row */}
        <div className="flex items-start justify-between mt-6 px-1 gap-1">
          {/* 1. Como chegar */}
          <button
            type="button"
            onClick={() => navigateTo('directions', est)}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-12 h-12 rounded-full bg-[#EDF3EE] group-hover:bg-[#E0ECE2] group-active:scale-95 flex items-center justify-center transition-all">
              <Navigation size={20} className="text-[#1B4323] -rotate-45" />
            </div>
            <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
              Como chegar
            </span>
          </button>

          {/* 2. Ligar */}
          <button
            type="button"
            onClick={handlePhoneCall}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-12 h-12 rounded-full bg-[#EDF3EE] group-hover:bg-[#E0ECE2] group-active:scale-95 flex items-center justify-center transition-all">
              <Phone size={19} className="text-[#1B4323]" />
            </div>
            <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
              Ligar
            </span>
          </button>

          {/* 3. Site */}
          <button
            type="button"
            onClick={handleWebsite}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-12 h-12 rounded-full bg-[#EDF3EE] group-hover:bg-[#E0ECE2] group-active:scale-95 flex items-center justify-center transition-all">
              <Globe size={20} className="text-[#1B4323]" />
            </div>
            <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
              Site
            </span>
          </button>

          {/* 4. Redes sociais */}
          <button
            type="button"
            onClick={handleSocialMedia}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-12 h-12 rounded-full bg-[#EDF3EE] group-hover:bg-[#E0ECE2] group-active:scale-95 flex items-center justify-center transition-all">
              <Instagram size={20} className="text-[#1B4323]" />
            </div>
            <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
              Redes sociais
            </span>
          </button>

          {/* 5. Favoritar */}
          <button
            type="button"
            onClick={() => toggleFavorite(est.id)}
            className="flex flex-col items-center group cursor-pointer w-16"
          >
            <div className="w-12 h-12 rounded-full bg-[#EDF3EE] group-hover:bg-[#E0ECE2] group-active:scale-95 flex items-center justify-center transition-all">
              <Heart
                size={20}
                className={favorited ? 'fill-[#1B4323] text-[#1B4323]' : 'text-[#1B4323]'}
              />
            </div>
            <span className="text-[11px] font-medium text-[#2D3436] mt-2 text-center leading-tight">
              {favorited ? 'Favoritado' : 'Favoritar'}
            </span>
          </button>
        </div>

        {/* Sobre o local Section */}
        <div className="mt-8 space-y-4">
          <h2 className="text-[15px] font-bold text-[#1A202C]">
            Sobre o local
          </h2>

          <p className="text-[13px] text-[#4A5568] leading-relaxed">
            {est.description ||
              'Pães artesanais feitos todos os dias, variedade de salgados, cafés especiais e um atendimento acolhedor.'}
          </p>

          {/* Address Line */}
          <div className="flex items-center gap-3 pt-1 text-[#1A202C]">
            <div className="w-6 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#2D3748]" />
            </div>
            <span className="text-[13px] text-[#2D3748] font-normal leading-snug">
              {est.address}
            </span>
          </div>

          {/* Opening Hours Line */}
          <div className="flex items-center gap-3 text-[#1A202C]">
            <div className="w-6 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-[#2D3748]" />
            </div>
            <span className="text-[13px] text-[#2D3748] font-normal leading-snug">
              {est.hours || 'Seg a Sáb: 6h às 20h | Dom: 7h às 13h'}
            </span>
          </div>
        </div>

        {/* Avaliar este local Primary Action Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Star size={18} className="fill-white text-white" />
            <span>Avaliar este local</span>
          </button>
        </div>

        {/* Avaliações Recentes (Expandable) */}
        {estReviews.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-[14px] font-bold text-[#1A202C] mb-3">
              Avaliações da comunidade ({estReviews.length})
            </h3>
            <div className="space-y-3">
              {estReviews.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl bg-[#F8F9FA] border border-gray-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D3748]">{rev.userName}</span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
                      <span className="text-xs font-bold">{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#4A5568]">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Photo Gallery Lightbox */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 animate-fadeIn">
          <div className="flex items-center justify-between text-white pt-2">
            <span className="text-sm font-semibold">
              Foto {photoIndex + 1} de {allPhotos.length}
            </span>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex items-center justify-center flex-1 max-h-[70vh] my-auto">
            <img
              src={allPhotos[photoIndex]}
              alt={`Foto ${photoIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="flex justify-between items-center px-4 pb-6">
            <button
              onClick={prevPhoto}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Anterior
            </button>
            <button
              onClick={nextPhoto}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {/* Review Modal Popup */}
      {isReviewModalOpen && (
        <ReviewModal
          establishment={est}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </div>
  );
};
