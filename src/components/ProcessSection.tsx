import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  PenTool, 
  CheckSquare, 
  Printer, 
  Truck 
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discuss Your Requirement',
      description: 'We listen to your goals, dimensions, materials, and creative expectations.',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Plan & Design',
      description: 'Our designers develop high-resolution concepts and typography compositions.',
      icon: PenTool
    },
    {
      step: '03',
      title: 'Customer Review',
      description: 'You review digital proofs, request adjustments, and approve the final layout.',
      icon: CheckSquare
    },
    {
      step: '04',
      title: 'Final Production',
      description: 'High-DPI solvent printing, flex stretching, finishing, and quality inspection.',
      icon: Printer
    },
    {
      step: '05',
      title: 'Delivery / Completion',
      description: 'Ready for store pickup in D.I. Khan or on-site billboard/signboard installation.',
      icon: Truck
    }
  ];

  return (
    <section id="process" className="py-24 bg-neutral-950 relative border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How We Work
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            A clear, dependable 5-step creative and production journey from concept to final delivery.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:grid grid-cols-5 gap-6 relative">
          
          {/* Base connecting line */}
          <div className="absolute top-10 left-12 right-12 h-1 bg-neutral-800 -z-0 rounded-full overflow-hidden">
            {/* Animated glowing golden light beam travelling continuously */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
            />
          </div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative z-10 flex flex-col items-center text-center space-y-4 group cursor-default"
              >
                {/* Step Circle with Icon */}
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 border-2 border-neutral-700 group-hover:border-amber-400 text-neutral-300 group-hover:text-neutral-950 group-hover:bg-amber-400 flex flex-col items-center justify-center transition-all duration-300 shadow-xl">
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-mono font-bold">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden space-y-6 relative before:absolute before:top-4 before:bottom-4 before:left-7 before:w-0.5 before:bg-neutral-800">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative flex items-start gap-5 z-10">
                <div className="w-14 h-14 rounded-2xl bg-neutral-900 border-2 border-amber-400/60 text-amber-400 flex flex-col items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-mono font-bold mt-0.5">{item.step}</span>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex-1 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider">
                    STEP {item.step}
                  </span>
                  <h3 className="font-display text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
