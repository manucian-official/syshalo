import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, WORKFLOW_EN, WORKFLOW_VI } from '../context/LanguageContext';
import { ClipboardList, Target, PenTool, Braces, Rocket, ShieldCheck } from 'lucide-react';

export default function Process() {
  const { language, t } = useLanguage();
  const workflowStepsList = language === 'en' ? WORKFLOW_EN : WORKFLOW_VI;
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const activeStep = workflowStepsList[activeStepIdx];

  const getStepIcon = (number: string) => {
    switch (number) {
      case '01': return <ClipboardList className="w-5 h-5 text-[#5C7FA3]" />;
      case '02': return <Target className="w-5 h-5 text-[#7BA7D9]" />;
      case '03': return <PenTool className="w-5 h-5 text-[#5C7FA3]" />;
      case '04': return <Braces className="w-5 h-5 text-[#7BA7D9]" />;
      case '05': return <Rocket className="w-5 h-5 text-[#5C7FA3]" />;
      default: return <ClipboardList className="w-5 h-5 text-[#5C7FA3]" />;
    }
  };

  return (
    <section id="process" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/20 text-left">
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        <center className="mb-16">
          <span className="font-mono text-[10px] text-[#5C7FA3] tracking-[0.3em] uppercase block mb-3 font-bold">
            // {t('operationalFramework') || 'OUR OPERATIONAL FRAMEWORK'}
          </span>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase max-w-2xl">
            {t('meticulousPathTitle') || 'A METICULOUS PATH TO EXCELLENCE'}
          </h2>
        </center>

        {/* 1. HORIZONTAL HIGH-TECH TIMELINE HEADERS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {workflowStepsList.map((step, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStepIdx(idx)}
                className={`cursor-pointer p-4.5 rounded-2xl border transition-all flex items-center gap-3 relative justify-start ${
                  isActive
                    ? 'bg-white border-[#7BA7D9]/50 shadow-md'
                    : 'bg-white/60 border-slate-100 hover:border-[#7BA7D9]/20 hover:bg-white'
                }`}
              >
                {/* Visual Connective bar inside active node */}
                {isActive && (
                  <motion.div
                    layoutId="active-timeline-connector"
                    className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#5C7FA3]"
                  />
                )}

                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  isActive ? 'bg-[#E6EEF8] border-[#7BA7D9]/20' : 'bg-slate-50 border-slate-100'
                }`}>
                  {getStepIcon(step.number)}
                </div>

                <div className="text-left">
                  <span className="block font-mono text-[9px] text-slate-400 tracking-wider font-bold">
                    {language === 'en' ? 'PHASE' : 'BƯỚC'} {step.number}
                  </span>
                  <span className={`block font-sans text-xs font-bold uppercase tracking-wider ${
                    isActive ? 'text-[#1D2B3D]' : 'text-slate-500'
                  }`}>
                    {step.title.split(' & ')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. MAIN ACTIVE PANEL */}
        <div className="bg-white p-6 md:p-10 rounded-[32px] border border-[#7BA7D9]/15 shadow-sm relative overflow-hidden min-h-[380px] flex items-center text-left">
          
          {/* Subtle soft gradient spots */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 bg-[#7BA7D9]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-4 left-10 w-44 h-44 bg-[#E6EEF8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Animate keyframe replacements */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIdx}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 text-left"
            >
              {/* Left detail description */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-[#5C7FA3]">
                    {activeStep.number}
                  </span>
                  <h3 className="font-sans font-semibold text-2xl text-[#1D2B3D] uppercase leading-none">
                    {activeStep.title}
                  </h3>
                </div>

                <p className="font-mono text-xs text-[#5C7FA3] tracking-wider uppercase font-bold text-left">
                  &gt; {activeStep.subtitle} ...
                </p>

                <p className="text-[#2C3E50]/80 text-sm font-light leading-relaxed text-left">
                  {activeStep.description}
                </p>

                {/* Core Procedures checklist */}
                <div className="space-y-3 pt-2 text-left">
                  <span className="font-mono text-[9px] text-[#5C7FA3]/70 tracking-widest uppercase block mb-3 font-bold">
                    // {t('strategicMilestonesLabel') || 'STRATEGIC MILESTONES'}
                  </span>
                  {activeStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 justify-start text-left">
                      <div className="w-5 h-5 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/20 flex items-center justify-center mt-0.5 shrink-0">
                        <span className="text-[#5C7FA3] font-mono text-[9px] font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-[#2C3E50]/80 text-xs font-light leading-relaxed">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right technical deliverables */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl border border-slate-100 bg-slate-50 z-10 text-left">
                <div>
                  <span className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase block mb-4 font-bold">
                    // {t('envisionedCapabilitiesLabel') || 'ENVISIONED CAPABILITIES'}
                  </span>

                  <div className="flex flex-wrap gap-2 text-left">
                    {activeStep.techUsed.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-white border border-slate-200 text-slate-500 text-[10px] font-mono px-3 py-1 rounded-full font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Flow chart diagram mock */}
                  <div className="mt-8 pt-6 border-t border-slate-200/60 space-y-3 text-left">
                    <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase block font-bold">
                      // {t('processFlowMilestonesLabel') || 'PROCESS FLOW MILESTONES'}
                    </span>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 text-left">
                      <span>{language === 'en' ? 'Concept Planning' : 'Lập Ý Tưởng'}</span>
                      <span>→</span>
                      <span className="text-[#5C7FA3] font-bold">{language === 'en' ? 'Creative Synthesis' : 'Tộc Hợp Sáng Tạo'}</span>
                      <span>→</span>
                      <span>{language === 'en' ? 'Audience Launch' : 'Ra Mắt Đại Chúng'}</span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-4">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#5C7FA3] to-[#7BA7D9]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeStepIdx + 1) * 20}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-3 text-slate-400 text-left">
                  <ShieldCheck className="w-4 h-4 text-[#5C7FA3] shrink-0" />
                  <span className="font-mono text-[9px] tracking-widest uppercase font-bold text-slate-500">
                    {t('phaseDeliverablesGuaranteed') || 'PHASE DELIVERABLES GUARANTEED AT 100%'}
                  </span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
