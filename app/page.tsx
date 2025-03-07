'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import LoadingScreen from "./components/LoadingScreen";
import Image from 'next/image';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20%" }}
    transition={{ duration: 0.8 }}
    className={`min-h-screen flex items-center justify-center p-8 ${className}`}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  </motion.section>
);

const ContactForm: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-blue-900/90 to-red-900/90 p-8 rounded-2xl w-full max-w-md backdrop-blur-sm border border-blue-500/20"
          >
            <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
              Contáctanos
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-blue-950/50 border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-blue-950/50 border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-blue-950/50 border border-blue-500/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Tu mensaje..."
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-blue-500/20 hover:bg-blue-900/30 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavBar = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detectar sección actual
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsScrolling(true);
    const section = document.getElementById(sectionId);
    if (section) {
      // Animación suave personalizada
      const targetPosition = section.offsetTop - 64; // Compensar la altura del navbar
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Duración de la animación en ms
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Función de easing
        const easeInOutCubic = (t: number) => 
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-transparent backdrop-blur-md' : 'bg-transparent backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400"
            whileHover={{ scale: 1.05 }}
          >
            ADN DEVs
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'mision', label: 'Misión' },
              { id: 'vision', label: 'Visión' },
              { id: 'valores', label: 'Valores' },
              { id: 'equipo', label: 'Equipo' },
              { id: 'proyectos', label: 'Proyectos' }
            ].map(({ id, label }) => (
              <motion.button
                key={id}
                className={`text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-red-500/20 px-3 py-1 rounded-full'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => scrollToSection(id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={isScrolling ? { scale: activeSection === id ? 1.1 : 1 } : {}}
              >
                {label}
              </motion.button>
            ))}
          </div>
          {/* Menú móvil */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-blue-800/20"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-300 hover:text-white transition-colors"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="sr-only">{label}</span>
    {children}
  </motion.a>
);

const Footer = () => (
  <footer className="relative z-10 bg-gradient-to-r from-blue-900/90 to-red-900/90 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo y descripción */}
        <div className="text-center md:text-left">
          <motion.h3
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            ADN DEVs
          </motion.h3>
          <p className="text-gray-300 text-sm">
            Llevamos codigo en nuestro ADN.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div className="text-center">
          <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
          <div className="space-y-2">
            <motion.a
              href="#inicio"
              className="block text-gray-300 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              Inicio
            </motion.a>
            <motion.a
              href="#proyectos"
              className="block text-gray-300 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              Proyectos
            </motion.a>
            <motion.a
              href="#equipo"
              className="block text-gray-300 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              Equipo
            </motion.a>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="text-center md:text-right">
          <h4 className="text-white font-semibold mb-4">Síguenos</h4>
          <div className="flex justify-center md:justify-end space-x-6">
            <SocialIcon
              href="https://github.com/tu-usuario"
              label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </SocialIcon>
            <SocialIcon
              href="https://instagram.com/tu-usuario"
              label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </SocialIcon>
            <SocialIcon
              href="https://linkedin.com/in/tu-usuario"
              label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </SocialIcon>
            <SocialIcon
              href="mailto:tu@email.com"
              label="Email"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <motion.div
        className="h-px bg-gradient-to-r from-blue-500/20 via-red-500/20 to-blue-500/20 my-8"
        whileInView={{ scaleX: [0, 1] }}
        transition={{ duration: 1 }}
      />

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} ADN DEVs. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    // Simulamos una carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="bg-black text-white relative min-h-screen">
      <NavBar />
      <div className="fixed inset-0">
        <Particles
          className="absolute inset-0"
          init={async (engine: Engine) => {
            await loadFull(engine);
          }}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: ["#3b82f6", "#ef4444"],
              },
              links: {
                color: "#6366f1",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <div className="relative z-10">
        {/* Hero Section */}
        <Section id="inicio" className="relative pt-20">
          <div className="text-center">
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              ADN DEVs
            </motion.h1>
            <motion.p
              className="mt-6 text-xl md:text-2xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Transformando ideas en soluciones digitales
            </motion.p>
          </div>
        </Section>

        {/* Misión Section */}
        <Section id="mision" className="bg-blue-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              Nuestra Misión
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Crear soluciones tecnológicas prácticas y accesibles que resuelvan problemas cotidianos y mejoren
             la vida de las personas. Nos enfocamos en desarrollar herramientas útiles y fáciles de usar, 
             contribuyendo al crecimiento tecnológico de Villavicencio y apoyando a las comunidades locales.
            </p>
          </div>
        </Section>

        {/* Visión Section */}
        <Section id="vision">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              Nuestra Visión
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Ser reconocidos como un equipo confiable y cercano que desarrolla tecnología 
            útil y de calidad para Villavicencio y Colombia. Queremos ser parte del progreso 
            de nuestra ciudad, creando soluciones que realmente funcionen y que inspiren a otros a innovar.
            </p>
          </div>
        </Section>

        {/* Valores Section */}
        <Section id="valores" className="bg-blue-900/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovación",
                  description: "Buscamos constantemente nuevas formas de resolver desafíos tecnológicos."
                },
                {
                  title: "Excelencia",
                  description: "Nos comprometemos con los más altos estándares de calidad en cada proyecto."
                },
                {
                  title: "Integridad",
                  description: "Actuamos con honestidad y transparencia en todas nuestras interacciones."
                },
              ].map((valor, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent border border-purple-800/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-4">{valor.title}</h3>
                  <p className="text-gray-300">{valor.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Equipo Section */}
        <Section id="equipo">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              Nuestro Equipo
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{
                name: "Dhaniel Santamaria",
                role: "CEO - Analista de Seguridad - Full Stack Developer",
                description: "Especialista en seguridad informatica y desarrollo full stack",
                image: "/images/Jose.jpg"
              },
              {
                name: "Julian Avila",
                role: "SEO - Frontend Developer",
                description: "Especialista en diseño UI/UX y desarrollo frontend",
                image: "/images/Julian.jpg"
              },
              {
                name: "Nicolas Aviles",
                role: "SEO - Frontend Developer",
                description: "Especialista en diseño UI/UX y desarrollo frontend",
                image: "/images/Negro.jpg"
              }].map((member, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent border border-purple-800/20 backdrop-blur-sm text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image src={member.image} alt={member.name} width={160} height={160} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-purple-400 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Proyectos Section */}
        <Section id="proyectos" className="bg-blue-900/20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              Nuestros Proyectos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
                title: "MetaEdu Explorer",
                description: "Plataforma web interactiva que permite explorar y conocer todos los colegios del departamento del Meta. Facilita la búsqueda de instituciones educativas mostrando información detallada, ubicación, características y datos relevantes para padres y estudiantes.",
                tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
                features: [
                  "Mapa interactivo de instituciones",
                  "Filtros de búsqueda avanzada",
                  "Perfiles detallados de colegios",
                ],
                status: "En desarrollo"
              }].map((project, index) => (
                <motion.div
                  key={index}
                  className="col-span-full max-w-4xl mx-auto group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/50 to-red-900/50 border border-blue-800/20 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-500/20 border border-blue-500/40">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">
                        Características principales:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-500/10 to-red-500/10 border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Recomendación Section */}
        <Section id="recomendacion" className="bg-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              En ADN DEVs, no solo desarrollamos software; creamos soluciones que 
              transforman negocios. Nuestro equipo combina experiencia técnica con 
              una profunda comprensión de las necesidades empresariales, garantizando 
              resultados excepcionales en cada proyecto.
            </p>
            <motion.button
              className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-500 to-red-500 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactOpen(true)}
            >
              Contáctanos
            </motion.button>
          </div>
        </Section>
        <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <Footer />
      </div>
    </main>
  );
}
