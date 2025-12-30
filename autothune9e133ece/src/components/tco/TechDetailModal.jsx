import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Fuel, Battery, Car, Gauge, Wrench, Shield, Receipt, Home, Leaf } from 'lucide-react';
import { cn } from "@/lib/utils";

const techConfig = {
  BEV: { 
    label: 'Électrique',
    icon: Zap,
    color: 'blue',
    gradient: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  ICE: { 
    label: 'Thermique',
    icon: Fuel,
    color: 'orange',
    gradient: 'from-orange-500/20 to-orange-600/5',
    borderColor: 'border-orange-500/30',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
  },
  PHEV: { 
    label: 'Hybride rechargeable',
    icon: Battery,
    color: 'rose',
    gradient: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'border-rose-500/30',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-400',
  },
};

export default function TechDetailModal({ isOpen, onClose, tech, params, kpi, isDark = true }) {
  if (!tech || !params) return null;
  
  const config = techConfig[tech];
  const Icon = config.icon;
  const vehicle = params.vehicles[tech];
  const costs = params.costs[tech];
  const energy = params.energy;
  const climate = params.climate;

  // Calculate weighted electricity price
  const weightedElecPrice = 
    (energy.rechargeProfile.home / 100) * energy.electricityPrices.home +
    (energy.rechargeProfile.work / 100) * energy.electricityPrices.work +
    (energy.rechargeProfile.public / 100) * energy.electricityPrices.public;

  const ParamRow = ({ icon: RowIcon, label, value, unit, iconColor = "text-gray-400" }) => (
    <div className={cn("flex items-center justify-between py-2 border-b last:border-0", isDark ? "border-white/5" : "border-gray-100")}>
      <div className="flex items-center gap-2">
        <RowIcon className={cn("w-3.5 h-3.5", iconColor)} />
        <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>{label}</span>
      </div>
      <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
        {value} {unit}
      </span>
    </div>
  );

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
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
              "rounded-2xl border bg-gradient-to-br backdrop-blur-xl overflow-hidden",
              config.gradient,
              config.borderColor,
              !isDark && "shadow-lg"
            )}>
              {/* Header */}
              <div className={cn("p-4 border-b flex items-center justify-between", isDark ? "border-white/10" : "border-gray-200")}>
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-xl", config.iconBg)}>
                    <Icon className={cn("w-5 h-5", config.iconColor)} />
                  </div>
                  <div>
                    <h3 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>{config.label}</h3>
                    <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-700")}>Paramètres & hypothèses</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={cn("p-2 rounded-lg transition-colors", isDark ? "hover:bg-white/10" : "hover:bg-gray-100")}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                
                {/* KPI Summary */}
                {kpi && (
                  <div className={cn("p-3 rounded-xl border", isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200")}>
                    <div className="flex items-center justify-between">
                      <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>Coût total</span>
                      <span className={cn("text-lg font-bold", isDark ? "text-white" : "text-gray-900")}>
                        {(kpi.totalCost || 0).toLocaleString('fr-CH')} CHF
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">Coût par km</span>
                      <span className={cn("text-sm font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                        {(kpi.costPerKm || 0).toFixed(2)} CHF/km
                      </span>
                    </div>
                  </div>
                )}

                {/* Vehicle params */}
                <div className="space-y-1">
                  <h4 className={cn("text-xs font-semibold uppercase tracking-wide mb-2", isDark ? "text-gray-500" : "text-gray-900")}>Véhicule</h4>
                  <div className={cn("rounded-xl border px-3", isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200")}>
                    <ParamRow icon={Car} label="Prix d'achat" value={vehicle.price.toLocaleString('fr-CH')} unit="CHF" />
                    <ParamRow 
                      icon={Gauge} 
                      label="Consommation" 
                      value={vehicle.consumption} 
                      unit={tech === 'ICE' ? 'L/100km' : 'kWh/100km'} 
                    />
                    {tech === 'PHEV' && vehicle.fuelConsumption && (
                      <ParamRow icon={Fuel} label="Conso. carburant" value={vehicle.fuelConsumption} unit="L/100km" iconColor="text-orange-500" />
                    )}
                  </div>
                </div>

                {/* Energy params */}
                <div className="space-y-1">
                  <h4 className={cn("text-xs font-semibold uppercase tracking-wide mb-2", isDark ? "text-gray-500" : "text-gray-900")}>Énergie</h4>
                  <div className={cn("rounded-xl border px-3", isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200")}>
                    {tech === 'ICE' ? (
                      <ParamRow icon={Fuel} label="Prix carburant" value={(energy.fuelPrices?.[energy.fuelType || 'petrol'] || energy.fuelPrice || 0).toFixed(2)} unit="CHF/L" iconColor="text-orange-500" />
                    ) : tech === 'BEV' ? (
                      <ParamRow icon={Zap} label="Prix électricité moyen" value={(weightedElecPrice || 0).toFixed(2)} unit="CHF/kWh" iconColor="text-blue-500" />
                    ) : (
                      <>
                        <ParamRow icon={Zap} label="Prix électricité moyen" value={(weightedElecPrice || 0).toFixed(2)} unit="CHF/kWh" iconColor="text-blue-500" />
                        <ParamRow icon={Fuel} label="Prix carburant" value={(energy.fuelPrices?.[energy.fuelType || 'petrol'] || energy.fuelPrice || 0).toFixed(2)} unit="CHF/L" iconColor="text-orange-500" />
                        <ParamRow icon={Battery} label="Part électrique" value={energy.phevElectricShare || 0} unit="%" iconColor="text-rose-500" />
                      </>
                    )}
                  </div>
                </div>

                {/* Costs params */}
                <div className="space-y-1">
                  <h4 className={cn("text-xs font-semibold uppercase tracking-wide mb-2", isDark ? "text-gray-500" : "text-gray-900")}>Coûts annuels</h4>
                  <div className={cn("rounded-xl border px-3", isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200")}>
                    <ParamRow icon={Receipt} label="Taxe" value={costs.tax} unit="CHF/an" />
                    <ParamRow icon={Shield} label="Assurance" value={costs.insurance} unit="CHF/an" />
                    <ParamRow icon={Wrench} label="Entretien" value={costs.maintenance} unit="CHF/km" />
                    {(tech === 'BEV' || tech === 'PHEV') && (
                      <ParamRow icon={Home} label="Borne domicile" value={params.costs.homeCharger.toLocaleString('fr-CH')} unit="CHF" iconColor="text-blue-500" />
                    )}
                  </div>
                </div>

                {/* CO2 */}
                {kpi?.co2 && (
                  <div className="space-y-1">
                    <h4 className={cn("text-xs font-semibold uppercase tracking-wide mb-2", isDark ? "text-gray-500" : "text-gray-900")}>Émissions CO₂</h4>
                    <div className={cn("rounded-xl border px-3", isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200")}>
                      <ParamRow 
                        icon={Leaf} 
                        label="Émissions" 
                        value={kpi.co2?.gPerKm || 0} 
                        unit="gCO₂/km" 
                        iconColor={(kpi.co2?.gPerKm || 0) < 50 ? "text-emerald-500" : (kpi.co2?.gPerKm || 0) < 150 ? "text-amber-500" : "text-red-500"}
                      />
                      <ParamRow icon={Leaf} label="Total sur la période" value={((kpi.co2?.totalKg || 0) / 1000).toFixed(1)} unit="tonnes" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}