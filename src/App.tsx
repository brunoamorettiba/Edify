/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  Video,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  Calendar,
  Users,
  Target,
  Zap,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Clock
} from 'lucide-react';

// --- Utils ---

export const handleScheduleClick = (source: string) => {
  // 1. Integración de Rastreo de Leads (Lead Tracking)
  console.log(`[Lead Tracking] User clicked schedule from: ${source}`);
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    // Si usan Google Analytics / GTM
    (window as any).dataLayer.push({ event: 'schedule_click', source });
  }

  // 2. Redirección a Calendly
  window.open('https://calendly.com/brunoamoretti/meeting-call', '_blank');
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'apple-blur py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tight">Edify</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
          <a href="#problema" className="hover:text-black transition-colors">Problema</a>
          <a href="#sistema" className="hover:text-black transition-colors">El Sistema</a>
          <a href="#precios" className="hover:text-black transition-colors">Planes</a>
          <button onClick={() => handleScheduleClick('navbar_desktop')} className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black/80 transition-all cursor-pointer">
            Agendar llamada
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#problema" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Problema</a>
            <a href="#sistema" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">El Sistema</a>
            <a href="#precios" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Planes</a>
            <button onClick={() => handleScheduleClick('navbar_mobile')} className="bg-black text-white px-6 py-4 rounded-2xl text-lg font-semibold hover:bg-black/90 active:scale-[0.98] transition-all cursor-pointer">
              Agendar llamada estratégica
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Section = ({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => (
  <section id={id} className={`section-padding ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />

      {/* 1. Hero Section */}
      <Section className="pt-40 md:pt-56 overflow-hidden">
        <div className="text-center max-w-4xl mx-auto">
          <FadeIn>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-black/5 rounded-full text-black/60">
              Podcast Strategy Agency
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[1.05] mb-8">
              Tu podcast puede ser tu mejor <span className="text-black/40">máquina de ventas.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Transformamos podcasts en sistemas de autoridad que generan leads calificados y cierran ventas de alto valor.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => handleScheduleClick('hero')} className="w-full sm:w-auto bg-black text-white px-8 py-5 rounded-2xl text-lg font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 cursor-pointer">
                Agendar llamada estratégica
              </button>
              <button className="w-full sm:w-auto bg-white text-black border border-black/10 px-8 py-5 rounded-2xl text-lg font-semibold hover:bg-black/5 transition-all flex items-center justify-center gap-2 cursor-pointer">
                Ver cómo funciona <ChevronRight size={20} />
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Visual Mockup */}
        <FadeIn delay={0.5}>
          <div className="mt-24 relative max-w-5xl mx-auto">
            <div className="aspect-video bg-neutral-100 rounded-[2rem] border border-black/5 overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="flex items-center gap-1">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [20, 40, 15, 60, 20] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 bg-black/20 rounded-full"
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-12 -right-6 md:-right-12 bg-white p-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Nuevos Leads</p>
                <p className="text-lg font-bold">+127% este mes</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 -left-6 md:-left-12 bg-white p-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                <Video size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-black/40 uppercase tracking-wider">Clips Verticales</p>
                <p className="text-lg font-bold">5 Listos para publicar</p>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </Section>

      {/* 2. Problema */}
      <Section id="problema" className="bg-neutral-50">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                El problema no es tu contenido. <br />
                <span className="text-black/40">Es la falta de sistema.</span>
              </h2>
              <p className="text-xl text-black/60 mb-12">
                Muchos fundadores y marcas publican episodios con la esperanza de que algo pase. Pero la esperanza no es una estrategia de ventas.
              </p>
            </FadeIn>
          </div>
          <div className="grid gap-6">
            {[
              { title: "Publicás episodios... pero no generan leads.", desc: "Tu audiencia te escucha, pero no sabe qué paso dar después." },
              { title: "No tenés estrategia detrás del contenido.", desc: "Grabás lo que surge, sin un embudo de conversión claro." },
              { title: "No reutilizás el contenido en vertical.", desc: "Estás desperdiciando el 90% del alcance potencial de cada charla." },
              { title: "No hay sistema ni consistencia.", desc: "La edición te quita tiempo y la calidad varía cada semana." }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-black/60">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. La Solución Edify */}
      <Section id="sistema">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Un sistema. Cuatro episodios. <br /><span className="text-black/40">Resultados reales.</span></h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              No somos una fábrica de edición. Somos tu equipo estratégico de contenido.
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div className="h-full bg-neutral-50 p-10 rounded-[2.5rem] border border-black/5 flex flex-col">
              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-8">
                <Mic size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">4 Podcasts al mes</h3>
              <p className="text-black/60 mb-8 flex-grow">
                Edición profesional de audio y video enfocada en retención y claridad del mensaje.
              </p>
              <div className="pt-6 border-t border-black/5 text-sm font-bold text-black/40 uppercase tracking-widest">
                Enfoque Boutique
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="h-full bg-black text-white p-10 rounded-[2.5rem] flex flex-col">
              <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center mb-8">
                <Video size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">3–5 Clips Verticales</h3>
              <p className="text-white/60 mb-8 flex-grow">
                Extraemos los momentos de mayor impacto para Reels, TikTok y Shorts. Diseñados para viralizar autoridad.
              </p>
              <div className="pt-6 border-t border-white/10 text-sm font-bold text-white/40 uppercase tracking-widest">
                Máximo Alcance
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="h-full bg-neutral-50 p-10 rounded-[2.5rem] border border-black/5 flex flex-col">
              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-8">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Optimización Estratégica</h3>
              <p className="text-black/60 mb-8 flex-grow">
                Show notes, títulos SEO y ganchos psicológicos diseñados para convertir oyentes en clientes.
              </p>
              <div className="pt-6 border-t border-black/5 text-sm font-bold text-black/40 uppercase tracking-widest">
                Conversión Real
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 bg-neutral-900 text-white p-8 rounded-[2rem] text-center">
            <p className="text-lg font-medium">
              <span className="text-white/60">Diferencial Edify:</span> No trabajamos más de un episodio a la vez por cliente. Enfoque y calidad máxima garantizada.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* 4. Cómo Funciona */}
      <Section className="bg-white">
        <div className="text-center mb-24">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Tu única tarea es grabar.</h2>
            <p className="text-xl text-black/60">Nosotros nos encargamos de todo el ecosistema de contenido.</p>
          </FadeIn>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-black/5 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {[
              { step: "01", title: "Grabás tu episodio", desc: "Te enviamos una guía de preparación para que el audio y video sean impecables desde el origen.", icon: <Play /> },
              { step: "02", title: "Convertimos en sistema", desc: "Editamos el episodio completo y creamos los clips estratégicos que alimentarán tus redes.", icon: <Zap /> },
              { step: "03", title: "Publicás y convertís", desc: "Recibís todo el material listo para publicar, con copys y estrategia de distribución incluida.", icon: <TrendingUp /> }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="bg-white flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-white border border-black/5 shadow-xl rounded-full flex items-center justify-center mb-8 text-black">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-black/20 mb-2 tracking-widest">{item.step}</span>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Planes y Precios */}
      <Section id="precios" className="bg-neutral-50">
        <div className="text-center mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Inversión en Autoridad</h2>
            <p className="text-xl text-black/60">Elegí el plan que mejor se adapte a tu etapa actual.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-end">
          {/* Plan Mensual */}
          <FadeIn delay={0.1}>
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Plan Mensual</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">$1.199</span>
                <span className="text-black/40">/ mes</span>
              </div>
              <ul className="space-y-4 mb-10">
                {[
                  "4 Episodios al mes",
                  "3–5 Clips por episodio",
                  "Edición estratégica",
                  "Enfoque en conversión",
                  "Show notes & Títulos SEO"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/70">
                    <CheckCircle2 size={18} className="text-black/20" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleScheduleClick('pricing_monthly')} className="w-full py-4 rounded-2xl border border-black/10 font-semibold hover:bg-black hover:text-white transition-all cursor-pointer">
                Aplicar ahora
              </button>
            </div>
          </FadeIn>

          {/* Plan Anual */}
          <FadeIn delay={0.2}>
            <div className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                Mejor Valor
              </div>
              <h3 className="text-xl font-bold mb-2">Plan Anual</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">$11.988</span>
                <span className="text-white/40">/ año</span>
              </div>
              <p className="text-emerald-400 text-sm font-bold mb-8">Ahorrás 20% ($2.400 USD)</p>
              <ul className="space-y-4 mb-10">
                {[
                  "Todo lo del plan mensual",
                  "Prioridad en la agenda",
                  "Consultoría trimestral",
                  "Soporte prioritario"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70">
                    <CheckCircle2 size={18} className="text-white/20" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleScheduleClick('pricing_annual')} className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-lg shadow-white/5 cursor-pointer">
                Aplicar ahora
              </button>
            </div>
          </FadeIn>

          {/* Plan Tailored */}
          <FadeIn delay={0.3}>
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Plan Tailored</h3>
              <p className="text-black/40 mb-8">Soluciones específicas para necesidades complejas.</p>
              <p className="text-black/60 mb-10 italic">
                "Necesidades específicas requieren soluciones específicas."
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Frecuencia personalizada",
                  "Gestión de invitados",
                  "Producción in-situ",
                  "Estrategia multi-canal"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-black/70">
                    <CheckCircle2 size={18} className="text-black/20" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleScheduleClick('pricing_tailored')} className="w-full py-4 rounded-2xl border border-black/10 font-semibold hover:bg-black hover:text-white transition-all cursor-pointer">
                Solicitar propuesta
              </button>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 6. Para quién es / No es */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn>
            <div className="p-12 rounded-[3rem] bg-neutral-50 border border-black/5">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                Es para vos si... <CheckCircle2 className="text-emerald-500" />
              </h3>
              <ul className="space-y-6">
                {[
                  "Sos fundador o CEO de una empresa B2B.",
                  "Buscás posicionarte como autoridad en tu nicho.",
                  "Tenés un modelo de negocio claro y validado.",
                  "Entendés que el contenido es una inversión a largo plazo.",
                  "Valorás la calidad y el enfoque boutique por sobre el volumen."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-lg text-black/70">
                    <span className="w-1.5 h-1.5 bg-black rounded-full mt-3 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-12 rounded-[3rem] border border-black/5">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                No es para vos si... <X className="text-red-500" />
              </h3>
              <ul className="space-y-6">
                {[
                  "Tu podcast es solo un hobby sin fines comerciales.",
                  "Buscás la edición más barata del mercado.",
                  "No tenés un producto o servicio de alto valor para vender.",
                  "Querés resultados mágicos sin involucrarte en la grabación.",
                  "No estás dispuesto a seguir una estrategia de conversión."
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 text-lg text-black/40">
                    <span className="w-1.5 h-1.5 bg-black/20 rounded-full mt-3 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 7. Prueba Social (Placeholder) */}
      <Section className="bg-neutral-50">
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-sm font-bold text-black/40 uppercase tracking-[0.3em] mb-4">Confían en nosotros</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-30 grayscale">
              <img src="/logos/el-cafetal.jpg" alt="El Cafetal" className="h-12 w-12 rounded-full object-cover" />
              <img src="/logos/lo-de-davi.png" alt="Lo de Davi" className="h-10 object-contain" />
              <img src="/logos/carlos-devis.webp" alt="Carlos Devis" className="h-10 object-contain" />
              <img src="/logos/uptin.jpg" alt="Up10 Media" className="h-12 w-12 rounded-full object-cover" />
              <img src="/logos/hatch-fm.svg" alt="Hatch FM" className="h-8 object-contain" />
            </div>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/5">
              <p className="italic text-xl text-black/60 leading-relaxed mb-6">
                "Edify le dio a El Cafetal una identidad clara y una estrategia que se nota en cada episodio. La audiencia creció, el contenido conecta más y cada detalle tiene un propósito. Hizo toda la diferencia."
              </p>
              <div>
                <p className="font-semibold text-black/80">Josué Moreno</p>
                <p className="text-sm text-black/40">Host de El Cafetal · Teólogo</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-white p-10 rounded-[2.5rem] border border-black/5">
              <p className="italic text-xl text-black/60 leading-relaxed mb-6">
                "Desde Sobrenatural hasta Lo de Davi Live, Edify fue clave en la evolución de mi podcast. Entienden el contenido, la audiencia y cómo hacer crecer un proyecto sin perder autenticidad. Un equipo de otro nivel."
              </p>
              <div>
                <p className="font-semibold text-black/80">David Di Marco</p>
                <p className="text-sm text-black/40">Creador de contenido · Lo de Davi</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 8. Lead Magnet / Newsletter */}
      <Section className="bg-emerald-50 relative overflow-hidden py-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-200/50 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
              <Mic size={16} />
              Recurso Gratuito
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              ¿Todavía no estás listo para agendar?
            </h2>
            <p className="text-xl text-black/60 mb-10">
              Dejanos tu email y recibí nuestra guía gratuita: <span className="font-bold text-black">"De oyentes a clientes: La anatomía de un podcast B2B que vende"</span>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <form
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                const email = emailInput?.value;

                if (!email) return;

                // Disable button and show loading
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                try {
                  const res = await fetch('/api/send-guide', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });

                  if (res.ok) {
                    console.log('[Lead Tracking] Guide sent successfully');
                    if (typeof window !== 'undefined' && (window as any).dataLayer) {
                      (window as any).dataLayer.push({ event: 'lead_magnet_submit' });
                    }
                    submitBtn.textContent = '¡Enviada! ✓';
                    submitBtn.className = submitBtn.className.replace('bg-black', 'bg-emerald-600');
                    emailInput.value = '';
                    emailInput.disabled = true;
                  } else {
                    throw new Error('Error al enviar');
                  }
                } catch (err) {
                  console.error('Error:', err);
                  submitBtn.textContent = 'Reintentar';
                  submitBtn.disabled = false;
                  alert('Hubo un error al enviar la guía. Por favor intentá de nuevo.');
                }
              }}
            >
              <input
                type="email"
                placeholder="Tu mejor email laboral..."
                required
                className="flex-grow px-6 py-4 rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-black/90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                Quiero la guía
              </button>
            </form>
            <p className="text-sm text-black/40 mt-4">
              100% valor. 0% spam. Podés desuscribirte cuando quieras.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* 9. CTA Final */}
      <Section className="pb-40">
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] bg-white/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] bg-white/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8">
                Si vas a hacer un podcast, <br />
                <span className="text-white/40">hacelo estratégico.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12">
                Estamos listos para construir tu sistema de autoridad. ¿Vos estás listo para el siguiente nivel?
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <button onClick={() => handleScheduleClick('final_cta')} className="bg-white text-black px-10 py-6 rounded-2xl text-xl font-bold hover:scale-[1.05] transition-all shadow-2xl shadow-white/10 mb-6 cursor-pointer">
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
            <a href="#" className="hover:text-black transition-colors">Términos</a>
            <a href="#" className="hover:text-black transition-colors">Privacidad</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          </div>

          <p className="text-sm text-black/40">
            © {new Date().getFullYear()} Edify. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
