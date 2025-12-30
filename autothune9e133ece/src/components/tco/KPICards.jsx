import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Fuel, Battery, Trophy, Leaf } from 'lucide-react';
import { cn } from "@/lib/utils";

const techConfig = {
  BEV: { 
    icon: Zap, 
    label: 'Électrique',
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  ICE: { 
    icon: Fuel, 
    label: 'Thermique',
    color: 'orange',
    gradient: 'from-orange-500/20 to-orange-600/5',
    borderColor: 'border-orange-500/30',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  PHEV: { 
    icon: Battery, 
    label: 'Hybride rechargeable',
    color: 'rose',
    gradient: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'border-rose-500/30',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
};

export default function KPICards({ kpis, onOpenCO2Modal, onOpenTechDetail, isDark = true }) {
  const sorted = [...kpis].sort((a, b) => a.costPerKm - b.costPerKm);
  const winner = sorted[0]?.tech;
  const co2Sorted = [...kpis].sort((a, b) => (a.co2?.gPerKm || 0) - (b.co2?.gPerKm || 0));
  const co2Winner = co2Sorted[0]?.tech;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {['BEV', 'ICE', 'PHEV'].map((tech, index) => {
        const kpi = kpis.find(k => k.tech === tech) || { costPerKm: 0, totalCost: 0 };
        const config = techConfig[tech];
        const Icon = config.icon;
        const isWinner = tech === winner;

        return (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onOpenTechDetail && onOpenTechDetail(tech)}
            className={cn(
              "relative p-3 rounded-xl border bg-gradient-to-br backdrop-blur-xl overflow-hidden cursor-pointer transition-colors",
              config.gradient,
              isWinner 
                ? "border-blue-500/50 ring-1 ring-blue-500/20" 
                : isDark ? "border-white/5" : "border-gray-200",
              isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={cn("p-1.5 rounded-lg", config.iconBg)}>
                  <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
                </div>
                <span className={cn("text-xs font-medium", isDark ? "text-gray-400" : "text-gray-600")}>{config.label}</span>
              </div>
              {isWinner && (
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/20 border border-amber-500/30">
                  <Trophy className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-medium text-amber-600">Meilleur</span>
                </div>
              )}
            </div>
            
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1">
                <span className={cn("text-lg font-bold", isDark ? "text-white" : "text-gray-900")}>
                  {(kpi.costPerKm || 0).toFixed(2)}
                </span>
                <span className="text-xs text-gray-500">CHF/km</span>
              </div>
              <span className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-500")}>
                {((kpi.totalCost || 0) / 1000).toFixed(0)}k CHF
              </span>
            </div>

            {/* CO2 indicator - subtle */}
            {kpi.co2 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCO2Modal();
                }}
                className={cn(
                  "mt-2 pt-2 border-t flex items-center justify-between w-full group -mx-3 px-3 -mb-3 pb-2 rounded-b-xl transition-colors",
                  isDark ? "border-white/5 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Leaf className={cn(
                    "w-3 h-3",
                    tech === co2Winner ? "text-emerald-500" : "text-gray-400"
                  )} />
                  <span className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-500")}>
                    {kpi.co2?.gPerKm || 0} g CO₂/km
                  </span>
                </div>
                <span className={cn(
                  "text-[10px] transition-colors",
                  isDark ? "text-gray-600 group-hover:text-gray-400" : "text-gray-400 group-hover:text-gray-600"
                )}>
                  Comparer →
                </span>
              </button>
            )}
            </motion.div>
        );
      })}
    </div>
  );
}