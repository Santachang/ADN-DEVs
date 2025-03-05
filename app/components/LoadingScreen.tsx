'use client';

import { motion } from "framer-motion";
import { useMemo } from "react";

const DNAStrand = () => {
  const basePairs = 16;
  const radius = 20;
  const height = 200;

  const positions = useMemo(() => {
    return [...Array(basePairs)].map((_, i) => {
      const progress = i / basePairs;
      const angle = progress * Math.PI * 2;
      const x1 = Math.cos(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const y = (progress * height) - (height / 2);
      return { x1, x2, y, progress };
    });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-[100px] h-[200px] sm:w-[150px] sm:h-[250px] md:w-[200px] md:h-[300px]">
        <motion.div
          className="absolute inset-0"
          animate={{ 
            rotateY: 360,
            rotateZ: 360
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {positions.map(({ x1, x2, y, progress }, i) => (
            <motion.div key={i} className="absolute left-1/2 top-1/2 w-full">
              {/* Primera hebra */}
              <motion.div
                className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4"
                style={{
                  transform: `translate(${x1}px, ${y}px)`,
                }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: progress * 0.5,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-purple-500 rounded-full" />
              </motion.div>

              {/* Segunda hebra */}
              <motion.div
                className="absolute w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4"
                style={{
                  transform: `translate(${x2}px, ${y}px)`,
                }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: progress * 0.5,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-pink-500 rounded-full" />
              </motion.div>

              {/* Enlaces entre las hebras */}
              <motion.div
                className="absolute h-[2px] bg-gradient-to-r from-purple-500 to-pink-500"
                style={{
                  width: `${Math.abs(x1 - x2)}px`,
                  transform: `translate(${Math.min(x1, x2)}px, ${y}px)`,
                }}
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: progress * 0.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black flex items-center justify-center z-50">
      <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]">
        <DNAStrand />
      </div>
    </div>
  );
} 