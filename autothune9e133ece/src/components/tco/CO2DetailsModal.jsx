import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, Zap, Fuel, Battery, Car, Wrench, Route, Wind } from 'lucide-react';
import { cn } from "@/lib/utils";
import { FIXED_EMISSIONS } from './tcoCalculations';

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

const EMISSION_CATEGORIES = [
  { key: 'exhaust', label: 'Émissions d\'échappement', icon: Wind, description: 'CO₂ direct du pot d\'échappement' },
  { key: 'energy', label: 'Approvisionnement en énergie', icon: Zap, description: 'Production et distribution du carburant/électricité' },
  { key: 'maintenance', label: 'Maintenance', icon: Wrench, description: 'Pièces de rechange et fluides' },
  { key: 'vehicle', label: 'Véhicule', icon: Car, description: 'Fabrication et assemblage' },
  { key: 'disposal', label: 'Élimination du véhicule', icon: Leaf, description: 'Recyclage et traitement en fin de vie' },
  { key: 'infrastructure', label: 'Infrastructure routière', icon: Route, description: 'Construction et entretien des routes' },
];

export default function CO2DetailsModal({ 
  isOpen, 
  onClose, 
  co2Emissions, 
  vehicleClass = 'medium',
  params,
  annualKm,
  duration,
  isDark = true 
}) {
  const [selectedTech, setSelectedTech] = React.useState('BEV');
  
  if (!co2Emissions) return null;

  const totalKm = annualKm * duration;

  // Calculer les détails pour chaque technologie
  const getEmissionDetails = (tech) => {
    const fixed = FIXED_EMISSIONS[vehicleClass]?.[tech] || FIXED_EMISSIONS.medium[tech];
    const dynamic = co2Emissions[tech] || {};
    
    // Émissions d'échappement = fuelDirectGPerKm (carburant brûlé directement)
    const exhaustEmissions = dynamic.fuelDirectGPerKm || 0;
    
    // Approvisionnement en énergie = energyChainGPerKm (électricité + chaîne carburant)
    const energySupply = dynamic.energyChainGPerKm || 0;
    
    return {
      exhaust: exhaustEmissions,
      energy: energySupply,
      maintenance: fixed.maintenance,
      vehicle: fixed.vehicle,
      disposal: fixed.disposal,
      infrastructure: fixed.infrastructure,
    };
  };

  const getTotalEmissions = (details) => {
    return Object.values(details).reduce((sum, val) => sum + val, 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="w-full max-w-2xl my-8">
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
                      <h2 className={cn("font-medium", isDark ? "text-white" : "text-gray-900")}>Analyse du cycle de vie</h2>
                      <p className="text-xs text-gray-500">Détail des émissions par catégorie (gCO₂eq/km)</p>
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
                <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                  
                  {/* Mobile: Tab selector */}
                  <div className="sm:hidden">
                    <div className={cn(
                      "flex rounded-lg p-1 gap-1",
                      isDark ? "bg-white/5" : "bg-gray-100"
                    )}>
                      {['BEV', 'ICE', 'PHEV'].map(tech => {
                        const config = techConfig[tech];
                        const Icon = config.icon;
                        const isSelected = selectedTech === tech;
                        return (
                          <button
                            key={tech}
                            onClick={() => setSelectedTech(tech)}
                            className={cn(
                              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all",
                              isSelected 
                                ? cn(config.bgColor, config.borderColor, "border", isDark ? "text-white" : "text-gray-900")
                                : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                            )}
                          >
                            <Icon className={cn("w-3.5 h-3.5", isSelected ? config.color : "")} />
                            <span className="truncate">{tech === 'PHEV' ? 'PHEV' : config.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile: Single tech view */}
                  <div className="sm:hidden space-y-2">
                    {EMISSION_CATEGORIES.map((category) => {
                      const Icon = category.icon;
                      const details = getEmissionDetails(selectedTech);
                      const value = details[category.key];
                      return (
                        <div 
                          key={category.key}
                          className={cn(
                            "flex items-center justify-between px-3 py-3 rounded-xl border",
                            isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={cn("w-4 h-4", isDark ? "text-gray-400" : "text-gray-500")} />
                            <div>
                              <p className={cn("text-xs font-medium", isDark ? "text-white" : "text-gray-900")}>
                                {category.label}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          <span className={cn(
                            "text-sm font-medium px-2 py-1 rounded",
                            isDark ? "text-white" : "text-gray-900"
                          )}>
                            {Math.round(value)} g
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Mobile total */}
                    <div className={cn(
                      "flex items-center justify-between px-3 py-3 rounded-xl border-2",
                      isDark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                    )}>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-500" />
                        <span className={cn("text-sm font-bold", isDark ? "text-white" : "text-gray-900")}>
                          Total
                        </span>
                      </div>
                      <span className="text-sm font-bold px-3 py-1 rounded-lg bg-emerald-500 text-white">
                        {Math.round(getTotalEmissions(getEmissionDetails(selectedTech)))} g/km
                      </span>
                    </div>
                  </div>

                  {/* Desktop: Full table view */}
                  <div className="hidden sm:block space-y-3">
                    {/* Table header */}
                    <div className={cn(
                      "grid grid-cols-4 gap-2 px-3 py-2 rounded-lg text-xs font-medium",
                      isDark ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-600"
                    )}>
                      <div>Catégorie</div>
                      {['BEV', 'ICE', 'PHEV'].map(tech => {
                        const config = techConfig[tech];
                        const Icon = config.icon;
                        return (
                          <div key={tech} className="flex items-center justify-center gap-1">
                            <Icon className={cn("w-3 h-3", config.color)} />
                            <span className="truncate">{config.label}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Emission categories */}
                    {EMISSION_CATEGORIES.map((category) => {
                      const Icon = category.icon;
                      return (
                        <div 
                          key={category.key}
                          className={cn(
                            "grid grid-cols-4 gap-2 px-3 py-3 rounded-xl border transition-colors",
                            isDark ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={cn("w-4 h-4 flex-shrink-0", isDark ? "text-gray-400" : "text-gray-500")} />
                            <div className="min-w-0">
                              <p className={cn("text-[11px] font-medium leading-tight", isDark ? "text-white" : "text-gray-900")}>
                                {category.label}
                              </p>
                              <p className="text-[9px] text-gray-500 leading-tight hidden md:block">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          {['BEV', 'ICE', 'PHEV'].map(tech => {
                            const details = getEmissionDetails(tech);
                            const value = details[category.key];
                            return (
                              <div key={tech} className="flex items-center justify-center">
                                <span className={cn(
                                  "text-sm font-medium px-2 py-1 rounded",
                                  isDark ? "text-white" : "text-gray-900"
                                )}>
                                  {Math.round(value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Totals */}
                    <div className={cn(
                      "grid grid-cols-4 gap-2 px-3 py-3 rounded-xl border-2",
                      isDark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
                    )}>
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-emerald-500" />
                        <span className={cn("text-sm font-bold", isDark ? "text-white" : "text-gray-900")}>
                          Total
                        </span>
                      </div>
                      {['BEV', 'ICE', 'PHEV'].map(tech => {
                        const details = getEmissionDetails(tech);
                        const total = getTotalEmissions(details);
                        const allTotals = ['BEV', 'ICE', 'PHEV'].map(t => getTotalEmissions(getEmissionDetails(t)));
                        const isLowest = total === Math.min(...allTotals);
                        return (
                          <div key={tech} className="flex items-center justify-center">
                            <span className={cn(
                              "text-sm font-bold px-3 py-1 rounded-lg",
                              isLowest 
                                ? "bg-emerald-500 text-white" 
                                : isDark ? "text-white" : "text-gray-900"
                            )}>
                              {Math.round(total)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className={cn(
                    "p-3 rounded-xl border",
                    isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"
                  )}>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      <strong className={isDark ? "text-gray-400" : "text-gray-600"}>Méthodologie :</strong> Les émissions 
                      d'échappement (carburant direct) et d'approvisionnement en énergie (production électricité/carburant) 
                      sont calculées dynamiquement selon vos paramètres (consommation, mix électrique, type de carburant). 
                      Les autres catégories sont des moyennes issues d'études ACV pour la classe de véhicule sélectionnée, 
                      amorties sur 200'000 km.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}