/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export default function Skills() {
  const { skills, certifications } = RESUME_DATA;

  return (
    <section id="skills" className="py-32 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Core Competencies</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">Skills & Technologies</h2>
            
            <div className="space-y-12">
              {Object.entries(skills).map(([category, items], index) => (
                <div key={category}>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 mb-6 font-semibold">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill, sIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: sIndex * 0.05 }}
                        whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        className="px-6 py-3 rounded-2xl border border-white/5 bg-white/[0.03] text-sm font-medium backdrop-blur-sm transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[3rem] border border-white/5 bg-linear-to-br from-white/[0.03] to-transparent"
          >
            <h3 className="text-xl font-bold mb-8">Professional Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.a
                  key={index}
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      📜
                    </div>
                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors max-w-[200px] md:max-w-xs leading-tight">
                      {cert.name}
                    </span>
                  </div>
                  {cert.url && (
                    <ExternalLink size={14} className="text-white/20 group-hover:text-white transition-colors" />
                  )}
                </motion.a>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-3xl bg-white text-black">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-black mb-1">Featured Project</p>
                        <h4 className="text-xl font-bold">{RESUME_DATA.projects[0].title}</h4>
                    </div>
                    {RESUME_DATA.projects[0].certificateUrl && (
                        <a 
                            href={RESUME_DATA.projects[0].certificateUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-black text-white p-2 rounded-lg hover:scale-110 transition-transform"
                            title="View Presentation Certificate"
                        >
                            <ExternalLink size={16} />
                        </a>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {RESUME_DATA.projects[0].stack.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 font-bold uppercase">{s}</span>
                    ))}
                </div>
                <ul className="space-y-3">
                    {RESUME_DATA.projects[0].bullets.map((bullet, i) => (
                        <li key={i} className="text-sm opacity-80 leading-relaxed flex items-start space-x-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-black/20 shrink-0" />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
