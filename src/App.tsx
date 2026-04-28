/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import Splash from './components/Splash';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020205] text-white selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <Splash onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <AnimatedBackground />
          <Navbar />
          <main>
            <Hero onOpenResume={() => setIsResumeOpen(true)} />
            <Experience />
            <Skills />
            <Achievements />
            <Education />
          </main>
          <Footer />
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </>
      )}
    </div>
  );
}

