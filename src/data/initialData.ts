import { Establishment, NewsItem, CommunityEvent, Campaign, NeighborhoodHighlight, Review, Contribution } from '../types';

export const INITIAL_ESTABLISHMENTS: Establishment[] = [
  {
    id: 'est-1',
    name: 'Padaria Cantinho do Pão',
    category: 'Padaria',
    subCategory: 'Padaria Artesanal & Confeitaria',
    description: 'Pães artesanais incríveis feitos com amor. ❤️',
    address: 'Rua das Acácias, 123 - Zona Sul',
    neighborhood: 'Zona Sul - Jardim Primavera',
    distanceMeters: 320,
    latitude: -23.55052,
    longitude: -46.633308,
    phone: '(11) 3456-7890',
    hours: 'Seg a Sex: 06h às 20h | Sáb e Dom: 06h30 às 21h',
    isOpenNow: true,
    rating: 4.9,
    reviewsCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@padariacantinhodopao',
      website: 'https://cantinhodopao.com.br',
      whatsapp: '(11) 99876-5432'
    },
    features: {
      delivery: true,
      breakfast: true,
      acceptsPix: true,
      parking: true,
      accessible: true,
      wifi: true,
      petFriendly: true,
      outdoorSeating: true
    },
    createdAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 'est-oficina',
    name: 'Oficina do Carlos',
    category: 'Oficina',
    subCategory: 'Mecânica & Manutenção Automotiva',
    description: 'Mecânica honesta e de confiança.',
    address: 'Rua dos Pinheiros, 140 - Zona Sul',
    neighborhood: 'Zona Sul - Jardim Primavera',
    distanceMeters: 450,
    latitude: -23.54920,
    longitude: -46.632100,
    phone: '(11) 3456-1122',
    hours: 'Seg a Sex: 08h às 18h | Sáb: 08h às 13h',
    isOpenNow: true,
    rating: 4.8,
    reviewsCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop'
    ],
    socialLinks: {
      whatsapp: '(11) 98765-1122'
    },
    features: {
      acceptsPix: true,
      parking: true,
      accessible: true
    },
    createdAt: '2023-02-14T09:00:00Z'
  },
  {
    id: 'est-cabeleireira',
    name: 'Cabeleireira Talita',
    category: 'Salão de Beleza',
    subCategory: 'Cortes & Coloração Personalizados',
    description: 'Cortes e coloração personalizados.',
    address: 'Av. das Flores, 88 - Zona Sul',
    neighborhood: 'Zona Sul - Jardim Primavera',
    distanceMeters: 280,
    latitude: -23.55100,
    longitude: -46.634100,
    phone: '(11) 3222-7788',
    hours: 'Ter a Sáb: 09h às 19h',
    isOpenNow: true,
    rating: 4.9,
    reviewsCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@talitacabelos',
      whatsapp: '(11) 99111-2233'
    },
    features: {
      acceptsPix: true,
      parking: false,
      accessible: true,
      wifi: true
    },
    createdAt: '2023-03-10T10:00:00Z'
  },
  {
    id: 'est-feira',
    name: 'Feira Orgânica',
    category: 'Mercado',
    subCategory: 'Produtos Frescos Direto do Produtor & Hortifrúti',
    description: 'Produtos frescos direto do produtor.',
    address: 'Praça Central - Zona Sul',
    neighborhood: 'Zona Sul - Jardim Primavera',
    distanceMeters: 600,
    latitude: -23.55300,
    longitude: -46.635000,
    phone: '(11) 3344-9988',
    hours: 'Quartas e Sábados: 07h às 13h',
    isOpenNow: true,
    rating: 4.7,
    reviewsCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=600&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=600&auto=format&fit=crop'
    ],
    socialLinks: {
      whatsapp: '(11) 98888-7766'
    },
    features: {
      acceptsPix: true,
      parking: true,
      accessible: true,
      outdoorSeating: true
    },
    createdAt: '2023-01-28T07:00:00Z'
  },
  {
    id: 'est-2',
    name: 'Padaria Central',
    category: 'Padaria',
    subCategory: 'Padaria Tradicional',
    description: 'A padaria mais antiga do bairro, com o melhor pão francês quentinho a toda hora, lanches na chapa e sucos naturais.',
    address: 'Av. das Flores, 450 - Centro do Bairro',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 620,
    latitude: -23.55210,
    longitude: -46.634500,
    phone: '(11) 3222-1199',
    hours: 'Todos os dias: 06h às 22h',
    isOpenNow: true,
    rating: 4.6,
    reviewsCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@padariacentralbairro',
      whatsapp: '(11) 98888-2233'
    },
    features: {
      delivery: false,
      breakfast: true,
      acceptsPix: true,
      parking: false,
      accessible: true,
      wifi: false
    },
    createdAt: '2023-02-10T11:00:00Z'
  },
  {
    id: 'est-3',
    name: 'Pão & Sabor',
    category: 'Padaria',
    subCategory: 'Boutique de Pães e Café',
    description: 'Croissants franceses, cafés especiais moídos na hora e tortas finas para qualquer momento do seu dia.',
    address: 'Rua Ipê Amarelo, 88 - Vila Nova',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 1100,
    latitude: -23.55500,
    longitude: -46.638000,
    phone: '(11) 3789-0012',
    hours: 'Terça a Domingo: 07h às 19h',
    isOpenNow: true,
    rating: 4.7,
    reviewsCount: 56,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@paoesabor.cafe',
      website: 'https://paoesabor.com.br'
    },
    features: {
      delivery: true,
      breakfast: true,
      acceptsPix: true,
      parking: true,
      accessible: true,
      wifi: true
    },
    createdAt: '2023-03-01T09:00:00Z'
  },
  {
    id: 'est-4',
    name: 'Padaria da Esquina',
    category: 'Padaria',
    subCategory: 'Panificadora & Mercearia',
    description: 'Pães caseiros, bolos fresquinhos da vovó e conveniência rápida no coração do bairro.',
    address: 'Rua dos Pinheiros, 302',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 780,
    latitude: -23.54900,
    longitude: -46.631000,
    phone: '(11) 3344-5566',
    hours: 'Seg a Sáb: 06h às 20h',
    isOpenNow: false,
    rating: 4.4,
    reviewsCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      whatsapp: '(11) 97777-1234'
    },
    features: {
      delivery: false,
      breakfast: true,
      acceptsPix: true,
      parking: true,
      accessible: false
    },
    createdAt: '2023-04-12T14:00:00Z'
  },
  {
    id: 'est-5',
    name: 'Pet Shop Amigo Fiel',
    category: 'Pet Shop',
    subCategory: 'Clínica Veterinária & Banho e Tosa',
    description: 'Cuidado completo para o seu melhor amigo com veterinários qualificados, produtos premium, banho, tosa com carinho e táxi dog.',
    address: 'Rua das Palmeiras, 75',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 480,
    latitude: -23.54820,
    longitude: -46.632200,
    phone: '(11) 3678-9900',
    hours: 'Seg a Sex: 08h às 18h30 | Sáb: 08h às 15h',
    isOpenNow: true,
    rating: 4.9,
    reviewsCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@amigofielpet',
      whatsapp: '(11) 99123-4567'
    },
    features: {
      delivery: true,
      acceptsPix: true,
      parking: true,
      accessible: true,
      petFriendly: true
    },
    createdAt: '2023-01-20T08:30:00Z'
  },
  {
    id: 'est-6',
    name: 'Farmácia Bem Estar',
    category: 'Farmácia',
    subCategory: 'Farmácia & Drogaria 24h',
    description: 'Medicamentos com descontos para moradores do bairro, dermocosméticos, aferição de pressão e aplicação de vacinas.',
    address: 'Av. Principal, 1020',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 550,
    latitude: -23.55110,
    longitude: -46.635800,
    phone: '(11) 3100-2000',
    hours: 'Aberto 24 horas todos os dias',
    isOpenNow: true,
    rating: 4.7,
    reviewsCount: 154,
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      website: 'https://farmaciabemestar.com.br',
      whatsapp: '(11) 98111-9988'
    },
    features: {
      delivery: true,
      acceptsPix: true,
      parking: true,
      accessible: true
    },
    createdAt: '2023-02-05T16:00:00Z'
  },
  {
    id: 'est-7',
    name: 'Restaurante Sabor Caseiro',
    category: 'Restaurante',
    subCategory: 'Comida Brasileira & Almoço Executivo',
    description: 'A verdadeira comida brasileira com tempero afetivo da vovó, buffet por quilo variado, opções vegetarianas e sobremesas caseiras.',
    address: 'Rua das Magnólias, 210',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 890,
    latitude: -23.55340,
    longitude: -46.637100,
    phone: '(11) 3999-4433',
    hours: 'Seg a Sex: 11h30 às 15h30 | Sáb e Dom: 11h30 às 16h30',
    isOpenNow: true,
    rating: 4.8,
    reviewsCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@restaurantesaborcaseiro',
      whatsapp: '(11) 98765-4321'
    },
    features: {
      delivery: true,
      breakfast: false,
      acceptsPix: true,
      parking: true,
      accessible: true,
      outdoorSeating: true
    },
    createdAt: '2023-01-10T12:00:00Z'
  },
  {
    id: 'est-8',
    name: 'Academia Corpo & Mente',
    category: 'Academia',
    subCategory: 'Fitness, Musculação e Pilates',
    description: 'Equipamentos modernos, instrutores atenciosos, aulas de spinning, zumba, funcional e estúdio de pilates integrado.',
    address: 'Rua dos Cravos, 54',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 920,
    latitude: -23.54750,
    longitude: -46.634000,
    phone: '(11) 3888-7711',
    hours: 'Seg a Sex: 06h às 22h | Sáb: 08h às 16h',
    isOpenNow: true,
    rating: 4.9,
    reviewsCount: 87,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@corpoememte_fit',
      website: 'https://corpoememte.com.br'
    },
    features: {
      acceptsPix: true,
      parking: true,
      accessible: true,
      wifi: true
    },
    createdAt: '2023-03-15T15:00:00Z'
  },
  {
    id: 'est-9',
    name: 'Mercado São José',
    category: 'Mercado',
    subCategory: 'Supermercado & Hortifrúti',
    description: 'Hortifrúti fresquinho direto dos produtores da região, açougue completo, padaria própria e ofertas especiais toda semana.',
    address: 'Rua dos Girassóis, 400',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 670,
    latitude: -23.54980,
    longitude: -46.636200,
    phone: '(11) 3222-8877',
    hours: 'Seg a Sáb: 07h às 21h | Dom: 07h às 14h',
    isOpenNow: true,
    rating: 4.5,
    reviewsCount: 160,
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      whatsapp: '(11) 97654-3210'
    },
    features: {
      delivery: true,
      acceptsPix: true,
      parking: true,
      accessible: true
    },
    createdAt: '2023-02-28T10:00:00Z'
  },
  {
    id: 'est-10',
    name: 'Salão Bella Donna',
    category: 'Salão de Beleza',
    subCategory: 'Cabelo, Estética e Manicure',
    description: 'Espaço aconchegante para cuidar de você: cortes modernos, coloração, tratamentos capilares, manicure e estética facial.',
    address: 'Rua das Acácias, 89',
    neighborhood: 'Jardim Primavera',
    distanceMeters: 310,
    latitude: -23.55010,
    longitude: -46.633100,
    phone: '(11) 3555-9090',
    hours: 'Ter a Sáb: 09h às 19h',
    isOpenNow: true,
    rating: 4.8,
    reviewsCount: 73,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@belladonna_salao',
      whatsapp: '(11) 98444-5566'
    },
    features: {
      acceptsPix: true,
      parking: false,
      accessible: true,
      wifi: true
    },
    createdAt: '2023-04-05T13:00:00Z'
  },
  {
    id: 'est-11',
    name: 'Cafeteria Café & Aroma',
    category: 'Cafeteria',
    subCategory: 'Cafés Especiais, Brunch & Confeitaria',
    description: 'Cafés artesanais premiados, grãos moídos na hora, brunchs deliciosos, tortas e ambiente aconchegante com Wi-Fi.',
    address: 'Rua das Acácias, 204 - Zona Sul',
    neighborhood: 'Zona Sul - Jardim Primavera',
    distanceMeters: 380,
    latitude: -23.55180,
    longitude: -46.634800,
    phone: '(11) 3222-9900',
    hours: 'Seg a Sáb: 08h às 19h | Dom: 09h às 16h',
    isOpenNow: true,
    rating: 4.9,
    reviewsCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop'
    ],
    socialLinks: {
      instagram: '@cafearomabairro',
      whatsapp: '(11) 98888-3344'
    },
    features: {
      delivery: true,
      breakfast: true,
      acceptsPix: true,
      parking: true,
      accessible: true,
      wifi: true,
      petFriendly: true,
      outdoorSeating: true
    },
    createdAt: '2023-04-18T10:00:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    establishmentId: 'est-1',
    userId: 'user-demo-1',
    userName: 'Mariana Souza',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Melhor pão na chapa com requeijão da região! O atendimento é nota 10 e o café filtrado é maravilhoso.',
    createdAt: 'Há 2 dias',
    helpfulCount: 14
  },
  {
    id: 'rev-2',
    establishmentId: 'est-1',
    userId: 'user-demo-2',
    userName: 'Carlos Mendes',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    comment: 'Pão de fermentação natural incrível. Levo para casa toda sexta-feira. Recomendo muito o croissant de amêndoas!',
    createdAt: 'Há 5 dias',
    helpfulCount: 8
  },
  {
    id: 'rev-3',
    establishmentId: 'est-1',
    userId: 'user-demo-3',
    userName: 'Ana Paula Lima',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 4,
    comment: 'Ambiente aconchegante e limpo. Aos finais de semana costuma ter uma pequena fila, mas o atendimento é bem ágil.',
    createdAt: 'Há 1 semana',
    helpfulCount: 5
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Nova feira de orgânicos aos sábados na Praça Central',
    summary: 'Agricultores locais e produtores familiares trazem verduras, frutas sem agrotóxicos e queijos artesanais todos os sábados das 07h às 13h.',
    content: 'A Associação dos Moradores do Bairro, em parceria com a Secretaria de Agricultura Familiar, inaugurou a Feira de Orgânicos semanal na Praça Central. O evento reunirá mais de 15 produtores locais certificados, oferecendo verduras frescas, frutas da época, pães integrais, mel puro e queijos artesanais. Venha prestigiar nossos produtores e fortalecer o comércio local!',
    category: 'Melhorias',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1000&auto=format&fit=crop',
    date: '18 de Outubro',
    author: 'Associação de Moradores',
    readTime: '3 min'
  },
  {
    id: 'news-2',
    title: 'Revitalização da ciclovia e iluminação da Rua Verde',
    summary: 'Obras de melhoria asfáltica e instalação de lâmpadas de LED para maior segurança dos pedestres e ciclistas começam nesta segunda-feira.',
    content: 'As obras de recapeamento e sinalização da ciclofaixa da Rua Verde têm início nesta segunda-feira. A iniciativa faz parte do plano de mobilidade urbana sustentável do nosso bairro, incluindo a instalação de 40 novos pontos de iluminação LED inteligente.',
    category: 'Aviso Comunitário',
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1000&auto=format&fit=crop',
    date: '15 de Outubro',
    author: 'Conselho do Bairro',
    readTime: '2 min'
  },
  {
    id: 'news-3',
    title: 'Nova Cafeteria Especial abre as portas na Rua das Acácias',
    summary: 'Espaço aconchegante com grãos selecionados do sul de Minas e espaço pet friendly para trabalhar e relaxar.',
    content: 'O bairro ganhou mais um espaço acolhedor para os amantes de café. A Boutique do Grão chega com métodos manuais de extração, doces autorais e espaço coworking gratuito.',
    category: 'Nova Abertura',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
    date: '12 de Outubro',
    author: 'Redação Nosso Bairro',
    readTime: '2 min'
  }
];

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'Feira do Bairro & Música na Praça',
    description: 'Encontro comunitário com barracas gastronômicas dos estabelecimentos locais, artesanato, espaço kids e apresentações musicais acústicas de artistas do bairro.',
    date: 'Sábado, 28 de Outubro',
    time: '10:00 às 19:00',
    location: 'Praça Central das Flores',
    address: 'Praça das Flores, s/n - Centro do Bairro',
    category: 'Cultura & Gastronomia',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    organizer: 'Comissão Comunitária',
    interestedCount: 142,
    isUserInterested: false,
    price: 'Entrada Gratuita'
  },
  {
    id: 'event-2',
    title: 'Feira de Adoção de Cães e Gatos',
    description: 'Venha encontrar um novo membro para a família! Animais vacinados, castrados e vermifugados sob cuidados da ONG Quatro Patas.',
    date: 'Domingo, 29 de Outubro',
    time: '09:00 às 14:00',
    location: 'Em frente ao Pet Shop Amigo Fiel',
    address: 'Rua das Palmeiras, 75',
    category: 'Causa Animal',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1000&auto=format&fit=crop',
    organizer: 'ONG Quatro Patas & Pet Shop Amigo Fiel',
    interestedCount: 89,
    isUserInterested: true,
    price: 'Adoção Responsável'
  },
  {
    id: 'event-3',
    title: 'Cinema ao Ar Livre: Noite na Praça',
    description: 'Sessão especial de cinema sob as estrelas para todas as idades com distribuição gratuita de pipoca.',
    date: 'Sexta, 03 de Novembro',
    time: '19:30 às 22:00',
    location: 'Gramado da Praça das Flores',
    address: 'Praça das Flores, s/n',
    category: 'Cinema & Família',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    organizer: 'Coletivo Cine Bairro',
    interestedCount: 205,
    isUserInterested: false,
    price: 'Entrada Gratuita'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Campanha do Agasalho e Cobertores',
    description: 'Arrecadação de cobertores, mantas e casacos em bom estado para atender famílias em vulnerabilidade da nossa região.',
    organization: 'Ação Social do Bairro',
    goal: '500 peças de inverno',
    currentProgress: 76,
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop',
    deadline: '30 de Novembro',
    category: 'Solidariedade',
    contact: 'contato@acaosocialbairro.org',
    donorCount: 184
  },
  {
    id: 'camp-2',
    title: 'Horta Comunitária: Mais Verde no Bairro',
    description: 'Campanha de arrecadação de sementes, terra adubada e ferramentas para a expansão da horta comunitária da Rua das Magnólias.',
    organization: 'Coletivo Bairro Sustentável',
    goal: 'R$ 3.000 em insumos',
    currentProgress: 92,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?q=80&w=1000&auto=format&fit=crop',
    deadline: '15 de Novembro',
    category: 'Sustentabilidade',
    contact: 'horta@bairrosustentavel.org',
    donorCount: 95
  },
  {
    id: 'camp-3',
    title: 'Arrecadação de Ração para Animais Resgatados',
    description: 'Doação de sacos de ração para cães e gatos resgatados que aguardam adoção em lares temporários no bairro.',
    organization: 'Protetores Independentes do Bairro',
    goal: '800 kg de ração',
    currentProgress: 64,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    deadline: '10 de Dezembro',
    category: 'Causa Animal',
    contact: 'contato@protetoresbairro.org',
    donorCount: 112
  }
];

