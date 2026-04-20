/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, Briefcase, Calendar, MapPin } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export default function Experience() {
  const { experience } = RESUME_DATA;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Professional Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Experience</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline View */}
          <div className="lg:col-span-2 space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-3xl overflow-hidden hover:border-white/10 transition-colors"
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full text-left p-8 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/70">
                        {item.dates}
                      </span>
                      {index === 0 && (
                        <span className="px-3 py-1 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-wider">
                          Recent
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{item.role}</h3>
                    <div className="flex items-center space-x-4 text-sm text-white/40">
                      <div className="flex items-center space-x-1">
                        <Briefcase size={14} />
                        <span>{item.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  >
                    <ChevronDown className="text-white/30" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <div className="h-px bg-white/5 mb-8" />
                      <ul className="space-y-4">
                        {item.bullets.map((bullet, bIndex) => (
                          <motion.li
                            key={bIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: bIndex * 0.05 }}
                            className="flex items-start space-x-4 text-white/60 leading-relaxed"
                          >
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Impact Highlights Side Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-32 border border-white/5 bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] p-10"
            >
              <h4 className="text-xl font-bold mb-8 flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">✨</span>
                <span>Impact Highlights</span>
              </h4>
              
              <div className="space-y-8">
                {/* Auto-pulled measurable metrics manually curated from data */}
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tighter">10-Week</p>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Intensive internship focused on FortiGate 7.4 Operator certification.
                  </p>
                </div>
                
                <div className="space-y-2">
                    <p className="text-3xl font-bold tracking-tighter">Team Led</p>
                    <p className="text-sm text-white/40 leading-relaxed">
                        Successfully managed a team of Meter Readers for nearly 2 years under DVVNL.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-4">Core Focus</p>
                    <div className="flex flex-wrap gap-2">
                        {['Network Security', 'Full Stack', 'Data Analytics'].map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-medium uppercase">{tag}</span>
                        ))}
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
