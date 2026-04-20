/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export default function Footer() {
  const { basics } = RESUME_DATA;

  return (
    <footer className="py-20 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">
              K<span className="text-white/40">A</span>
            </h2>
            <p className="text-white/40 max-w-sm leading-relaxed mb-8">
              A futuristic approach to full stack development and network security. Building scalable, secure, and user-centric digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href={basics.links[0]} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${basics.email}`} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-black mb-8 text-white/30">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/60">
                <Mail size={16} className="text-white/20" />
                <span>{basics.email}</span>
              </li>
              <li className="flex items-center space-x-3 text-white/60">
                <Phone size={16} className="text-white/20" />
                <span>{basics.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-white/60">
                <MapPin size={16} className="text-white/20" />
                <span>{basics.location}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-black mb-8 text-white/30">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Experience', 'Skills', 'Achievements', 'Education'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-white/20 text-xs font-medium">
            © {new Date().getFullYear()} Kunal Awasthi. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-medium flex items-center gap-2">
            Crafted with <span className="text-white/40">Vite + Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
