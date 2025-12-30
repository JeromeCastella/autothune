import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TECH_COLORS = {
  BEV: 'rgba(59, 130, 246, 0.8)',
  ICE: 'rgba(216, 108, 31, 0.8)',
  PHEV: 'rgba(244, 63, 94, 0.8)',
};

const TECH_LABELS = {
  BEV: 'Électrique',
  ICE: 'Thermique',
  PHEV: 'Hybride rechargeable',
};

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={isDark ? "bg-[#111827] rounded-lg p-3 border border-white/10" : "bg-white rounded-lg p-3 border border-gray-200 shadow-lg"}>
        <p className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Année {label}</p>
        <div className="space-y-1.5">
          {payload.sort((a, b) => a.value - b.value).map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-400 text-sm">{TECH_LABELS[entry.dataKey]}</span>
              </div>
              <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {entry.value.toLocaleString('fr-CH')} CHF
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex justify-center gap-5 mt-4 px-4">
    {payload.map((entry, index) => (
      <div key={index} className="flex items-center gap-1.5">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs text-gray-500">
          {TECH_LABELS[entry.value]}
        </span>
      </div>
    ))}
  </div>
);

export default function TCOLineChart({ data, isDark = true }) {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 11 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} />
          <Legend content={<CustomLegend />} />
          
          {Object.entries(TECH_COLORS).map(([tech, color]) => (
            <Line
              key={tech}
              type="monotone"
              dataKey={tech}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: color, strokeWidth: 2, fill: isDark ? '#0a0f1a' : '#ffffff' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}