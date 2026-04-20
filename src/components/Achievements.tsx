/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { RESUME_DATA } from '../constants';

function AchievementCard({ achievement, index }: { achievement: any, index: number, key?: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x);
  const mouseY = useSpring(y);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
    const mouseYRelative = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseXRelative);
    y.set(mouseYRelative);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const icons = [<Trophy />, <Zap />, <Star />, <Award />];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl hover:border-white/20 transition-colors"
    >
      <div 
        className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
            background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)'
        }}
      />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white/50 group-hover:text-white">
          {icons[index % icons.length]}
        </div>
        
        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-2">{achievement.type}</span>
        <h3 className="text-2xl font-bold mb-4 leading-tight">{achievement.title}</h3>
        <p className="text-sm text-white/40 leading-relaxed">{achievement.context}</p>
      </div>

      <div className="absolute top-6 right-6 text-4xl font-black text-white/[0.02] select-none">
        0{index + 1}
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const { achievements } = RESUME_DATA;

  return (
    <section id="achievements" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 block mb-4">Milestones</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Impact & Achievements</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} index={index} />
          ))}
        </div>

        {/* Top 3 Impact Strip (Above Fold implied, but we put it as a standout feature) */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-1 bg-linear-to-r from-white/10 via-white/5 to-white/10 rounded-full"
        >
            <div className="bg-[#020205] rounded-full px-12 py-6 flex flex-wrap justify-between items-center gap-8">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">100%</span>
                    <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Fortinet Certified</span>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block" />
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">2+ Years</span>
                    <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Leadership Exp.</span>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block" />
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">Paper Presented</span>
                    <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest">ICRTICC-2025</span>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block" />
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">Full Stack</span>
                    <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Development</span>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
