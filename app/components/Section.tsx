'use client';

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className = "", id = "" }: SectionProps) => (
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

export default Section; 