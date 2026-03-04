import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  Mic,
  Video,
  Target,
  Sparkles,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import { handleScheduleClick } from './App';

// --- Types ---

interface CaseStudy {
  id: string;
  podcastName: string;
  hostName: string;
  category: string;
  problem: string;
  solution: string[];
  results: { label: string; value: string; trend?: string }[];
  videoUrl: string; // YouTube or video embed URL
  thumbnailColor: string; // Fallback gradient if no thumbnail
  quote?: string;
}

interface ViralClip {
  id: string;
  title: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  embedUrl: string;
  thumbnail?: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  analysis: string;
  hookUsed: string;
}

// --- Real Data ---

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-cafetal-jaime',
    podcastName: 'El Cafetal — Jaime Lorente',
    hostName: 'Josué Moreno',
    category: 'Podcast de Entrevistas · Episodio #22',
    problem: 'El Cafetal necesitaba convertir entrevistas long-form de alto valor emocional en un ecosistema de contenido que amplificara el alcance del podcast y generara audiencia nueva a través de redes sociales.',
    solution: [
      'Edición profesional del episodio completo (1:37:19) con ritmo optimizado para retención',
      'Extracción de clips verticales de los momentos más impactantes de la entrevista',
      'Distribución estratégica en múltiples cuentas: @elcafetaltv, @lacorrientecom, @josuemorenox',
      'Títulos SEO, timestamps y show notes diseñados para descubrimiento orgánico',
    ],
    results: [
      { label: 'Views en YouTube', value: '159K', trend: 'up' },
      { label: 'Likes en clip IG', value: '49.5K', trend: 'up' },
      { label: 'Comentarios clip', value: '331', trend: 'up' },
      { label: 'Duración episodio', value: '1:37:19', trend: 'up' },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=oAggaBRp5pc',
    thumbnailColor: 'from-neutral-900 to-neutral-700',
    quote: '"Cada episodio se convirtió en un ecosistema que trabaja en 5 plataformas simultáneamente."',
  },
  {
    id: 'case-cafetal-necko',
    podcastName: 'El Cafetal — Necko Vidal',
    hostName: 'Josué Moreno',
    category: 'Podcast de Entrevistas · Episodio #23',
    problem: 'La historia del hijo de Marcos Vidal requería una edición que respetara la profundidad emocional de la conversación, con capítulos bien definidos y clips que capturaran los momentos clave sin perder contexto.',
    solution: [
      'Edición con estructura narrativa por capítulos (Origen, Tueste, Molienda, Extracción)',
      'Clips verticales seleccionados por impacto emocional y potencial de viralización',
      'Optimización SEO para keywords como "Necko Vidal", "Marcos Vidal", "fe" y "crisis de fe"',
      'Distribución coordinada en @josuemorenox y @elcafetaltv el día del lanzamiento',
    ],
    results: [
      { label: 'Views en YouTube', value: '222K', trend: 'up' },
      { label: 'Likes en YouTube', value: '7.9K', trend: 'up' },
      { label: 'Comentarios YT', value: '1,800', trend: 'up' },
      { label: 'Duración episodio', value: '1:33:03', trend: 'up' },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=riViWsoe2Dk',
    thumbnailColor: 'from-black to-neutral-800',
  },
  {
    id: 'case-cafetal-renezz',
    podcastName: 'El Cafetal — Rene ZZ',
    hostName: 'Josué Moreno',
    category: 'Podcast de Entrevistas · Episodio #16',
    problem: 'Episodio extenso (casi 2 horas) con un invitado de alto perfil. El desafío era mantener la retención durante toda la pieza y extraer clips que funcionaran de forma autónoma en redes.',
    solution: [
      'Edición que mantiene el ritmo conversacional natural en un episodio de 1:52',
      'Clips verticales con los momentos de mayor carga emocional y espiritual',
      'Uno de los clips alcanzó 43.5K likes y 1,115 comentarios en Instagram',
      'Show notes con timestamps detallados para facilitar la navegación y el SEO',
    ],
    results: [
      { label: 'Views en YouTube', value: '115K', trend: 'up' },
      { label: 'Likes clip IG', value: '43.5K', trend: 'up' },
      { label: 'Comentarios clip IG', value: '1,115', trend: 'up' },
      { label: 'Duración episodio', value: '1:52:24', trend: 'up' },
    ],
    videoUrl: 'https://www.youtube.com/watch?v=7aYrp6MW_qM',
    thumbnailColor: 'from-neutral-800 to-neutral-600',
    quote: '"Un clip bien editado de 60 segundos puede traer más audiencia que un mes de publicaciones."',
  },
];

