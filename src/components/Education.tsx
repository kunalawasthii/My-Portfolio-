/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Calendar } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export default function Education() {
  const { education } = RESUME_DATA;

  return (
    <section id="education" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Academic Background</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <GraduationCap size={160} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <GraduationCap size={20} className="text-white/60" />
                    </div>
                    <span className="px-4 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {item.dates}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-4">{item.degree}</h3>
                <p className="text-lg text-white/60 mb-6">{item.institution}</p>
                
                <div className="flex items-center space-x-2 text-white/30 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={12} />
                    <span>Graduating 2025</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
