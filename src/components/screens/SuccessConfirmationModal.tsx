import React from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuccessConfirmationModal: React.FC = () => {
  const { successModal, closeSuccessModal, navigateTo } = useApp();

  if (!successModal || !successModal.isOpen) return null;

  const handleAction = () => {
    if (successModal.onButtonClick) {
      successModal.onButtonClick();
    } else {
      navigateTo('home');
    }
    closeSuccessModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 sm:pt-16 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn select-none">
      <div className="bg-white rounded-[28px] sm:rounded-[32px] w-full max-w-sm p-6 sm:p-7 shadow-2xl text-center border border-[#E5E7EB] my-2 max-h-[calc(100vh-2rem)] overflow-y-auto animate-scaleUp">
        {/* Big Green Circle with Checkmark */}
        <div className="mx-auto w-20 h-20 rounded-full bg-[#1B4323] text-white flex items-center justify-center shadow-lg shadow-[#1B4323]/25 mb-4">
          <Check size={40} strokeWidth={3.5} />
        </div>

        <h2 className="text-[20px] font-extrabold text-[#1A202C] mb-2 leading-snug">
          {successModal.title || 'Obrigado!'}
        </h2>

        <p className="text-[#4A5568] text-[13px] leading-relaxed mb-6 px-1 font-medium">
          {successModal.message || 'Sua contribuição foi enviada com sucesso e será publicada para toda a comunidade.'}
        </p>

        <button
          type="button"
          onClick={handleAction}
          className="w-full py-3.5 px-6 rounded-xl bg-[#1B4323] hover:bg-[#15341B] text-white font-bold text-[13.5px] shadow-xs transition-transform active:scale-98 cursor-pointer"
        >
          {successModal.buttonText || 'Voltar para a Home'}
        </button>
      </div>
    </div>
  );
};
