import React, { useState } from 'react';
import { Camera, Star, Info, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

export const ContributeScreen: React.FC = () => {
  const {
    selectedEstablishment,
    addContribution,
    showSuccessModal,
    goBack
  } = useApp();

  const est = selectedEstablishment;
  const [photos, setPhotos] = useState<string[]>([]);
  const [rating, setRating] = useState(5);
  const [suggestedUpdate, setSuggestedUpdate] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!est) {
    return (
      <div className="p-8 text-center bg-[#F8F9F5]">
        <p className="text-[#2D3436]">Nenhum estabelecimento vinculado.</p>
        <button onClick={goBack} className="mt-4 text-[#2D5A27] font-bold">
          Voltar
        </button>
      </div>
    );
  }

  const handleAddSamplePhoto = () => {
    if (photos.length >= 3) return;
    const samplePhotos = [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=600&auto=format&fit=crop'
    ];
    setPhotos(prev => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addContribution({
        establishmentId: est.id,
        establishmentName: est.name,
        type: photos.length > 0 ? 'photos' : suggestedUpdate ? 'update_info' : 'review',
        photos: photos.length > 0 ? photos : undefined,
        suggestedUpdate: suggestedUpdate.trim() || undefined,
        rating: rating,
        reviewComment: reviewComment.trim() || undefined
      });

      showSuccessModal(
        'Obrigado!',
        'Sua contribuição foi enviada com sucesso e será analisada para enriquecer a experiência do bairro.',
        'Voltar para a Home'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] pb-28 animate-fadeIn">
      <Header title="Contribuir" showBack={true} />

      <main className="px-4 py-4 space-y-5">
        {/* Linked Establishment Header */}
        <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
          <span className="text-[11px] font-bold text-[#2D5A27] uppercase tracking-widest block">
            Estabelecimento vinculado
          </span>
          <h3 className="text-base font-bold text-[#2D3436] mt-0.5">
            {est.name}
          </h3>
          <p className="text-xs text-[#636E72] mt-0.5">{est.address}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Suas Fotos Section */}
          <div className="space-y-3 bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2D3436] uppercase tracking-wider">
                Suas fotos — até 3
              </label>
              <span className="text-xs font-bold text-[#2D5A27]">
                {photos.length}/3 adicionadas
              </span>
            </div>

            {/* Three photo slots */}
            <div className="grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map(index => {
                const photoUrl = photos[index];
                if (photoUrl) {
                  return (
                    <div key={index} className="relative rounded-2xl overflow-hidden aspect-square border border-[#E5E7EB] shadow-xs">
                      <img src={photoUrl} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center text-xs hover:bg-rose-600 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={handleAddSamplePhoto}
                    className="aspect-square rounded-2xl border-2 border-dashed border-[#CBD5E1] hover:border-[#2D5A27] bg-[#F1F3F0] hover:bg-[#E8EFE6] flex flex-col items-center justify-center text-[#636E72] hover:text-[#2D5A27] transition-colors cursor-pointer"
                  >
                    <Camera size={22} className="mb-1 text-[#2D5A27]" />
                    <span className="text-[10px] font-bold">+ Foto</span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-[#F8F9F5] rounded-xl border border-[#E5E7EB] flex items-start gap-2 text-xs text-[#636E72]">
              <Info size={15} className="text-[#2D5A27] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#2D3436]">Dica:</strong> Envie fotos reais tiradas por você (fachada, ambiente ou produtos) para ajudar os moradores.
              </span>
            </div>
          </div>

          {/* Avaliação por estrelas */}
          <div className="space-y-2 bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
            <label className="text-xs font-bold text-[#2D3436] uppercase tracking-wider block">
              Como você avalia?
            </label>
            <div className="flex items-center justify-between p-3.5 bg-[#F1F3F0] rounded-2xl border border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(starVal => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    className="p-1 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={`${
                        rating >= starVal
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-[#E5E7EB] text-[#CBD5E1]'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-[#2D3436]">
                {rating}.0 estrelas
              </span>
            </div>
          </div>

          {/* Comentário da avaliação */}
          <div className="bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#2D3436] mb-1">
                Mensagem ou comentário sobre o local (opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Compartilhe detalhes sobre o atendimento, qualidade ou ambiente..."
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
                className="w-full p-3 text-xs bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white rounded-xl focus:outline-none transition-all placeholder:text-[#95A5A6]"
              />
            </div>

            {/* Atualização de informações */}
            <div>
              <label className="block text-xs font-bold text-[#2D3436] mb-1">
                Atualização de informações (opcional)
              </label>
              <textarea
                rows={3}
                placeholder="Mudança de horário, novo telefone, mudança de endereço ou novos serviços oferecidos..."
                value={suggestedUpdate}
                onChange={e => setSuggestedUpdate(e.target.value)}
                className="w-full p-3 text-xs bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white rounded-xl focus:outline-none transition-all placeholder:text-[#95A5A6]"
              />
            </div>
          </div>

          {/* Informação sobre análise antes de publicação */}
          <div className="p-3.5 bg-white rounded-[20px] border border-[#F0F0F0] flex items-start gap-2 text-xs text-[#636E72]">
            <ShieldCheck size={16} className="text-[#2D5A27] shrink-0 mt-0.5" />
            <span>
              Sua contribuição será analisada pela moderação comunitária antes de ser publicada.
            </span>
          </div>

          {/* Botão Enviar Contribuição */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 rounded-2xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-sm shadow-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Enviando contribuição...' : 'Enviar contribuição'}
          </button>
        </form>
      </main>
    </div>
  );
};
