import React, { useState } from 'react';
import {
  Camera,
  Check,
  Utensils,
  HeartPulse,
  Wrench,
  ShoppingBag,
  Palmtree
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

interface PreferenceOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PREFERENCE_OPTIONS: PreferenceOption[] = [
  {
    id: 'Gastronomia',
    label: 'Gastronomia',
    icon: Utensils
  },
  {
    id: 'Saúde',
    label: 'Saúde',
    icon: HeartPulse
  },
  {
    id: 'Serviço',
    label: 'Serviço',
    icon: Wrench
  },
  {
    id: 'Compras',
    label: 'Compras',
    icon: ShoppingBag
  },
  {
    id: 'Lazer',
    label: 'Lazer',
    icon: Palmtree
  }
];

export const EditProfileScreen: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { goBack, showSuccessModal } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '(11) 99999-8888');
  const [neighborhood, setNeighborhood] = useState(user?.neighborhood || 'Zona Sul - Jardim Primavera');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop');
  const [preferences, setPreferences] = useState<string[]>(user?.preferences || ['Gastronomia', 'Serviço']);
  const [searchRadius, setSearchRadius] = useState<number>(user?.searchRadius || 5);
  const [isSaving, setIsSaving] = useState(false);

  const togglePreference = (prefId: string) => {
    setPreferences(prev =>
      prev.includes(prefId) ? prev.filter(p => p !== prefId) : [...prev, prefId]
    );
  };

  const handleChangeAvatar = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&auto=format&fit=crop'
    ];
    const currentIndex = avatars.indexOf(avatarUrl);
    const nextAvatar = avatars[(currentIndex + 1) % avatars.length];
    setAvatarUrl(nextAvatar);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        neighborhood: neighborhood.trim(),
        avatarUrl,
        preferences,
        searchRadius
      });

      showSuccessModal(
        'Perfil Atualizado!',
        'Suas informações e preferências foram salvas com sucesso.',
        'Voltar para o Perfil',
        () => goBack()
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn font-sans">
      <Header title="Editar perfil" showBack={true} />

      <main className="px-4 py-4">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Upload Area */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative group cursor-pointer" onClick={handleChangeAvatar}>
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#2D5A27]/20"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={22} />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2D5A27] text-white flex items-center justify-center shadow-md border-2 border-white cursor-pointer"
              >
                <Camera size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleChangeAvatar}
              className="text-xs text-[#2D5A27] font-bold mt-2 hover:underline cursor-pointer"
            >
              Alterar foto de perfil
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5 bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
            <div>
              <label className="block text-xs font-bold text-[#2D3436] mb-1">
                Nome completo *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-3.5 py-3 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#95A5A6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3436] mb-1">
                E-mail *
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-3 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#95A5A6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3436] mb-1">
                Telefone (opcional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-3.5 py-3 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#95A5A6]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3436] mb-1">
                Bairro / Região
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                className="w-full px-3.5 py-3 text-sm bg-[#F1F3F0] border border-transparent focus:border-[#2D5A27] focus:bg-white text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#95A5A6]"
              />
            </div>
          </div>

          {/* Preferências (opcional) - Exclusively Gastronomia, Saúde, Serviço, Compras, Lazer with Icons */}
          <div className="space-y-2.5 bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
            <label className="block text-xs font-bold text-[#95A5A6] uppercase tracking-widest">
              Preferências (opcional)
            </label>
            <p className="text-[11px] text-[#636E72]">
              Selecione o que você mais gosta de acompanhar no bairro:
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {PREFERENCE_OPTIONS.map(pref => {
                const isSelected = preferences.includes(pref.id);
                const IconComponent = pref.icon;

                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => togglePreference(pref.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border select-none ${
                      isSelected
                        ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-sm scale-100'
                        : 'bg-[#F1F3F0] text-[#2D3436] border-transparent hover:bg-[#E8EFE6] hover:text-[#2D5A27] hover:border-[#2D5A27]/20'
                    }`}
                  >
                    <IconComponent
                      size={15}
                      className={isSelected ? 'text-white' : 'text-[#2D5A27]'}
                    />
                    <span>{pref.label}</span>
                    {isSelected && (
                      <Check size={13} className="stroke-[2.5] ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Raio de busca */}
          <div className="space-y-2 bg-white p-4 rounded-[24px] border border-[#F0F0F0] shadow-sm">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#95A5A6] uppercase tracking-widest">
                Raio de busca padrão
              </label>
              <span className="font-bold text-[#2D5A27] bg-[#F1F3F0] px-2.5 py-0.5 rounded-full border border-[#2D5A27]/20">
                {searchRadius} km
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={searchRadius}
              onChange={e => setSearchRadius(Number(e.target.value))}
              className="w-full accent-[#2D5A27] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#95A5A6] font-medium">
              <span>1 km (bem perto)</span>
              <span>15 km (região ampla)</span>
            </div>
          </div>

          {/* Bottom Actions: Cancelar e Salvar alterações */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={goBack}
              className="flex-1 py-3.5 px-4 rounded-2xl border border-[#E5E7EB] bg-white text-[#2D3436] font-bold text-sm hover:bg-[#F1F3F0] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-sm shadow-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
