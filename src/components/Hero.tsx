/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export default function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const { basics } = RESUME_DATA;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] uppercase tracking-[0.25em] text-white/50 mb-8">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent"
          >
            {basics.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/60 font-medium mb-4"
          >
            {basics.title}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-white/40 max-w-2xl mb-12 leading-relaxed"
          >
            {basics.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <a 
              href="#experience"
              className="group flex items-center space-x-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-all duration-300"
            >
              <span>View Experience</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button 
              onClick={onOpenResume}
              className="group flex items-center space-x-3 px-8 py-4 border border-white/10 hover:bg-white/5 backdrop-blur-sm rounded-full font-bold hover:scale-105 transition-all duration-300"
            >
              <Download size={18} />
              <span>Resume PDF</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
