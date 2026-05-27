import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, TEAM_EN, TEAM_VI } from '../context/LanguageContext';
import { TeamMember } from '../types';
import { Users, Globe, Twitter, Github, Linkedin, X, Check } from 'lucide-react';

export default function Team() {
  const { language, t } = useLanguage();
  const teamList = language === 'en' ? TEAM_EN : TEAM_VI;
  const [selectedCommander, setSelectedCommander] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/40 text-left">
      <div className="w-full max-w-7xl mx-auto z-10 relative text-left">
        <center className="mb-16">
          <span className="font-mono text-[10px] text-[#5C7FA3] tracking-[0.3em] uppercase block mb-3 font-bold">
            // {t('coreLeadership') || 'OUR CORE LEADERSHIP'}
          </span>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase">
            {t('creativeBrainsTitle') || 'MEET THE CREATIVE BRAINS'}
          </h2>
        </center>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {teamList.map((member) => (
            <motion.div
              key={member.id}
              onClick={() => setSelectedCommander(member)}
              className="bg-white p-6 rounded-[24px] cursor-pointer relative overflow-hidden group border border-[#7BA7D9]/15 hover:border-[#7BA7D9]/30 hover:shadow-lg transition-all duration-300 text-left"
              whileHover={{ y: -3 }}
            >
              {/* Profile layout */}
              <div className="relative h-[240px] w-full rounded-xl overflow-hidden mb-6 border border-slate-100 bg-slate-50 flex items-center justify-center">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=7BA7D9&textColor=ffffff&fontSize=38`}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover shadow-sm group-hover:scale-102 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating role descriptor */}
                <div className="absolute top-4 left-4 bg-white/90 border border-[#7BA7D9]/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  <span className="font-mono text-[9px] text-[#5C7FA3] font-bold tracking-wider uppercase">
                    {member.role.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Name Block */}
              <h3 className="font-sans text-[#1D2B3D] text-lg font-bold uppercase transition-colors">
                {member.name}
              </h3>
              
              <p className="font-mono text-[10px] text-[#5C7FA3] mt-1.5 uppercase tracking-wider font-bold">
                {member.specialty}
              </p>

              <p className="text-[#2C3E50]/80 text-xs font-light mt-3 leading-relaxed font-sans line-clamp-3 text-left">
                {member.bio}
              </p>

              {/* simulated click indicator */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between font-mono text-[9px] tracking-widest text-[#5C7FA3]/60 font-bold">
                <span>{language === 'en' ? 'RESOURCES & CASEWORK' : 'TÀI NGUYÊN & CÁC DỰ ÁN'}</span>
                <span className="text-[#5C7FA3] group-hover:underline">
                  {language === 'en' ? 'VIEW INSIGHTS >' : 'XEM CHI TIẾT >'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DETAILED EXECUTIVE BIOGRAPHY PROMPT DIALOG */}
        <AnimatePresence>
          {selectedCommander && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCommander(null)}
                className="absolute inset-0 bg-[#1D2B3D]/35 backdrop-blur-md"
              />

              {/* Biography window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 15 }}
                className="relative w-full max-w-lg bg-white border border-[#7BA7D9]/15 rounded-[32px] shadow-2xl overflow-hidden z-10 text-left"
              >
                {/* Header title bar */}
                <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex items-center justify-between select-none text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5C7FA3]" />
                    <span className="font-mono text-[10px] text-[#5C7FA3] tracking-widest font-bold uppercase">
                      {language === 'en' ? 'TEAM INSIGHTS // LEADERSHIP PROFILE' : 'THÔNG TIN BAN LÃNH ĐẠO // HỒ SƠ CÁ NHÂN'}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCommander(null)}
                    className="w-7 h-7 rounded-full bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center transition-all cursor-pointer text-slate-500 text-sm font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Biography Content Body */}
                <div className="p-6 md:p-8 space-y-6 text-left">
                  <div className="flex items-center gap-4 text-left">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedCommander.name)}&backgroundColor=7BA7D9&textColor=ffffff&fontSize=38`}
                      alt={selectedCommander.name}
                      className="w-16 h-16 rounded-full border border-slate-100 shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h3 className="font-sans font-bold text-lg text-[#1D2B3D] uppercase leading-tight mb-1">
                        {selectedCommander.name}
                      </h3>
                      <p className="font-mono text-[10px] text-[#5C7FA3] uppercase tracking-widest font-bold">
                        {selectedCommander.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-[#2C3E50]/80 text-sm leading-relaxed font-light pl-4 border-l-2 border-[#7BA7D9]/30 text-left">
                    {selectedCommander.bio}
                  </div>

                  {/* Skills Grid */}
                  <div className="text-left">
                    <span className="text-[#5C7FA3] font-mono text-[10px] uppercase font-bold tracking-widest block mb-3">
                      {language === 'en' ? 'KEY EXPERTISE CORE:' : 'LĨNH VỰC CHUYÊN MÔN CHÍNH:'}
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-left">
                      {selectedCommander.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-1 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-100 justify-start">
                          <Check className="w-3.5 h-3.5 text-[#5C7FA3]" />
                          <span className="text-slate-600 font-mono text-[9px] uppercase truncate font-bold">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connect operations */}
                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-slate-400 font-bold text-left">
                    <span className="font-mono text-[9px] text-slate-400 tracking-wider">
                      {language === 'en' ? 'HALO PROFESSIONAL CREDENTIALS' : 'CHỨNG CHỈ CHUYÊN NGHIỆP HALO'}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <a href="#contact" onClick={() => setSelectedCommander(null)} className="text-[#5C7FA3] hover:text-[#1D2B3D]" title="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#contact" onClick={() => setSelectedCommander(null)} className="text-[#5C7FA3] hover:text-[#1D2B3D]" title="Github">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href="#contact" onClick={() => setSelectedCommander(null)} className="text-[#5C7FA3] hover:text-[#1D2B3D]" title="Linkedin">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
