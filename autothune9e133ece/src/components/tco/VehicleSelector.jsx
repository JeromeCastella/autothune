import React from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import { cn } from "@/lib/utils";

const vehicleClasses = [
  { id: 'small', name: 'Petite', description: 'Citadine' },
  { id: 'medium', name: 'Moyenne', description: 'Berline' },
  { id: 'premium', name: 'Supérieure', description: 'Premium' },
  { id: 'suv', name: 'SUV', description: 'Tout-chemin' },
];

export default function VehicleSelector({ selectedClass, onClassChange, isDark = true }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {vehicleClasses.map((vc, index) => (
        <motion.button
          key={vc.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onClassChange(vc.id)}
          className={cn(
            "relative p-4 rounded-xl transition-all duration-200 text-left border",
            selectedClass === vc.id
              ? "bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10"
              : isDark 
                ? "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <Car className={cn(
              "w-5 h-5",
              selectedClass === vc.id ? "text-blue-500" : "text-gray-400"
            )} />
            {selectedClass === vc.id && (
              <motion.div
                layoutId="vehicle-indicator"
                className="w-2 h-2 rounded-full bg-blue-500"
              />
            )}
          </div>
          <h3 className={cn(
            "font-medium text-sm",
            selectedClass === vc.id 
              ? (isDark ? "text-white" : "text-blue-700") 
              : (isDark ? "text-gray-300" : "text-gray-700")
          )}>
            {vc.name}
          </h3>
          <p className="text-xs text-gray-500">{vc.description}</p>
        </motion.button>
      ))}
    </div>
  );
}