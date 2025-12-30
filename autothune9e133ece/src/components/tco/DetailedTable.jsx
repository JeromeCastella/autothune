import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Table2, Zap, Fuel, Battery } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const techTabs = [
  { id: 'BEV', label: 'Électrique', icon: Zap, color: 'blue' },
  { id: 'ICE', label: 'Thermique', icon: Fuel, color: 'orange' },
  { id: 'PHEV', label: 'Hybride rechargeable', icon: Battery, color: 'rose' },
];

export default function DetailedTable({ yearlyData, isDark = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState('BEV');

  const data = yearlyData[selectedTech] || [];

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
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            isDark ? "bg-white/5" : "bg-gray-100"
          )}>
            <Table2 className={cn("w-4 h-4", isDark ? "text-gray-400" : "text-gray-500")} />
          </div>
          <div className="text-left">
            <h3 className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>Détail annuel</h3>
            <p className="text-xs text-gray-500">Décomposition par année</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={cn("flex gap-2 px-4 pb-4 border-t pt-4", isDark ? "border-white/5" : "border-gray-200")}>
              {techTabs.map(tab => {
                const Icon = tab.icon;
                const isSelected = selectedTech === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTech(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      isSelected && tab.color === 'blue' && "bg-blue-500/20 text-blue-600 border border-blue-500/30",
                      isSelected && tab.color === 'orange' && "bg-orange-500/20 text-orange-600 border border-orange-500/30",
                      isSelected && tab.color === 'rose' && "bg-rose-500/20 text-rose-600 border border-rose-500/30",
                      !isSelected && (isDark 
                        ? "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
                        : "bg-gray-100 text-gray-500 border border-transparent hover:bg-gray-200"
                      )
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className={cn(isDark ? "border-white/5" : "border-gray-200", "hover:bg-transparent")}>
                    <TableHead className={cn("font-medium text-xs", isDark ? "text-gray-400" : "text-gray-500")}>Année</TableHead>
                    <TableHead className={cn("font-medium text-xs text-right", isDark ? "text-gray-400" : "text-gray-500")}>Énergie</TableHead>
                    <TableHead className={cn("font-medium text-xs text-right", isDark ? "text-gray-400" : "text-gray-500")}>Entretien</TableHead>
                    <TableHead className={cn("font-medium text-xs text-right", isDark ? "text-gray-400" : "text-gray-500")}>Pneus</TableHead>
                    <TableHead className={cn("font-medium text-xs text-right", isDark ? "text-gray-400" : "text-gray-500")}>Autres</TableHead>
                    <TableHead className={cn("font-medium text-xs text-right", isDark ? "text-gray-400" : "text-gray-500")}>Val. rés.</TableHead>
                    <TableHead className={cn("font-medium text-xs text-right", isDark ? "text-gray-400" : "text-gray-500")}>Cumul</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.year} className={cn(
                      isDark ? "border-white/5 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"
                    )}>
                      <TableCell className={cn("font-medium text-sm", isDark ? "text-white" : "text-gray-900")}>{row.year || 0}</TableCell>
                      <TableCell className="text-right text-orange-500 text-sm">
                        {(row.energy || 0).toLocaleString('fr-CH')}
                      </TableCell>
                      <TableCell className="text-right text-rose-500 text-sm">
                        {(row.maintenance || 0).toLocaleString('fr-CH')}
                      </TableCell>
                      <TableCell className={cn("text-right text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                        {(row.tires || 0).toLocaleString('fr-CH')}
                      </TableCell>
                      <TableCell className={cn("text-right text-sm", isDark ? "text-gray-400" : "text-gray-600")}>
                        {(row.other || 0).toLocaleString('fr-CH')}
                      </TableCell>
                      <TableCell className="text-right text-emerald-500 text-sm">
                        {row.year === data.length ? `−${(row.residual || 0).toLocaleString('fr-CH')}` : '−'}
                      </TableCell>
                      <TableCell className={cn("text-right font-semibold text-sm", isDark ? "text-white" : "text-gray-900")}>
                        {(row.cumulative || 0).toLocaleString('fr-CH')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}