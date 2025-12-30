import React from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white flex items-center justify-center z-[100]"
    >
      <motion.img
        src="https://www.watted.ch/wp-content/uploads/2025/12/WattEd_logo_clair.png"
        alt="WattEd - Climate & Energy"
        className="h-20 w-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );
}