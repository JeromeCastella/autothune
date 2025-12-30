import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, MapPin, Zap } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function RechargeProfile({ 
  profile, 
  onProfileChange,
  prices,
  onPricesChange,
  isDark = true
}) {
  const locations = [
    { id: 'home', name: 'Domicile', icon: Home, color: 'bg-blue-500', sliderColor: '[&_[role=slider]]:bg-blue-500 [&_.bg-primary]:bg-blue-500' },
    { id: 'work', name: 'Travail', icon: Building2, color: 'bg-orange-500', sliderColor: '[&_[role=slider]]:bg-orange-500 [&_.bg-primary]:bg-orange-500' },
    { id: 'public', name: 'Déplacement', icon: MapPin, color: 'bg-rose-500', sliderColor: '[&_[role=slider]]:bg-rose-500 [&_.bg-primary]:bg-rose-500' },
  ];

  const weightedPrice = locations.reduce((sum, loc) => {
    return sum + (profile[loc.id] / 100) * prices[loc.id];
  }, 0);

  const handleSliderChange = (id, newValue) => {
    const others = locations.filter(l => l.id !== id).map(l => l.id);
    const currentOthersTotal = others.reduce((sum, key) => sum + profile[key], 0);
    const remaining = 100 - newValue;
    
    let newProfile = { ...profile, [id]: newValue };
    
    if (currentOthersTotal > 0) {
      others.forEach(key => {
        newProfile[key] = Math.round((profile[key] / currentOthersTotal) * remaining);
      });
    } else {
      const share = Math.round(remaining / others.length);
      others.forEach((key, i) => {
        newProfile[key] = i === others.length - 1 ? remaining - share * (others.length - 1) : share;
      });
    }
    
    const total = Object.values(newProfile).reduce((a, b) => a + b, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const adjustKey = others.find(k => newProfile[k] + diff >= 0) || id;
      newProfile[adjustKey] += diff;
    }
    
    onProfileChange(newProfile);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className={cn("text-sm flex items-center gap-2", isDark ? "text-gray-400" : "text-gray-600")}>
          <Zap className="w-4 h-4 text-blue-500" />
          Profil de recharge
        </h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>
                {weightedPrice.toFixed(3)} <span className="text-gray-500 font-normal">CHF/kWh</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className={cn("border p-3 shadow-xl", isDark ? "bg-[#1a2332] border-white/10" : "bg-white border-gray-200")}>
              <p className={cn("text-sm mb-2", isDark ? "text-white" : "text-gray-900")}>Prix pondéré</p>
              <div className="space-y-1 text-xs">
                {locations.map(loc => (
                  <div key={loc.id} className="flex justify-between gap-4">
                    <span className="text-gray-500">{loc.name} ({profile[loc.id]}%)</span>
                    <span className={isDark ? "text-white" : "text-gray-900"}>{prices[loc.id]} CHF</span>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className={cn("h-2 rounded-full overflow-hidden flex", isDark ? "bg-white/10" : "bg-gray-200")}>
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            className={cn("h-full", loc.color)}
            initial={false}
            animate={{ width: `${profile[loc.id]}%` }}
            transition={{ type: "spring", bounce: 0.2 }}
          />
        ))}
      </div>

      <div className="space-y-3">
        {locations.map(loc => {
          const Icon = loc.icon;
          return (
            <div key={loc.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{loc.name}</span>
                  <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{profile[loc.id]}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={prices[loc.id]}
                    onChange={(e) => onPricesChange({ ...prices, [loc.id]: parseFloat(e.target.value) || 0 })}
                    className={cn(
                      "w-16 px-2 py-1 text-xs text-right rounded focus:outline-none focus:border-blue-500",
                      isDark ? "bg-white/5 border border-white/10 text-white" : "bg-white border border-gray-300 text-gray-900"
                    )}
                    step="0.01"
                  />
                  <span className="text-xs text-gray-500">CHF</span>
                </div>
              </div>
              <Slider
                value={[profile[loc.id]]}
                onValueChange={([v]) => handleSliderChange(loc.id, v)}
                min={0}
                max={100}
                step={5}
                className={loc.sliderColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}