const VIRAL_CLIPS: ViralClip[] = [
  {
    id: 'clip-jaime',
    title: 'Jaime Lorente — Reflexión sobre la Fe',
    platform: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DKc5BHwuUmp/embed',
    thumbnail: '/thumbnails/clip-jaime.jpg',
    views: '717K',
    likes: '49.5K',
    comments: '331',
    shares: '—',
    analysis: 'Momento de máxima vulnerabilidad del actor Jaime Lorente. Edición que respeta la pausa emocional y potencia el mensaje con subtítulos limpios. Publicado en @lacorrientecom para alcanzar nueva audiencia.',
    hookUsed: 'Confesión personal + figura pública',
  },
  {
    id: 'clip-renezz',
    title: 'Rene ZZ — "Jesús cargó con su cruz"',
    platform: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/C5EXPKviTTH/embed',
    thumbnail: '/thumbnails/clip-renezz.jpg',
    views: '1.1M',
    likes: '43.5K',
    comments: '1,115',
    shares: '—',
    analysis: 'Momento espiritual de alto impacto. 1,115 comentarios demuestran que el clip generó conversación genuina. La edición mantiene el silencio del momento para que el mensaje respire.',
    hookUsed: 'Declaración poderosa + silencio editorial',
  },
  {
    id: 'clip-necko',
    title: 'Necko Vidal — El Cafetal #23',
    platform: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DKwLhyyioej/embed',
    thumbnail: '/thumbnails/clip-necko.jpg',
    views: '70K',
    likes: '4.8K',
    comments: '219',
    shares: '—',
    analysis: 'Clip de apertura del episodio más viral del canal (222K views). Música de fondo seleccionada para crear atmósfera cinematográfica. Funciona como trailer del episodio completo.',
    hookUsed: 'Trailer cinematográfico + música ambiental',
  },
  {
    id: 'clip-blackmango',
    title: 'La Historia de Abraham — Black Mango',
    platform: 'instagram',
    embedUrl: 'https://www.instagram.com/reel/DDhM0I2O1bW/embed',
    thumbnail: '/thumbnails/clip-blackmango.jpg',
    views: '52K',
    likes: '3.7K',
    comments: '65',
    shares: '—',
    analysis: 'Contenido narrativo con audio ambiental (a vow · as the light fades). Formato storytelling que atrapa desde el primer segundo. Edición que alterna between host y visuales complementarios.',
    hookUsed: 'Narrativa bíblica + producción cinematográfica',
  },
];

// --- Components ---

