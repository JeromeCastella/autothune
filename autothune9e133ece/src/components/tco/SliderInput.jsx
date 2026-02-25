import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { useTheme } from '@/pages/Layout';
import { cn } from "@/lib/utils";

export default function SliderInput({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  unit = '',
  icon: Icon
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-blue-500" />}
          <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{label}</span>
        </div>
        <motion.div
          key={value}
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}
        >
          {value.toLocaleString('fr-CH')} <span className="text-gray-500 font-normal">{unit}</span>
        </motion.div>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-0 [&_.bg-primary]:bg-blue-500"
      />
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min.toLocaleString('fr-CH')}</span>
        <span>{max.toLocaleString('fr-CH')}</span>
      </div>
    </div>
  );
}