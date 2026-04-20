/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from 'motion/react';
import { Mail, Github, Linkedin, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[#020205]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.a 
            href="#home"
            className="text-2xl font-bold tracking-tighter"
            whileHover={{ scale: 1.05 }}
          >
            K<span className="text-white/40">A</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://www.linkedin.com/in/kunalawasthi21" target="_blank" rel="noreferrer" className="p-2 text-white/50 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:kunalawasthi2002@gmail.com" className="p-2 text-white/50 hover:text-white transition-colors">
              <Mail size={18} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-left"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        className="fixed inset-0 z-30 bg-[#020205] flex flex-col items-center justify-center space-y-8 md:hidden"
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-bold tracking-tighter hover:text-white/50 transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="flex space-x-6 pt-8">
            <a href="https://www.linkedin.com/in/kunalawasthi21" target="_blank" rel="noreferrer" className="p-4 rounded-full border border-white/10">
              <Linkedin size={24} />
            </a>
            <a href="mailto:kunalawasthi2002@gmail.com" className="p-4 rounded-full border border-white/10">
              <Mail size={24} />
            </a>
        </div>
      </motion.div>
    </>
  );
}
