import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Zap, Fuel, Battery } from 'lucide-react';
import { cn } from "@/lib/utils";

const techConfig = {
  BEV: { 
    label: 'Électrique', 
    icon: Zap, 
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
  },
  ICE: { 
    label: 'Thermique', 
    icon: Fuel, 
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30',
  },
  PHEV: { 
    label: 'Hybride rechargeable', 
    icon: Battery, 
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20',
    borderColor: 'border-rose-500/30',
  },
};

export default function CO2Modal({ isOpen, onClose, co2Emissions, duration, kpis, isDark = true }) {
  if (!co2Emissions || !kpis) return null;
  
  const sorted = Object.entries(co2Emissions).sort((a, b) => (a[1]?.totalKg || 0) - (b[1]?.totalKg || 0));
  const winner = sorted[0][0]; // Le plus propre en CO2
  const worst = sorted[sorted.length - 1][0]; // Le pire en CO2
  const co2SavingsKg = (co2Emissions[worst]?.totalKg || 0) - (co2Emissions[winner]?.totalKg || 0);
  
  // Calcul du différentiel de coût
  const winnerKpi = kpis.find(k => k.tech === winner);
  const worstKpi = kpis.find(k => k.tech === worst);
  const costDiff = (winnerKpi?.totalCost || 0) - (worstKpi?.totalCost || 0); // positif = surcoût, négatif = économie
  
  // Coût par tonne de CO2 évitée (CHF/tonne)
  const co2SavingsTonnes = co2SavingsKg / 1000;
  const costPerTonneCO2 = co2SavingsTonnes > 0 ? costDiff / co2SavingsTonnes : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md">
            <div className={cn(
              "rounded-2xl shadow-2xl overflow-hidden border",
              isDark ? "bg-[#111827] border-white/10" : "bg-white border-gray-200"
            )}>
              {/* Header */}
              <div className={cn("flex items-center justify-between p-4 border-b", isDark ? "border-white/5" : "border-gray-200")}>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className={cn("font-medium", isDark ? "text-white" : "text-gray-900")}>Impact Climat</h2>
                    <p className="text-xs text-gray-500">Émissions CO₂ sur {duration} ans</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={cn("p-2 rounded-lg transition-colors", isDark ? "hover:bg-white/5" : "hover:bg-gray-100")}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Tech comparison */}
                <div className="space-y-2">
                  {['BEV', 'ICE', 'PHEV'].map(tech => {
                    const config = techConfig[tech];
                    const Icon = config.icon;
                    const data = co2Emissions[tech];
                    const isWinner = tech === winner;
                    const maxTotal = Math.max(...Object.values(co2Emissions).map(e => e?.totalKg || 0));
                    const barWidth = ((data?.totalKg || 0) / maxTotal) * 100;
                    
                    return (
                      <div 
                        key={tech}
                        className={cn(
                          "p-3 rounded-xl border transition-all",
                          config.bgColor,
                          isWinner ? "border-emerald-500/50 ring-1 ring-emerald-500/20" : config.borderColor
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className={cn("w-4 h-4", config.color)} />
                            <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{config.label}</span>
                            {isWinner && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-600 border border-emerald-500/30">
                                Le plus propre
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{data?.gPerKm || 0} g/km</span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className={cn("h-1.5 rounded-full overflow-hidden mb-2", isDark ? "bg-white/10" : "bg-gray-200")}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidth}%` }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className={cn(
                              "h-full rounded-full",
                              isWinner ? "bg-emerald-500" : "bg-gray-400"
                            )}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{data?.annualKg || 0} kg/an</span>
                          <span className={cn("font-medium", isDark ? "text-white" : "text-gray-900")}>
                            {((data?.totalKg || 0) / 1000).toFixed(1)} t total
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Savings highlight */}
                {co2SavingsKg > 0 && (
                  <div className={cn(
                    "p-4 rounded-xl border",
                    costDiff <= 0 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        costDiff <= 0 ? "bg-emerald-500/20" : "bg-amber-500/20"
                      )}>
                        <Leaf className={cn(
                          "w-5 h-5",
                          costDiff <= 0 ? "text-emerald-500" : "text-amber-500"
                        )} />
                      </div>
                      <div>
                        <p className={cn("text-sm", isDark ? "text-white" : "text-gray-900")}>
                          Choisir <span className="font-medium">{techConfig[winner].label}</span> plutôt que <span className="font-medium">{techConfig[worst].label}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          économise <span className={cn(
                            "font-medium",
                            costDiff <= 0 ? "text-emerald-600" : "text-amber-600"
                          )}>{co2SavingsTonnes.toFixed(1)} tonnes</span> de CO₂
                        </p>
                        <p className="text-xs mt-2">
                          {costDiff < 0 ? (
                            <span className="text-emerald-600">
                              Vous économisez {Math.abs(costDiff).toLocaleString('fr-CH')} CHF tout en réduisant vos émissions
                            </span>
                          ) : costDiff === 0 ? (
                            <span className="text-gray-500">
                              Coût équivalent pour une empreinte carbone réduite
                            </span>
                          ) : (
                            <span className="text-amber-600">
                              Surcoût de {Math.round(costPerTonneCO2).toLocaleString('fr-CH')} CHF par tonne de CO₂ évitée
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Disclaimer */}
                <p className="text-[10px] text-gray-500 text-center">
                  Cycle de vie complet • Fabrication, énergie, infrastructure et fin de vie
                </p>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}