import React, { useState } from 'react';
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthScreen: React.FC = () => {
  const { signIn, signUp, isLoading } = useAuth();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Feedback
  const [error, setError] = useState<string | null>(null);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Por favor, informe seu e-mail e senha.');
      return;
    }

    try {
      await signIn(trimmedEmail, trimmedPassword);
    } catch (err: any) {
      setError(err?.message || 'Falha ao autenticar. Verifique seus dados.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (trimmedPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      setError('As senhas digitadas não coincidem.');
      return;
    }

    try {
      await signUp(trimmedName, trimmedEmail, trimmedPassword);
    } catch (err: any) {
      setError(err?.message || 'Falha ao criar conta. Tente novamente.');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotPasswordModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center text-[#2D3436] font-sans selection:bg-[#1E3F1A]/20 selection:text-[#1E3F1A] relative overflow-x-hidden">
      {/* Mobile container constraint */}
      <div className="w-full max-w-md min-h-screen flex flex-col justify-between px-6 py-6 sm:py-8">
        
        {/* ========================================================================= */}
        {/* TELA DE LOGIN (REFERÊNCIA IMAGEM 1)                                       */}
        {/* ========================================================================= */}
        {mode === 'login' && (
          <div className="flex-1 flex flex-col justify-between animate-fadeIn">
            <div>
              {/* Logo & Brand Header */}
              <div className="flex flex-col items-center text-center pt-1 pb-4">
                {/* Green Pin Storefront Icon */}
                <div className="mb-2 flex flex-col items-center">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-xs"
                  >
                    {/* Pin shape */}
                    <path
                      d="M32 4C20.954 4 12 12.954 12 24C12 36.5 29.5 57 32 60C34.5 57 52 36.5 52 24C52 12.954 43.046 4 32 4Z"
                      fill="#1E3F1A"
                    />
                    <circle cx="32" cy="23" r="15" fill="white" />
                    {/* Storefront inside */}
                    <path
                      d="M23 20H41V22C41 23.5 39.5 25 38 25C36.5 25 35 23.5 35 23.5C35 23.5 33.5 25 32 25C30.5 25 29 23.5 29 23.5C29 23.5 27.5 25 26 25C24.5 25 23 23.5 23 22V20Z"
                      fill="#1E3F1A"
                    />
                    <rect x="25" y="24" width="14" height="9" fill="#1E3F1A" rx="1" />
                    <rect x="28" y="27" width="4" height="6" fill="white" rx="0.5" />
                    <rect x="34" y="27" width="3" height="4" fill="white" rx="0.5" />
                  </svg>
                  
                  <div className="mt-1">
                    <h2 className="text-[#1E3F1A] font-bold text-xl leading-none tracking-tight">
                      Vitrine
                    </h2>
                    <span className="text-[#1E3F1A] text-xs font-semibold tracking-tight block">
                      do Bairro
                    </span>
                  </div>
                </div>

                {/* Saudação */}
                <h1 className="text-2xl font-bold text-[#1E2522] mt-2.5">
                  Bem-vindo!
                </h1>
                <p className="text-xs text-[#636E72] mt-1 max-w-xs">
                  Descubra o que o seu bairro tem de melhor.
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-3.5 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                {/* E-mail */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1.5">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3F1A]">
                      <Mail size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-[#D1D5DB] focus:border-[#1E3F1A] focus:ring-1 focus:ring-[#1E3F1A] text-xs text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1.5">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3F1A]">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-2.5 sm:py-3 bg-white border border-[#D1D5DB] focus:border-[#1E3F1A] focus:ring-1 focus:ring-[#1E3F1A] text-xs text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2D3436] p-1 cursor-pointer focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Esqueci minha senha */}
                <div className="text-center pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setShowForgotPasswordModal(true);
                    }}
                    className="text-xs text-[#1E3F1A] font-semibold hover:underline cursor-pointer"
                  >
                    Esqueci minha senha
                  </button>
                </div>

                {/* Botão Entrar */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1E3F1A] hover:bg-[#152D12] text-white font-bold text-sm shadow-sm transition-all active:scale-99 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>

                {/* Divisor "ou" */}
                <div className="relative flex py-1.5 items-center">
                  <div className="flex-grow border-t border-[#E5E7EB]"></div>
                  <span className="flex-shrink mx-4 text-xs text-[#9CA3AF]">ou</span>
                  <div className="flex-grow border-t border-[#E5E7EB]"></div>
                </div>

                {/* Alternar para Cadastro */}
                <div className="text-center text-xs text-[#636E72]">
                  Ainda não tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setError(null);
                    }}
                    className="font-bold text-[#1E3F1A] hover:underline cursor-pointer"
                  >
                    Criar conta
                  </button>
                </div>

                {/* Acesso Administrativo Rápido */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('admin@nossobairro.com.br');
                      setPassword('admin123');
                    }}
                    className="text-[11px] text-[#9CA3AF] hover:text-[#1E3F1A] font-medium transition-colors cursor-pointer"
                  >
                    Preencher como Administrador
                  </button>
                </div>
              </form>
            </div>

            {/* Ilustração decorativa inferior de prédios e comércios locais */}
            <div className="mt-2 pt-0 pb-1 flex flex-col items-center justify-end select-none pointer-events-none w-full">
              <svg
                viewBox="0 0 360 110"
                className="w-full max-w-[340px] h-auto overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Nuvem esquerda suave */}
                <path d="M45 22C47 17 55 17 59 22C63 20 69 24 67 28H41C39 24 42 21 45 22Z" fill="#EDF2EC" />
                {/* Nuvem direita suave */}
                <path d="M295 18C297 13 305 13 309 18C313 16 319 20 317 24H291C289 20 292 17 295 18Z" fill="#EDF2EC" />
                
                {/* Silhueta de prédios distantes (fundo suave) */}
                <rect x="30" y="34" width="28" height="66" fill="#E8ECE7" rx="2" />
                <rect x="64" y="44" width="34" height="56" fill="#DFE5DE" rx="2" />
                <rect x="145" y="46" width="70" height="54" fill="#E8ECE7" rx="2" />
                <rect x="250" y="38" width="34" height="62" fill="#DFE5DE" rx="2" />
                <rect x="290" y="46" width="32" height="54" fill="#E8ECE7" rx="2" />

                {/* Janelinhas sutis nos prédios do fundo */}
                <circle cx="40" cy="44" r="1.8" fill="white" />
                <circle cx="48" cy="44" r="1.8" fill="white" />
                <circle cx="40" cy="54" r="1.8" fill="white" />
                <circle cx="48" cy="54" r="1.8" fill="white" />
                <circle cx="262" cy="48" r="1.8" fill="white" />
                <circle cx="272" cy="48" r="1.8" fill="white" />
                <circle cx="262" cy="58" r="1.8" fill="white" />
                <circle cx="272" cy="58" r="1.8" fill="white" />

                {/* Pin de localização central suspenso */}
                <path
                  d="M180 26C172 26 166 32.5 166 40.5C166 51 178 64 180 66C182 64 194 51 194 40.5C194 32.5 188 26 180 26Z"
                  fill="#4D7C47"
                />
                <circle cx="180" cy="39.5" r="4.2" fill="white" />

                {/* Linha de base / chão conectando tudo */}
                <rect x="8" y="98" width="344" height="2" fill="#E2E8E0" rx="1" />

                {/* Árvore Esquerda */}
                <rect x="21" y="78" width="4" height="22" fill="#7A8A78" rx="1.5" />
                <circle cx="23" cy="73" r="13" fill="#3D6E37" />
                <circle cx="20" cy="69" r="8" fill="#4D8447" />

                {/* Loja 1 (Esquerda - Padaria / Empório com toldo listrado) */}
                <rect x="42" y="58" width="56" height="42" fill="#234E20" rx="2" />
                {/* Toldo */}
                <path d="M39 58L44 50H96L101 58H39Z" fill="#1B3F18" />
                <path d="M44 50L41 58H50L51 50H44Z" fill="#F0F5EE" opacity="0.6" />
                <path d="M58 50L59 58H68L66 50H58Z" fill="#F0F5EE" opacity="0.6" />
                <path d="M74 50L77 58H86L83 50H74Z" fill="#F0F5EE" opacity="0.6" />
                <path d="M91 50L96 58H99L96 50H91Z" fill="#F0F5EE" opacity="0.6" />
                {/* Porta e Vitrine */}
                <rect x="50" y="68" width="13" height="32" fill="white" rx="1" />
                <rect x="52" y="71" width="9" height="13" fill="#E8ECE7" rx="0.5" />
                <rect x="69" y="68" width="22" height="18" fill="white" rx="1" />
                <rect x="71" y="70" width="18" height="14" fill="#E8ECE7" rx="0.5" />

                {/* Loja 2 (Centro-Esquerda - Mercadinho) */}
                <rect x="104" y="64" width="48" height="36" fill="#5F835A" rx="2" />
                <rect x="102" y="62" width="52" height="4" fill="#1E3F1A" rx="1" />
                <rect x="112" y="72" width="14" height="28" fill="white" rx="1" />
                <rect x="132" y="72" width="14" height="16" fill="white" rx="1" />

                {/* Loja 3 (Centro-Direita - Restaurante / Vitrine com toldo) */}
                <rect x="158" y="56" width="62" height="44" fill="#1E3F1A" rx="2" />
                {/* Toldo */}
                <path d="M155 56L160 48H218L223 56H155Z" fill="#2D5A27" />
                <path d="M160 48L157 56H166L167 48H160Z" fill="#F0F5EE" opacity="0.6" />
                <path d="M175 48L176 56H185L183 48H175Z" fill="#F0F5EE" opacity="0.6" />
                <path d="M192 48L195 56H204L201 48H192Z" fill="#F0F5EE" opacity="0.6" />
                <path d="M210 48L215 56H221L218 48H210Z" fill="#F0F5EE" opacity="0.6" />
                {/* Porta e Vitrine */}
                <rect x="168" y="66" width="15" height="34" fill="white" rx="1" />
                <rect x="170" y="69" width="11" height="14" fill="#E8ECE7" rx="0.5" />
                <rect x="190" y="66" width="22" height="20" fill="white" rx="1" />
                <rect x="192" y="68" width="18" height="16" fill="#E8ECE7" rx="0.5" />

                {/* Loja 4 (Direita - Café) */}
                <rect x="226" y="64" width="54" height="36" fill="#3B6835" rx="2" />
                <rect x="224" y="61" width="58" height="5" fill="#1E3F1A" rx="1" />
                <rect x="236" y="72" width="14" height="28" fill="white" rx="1" />
                <rect x="256" y="72" width="16" height="16" fill="white" rx="1" />

                {/* Árvore Direita */}
                <rect x="303" y="78" width="4" height="22" fill="#7A8A78" rx="1.5" />
                <circle cx="305" cy="73" r="13" fill="#2A5924" />
                <circle cx="302" cy="69" r="8" fill="#3D7535" />
              </svg>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA DE CADASTRO / CRIAR CONTA (REFERÊNCIA IMAGEM 2)                      */}
        {/* ========================================================================= */}
        {mode === 'register' && (
          <div className="flex-1 flex flex-col justify-between animate-fadeIn">
            <div>
              {/* Back Button */}
              <div className="pt-1 pb-3">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#1E3F1A] hover:bg-[#F1F3F0] transition-colors cursor-pointer"
                  title="Voltar para login"
                >
                  <ArrowLeft size={22} strokeWidth={2.4} />
                </button>
              </div>

              {/* Title Header */}
              <div className="text-center pb-5">
                <h1 className="text-2xl font-bold text-[#1E2522]">
                  Criar conta
                </h1>
                <p className="text-xs text-[#636E72] mt-1 max-w-xs mx-auto">
                  É rápido e fácil. Preencha os campos abaixo para começar.
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Register Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {/* Nome */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">
                    Nome
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3F1A]">
                      <UserIcon size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Digite seu nome completo"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-[#D1D5DB] focus:border-[#1E3F1A] focus:ring-1 focus:ring-[#1E3F1A] text-xs text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3F1A]">
                      <Mail size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-white border border-[#D1D5DB] focus:border-[#1E3F1A] focus:ring-1 focus:ring-[#1E3F1A] text-xs text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">
                    Senha
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3F1A]">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Crie uma senha"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-2.5 sm:py-3 bg-white border border-[#D1D5DB] focus:border-[#1E3F1A] focus:ring-1 focus:ring-[#1E3F1A] text-xs text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2D3436] p-1 cursor-pointer focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Senha */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3436] mb-1">
                    Confirmar senha
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1E3F1A]">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-2.5 sm:py-3 bg-white border border-[#D1D5DB] focus:border-[#1E3F1A] focus:ring-1 focus:ring-[#1E3F1A] text-xs text-[#2D3436] rounded-xl focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#2D3436] p-1 cursor-pointer focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Dica de Segurança Card */}
                <div className="p-3.5 bg-[#F0F5EE] rounded-2xl border border-[#D6E6D1] flex items-start gap-3 mt-1">
                  <ShieldCheck size={20} className="text-[#1E3F1A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1E2522]">
                      Dica de segurança
                    </h4>
                    <p className="text-[11px] text-[#525F58] mt-0.5 leading-snug">
                      Use pelo menos 6 caracteres com números e letras.
                    </p>
                  </div>
                </div>

                {/* Botão Criar conta */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#1E3F1A] hover:bg-[#152D12] text-white font-bold text-sm shadow-sm transition-all active:scale-99 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? 'Criando conta...' : 'Criar conta'}
                </button>

                {/* Alternar para Login */}
                <div className="text-center text-xs text-[#636E72] pt-2 pb-3">
                  Já tem uma conta?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError(null);
                    }}
                    className="font-bold text-[#1E3F1A] hover:underline cursor-pointer"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Modal Esqueci Minha Senha */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-[#E5E7EB]">
            <h3 className="text-base font-bold text-[#1E2522] mb-1">
              Recuperar senha
            </h3>
            <p className="text-xs text-[#636E72] mb-4">
              Informe seu e-mail para receber as instruções de recuperação da sua conta.
            </p>

            {forgotSent ? (
              <div className="p-4 bg-[#F0F5EE] border border-[#D6E6D1] rounded-2xl flex items-center gap-3 text-xs text-[#1E3F1A] font-semibold">
                <CheckCircle2 size={20} className="shrink-0" />
                <span>Instruções de redefinição enviadas para seu e-mail!</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#F1F3F0] border border-transparent focus:border-[#1E3F1A] focus:bg-white rounded-xl focus:outline-none"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#636E72] hover:bg-[#F1F3F0]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#1E3F1A] text-white text-xs font-bold shadow-sm"
                  >
                    Enviar link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
