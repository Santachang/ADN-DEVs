'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";
import LoadingScreen from "./components/LoadingScreen";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const Section = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className={`min-h-screen flex items-center justify-center p-8 ${className}`}
  >
    {children}
  </motion.section>
);

const ContactForm = ({ isOpen, onClose }) => {
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
    <main className="bg-gradient-to-br from-blue-950 via-gray-900 to-red-950 text-white relative min-h-screen">
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
      {/* Hero Section */}
      <Section className="relative">
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
      <Section className="bg-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Nuestra Misión
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Impulsar la transformación digital de nuestros clientes a través de soluciones 
            tecnológicas innovadoras y personalizadas, garantizando la máxima calidad y 
            satisfacción en cada proyecto.
          </p>
        </div>
      </Section>

      {/* Visión Section */}
      <Section>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Nuestra Visión
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Ser reconocidos como líderes en el desarrollo de soluciones tecnológicas 
            innovadoras, estableciendo nuevos estándares de calidad y excelencia en 
            la industria del desarrollo de software.
          </p>
        </div>
      </Section>

      {/* Valores Section */}
      <Section className="bg-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
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
      <Section>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Nuestro Equipo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dhaniel Santamaria",
                role: "CEO & Full Stack Developer",
                description: "Especialista en arquitectura de software y desarrollo full stack con Next.js"
              },
              {
                name: "La pajarita",
                role: "CTO & Backend Developer",
                description: "Experto en desarrollo backend y optimización de bases de datos"
              },
              {
                name: "Culo roto",
                role: "CCO & Frontend Developer",
                description: "Especialista en diseño UI/UX y desarrollo frontend"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/50 to-transparent border border-purple-800/20 backdrop-blur-sm text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900" />
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
      <Section>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
            Nuestros Proyectos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Proyecto 1",
                description: "Desarrollo de aplicación web empresarial",
                tech: ["Next.js", "React", "Node.js"],
                image: "/placeholder.jpg"
              },
              {
                title: "Proyecto 2",
                description: "Sistema de gestión de inventarios",
                tech: ["React", "Firebase", "Tailwind"],
                image: "/placeholder.jpg"
              },
              {
                title: "Proyecto 3",
                description: "Plataforma de e-commerce",
                tech: ["Next.js", "MongoDB", "Stripe"],
                image: "/placeholder.jpg"
              },
              {
                title: "Proyecto 4",
                description: "App móvil de delivery",
                tech: ["React Native", "Express", "PostgreSQL"],
                image: "/placeholder.jpg"
              },
              {
                title: "Proyecto 5",
                description: "Dashboard analítico",
                tech: ["Vue.js", "Python", "Django"],
                image: "/placeholder.jpg"
              },
              {
                title: "Proyecto 6",
                description: "Sistema de gestión educativa",
                tech: ["React", "Node.js", "MySQL"],
                image: "/placeholder.jpg"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/50 to-red-900/50 border border-blue-800/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 group-hover:opacity-75 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
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
      <Section className="bg-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
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
    </main>
  );
}
