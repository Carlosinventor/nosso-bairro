import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Image as ImageIcon, 
  MapPin, 
  X, 
  Send, 
  ChevronDown, 
  Map as MapIcon 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../common/InteractiveMap';
import { supabaseService } from '../../services/supabase';

const CATEGORIES_WITH_EMOJIS = [
  { label: 'Padaria', emoji: '🥖' },
  { label: 'Restaurante', emoji: '🍽️' },
  { label: 'Cafeteria', emoji: '☕' },
  { label: 'Mercado', emoji: '🛒' },
  { label: 'Farmácia', emoji: '💊' },
  { label: 'Salão de Beleza', emoji: '💇‍♀️' },
  { label: 'Pet Shop', emoji: '🐾' },
  { label: 'Academia', emoji: '💪' },
  { label: 'Oficina', emoji: '🔧' },
  { label: 'Serviços', emoji: '🛠️' }
];

export const ShareScreen: React.FC = () => {
  const {
    addNewEstablishment,
    showSuccessModal,
    openExistingPlaceModal,
    goBack
  } = useApp();

  const [name, setName] = useState('Padaria Cantinho do Pão');
  const [category, setCategory] = useState('Padaria');
  const [address, setAddress] = useState('Rua das Acácias, 123 – Zona Sul');
  const [description, setDescription] = useState(
    'Pães artesanais deliciosos, sempre quentinhos! Atendimento excelente e ambiente acolhedor.'
  );
  const [photos, setPhotos] = useState<string[]>([]);
  const [coords, setCoords] = useState({ lat: -23.55052, lng: -46.633308 });
  const [showMapSelector, setShowMapSelector] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const sampleImages = [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && photos.length < 3) {
          setPhotos(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSampleOrTrigger = (type: 'camera' | 'gallery') => {
    if (photos.length >= 3) return;
    if (type === 'camera') {
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        const nextImg = sampleImages[photos.length % sampleImages.length];
        setPhotos(prev => [...prev, nextImg]);
      }
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      } else {
        const nextImg = sampleImages[photos.length % sampleImages.length];
        setPhotos(prev => [...prev, nextImg]);
      }
    }
  };

  const handleDirectBoxClick = (index: number) => {
    if (photos[index]) {
      // If clicked on existing photo, remove or replace
      return;
    }
    handleAddSampleOrTrigger('gallery');
  };

  const handleRemovePhoto = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category) return;

    const existing = supabaseService.findEstablishmentByName(name.trim());
    if (existing) {
      openExistingPlaceModal(existing);
      return;
    }

    setIsSubmitting(true);
    try {
      const defaultImg = photos[0] || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop';
      await addNewEstablishment({
        name: name.trim(),
        category,
        subCategory: `${category} do Bairro`,
        description: description.trim() || `Novo estabelecimento compartilhado pela comunidade no bairro.`,
        address: address.trim(),
        neighborhood: 'Zona Sul - Jardim Primavera',
        latitude: coords.lat,
        longitude: coords.lng,
        phone: '(11) 98765-4321',
        hours: 'Seg a Sáb: 08h às 19h',
        imageUrl: defaultImg,
        photos: photos.length > 0 ? photos : [defaultImg],
        socialLinks: {
          whatsapp: '(11) 98765-4321'
        },
        features: {
          acceptsPix: true,
          accessible: true,
          wifi: true
        }
      });

      showSuccessModal(
        'Obrigado!',
        'Seu novo local foi compartilhado com sucesso na comunidade!',
        'Voltar para a Home'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategoryObj = CATEGORIES_WITH_EMOJIS.find(c => c.label === category) || CATEGORIES_WITH_EMOJIS[0];

  return (
    <div className="min-h-screen bg-white pb-12 animate-fadeIn font-sans">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <div className="max-w-md mx-auto px-5 pt-3 pb-8">
        {/* Top bar with Close button */}
        <div className="flex items-center justify-between pt-2 pb-3">
          <button
            type="button"
            onClick={goBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#1E3F1A] hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={24} className="stroke-[2.5]" />
          </button>
          <div className="w-10"></div>
        </div>

        {/* Header Titles */}
        <div className="text-center mb-6 px-2">
          <h1 className="text-[23px] sm:text-[25px] font-extrabold text-[#1B4323] leading-snug tracking-tight">
            O que você quer<br />compartilhar hoje?
          </h1>
          <p className="text-[13px] text-[#4A5568] mt-2 font-medium">
            Mostre algo incrível para a comunidade!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Suas fotos (até 3) */}
          <div>
            <label className="block text-[13px] font-bold text-[#1A202C] mb-2.5">
              Suas fotos (até 3)
            </label>

            {/* 3 Photo slots */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[0, 1, 2].map(index => {
                const photoUrl = photos[index];
                return (
                  <div
                    key={index}
                    onClick={() => handleDirectBoxClick(index)}
                    className="relative h-[115px] rounded-2xl border-2 border-dashed border-[#D2D6DC] hover:border-[#1B4323] bg-white flex flex-col items-center justify-center p-2 transition-all cursor-pointer overflow-hidden group"
                  >
                    {photoUrl ? (
                      <>
                        <img
                          src={photoUrl}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={e => handleRemovePhoto(index, e)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 hover:bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#1B4323] mb-1.5">
                          <Camera size={22} className="stroke-[1.75]" />
                        </div>
                        <span className="text-[11px] leading-tight font-medium text-[#4A5568]">
                          Adicionar<br />foto
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action buttons: Tirar foto / Escolher da galeria */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAddSampleOrTrigger('camera')}
                disabled={photos.length >= 3}
                className="py-3 px-3 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <Camera size={18} />
                <span>Tirar foto</span>
              </button>

              <button
                type="button"
                onClick={() => handleAddSampleOrTrigger('gallery')}
                disabled={photos.length >= 3}
                className="py-3 px-3 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <ImageIcon size={18} />
                <span>Escolher da galeria</span>
              </button>
            </div>
          </div>

          {/* Nome do lugar * */}
          <div>
            <label className="block text-[13px] font-bold text-[#1A202C] mb-1.5">
              Nome do lugar <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="Ex: Padaria Cantinho do Pão"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-[14px] bg-white border border-[#E2E8F0] focus:border-[#1B4323] focus:ring-1 focus:ring-[#1B4323] rounded-xl focus:outline-none transition-all text-[#1A202C] placeholder:text-[#A0AEC0]"
            />
            <div className="text-right text-[11px] text-[#718096] mt-1">
              {name.length}/60
            </div>
          </div>

          {/* Categoria * */}
          <div>
            <label className="block text-[13px] font-bold text-[#1A202C] mb-1.5">
              Categoria <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 text-[14px] bg-white border border-[#E2E8F0] focus:border-[#1B4323] focus:ring-1 focus:ring-[#1B4323] rounded-xl focus:outline-none transition-all text-[#1A202C] pr-10 cursor-pointer font-medium"
              >
                {CATEGORIES_WITH_EMOJIS.map(cat => (
                  <option key={cat.label} value={cat.label}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A5568]">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Onde fica? * */}
          <div>
            <label className="block text-[13px] font-bold text-[#1A202C] mb-1.5">
              Onde fica? <span className="text-red-500 font-bold">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A5568]">
                <MapPin size={18} className="text-[#4A5568]" />
              </div>
              <input
                type="text"
                placeholder="Rua, número e bairro"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 text-[14px] bg-white border border-[#E2E8F0] focus:border-[#1B4323] focus:ring-1 focus:ring-[#1B4323] rounded-xl focus:outline-none transition-all text-[#1A202C] placeholder:text-[#A0AEC0]"
              />
            </div>
            
            {/* Alterar localização no mapa */}
            <button
              type="button"
              onClick={() => setShowMapSelector(!showMapSelector)}
              className="mt-2 text-[12px] text-[#1B4323] hover:text-[#122c17] font-semibold flex items-center gap-1.5 cursor-pointer hover:underline"
            >
              <MapIcon size={14} className="stroke-[2.2]" />
              <span>{showMapSelector ? 'Ocultar mapa' : 'Alterar localização no mapa'}</span>
            </button>

            {/* Interactive Map Selector Drawer */}
            {showMapSelector && (
              <div className="mt-3 p-3 bg-[#F8F9F5] rounded-2xl border border-[#E2E8F0] space-y-2 animate-fadeIn">
                <span className="text-[11px] text-[#4A5568] block font-medium">
                  Arraste ou toque no mapa para posicionar o pino exato:
                </span>
                <div className="rounded-xl overflow-hidden border border-[#CBD5E0]">
                  <InteractiveMap
                    height="170px"
                    interactive={true}
                    onLocationSelect={res => {
                      setCoords({ lat: res.lat, lng: res.lng });
                      if (res.addressSuggestion) {
                        setAddress(res.addressSuggestion);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Conte um pouquinho...* */}
          <div>
            <label className="block text-[13px] font-bold text-[#1A202C] mb-1.5">
              Conte um pouquinho...<span className="text-red-500 font-bold">*</span>
            </label>
            <textarea
              rows={3}
              maxLength={200}
              placeholder="Pães artesanais deliciosos, sempre quentinhos! Atendimento excelente e ambiente acolhedor."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              className="w-full p-3 text-[13px] leading-relaxed bg-white border border-[#E2E8F0] focus:border-[#1B4323] focus:ring-1 focus:ring-[#1B4323] rounded-xl focus:outline-none transition-all text-[#1A202C] placeholder:text-[#A0AEC0] resize-none"
            />
            <div className="text-right text-[11px] text-[#718096] mt-1">
              {description.length}/200
            </div>
          </div>

          {/* Footer Action Buttons: Cancelar / Compartilhar */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              type="button"
              onClick={goBack}
              className="py-3 px-4 rounded-xl border border-[#CBD5E0] bg-white hover:bg-gray-50 text-[#1B4323] font-bold text-[14px] transition-colors cursor-pointer text-center"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !description.trim()}
              className="py-3 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] active:scale-98 text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <Send size={16} className="-rotate-12" />
              <span>{isSubmitting ? 'Enviando...' : 'Compartilhar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
