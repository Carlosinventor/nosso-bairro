import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageCircle, Compass, Star, Heart, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: '1',
    category: 'Primeiros passos',
    question: 'Como funciona o Nosso Bairro?',
    answer: 'O Nosso Bairro é uma plataforma comunitária feita para que vizinhos descubram locais, conheçam eventos, compartilhem novidades e contribuam com avaliações e fotos dos comércios da nossa região.'
  },
  {
    id: '2',
    category: 'Como avaliar',
    question: 'Como faço para avaliar um estabelecimento?',
    answer: 'Acesse o local desejado através da busca ou mapa, toque em "Avaliar este local", escolha a quantidade de estrelas de 1 a 5, escreva seu comentário e adicione fotos se desejar.'
  },
  {
    id: '3',
    category: 'Contribuições',
    question: 'Como adicionar um novo local ou sugerir correções?',
    answer: 'Toque no botão central "+ Compartilhar" na barra inferior. Se o local já existir, você poderá sugerir fotos novas ou atualizações de horário/telefone.'
  },
  {
    id: '4',
    category: 'Favoritos',
    question: 'Onde encontro meus locais favoritos salvos?',
    answer: 'Você pode acessar seus favoritos diretamente pela tela inicial no card "Meus favoritos" ou pelo botão de coração na tela do estabelecimento. Seus favoritos ficam salvos na sua conta do Supabase.'
  },
  {
    id: '5',
    category: 'Privacidade',
    question: 'Meus dados e histórico ficam seguros?',
    answer: 'Sim. Todas as informações privadas são protegidas de acordo com a LGPD e armazenadas no Supabase com autenticação segura.'
  }
];

export const HelpCenterScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const filteredFaqs = FAQS.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase()) ||
    faq.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-28 bg-[#F8F9F5] min-h-screen animate-fadeIn">
      <Header title="Central de ajuda" showBack={true} />

      <main className="px-4 py-4 space-y-5">
        {/* Banner with Search in Forest Green */}
        <div className="p-5 rounded-[28px] bg-[#2D5A27] text-white shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#E8EFE6] text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={16} />
            <span>Suporte Comunitário</span>
          </div>

          <h2 className="text-lg font-bold leading-tight">
            Como podemos ajudar?
          </h2>

          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#95A5A6]" />
            <input
              type="text"
              placeholder="Digite sua dúvida ou palavra-chave..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white text-[#2D3436] text-xs rounded-2xl border-none focus:outline-none placeholder:text-[#95A5A6] shadow-sm"
            />
          </div>
        </div>

        {/* Quick Shortcut Cards */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setSearch('primeiros passos')}
            className="p-3 bg-white rounded-[20px] border border-[#F0F0F0] shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#2D5A27]/30 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Compass size={17} />
            </div>
            <span className="text-[10px] font-bold text-[#2D3436] leading-tight">
              Início
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearch('avaliar')}
            className="p-3 bg-white rounded-[20px] border border-[#F0F0F0] shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#2D5A27]/30 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Star size={17} />
            </div>
            <span className="text-[10px] font-bold text-[#2D3436] leading-tight">
              Avaliações
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearch('favoritos')}
            className="p-3 bg-white rounded-[20px] border border-[#F0F0F0] shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#2D5A27]/30 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Heart size={17} />
            </div>
            <span className="text-[10px] font-bold text-[#2D3436] leading-tight">
              Favoritos
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSearch('privacidade')}
            className="p-3 bg-white rounded-[20px] border border-[#F0F0F0] shadow-sm flex flex-col items-center justify-center text-center group cursor-pointer hover:border-[#2D5A27]/30 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Shield size={17} />
            </div>
            <span className="text-[10px] font-bold text-[#2D3436] leading-tight">
              Privacidade
            </span>
          </button>
        </div>

        {/* Accordion FAQs list */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-[#95A5A6] uppercase tracking-widest px-1">
            Ajuda por assunto
          </h3>

          <div className="space-y-2.5">
            {filteredFaqs.map(faq => {
              const isExpanded = expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#2D3436] pr-2">
                      {faq.question}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-[#2D5A27] shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-[#95A5A6] shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#636E72] border-t border-[#F0F0F0] leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to Contact Us */}
        <div className="p-4 bg-white rounded-[24px] border border-[#F0F0F0] shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F1F3F0] text-[#2D5A27] flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2D3436]">
                Precisa de mais ajuda?
              </h4>
              <p className="text-[11px] text-[#636E72]">
                Envie sua mensagem para a moderação
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('contact_us')}
            className="py-2.5 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Fale conosco
          </button>
        </div>
      </main>
    </div>
  );
};
