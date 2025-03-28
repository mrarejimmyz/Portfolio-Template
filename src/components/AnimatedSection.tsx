import { motion } from 'framer-motion';
import { useEffect, ReactNode } from 'react';

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  isHighlighted?: boolean;
}
export default function AnimatedSection({ id, children, isHighlighted = false }: AnimatedSectionProps) {
  useEffect(() => {
    if (isHighlighted && typeof window !== 'undefined') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isHighlighted, id]);

  return (
    <motion.section
      id={id}
      initial={{ opacity: isHighlighted ? 0 : 1, y: isHighlighted ? 20 : 0 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: isHighlighted ? [1, 1.02, 1] : 1,
        boxShadow: isHighlighted ? ["0 0 0 rgba(79, 70, 229, 0)", "0 0 20px rgba(79, 70, 229, 0.3)", "0 0 0 rgba(79, 70, 229, 0)"] : "none"
      }}
      transition={{ 
        duration: isHighlighted ? 1.5 : 0.5,
        times: isHighlighted ? [0, 0.5, 1] : [0, 1]
      }}
      className={`transition-all ${isHighlighted ? 'bg-indigo-50 dark:bg-indigo-900/10' : ''}`}
    >
      {children}
    </motion.section>
  );
}