/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Mail, Phone, MapPin, Linkedin, Download, Loader2, Globe } from 'lucide-react';
import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { RESUME_DATA } from '../constants';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { basics, experience, skills, education, certifications, projects, achievements } = RESUME_DATA;
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const element = document.getElementById('resume-content');
    if (!element) return;

    setDownloading(true);
    
    // Ensure we start from the top for capture
    element.scrollTop = 0;
    element.classList.add('pdf-generation');

    const opt = {
      margin: 0,
      filename: `Kunal_Awasthi_CV.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: false,
        scrollY: 0,
        windowWidth: 850, // Better balance for capture
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const, compress: true },
      pagebreak: { mode: ['css', 'legacy'] } // Removed avoid-all to prevent half-empty pages
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      element.classList.remove('pdf-generation');
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md overflow-y-auto"
        >
          <style>{`
            #resume-content.pdf-generation {
              width: 210mm !important;
              min-height: 297mm !important;
              display: block !important;
              padding: 12.7mm 15mm !important; /* Slightly tighter left/right for better fit */
              background: #ffffff !important;
              color: #000000 !important;
              font-family: Arial, Helvetica, sans-serif !important;
              box-sizing: border-box !important;
              position: relative !important;
              left: 0 !important;
              top: 0 !important;
            }
            #resume-content.pdf-generation .cv-entry {
              page-break-inside: avoid !important;
              margin-bottom: 8pt !important;
            }
            #resume-content.pdf-generation * {
              color: #000000 !important;
              border-color: #333333 !important;
              background: transparent !important;
              box-shadow: none !important;
              font-family: Arial, Helvetica, sans-serif !important;
              letter-spacing: normal !important;
              word-spacing: normal !important;
            }
            #resume-content.pdf-generation h1 {
              font-size: 24pt !important;
              margin-bottom: 6pt !important;
              font-weight: bold !important;
              color: #000000 !important;
            }
            #resume-content.pdf-generation h2 {
              font-size: 13pt !important;
              font-weight: bold !important;
              border-bottom: 1.5px solid #000 !important;
              margin-top: 14pt !important;
              margin-bottom: 8pt !important;
              padding-bottom: 3pt !important;
              text-transform: uppercase !important;
              display: block !important;
              width: 100% !important;
            }
            #resume-content.pdf-generation h3 {
              font-size: 11pt !important;
              font-weight: bold !important;
              margin: 0 !important;
            }
            #resume-content.pdf-generation p, 
            #resume-content.pdf-generation li, 
            #resume-content.pdf-generation span,
            #resume-content.pdf-generation a {
              font-size: 10pt !important;
              line-height: 1.4 !important;
            }
            #resume-content.pdf-generation a {
              color: #0000EE !important;
              text-decoration: underline !important;
            }
            @media print {
              .no-print { display: none !important; }
              #resume-content { padding: 0.5in 0.65in !important; }
            }
          `}</style>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-white text-black rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '95vh' }}
          >
            <div className="sticky top-0 z-10 flex flex-col md:flex-row justify-between items-center px-8 py-4 bg-gray-50 border-b border-gray-100 no-print gap-4">
              <div className="flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Professional ATS Resume</h3>
                <p className="text-[10px] text-gray-400 italic">Corporate Standard Layout • All Certifications Included</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  disabled={downloading}
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  <span>{downloading ? 'Generating PDF...' : 'Download Resume'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-black transition-all"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors ml-4">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div id="resume-content" className="p-8 md:p-12 overflow-y-auto bg-white flex-1 flex flex-col items-center print:p-0">
              <div className="w-full max-w-[210mm] space-y-4 text-black printable-area">
                {/* Header */}
                <header className="text-center space-y-1 pb-2 border-b border-gray-100 mb-4">
                  <h1 className="text-3xl font-bold uppercase tracking-tight text-black">{basics.name}</h1>
                  <h2 className="text-lg font-bold text-blue-700 border-none !m-0 !p-0 !normal-case tracking-normal !initial block">{basics.title}</h2>
                  <div className="flex flex-wrap justify-center items-center gap-y-1 text-xs text-gray-800 font-medium">
                    <span>{basics.location}</span>
                    <span className="mx-2 font-bold">•</span>
                    <span>{basics.phone}</span>
                    <span className="mx-2 font-bold">•</span>
                    <a href={`mailto:${basics.email}`} className="text-blue-700 hover:underline">{basics.email}</a>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-y-1 text-xs text-gray-800 mt-0.5">
                    <a href="https://linkedin.com/in/kunalawasthi21" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">linkedin.com/in/kunalawasthi21</a>
                    <span className="mx-2 font-bold">•</span>
                    <a href="https://github.com/kunalawasthii" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/kunalawasthii</a>
                    <span className="mx-2 font-bold">•</span>
                    <a href="https://kunalawasthii.github.io/My-Portfolio-/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Portfolio</a>
                  </div>
                </header>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-2 uppercase tracking-wide">Professional Summary</h2>
                  <p className="text-[13px] leading-snug text-gray-900 text-justify">{basics.summary}</p>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-2.5 uppercase tracking-wide">Technical Skills</h2>
                  <div className="space-y-1">
                    {Object.entries(skills).map(([cat, items]) => (
                      <div key={cat} className="text-[13px]">
                        <span className="font-bold">{cat}:</span>
                        <span className="text-gray-900 ml-2">{items.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-3 uppercase tracking-wide">Education</h2>
                  <div className="space-y-4">
                    {education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <h4 className="text-[14px] font-bold">{edu.degree}</h4>
                          <p className="text-[13px] text-gray-800">{edu.institution}</p>
                        </div>
                        <span className="text-[13px] font-bold text-gray-800 uppercase">{edu.dates}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-4 uppercase tracking-wide">Experience</h2>
                  <div className="space-y-5">
                    {experience.map((exp, b) => (
                      <div key={b} className="cv-entry">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h3 className="text-[15px] font-bold text-black">{exp.role}</h3>
                          <span className="text-[13px] font-bold text-gray-800">{exp.dates}</span>
                        </div>
                        <div className="flex justify-between items-baseline mb-2">
                          <p className="text-[14px] font-bold text-gray-800">{exp.company}</p>
                          <p className="text-[12px] text-gray-600 italic">{exp.location}</p>
                        </div>
                        <ul className="space-y-1 ml-5 list-disc text-[13px] text-gray-900">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="pl-1 text-justify">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-3 uppercase tracking-wide">Significant Projects</h2>
                  <div className="space-y-5">
                    {projects.map((proj, i) => (
                      <div key={i} className="cv-entry">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="text-[15px] font-bold text-black">{proj.title}</h3>
                          <div className="flex items-center space-x-3">
                            {proj.certificateUrl && (
                                <a href={proj.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-blue-600 hover:underline">
                                  Project Link
                                </a>
                            )}
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Stack: {proj.stack.join(', ')}</p>
                          </div>
                        </div>
                        <ul className="space-y-1 ml-5 list-disc text-[13px] text-gray-900">
                          {proj.bullets.map((bullet, idx) => (
                            <li key={idx} className="pl-1 text-justify">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-3 uppercase tracking-wide">Achievements & Research</h2>
                  <ul className="space-y-1 ml-5 list-disc text-[13px] text-gray-900">
                    {achievements.map((achievement, i) => (
                      <li key={i} className="pl-1">
                        <span className="font-bold">{achievement.title}:</span> {achievement.context}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b border-black pb-1 mb-3 uppercase tracking-wide">Professional Certifications</h2>
                  <ul className="grid grid-cols-1 gap-y-1.5 items-start">
                    {certifications.map((c, i) => (
                      <li key={i} className="text-[12px] text-gray-900 leading-tight list-disc ml-5">
                        <span className="font-semibold">{c.name}</span>
                        {c.url && (
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-[10px] text-blue-600 hover:underline truncate align-middle">
                            [Verify Credential]
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>

                <footer className="mt-8 pt-4 border-t border-gray-100 text-center">
                  <p className="text-[9px] text-gray-400 italic">
                    Digital Portfolio & Source Verification: kunalawasthii.github.io/My-Portfolio-
                  </p>
                </footer>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
