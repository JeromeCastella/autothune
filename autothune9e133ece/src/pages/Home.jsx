import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Route, Car } from 'lucide-react';
import { useTheme } from '@/pages/Layout';
import { cn } from "@/lib/utils";
import SplashScreen from '@/components/SplashScreen';
import VehicleSelector from '@/components/tco/VehicleSelector';
import SliderInput from '@/components/tco/SliderInput';
import ExpertPanel from '@/components/tco/ExpertPanel';
import TCOBarChart from '@/components/tco/TCOBarChart';
import TCOLineChart from '@/components/tco/TCOLineChart';
import KPICards from '@/components/tco/KPICards';
import DetailedTable from '@/components/tco/DetailedTable';
import CO2Modal from '@/components/tco/CO2Modal';
import TechDetailModal from '@/components/tco/TechDetailModal';
import CO2DetailsModal from '@/components/tco/CO2DetailsModal';
import { calculateTCO, getDefaultParams } from '@/components/tco/tcoCalculations';

export default function Home() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [vehicleClass, setVehicleClass] = useState('medium');
  const [duration, setDuration] = useState(8);
  const [annualKm, setAnnualKm] = useState(15000);
  
  // Global parameters (shared across all vehicle classes)
  const [globalParams, setGlobalParams] = useState(() => {
    const defaults = getDefaultParams('medium');
    return {
      energy: defaults.energy,
      macro: defaults.macro,
      climate: defaults.climate,
      homeCharger: defaults.costs.homeCharger,
    };
  });

  // Vehicle-specific parameters (per class)
  const [vehicleSpecificParams, setVehicleSpecificParams] = useState(() => ({
    small: (() => {
      const p = getDefaultParams('small');
      return { vehicles: p.vehicles, costs: { BEV: p.costs.BEV, ICE: p.costs.ICE, PHEV: p.costs.PHEV } };
    })(),
    medium: (() => {
      const p = getDefaultParams('medium');
      return { vehicles: p.vehicles, costs: { BEV: p.costs.BEV, ICE: p.costs.ICE, PHEV: p.costs.PHEV } };
    })(),
    premium: (() => {
      const p = getDefaultParams('premium');
      return { vehicles: p.vehicles, costs: { BEV: p.costs.BEV, ICE: p.costs.ICE, PHEV: p.costs.PHEV } };
    })(),
    suv: (() => {
      const p = getDefaultParams('suv');
      return { vehicles: p.vehicles, costs: { BEV: p.costs.BEV, ICE: p.costs.ICE, PHEV: p.costs.PHEV } };
    })(),
  }));

  const [showCO2Modal, setShowCO2Modal] = useState(false);
  const [showCO2Details, setShowCO2Details] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  // Merge global and vehicle-specific params for current class
  const params = useMemo(() => ({
    ...vehicleSpecificParams[vehicleClass],
    energy: globalParams.energy,
    macro: globalParams.macro,
    climate: globalParams.climate,
    costs: {
      ...vehicleSpecificParams[vehicleClass].costs,
      homeCharger: globalParams.homeCharger,
    },
  }), [vehicleClass, vehicleSpecificParams, globalParams]);

  const handleParamsChange = (newParams) => {
    // Separate global from vehicle-specific changes
    const { energy, macro, climate, costs, vehicles } = newParams;
    
    // Update global params if they changed
    if (energy || macro || climate || costs?.homeCharger !== undefined) {
      setGlobalParams(prev => ({
        energy: energy || prev.energy,
        macro: macro || prev.macro,
        climate: climate || prev.climate,
        homeCharger: costs?.homeCharger !== undefined ? costs.homeCharger : prev.homeCharger,
      }));
    }
    
    // Update vehicle-specific params
    if (vehicles || costs) {
      setVehicleSpecificParams(prev => ({
        ...prev,
        [vehicleClass]: {
          vehicles: vehicles || prev[vehicleClass].vehicles,
          costs: costs ? {
            BEV: costs.BEV || prev[vehicleClass].costs.BEV,
            ICE: costs.ICE || prev[vehicleClass].costs.ICE,
            PHEV: costs.PHEV || prev[vehicleClass].costs.PHEV,
          } : prev[vehicleClass].costs,
        },
      }));
    }
  };

  const handleResetParams = () => {
    const defaults = getDefaultParams(vehicleClass);
    
    // Reset global params
    setGlobalParams({
      energy: defaults.energy,
      macro: defaults.macro,
      climate: defaults.climate,
      homeCharger: defaults.costs.homeCharger,
    });
    
    // Reset vehicle-specific params for current class
    setVehicleSpecificParams(prev => ({
      ...prev,
      [vehicleClass]: {
        vehicles: defaults.vehicles,
        costs: {
          BEV: defaults.costs.BEV,
          ICE: defaults.costs.ICE,
          PHEV: defaults.costs.PHEV,
        },
      },
    }));
  };

  const results = useMemo(() => {
    return calculateTCO(params, duration, annualKm, vehicleClass);
  }, [params, duration, annualKm, vehicleClass]);

  const isDark = theme === 'dark';

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      {!showSplash && (
        <div className="min-h-screen">
          {/* Header */}
          <header className={cn(
            "border-b backdrop-blur-xl sticky top-0 z-40",
            isDark ? "border-white/5 bg-[#0d1424]/80" : "border-gray-200 bg-white/80"
          )}>
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div>
                <h1 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-900")}>AUTOTHUNE</h1>
                <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>Électrique, thermique, ou hybride rechargeable?</p>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {/* Configuration Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Vehicle Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "lg:col-span-2 backdrop-blur-xl rounded-2xl border p-5",
                  isDark ? "bg-[#111827]/60 border-white/5" : "bg-white border-gray-200 shadow-sm"
                )}
              >
                <h2 className={cn("text-sm font-medium flex items-center gap-2 mb-4", isDark ? "text-gray-400" : "text-gray-600")}>
                  <Car className="w-4 h-4 text-blue-500" />
                  Catégorie de véhicule
                </h2>
                <VehicleSelector 
                  selectedClass={vehicleClass} 
                  onClassChange={setVehicleClass}
                  isDark={isDark}
                />
              </motion.div>

              {/* Parameters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={cn(
                  "backdrop-blur-xl rounded-2xl border p-5 space-y-5",
                  isDark ? "bg-[#111827]/60 border-white/5" : "bg-white border-gray-200 shadow-sm"
                )}
              >
                <SliderInput
                  label="Durée de possession"
                  value={duration}
                  onChange={setDuration}
                  min={3}
                  max={15}
                  unit="ans"
                  icon={Calendar}
                />
                <SliderInput
                  label="Kilométrage annuel"
                  value={annualKm}
                  onChange={setAnnualKm}
                  min={5000}
                  max={50000}
                  step={1000}
                  unit="km"
                  icon={Route}
                />
              </motion.div>
            </div>

            {/* KPI Cards - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <KPICards 
                kpis={results.kpis} 
                onOpenCO2Modal={() => setShowCO2Modal(true)} 
                onOpenTechDetail={(tech) => setSelectedTech(tech)}
                isDark={isDark}
              />
            </motion.div>
            
            {/* CO2 Modal */}
            <CO2Modal 
              isOpen={showCO2Modal} 
              onClose={() => setShowCO2Modal(false)} 
              co2Emissions={results.co2Emissions}
              duration={duration}
              kpis={results.kpis}
              isDark={isDark}
            />

            {/* Tech Detail Modal */}
            <TechDetailModal
              isOpen={!!selectedTech}
              onClose={() => setSelectedTech(null)}
              tech={selectedTech}
              params={params}
              kpi={results.kpis.find(k => k.tech === selectedTech)}
              isDark={isDark}
            />

            {/* Charts - Main Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-4"
            >
              <div className={cn(
                "backdrop-blur-xl rounded-2xl border p-6",
                isDark ? "bg-[#111827]/60 border-white/5" : "bg-white border-gray-200 shadow-sm"
              )}>
                <h3 className={cn("font-medium mb-1", isDark ? "text-white" : "text-gray-900")}>Décomposition des coûts totaux</h3>
                <p className="text-xs text-gray-500 mb-4">Répartition des coûts par catégorie</p>
                <TCOBarChart data={results.barChartData} isDark={isDark} />
              </div>
              
              <div className={cn(
                "backdrop-blur-xl rounded-2xl border p-6",
                isDark ? "bg-[#111827]/60 border-white/5" : "bg-white border-gray-200 shadow-sm"
              )}>
                <h3 className={cn("font-medium mb-1", isDark ? "text-white" : "text-gray-900")}>Évolution des coûts cumulés</h3>
                <p className="text-xs text-gray-500 mb-4">Projection avec revente après {duration} ans</p>
                <TCOLineChart data={results.lineChartData} isDark={isDark} />
              </div>
            </motion.div>

            {/* Expert Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ExpertPanel
                params={params}
                onParamsChange={handleParamsChange}
                onResetParams={handleResetParams}
                vehicleClass={vehicleClass}
                onOpenCO2Details={() => setShowCO2Details(true)}
                isDark={isDark}
              />

              {/* CO2 Details Modal - at page level */}
              <CO2DetailsModal
                isOpen={showCO2Details}
                onClose={() => setShowCO2Details(false)}
                co2Emissions={results.co2Emissions}
                vehicleClass={vehicleClass}
                params={params}
                annualKm={annualKm}
                duration={duration}
                isDark={isDark}
              />
            </motion.div>

            {/* Detailed Table - At the bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <DetailedTable yearlyData={results.yearlyData} isDark={isDark} />
            </motion.div>

            {/* Footer */}
            <footer className={cn(
              "text-center py-6 text-xs border-t",
              isDark ? "text-gray-600 border-white/5" : "text-gray-500 border-gray-200"
            )}>
              <p>Les calculs TCO incluent l'actualisation des flux financiers</p>
              <p className="mt-1">Données indicatives • Personnalisez les paramètres pour plus de précision</p>
              <p className="mt-1"><strong>Sources:</strong> TCO: OFEN/EBP (2023) • Facteurs d'émissions (LCA): Mobitool • Valeurs résiduelles: T&E • Compléments: Autovista, Eurotax, AIE</p>
              <div className="mt-4 flex justify-center">
                <a 
                  href="https://www.watted.ch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block opacity-60 hover:opacity-100 transition-opacity"
                >
                  <img 
                    src={isDark 
                      ? "https://www.watted.ch/wp-content/uploads/2025/12/watted_logo_dark_simple.png"
                      : "https://www.watted.ch/wp-content/uploads/2025/12/watted_logo_clair_simple.png"
                    }
                    alt="WattEd - Climate & Energy" 
                    className="h-7 w-auto"
                  />
                </a>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}