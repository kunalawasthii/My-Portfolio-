/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Mail, Phone, MapPin, Linkedin, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { RESUME_DATA } from '../constants';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { basics, experience, skills, education, certifications, projects } = RESUME_DATA;
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    setDownloading(true);
    const opt = {
      margin: [10, 10] as [number, number],
      filename: `Kunal_Awasthi_Resume.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-white text-black rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header / Actions */}
            <div className="sticky top-0 z-10 flex flex-col md:flex-row justify-between items-center px-8 py-4 bg-gray-50 border-b border-gray-100 no-print gap-4">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Resume Preview</h3>
                <p className="text-[10px] text-gray-400">Note: Use "Save as PDF" in the print dialog or try "Fast Download".</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  disabled={downloading}
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 border border-black rounded-full text-xs font-bold hover:bg-black hover:text-white transition-all disabled:opacity-50"
                >
                  {downloading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Download size={14} />
                  )}
                  <span>Fast Download</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-full text-xs font-bold hover:scale-105 transition-transform"
                >
                  <Printer size={14} />
                  <span>Print PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div id="resume-content" className="p-8 md:p-16 overflow-y-auto bg-white flex-1 resume-paper">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-12 border-b-2 border-black pb-8">
                  <h1 className="text-4xl font-extrabold mb-4">{basics.name}</h1>
                  <p className="text-lg font-bold text-gray-700 mb-6">{basics.title}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Mail size={14} />
                            <span>{basics.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone size={14} />
                            <span>{basics.phone}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <MapPin size={14} />
                            <span>{basics.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Linkedin size={14} />
                            <span>linkedin.com/in/kunalawasthi21</span>
                        </div>
                    </div>
                  </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-12">
                    <section>
                      <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3" />
                        Summary
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-700">{basics.summary}</p>
                    </section>

                    <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center">
                          <span className="w-2 h-2 bg-black rounded-full mr-3" />
                          Experience
                        </h2>
                        <div className="space-y-8">
                            {experience.map((exp, b) => (
                                <div key={b}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold">{exp.role}</h3>
                                        <span className="text-xs font-bold text-gray-400">{exp.dates}</span>
                                    </div>
                                    <p className="text-xs font-bold mb-3">{exp.company} — {exp.location}</p>
                                    <ul className="space-y-2">
                                        {exp.bullets.map((bullet, i) => (
                                            <li key={i} className="text-sm text-gray-600 flex items-start space-x-3">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center">
                          <span className="w-2 h-2 bg-black rounded-full mr-3" />
                          Featured Project
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold">{projects[0].title}</h3>
                                {projects[0].certificateUrl && (
                                    <a href={projects[0].certificateUrl} target="_blank" rel="noreferrer" className="text-[9px] uppercase font-bold text-gray-400 hover:text-black underline no-print">
                                        View Certificate
                                    </a>
                                )}
                            </div>
                            <div className="flex gap-2 mb-4">
                                {projects[0].stack.map(s => (
                                    <span key={s} className="text-[10px] uppercase font-bold text-gray-400">{s}</span>
                                ))}
                            </div>
                            <ul className="space-y-2">
                                {projects[0].bullets.map((b, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-start space-x-3">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 shrink-0" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-12">
                     <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center">
                          <span className="w-2 h-2 bg-black rounded-full mr-3" />
                          Skills
                        </h2>
                        <div className="space-y-6">
                            {Object.entries(skills).map(([cat, items]) => (
                                <div key={cat}>
                                    <h4 className="text-[10px] uppercase font-black mb-2 text-gray-400">{cat}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map(s => (
                                            <span key={s} className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center">
                          <span className="w-2 h-2 bg-black rounded-full mr-3" />
                          Education
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h4 className="text-xs font-bold leading-tight mb-1">{edu.degree}</h4>
                                    <p className="text-[10px] text-gray-500 mb-1">{edu.institution}</p>
                                    <p className="text-[9px] font-black uppercase text-gray-400">{edu.dates}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xs uppercase tracking-[0.3em] font-black mb-6 flex items-center">
                          <span className="w-2 h-2 bg-black rounded-full mr-3" />
                          Certifications
                        </h2>
                        <ul className="space-y-4">
                            {certifications.map((c, i) => (
                                <li key={i} className="text-xs text-gray-600 leading-tight">
                                    <div className="font-bold flex items-center justify-between mb-1">
                                        <span>• {c.name}</span>
                                    </div>
                                    {c.url && (
                                        <a href={c.url} target="_blank" rel="noreferrer" className="text-[9px] text-gray-400 hover:text-black transition-colors block ml-3 underline truncate max-w-[150px]">
                                            View Certificate
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
