import React, { useState } from 'react';
import { X, Star, Camera } from 'lucide-react';
import { Establishment } from '../../types';
import { useApp } from '../../context/AppContext';

interface ReviewModalProps {
  establishment: Establishment;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ establishment, onClose }) => {
  const { addReview, showSuccessModal } = useApp();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSamplePhoto = () => {
    if (photos.length >= 3) return;
    const samplePhotos = [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=600&auto=format&fit=crop'
    ];
    setPhotos(prev => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addReview({
        establishmentId: establishment.id,
        rating,
        comment: comment.trim(),
        photos
      });

      onClose();
      showSuccessModal(
        'Obrigado!',
        'Sua avaliação foi enviada com sucesso e já está disponível para toda a comunidade!',
        'Voltar para a Home'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-4 sm:pt-8 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn select-none">
      <div className="bg-white w-full max-w-md rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-2xl border border-[#E5E7EB] animate-scaleUp my-2 max-h-[calc(100vh-2rem)] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F0] shrink-0">
          <div>
            <h3 className="text-[16px] font-bold text-[#1A202C] leading-snug">
              Como foi sua experiência?
            </h3>
            <p className="text-[12px] text-[#1B4323] font-bold truncate mt-0.5 max-w-[240px] sm:max-w-[280px]">
              {establishment.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F3F0] hover:bg-[#E8EFE6] text-[#2D3436] flex items-center justify-center cursor-pointer transition-colors shrink-0"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 pt-3.5 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Interactive Star Rating */}
            <div className="flex flex-col items-center justify-center py-2.5 px-3 bg-[#FAFCFA] border border-[#E2E8F0] rounded-2xl">
              <span className="text-[11px] font-bold text-[#718096] mb-1.5 uppercase tracking-wide">
                Toque para avaliar
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(starVal => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    className="p-1 transition-transform hover:scale-120 active:scale-95 cursor-pointer focus:outline-none"
                    aria-label={`${starVal} estrelas`}
                  >
                    <Star
                      size={28}
                      className={`${
                        rating >= starVal
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-[#CBD5E1] text-[#CBD5E1]'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-bold text-[#1B4323] mt-1.5 px-3 py-0.5 bg-white rounded-full shadow-2xs border border-[#E2E8F0] transition-all">
                {rating === 1 && '⭐ Precisa melhorar'}
                {rating === 2 && '⭐⭐ Continue melhorando'}
                {rating === 3 && '⭐⭐⭐ Gostei'}
                {rating === 4 && '⭐⭐⭐⭐ Adorei'}
                {rating === 5 && '⭐⭐⭐⭐⭐ Amei'}
              </span>
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block text-[12px] font-bold text-[#1A202C] mb-1">
                Escreva sua opinião
              </label>
              <textarea
                rows={3}
                placeholder="O que você mais gostou? Qual prato, produto ou serviço recomenda?"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                className="w-full p-3 text-[12.5px] bg-[#F8FAF8] border border-[#E2E8F0] focus:border-[#1B4323] focus:bg-white rounded-xl focus:outline-none transition-all placeholder:text-[#A0AEC0] text-[#1A202C] leading-relaxed resize-none"
              />
            </div>

            {/* Photos */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11.5px] font-bold text-[#1A202C]">
                  Adicionar fotos ({photos.length}/3)
                </span>
                {photos.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddSamplePhoto}
                    className="text-[11px] text-[#1B4323] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Camera size={12} />
                    + Foto
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {photos.map((photo, i) => (
                  <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#E5E7EB] shrink-0">
                    <img src={photo} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-4 h-4 bg-black/70 text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {photos.length < 3 && (
                  <button
                    type="button"
                    onClick={handleAddSamplePhoto}
                    className="w-14 h-14 rounded-xl border-2 border-dashed border-[#CBD5E1] hover:border-[#1B4323] bg-[#FAFCFA] flex flex-col items-center justify-center text-[#718096] hover:text-[#1B4323] transition-colors cursor-pointer shrink-0"
                  >
                    <Camera size={16} />
                    <span className="text-[9px] mt-0.5 font-bold">+ Foto</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="w-full py-3 px-4 rounded-xl bg-[#1B4323] hover:bg-[#15341B] text-white font-bold text-[13.5px] shadow-xs transition-all active:scale-98 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar avaliação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