const Section = ({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`py-24 md:py-32 px-6 ${className}`}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const VideoEmbed = ({ url, fallbackGradient }: { url: string; fallbackGradient?: string }) => {
  if (!url) {
    return (
      <div className={`aspect-video rounded-2xl bg-gradient-to-br ${fallbackGradient || 'from-neutral-900 to-neutral-700'} flex items-center justify-center`}>
        <div className="text-center text-white/40">
          <Play size={48} className="mx-auto mb-3" />
          <p className="text-sm font-medium">Video próximamente</p>
        </div>
      </div>
    );
  }

  // YouTube embed
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be')
      ? url.split('/').pop()
      : new URL(url).searchParams.get('v') || url.split('/').pop();
    return (
      <div className="aspect-video rounded-2xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Generic iframe embed
  return (
    <div className="aspect-video rounded-2xl overflow-hidden">
      <iframe src={url} className="w-full h-full" allowFullScreen />
    </div>
  );
};

const VerticalVideoPreview = ({ url, platform, thumbnail }: { url: string; platform: string; thumbnail?: string }) => {
  // Extract the original reel URL (remove /embed suffix if present)
  const reelUrl = url.replace('/embed', '');

  return (
    <a
      href={reelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block aspect-[9/16] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 relative overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail image */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 z-10" />

      {/* Platform badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-md ${
          platform === 'instagram' ? 'bg-pink-500/30 text-white' :
          platform === 'tiktok' ? 'bg-cyan-500/30 text-white' :
          'bg-red-500/30 text-white'
        }`}>
          {platform}
        </div>
      </div>

      {/* Play button */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
          <Play size={28} className="text-white ml-1" fill="white" />
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <p className="text-white/80 text-xs font-medium flex items-center gap-1 drop-shadow-md">
          <ExternalLink size={12} /> Ver en {platform === 'instagram' ? 'Instagram' : platform === 'tiktok' ? 'TikTok' : 'YouTube'}
        </p>
      </div>
    </a>
  );
};

const MetricBadge = ({ label, value, trend }: { label: string; value: string; trend?: string }) => (
  <div className="bg-neutral-50 p-4 rounded-2xl border border-black/5">
    <p className="text-xs font-bold text-black/40 uppercase tracking-wider mb-1">{label}</p>
    <div className="flex items-center gap-2">
      <span className="text-xl font-bold">{value}</span>
      {trend === 'up' && <TrendingUp size={16} className="text-emerald-500" />}
    </div>
  </div>
);

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <FadeIn delay={index * 0.15}>
      <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-500">
        {/* Header - Always visible */}
        <div
          className="p-8 md:p-12 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-black/5 rounded-full text-black/50 mb-4">
                {study.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{study.podcastName}</h3>
              <p className="text-black/50 text-lg">{study.hostName}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 mt-2"
            >
              <ChevronDown size={20} className="text-black/40" />
            </motion.div>
          </div>

          {/* Quick metrics preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {study.results.map((r, i) => (
              <MetricBadge key={i} {...r} />
            ))}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-8 md:px-12 pb-12 border-t border-black/5 pt-8">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Left: Problem & Solution */}
                  <div>
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-black/40 uppercase tracking-widest mb-4">El Problema</h4>
                      <p className="text-black/70 text-lg leading-relaxed">{study.problem}</p>
                    </div>
                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-black/40 uppercase tracking-widest mb-4">Lo Que Hicimos</h4>
                      <ul className="space-y-3">
                        {study.solution.map((s, i) => (
                          <li key={i} className="flex gap-3 text-black/70">
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs font-bold">{i + 1}</span>
                            </div>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {study.quote && (
                      <blockquote className="border-l-4 border-black/10 pl-6 italic text-black/50 text-lg">
                        {study.quote}
                      </blockquote>
                    )}
                  </div>

                  {/* Right: Video */}
                  <div>
                    <h4 className="text-sm font-bold text-black/40 uppercase tracking-widest mb-4">Resultado</h4>
                    <VideoEmbed url={study.videoUrl} fallbackGradient={study.thumbnailColor} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
};

const ClipCard = ({ clip, index }: { clip: ViralClip; index: number }) => (
  <FadeIn delay={index * 0.1}>
    <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-500">
      {/* Video Preview */}
      <div className="p-4">
        <VerticalVideoPreview url={clip.embedUrl} platform={clip.platform} thumbnail={clip.thumbnail} />
      </div>

      {/* Info */}
      <div className="px-6 pb-6">
        <h4 className="font-bold text-lg mb-3">{clip.title}</h4>

        {/* Platform badge */}
        <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 ${
          clip.platform === 'instagram' ? 'bg-pink-50 text-pink-600' :
          clip.platform === 'tiktok' ? 'bg-cyan-50 text-cyan-600' :
          'bg-red-50 text-red-600'
        }`}>
          {clip.platform}
        </span>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-black/50">
            <Eye size={14} /> {clip.views}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-black/50">
            <Heart size={14} /> {clip.likes}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-black/50">
            <MessageCircle size={14} /> {clip.comments}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-black/50">
            <Share2 size={14} /> {clip.shares}
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-black/5">
          <p className="text-xs font-bold text-black/40 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles size={12} /> Análisis
          </p>
          <p className="text-sm text-black/60 leading-relaxed">{clip.analysis}</p>
          <div className="mt-3 pt-3 border-t border-black/5">
            <p className="text-xs text-black/40">
              <span className="font-bold">Hook usado:</span> {clip.hookUsed}
            </p>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);

// --- Main Portfolio Page ---

export default function Portfolio() {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 apple-blur py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="text-xl font-bold tracking-tight">Edify</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
            <a href="#casos" className="hover:text-black transition-colors">Casos</a>
            <a href="#clips" className="hover:text-black transition-colors">Clips</a>
            <a href="#proceso" className="hover:text-black transition-colors">Proceso</a>
            <button
              onClick={() => handleScheduleClick('portfolio_navbar')}
              className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black/80 transition-all cursor-pointer"
            >
              Agendar llamada
            </button>
          </div>
        </div>
      </nav>

      {/* 1. HERO */}
      <Section className="pt-40 md:pt-56">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-black/5 rounded-full text-black/60">
              Portfolio
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.05] mb-8">
              Nuestro trabajo <span className="text-black/40">habla por sí mismo.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto mb-16 leading-relaxed">
              Cada podcast es un proyecto único. Cada clip es una pieza estratégica diseñada para generar autoridad y conversión.
            </p>
          </FadeIn>

          {/* Highlight metrics */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: <Mic size={20} />, label: 'Episodios editados', value: '29+' },
                { icon: <Video size={20} />, label: 'Clips creados', value: '100+' },
                { icon: <Eye size={20} />, label: 'Views totales', value: '2.5M+' },
                { icon: <Target size={20} />, label: 'Engagement clips', value: '97K+ likes' },
              ].map((m, i) => (
                <div key={i} className="bg-neutral-50 p-6 rounded-2xl border border-black/5">
                  <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                    {m.icon}
                  </div>
                  <p className="text-2xl font-bold mb-1">{m.value}</p>
                  <p className="text-xs font-bold text-black/40 uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 2. CASOS DE ESTUDIO */}
      <Section id="casos" className="bg-neutral-50">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Casos de Estudio</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              De la grabación al ecosistema de contenido. Así transformamos cada podcast.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-6">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </Section>

      {/* 2.5 MORE EPISODES */}
      <Section>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Más episodios <span className="text-black/40">que editamos.</span>
            </h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Cada entrevista recibe el mismo nivel de producción. Estos son algunos de los episodios que pasaron por Edify.
            </p>
          </FadeIn>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Zazza el Italiano — Paternidad y Fe', ep: '#20', views: '28K views', duration: '1:32:03', videoId: 'a0vAFg7Zk5M' },
            { title: 'QuantumFracture / José Luis Crespo', ep: '#14', views: '46K views', duration: '1:18:21', videoId: 'wOWoZQDi0KE' },
          ].map((ep, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-500">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${ep.videoId}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-black/5 rounded-full px-2.5 py-1 text-black/50">El Cafetal {ep.ep}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{ep.title}</h3>
                  <div className="flex gap-4 text-sm text-black/40">
                    <span className="flex items-center gap-1"><Eye size={14} /> {ep.views}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {ep.duration}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 3. CLIPS DESTACADOS */}
      <Section id="clips">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Clips que <span className="text-black/40">generan tracción.</span>
            </h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Cada clip está diseñado con un hook estratégico, edición profesional y un objetivo claro: posicionarte como autoridad.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIRAL_CLIPS.map((clip, i) => (
            <ClipCard key={clip.id} clip={clip} index={i} />
          ))}
        </div>

        {/* Methodology callout */}
        <FadeIn delay={0.3}>
          <div className="mt-16 bg-neutral-900 text-white p-10 md:p-16 rounded-[2.5rem]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Nuestra metodología de clips</h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  No cortamos momentos al azar. Cada clip sigue una estructura probada para maximizar retención y engagement.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Hook en los primeros 3 segundos', desc: 'Dato impactante, pregunta provocadora o afirmación controversial.' },
                  { step: '02', title: 'Desarrollo con ritmo', desc: 'Edición dinámica con zooms, cortes y subtítulos que mantienen la atención.' },
                  { step: '03', title: 'Cierre con propósito', desc: 'CTA claro que dirige al episodio completo o a la acción deseada.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-sm font-bold text-white/20 mt-1">{item.step}</span>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* 4. PROCESO */}
      <Section id="proceso" className="bg-neutral-50">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              De grabación a ecosistema <span className="text-black/40">en 48hs.</span>
            </h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Tu única responsabilidad es grabar. Nosotros hacemos el resto.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <Mic size={28} />, title: 'Grabación', desc: 'Grabas tu episodio con nuestra guía de producción.', time: 'Día 1' },
            { icon: <Sparkles size={28} />, title: 'Edición', desc: 'Editamos audio/video con foco en retención y claridad.', time: 'Día 2-3' },
            { icon: <Video size={28} />, title: 'Clips', desc: 'Extraemos 3-5 clips verticales con hooks estratégicos.', time: 'Día 3-4' },
            { icon: <BarChart3 size={28} />, title: 'Optimización', desc: 'Show notes, SEO, títulos y CTAs de conversión.', time: 'Día 4-5' },
          ].map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-[2rem] border border-black/5 text-center h-full flex flex-col">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">{step.time}</span>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-black/60 flex-grow">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 5. CTA FINAL */}
      <Section className="pb-40">
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] bg-white/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] bg-white/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">
                ¿Querés que tu podcast <br />
                <span className="text-white/40">genere estos resultados?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12">
                Agendá una llamada de 15 minutos y te mostramos cómo tu podcast puede convertirse en tu mejor herramienta de ventas.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <button
                onClick={() => handleScheduleClick('portfolio_final_cta')}
                className="bg-white text-black px-10 py-6 rounded-2xl text-xl font-bold hover:scale-[1.05] transition-all shadow-2xl shadow-white/10 mb-6 cursor-pointer"
              >
                Agendar llamada estratégica
              </button>
              <p className="text-white/40 text-sm font-medium flex items-center justify-center gap-2">
                <Clock size={16} /> Cupos limitados. Trabajamos con pocas marcas por mes.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-lg font-bold tracking-tight">Edify</span>
          </div>
          <div className="flex gap-8 text-sm text-black/40 font-medium">
            <a href="/" className="hover:text-black transition-colors">Inicio</a>
            <a href="#casos" className="hover:text-black transition-colors">Casos</a>
            <a href="#clips" className="hover:text-black transition-colors">Clips</a>
          </div>
          <p className="text-sm text-black/40">
            © {new Date().getFullYear()} Edify. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