export const INITIAL_HIGHLIGHTS: NeighborhoodHighlight[] = [
  {
    id: 'hl-1',
    title: 'Padaria Cantinho do Pão',
    subtitle: 'Eleito o melhor pão artesanal e café pelo bairro',
    establishmentId: 'est-1',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    tag: 'Destaque da Semana',
    highlightReason: 'Mais de 120 avaliações com nota média 4.8 na comunidade',
    rating: 4.8
  },
  {
    id: 'hl-2',
    title: 'Pet Shop Amigo Fiel',
    subtitle: 'Excelência em atendimento e carinho com os pets',
    establishmentId: 'est-5',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    tag: 'Top Recomendado',
    highlightReason: 'Mais votado na categoria de serviços para animais de estimação',
    rating: 4.9
  },
  {
    id: 'hl-3',
    title: 'Restaurante Sabor Caseiro',
    subtitle: 'Comida com gostinho de casa e preço justo',
    establishmentId: 'est-7',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    tag: 'Queridinho da Comunidade',
    highlightReason: 'Buffet tradicional com ampla variedade no almoço',
    rating: 4.8
  }
];

export const INITIAL_USER_CONTRIBUTIONS: Contribution[] = [
  {
    id: 'cb-1',
    userId: 'user-default',
    userName: 'João da Silva',
    userEmail: 'joao.silva@email.com',
    establishmentId: 'est-1',
    establishmentName: 'Padaria Cantinho do Pão',
    type: 'photos',
    photos: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop'
    ],
    status: 'published',
    createdAt: 'Há 3 dias'
  },
  {
    id: 'cb-2',
    userId: 'user-default',
    userName: 'João da Silva',
    userEmail: 'joao.silva@email.com',
    establishmentId: 'est-5',
    establishmentName: 'Pet Shop Amigo Fiel',
    type: 'review',
    rating: 5,
    reviewComment: 'Excelente serviço de banho e tosa! Minha cachorrinha foi super bem tratada.',
    status: 'published',
    createdAt: 'Há 1 semana'
  },
  {
    id: 'cb-3',
    userId: 'user-default',
    userName: 'João da Silva',
    userEmail: 'joao.silva@email.com',
    establishmentId: 'est-7',
    establishmentName: 'Restaurante Sabor Caseiro',
    type: 'update_info',
    suggestedUpdate: 'Atualização do horário de funcionamento aos domingos: agora aberto até às 16h30.',
    status: 'published',
    createdAt: 'Há 2 semanas'
  },
  {
    id: 'cb-4',
    userId: 'user-default',
    userName: 'João da Silva',
    userEmail: 'joao.silva@email.com',
    establishmentId: 'est-3',
    establishmentName: 'Pão & Sabor',
    type: 'photos',
    photos: [
      'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=600&auto=format&fit=crop'
    ],
    status: 'under_review',
    createdAt: 'Hoje'
  }
];
