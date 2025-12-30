import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, ChevronDown, Zap, Fuel, Battery, Percent, Home, Leaf, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import RechargeProfile from './RechargeProfile';


export default function ExpertPanel({ 
  params, 
  onParamsChange,
  onResetParams,
  vehicleClass,
  onOpenCO2Details,
  isDark = true
}) {
  const [isOpen, setIsOpen] = useState(false);

  const updateParam = (category, key, value) => {
    onParamsChange({
      ...params,
      [category]: {
        ...params[category],
        [key]: value
      }
    });
  };

  const updateVehicleParam = (tech, key, value) => {
    const currentFuelType = params.energy.fuelType || 'petrol';
    const fuelTypeKey = currentFuelType === 'petrol' ? 'petrolConsumption' : 'dieselConsumption';
    const fuelTypeKeyPHEV = currentFuelType === 'petrol' ? 'fuelPetrolConsumption' : 'fuelDieselConsumption';

    let updatedVehicle = {
      ...params.vehicles[tech],
      [key]: value
    };

    // Memorize the value for the current fuel type
    if (key === 'consumption' && (tech === 'ICE' || tech === 'PHEV')) {
      updatedVehicle[fuelTypeKey] = value;
    } else if (key === 'fuelConsumption' && tech === 'PHEV') {
      updatedVehicle[fuelTypeKeyPHEV] = value;
    }

    onParamsChange({
      ...params,
      vehicles: {
        ...params.vehicles,
        [tech]: updatedVehicle
      }
    });
  };

  const techConfig = [
    { id: 'BEV', label: 'Électrique', icon: Zap, bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', iconColor: 'text-blue-400' },
    { id: 'ICE', label: 'Thermique', icon: Fuel, bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/20', iconColor: 'text-orange-400' },
    { id: 'PHEV', label: 'Hybride rechargeable', icon: Battery, bgColor: 'bg-rose-500/10', borderColor: 'border-rose-500/20', iconColor: 'text-rose-400' },
  ];

  return (
    <div className={cn(
      "rounded-2xl overflow-hidden backdrop-blur-xl border",
      isDark ? "bg-[#111827]/60 border-white/5" : "bg-white border-gray-200 shadow-sm"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-4 flex items-center justify-between transition-colors",
          isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Settings2 className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-left">
            <h3 className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Paramètres avancés</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Ajuster les valeurs par défaut</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onResetParams && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResetParams();
              }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                isDark 
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-gray-400 hover:text-white"
                  : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900"
              )}
              title="Réinitialiser aux valeurs par défaut"
            >
              Réinitialiser
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{isOpen ? 'Masquer' : 'Afficher'}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("border-t", isDark ? "border-white/5" : "border-gray-200")}
          >
            <Tabs defaultValue="energy" className="p-4">
              <TabsList className={cn(
                "grid grid-cols-4 mb-4 p-1 rounded-lg",
                isDark ? "bg-white/5" : "bg-gray-100"
              )}>
                <TabsTrigger value="energy" className={cn(
                  "rounded text-xs",
                  isDark 
                    ? "data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
                )}>
                  Énergie
                </TabsTrigger>
                <TabsTrigger value="costs" className={cn(
                  "rounded text-xs",
                  isDark 
                    ? "data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
                )}>
                  Coûts
                </TabsTrigger>
                <TabsTrigger value="macro" className={cn(
                  "rounded text-xs",
                  isDark 
                    ? "data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
                )}>
                  Macro
                </TabsTrigger>
                <TabsTrigger value="climate" className={cn(
                  "rounded text-xs",
                  isDark 
                    ? "data-[state=active]:bg-white/10 data-[state=active]:text-white text-gray-400"
                    : "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500"
                )}>
                  Climat
                </TabsTrigger>
              </TabsList>

              <TabsContent value="energy" className="space-y-3">
                {/* Consommations par technologie */}
                <div className="space-y-3">
                  <h4 className={cn("text-xs font-medium uppercase tracking-wide", isDark ? "text-gray-400" : "text-gray-600")}>
                    Consommations
                  </h4>

                  {/* BEV Consumption */}
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Électrique (BEV)</span>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-xs">Consommation (kWh/100km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={params.vehicles.BEV.consumption}
                        onChange={(e) => updateVehicleParam('BEV', 'consumption', Number(e.target.value))}
                        className={cn(
                          "h-9",
                          isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                        )}
                      />
                    </div>
                  </div>

                  {/* ICE Consumption */}
                  <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-orange-400" />
                      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Thermique (ICE)</span>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-xs">Consommation (L/100km)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={params.vehicles.ICE.consumption}
                        onChange={(e) => updateVehicleParam('ICE', 'consumption', Number(e.target.value))}
                        className={cn(
                          "h-9",
                          isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                        )}
                      />
                    </div>
                  </div>

                  {/* PHEV Consumption */}
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Battery className="w-4 h-4 text-rose-400" />
                      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>
                        <span className="sm:hidden">PHEV</span>
                        <span className="hidden sm:inline">Hybride rechargeable</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <Label className="text-gray-500 text-xs">Consommation électrique (kWh/100km)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={params.vehicles.PHEV.consumption}
                          onChange={(e) => updateVehicleParam('PHEV', 'consumption', Number(e.target.value))}
                          className={cn(
                            "h-9",
                            isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                          )}
                        />
                      </div>
                      <div>
                        <Label className="text-gray-500 text-xs">Consommation carburant (L/100km)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={params.vehicles.PHEV.fuelConsumption}
                          onChange={(e) => updateVehicleParam('PHEV', 'fuelConsumption', Number(e.target.value))}
                          className={cn(
                            "h-9",
                            isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={cn("h-px", isDark ? "bg-white/10" : "bg-gray-200")} />

                {/* Prix et profil de recharge */}
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-orange-500" />
                      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Carburant</span>
                    </div>
                    {/* Fuel type toggle */}
                    <div className={cn(
                      "flex rounded-lg p-0.5",
                      isDark ? "bg-white/10" : "bg-gray-200"
                    )}>
                      <button
                        onClick={() => {
                          const currentFuelType = params.energy.fuelType || 'petrol';
                          if (currentFuelType === 'diesel') {
                            const updatedVehicles = { ...params.vehicles };
                            
                            ['ICE', 'PHEV'].forEach(tech => {
                              const vehicle = updatedVehicles[tech];
                              vehicle.dieselConsumption = vehicle.consumption;
                              if (tech === 'PHEV') vehicle.fuelDieselConsumption = vehicle.fuelConsumption;
                              
                              vehicle.consumption = vehicle.petrolConsumption || (vehicle.consumption / 0.88);
                              if (tech === 'PHEV') vehicle.fuelConsumption = vehicle.fuelPetrolConsumption || (vehicle.fuelConsumption / 0.88);
                            });
                            
                            onParamsChange({
                              ...params,
                              energy: { ...params.energy, fuelType: 'petrol' },
                              vehicles: updatedVehicles,
                            });
                          }
                        }}
                        className={cn(
                          "px-3 py-1 text-xs rounded-md transition-all",
                          (params.energy.fuelType || 'petrol') === 'petrol'
                            ? "bg-orange-500 text-white"
                            : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        Essence
                      </button>
                      <button
                        onClick={() => {
                          const currentFuelType = params.energy.fuelType || 'petrol';
                          if (currentFuelType === 'petrol') {
                            const updatedVehicles = { ...params.vehicles };
                            
                            ['ICE', 'PHEV'].forEach(tech => {
                              const vehicle = updatedVehicles[tech];
                              vehicle.petrolConsumption = vehicle.consumption;
                              if (tech === 'PHEV') vehicle.fuelPetrolConsumption = vehicle.fuelConsumption;
                              
                              vehicle.consumption = vehicle.dieselConsumption || (vehicle.consumption * 0.88);
                              if (tech === 'PHEV') vehicle.fuelConsumption = vehicle.fuelDieselConsumption || (vehicle.fuelConsumption * 0.88);
                            });
                            
                            onParamsChange({
                              ...params,
                              energy: { ...params.energy, fuelType: 'diesel' },
                              vehicles: updatedVehicles,
                            });
                          }
                        }}
                        className={cn(
                          "px-3 py-1 text-xs rounded-md transition-all",
                          params.energy.fuelType === 'diesel'
                            ? "bg-orange-500 text-white"
                            : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        Diesel
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-gray-500 text-xs">Essence (CHF/L)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={params.energy.fuelPrices?.petrol || 1.85}
                        onChange={(e) => onParamsChange({
                          ...params,
                          energy: {
                            ...params.energy,
                            fuelPrices: { ...params.energy.fuelPrices, petrol: Number(e.target.value) }
                          }
                        })}
                        className={cn(
                          "h-9",
                          isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                        )}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-500 text-xs">Diesel (CHF/L)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={params.energy.fuelPrices?.diesel || 1.95}
                        onChange={(e) => onParamsChange({
                          ...params,
                          energy: {
                            ...params.energy,
                            fuelPrices: { ...params.energy.fuelPrices, diesel: Number(e.target.value) }
                          }
                        })}
                        className={cn(
                          "h-9",
                          isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    Le type sélectionné s'applique au Thermique et à l'Hybride
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <RechargeProfile
                    profile={params.energy.rechargeProfile}
                    onProfileChange={(profile) => updateParam('energy', 'rechargeProfile', profile)}
                    prices={params.energy.electricityPrices}
                    onPricesChange={(prices) => updateParam('energy', 'electricityPrices', prices)}
                    isDark={isDark}
                  />
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-rose-500" />
                    <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>
                      <span className="sm:hidden">Part élec. PHEV</span>
                      <span className="hidden sm:inline">Part électrique Hybride rechargeable</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[params.energy.phevElectricShare]}
                      onValueChange={([v]) => updateParam('energy', 'phevElectricShare', v)}
                      min={0}
                      max={100}
                      step={5}
                      className="flex-1 [&_[role=slider]]:bg-rose-500 [&_.bg-primary]:bg-rose-500"
                    />
                    <span className={cn("text-sm font-medium w-12 text-right", isDark ? "text-white" : "text-gray-900")}>
                      {params.energy.phevElectricShare}%
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="costs" className="space-y-3">
                {/* Prix d'acquisition */}
                <div className="space-y-3 mb-4">
                  <h4 className={cn("text-xs font-medium uppercase tracking-wide", isDark ? "text-gray-400" : "text-gray-600")}>
                    Prix d'acquisition
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {techConfig.map(tech => {
                      const Icon = tech.icon;
                      const vehicle = params.vehicles[tech.id];
                      return (
                        <div key={tech.id} className={cn("p-3 rounded-xl border", tech.bgColor, tech.borderColor)}>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={cn("w-3.5 h-3.5", tech.iconColor)} />
                            <span className={cn("font-medium text-xs", isDark ? "text-white" : "text-gray-900")}>{tech.label}</span>
                          </div>
                          <div>
                            <Label className="text-gray-500 text-xs">Prix (CHF)</Label>
                            <Input
                              type="number"
                              value={vehicle.price}
                              onChange={(e) => updateVehicleParam(tech.id, 'price', Number(e.target.value))}
                              className={cn(
                                "h-8 text-sm",
                                isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                              )}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={cn("h-px", isDark ? "bg-white/10" : "bg-gray-200")} />

                {/* Coûts d'exploitation */}
                <div className="space-y-3">
                  <h4 className={cn("text-xs font-medium uppercase tracking-wide", isDark ? "text-gray-400" : "text-gray-600")}>
                    Coûts d'exploitation
                  </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {techConfig.map(tech => (
                    <div key={tech.id} className={cn("p-3 rounded-xl border space-y-2", tech.bgColor, tech.borderColor)}>
                      <div className="flex items-center gap-2">
                        <tech.icon className={cn("w-3.5 h-3.5", tech.iconColor)} />
                        <span className={cn("font-medium text-xs", isDark ? "text-white" : "text-gray-900")}>{tech.label}</span>
                      </div>
                      <div>
                        <Label className="text-gray-500 text-xs">Taxe (CHF/an)</Label>
                        <Input
                          type="number"
                          value={params.costs[tech.id].tax}
                          onChange={(e) => onParamsChange({
                            ...params,
                            costs: { ...params.costs, [tech.id]: { ...params.costs[tech.id], tax: Number(e.target.value) } }
                          })}
                          className={cn(
                            "h-8 text-sm",
                            isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                          )}
                        />
                      </div>
                      <div>
                        <Label className="text-gray-500 text-xs">Assurance (CHF/an)</Label>
                        <Input
                          type="number"
                          value={params.costs[tech.id].insurance}
                          onChange={(e) => onParamsChange({
                            ...params,
                            costs: { ...params.costs, [tech.id]: { ...params.costs[tech.id], insurance: Number(e.target.value) } }
                          })}
                          className={cn(
                            "h-8 text-sm",
                            isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                          )}
                        />
                      </div>
                      <div>
                        <Label className="text-gray-500 text-xs">Entretien (CHF/km)</Label>
                        <Input
                          type="number"
                          step="0.001"
                          value={params.costs[tech.id].maintenance}
                          onChange={(e) => onParamsChange({
                            ...params,
                            costs: { ...params.costs, [tech.id]: { ...params.costs[tech.id], maintenance: Number(e.target.value) } }
                          })}
                          className={cn(
                            "h-8 text-sm",
                            isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                          )}
                        />
                      </div>
                      <div>
                        <Label className="text-gray-500 text-xs">Pneus (CHF/10k km)</Label>
                        <Input
                          type="number"
                          value={params.costs[tech.id].tireCost}
                          onChange={(e) => onParamsChange({
                            ...params,
                            costs: { ...params.costs, [tech.id]: { ...params.costs[tech.id], tireCost: Number(e.target.value) } }
                          })}
                          className={cn(
                            "h-8 text-sm",
                            isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                          )}
                        />
                      </div>
                    </div>
                    ))}
                    </div>
                    </div>

                    <div className={cn("h-px", isDark ? "bg-white/10" : "bg-gray-200")} />

                    {/* Équipement */}
                    <div className="space-y-3">
                    <h4 className={cn("text-xs font-medium uppercase tracking-wide", isDark ? "text-gray-400" : "text-gray-600")}>
                    Équipement
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-blue-500" />
                      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Borne domicile</span>
                    </div>
                    <div>
                      <Label className="text-gray-500 text-xs">Coût installation (CHF)</Label>
                      <Input
                        type="number"
                        value={params.costs.homeCharger}
                        onChange={(e) => updateParam('costs', 'homeCharger', Number(e.target.value))}
                        className={cn(
                          "h-9",
                          isDark ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
                        )}
                      />
                    </div>
                    </div>
                    </div>
                    </div>
                    </TabsContent>

              <TabsContent value="macro" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { key: 'discountRate', label: "Taux d'actualisation", unit: '%', icon: Percent },
                    { key: 'energyInflation', label: 'Inflation énergie', unit: '%/an', icon: Percent },
                    { key: 'opexInflation', label: 'Inflation - Autres coûts', unit: '%/an', icon: Percent },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className={cn(
                        "p-4 rounded-xl border space-y-3",
                        isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                      )}>
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-4 h-4", isDark ? "text-gray-400" : "text-gray-500")} />
                          <span className={cn("text-sm", isDark ? "text-white" : "text-gray-900")}>{item.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Slider
                            value={[params.macro[item.key]]}
                            onValueChange={([v]) => updateParam('macro', item.key, v)}
                            min={0}
                            max={10}
                            step={0.5}
                            className="flex-1 [&_[role=slider]]:bg-blue-500 [&_.bg-primary]:bg-blue-500"
                          />
                          <span className={cn("text-sm font-medium w-16 text-right", isDark ? "text-white" : "text-gray-900")}>
                            {params.macro[item.key]} {item.unit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="climate" className="space-y-3">
                {/* Mix électrique */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Mix électrique</span>
                  </div>
                  <p className="text-[10px] text-gray-500 -mt-2">
                    Intensité carbone de l'électricité utilisée pour recharger
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">gCO₂eq/kWh</span>
                      <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
                        {params.climate?.electricityEmissionFactor || 50}
                      </span>
                    </div>
                    <Slider
                      value={[params.climate?.electricityEmissionFactor || 50]}
                      onValueChange={([v]) => updateParam('climate', 'electricityEmissionFactor', v)}
                      min={0}
                      max={850}
                      step={10}
                      className="[&_[role=slider]]:bg-blue-500 [&_.bg-primary]:bg-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span>0</span>
                      <span>50 (Suisse)</span>
                      <span>350 (EU)</span>
                      <span>450 (gaz)</span>
                      <span>850 (charbon)</span>
                    </div>
                  </div>
                </div>

                {/* Info LCA - cliquable */}
                <button
                  onClick={onOpenCO2Details}
                  className={cn(
                    "w-full p-4 rounded-xl border space-y-3 text-left transition-colors group",
                    isDark ? "bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-gray-500" />
                      <span className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Analyse de cycle de vie</span>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      isDark ? "text-gray-500 group-hover:text-gray-300" : "text-gray-400 group-hover:text-gray-600"
                    )} />
                  </div>
                  <p className="text-[10px] text-gray-500">
                    Les émissions sont calculées automatiquement selon :
                  </p>
                  <ul className="text-[10px] text-gray-500 space-y-1 ml-3">
                    <li>• <span className={cn(isDark ? "text-gray-400" : "text-gray-600")}>Échappement</span> : émissions directes du carburant (essence: 2310, diesel: 2610 gCO₂/L)</li>
                    <li>• <span className={cn(isDark ? "text-gray-400" : "text-gray-600")}>Chaîne énergétique</span> : production électricité (mix ci-dessus) + production carburant (essence: 631, diesel: 564 gCO₂/L)</li>
                    <li>• <span className={cn(isDark ? "text-gray-400" : "text-gray-600")}>Autres catégories</span> : fabrication, maintenance, infrastructures et fin de vie (amorti sur 200k km)</li>
                    <li>• <span className={cn(isDark ? "text-gray-400" : "text-gray-600")}>Hybride</span> : pondéré selon la part électrique définie</li>
                  </ul>
                  <p className="text-[10px] text-blue-400 group-hover:text-blue-300">
                    Cliquer pour voir le détail →
                  </p>
                </button>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}