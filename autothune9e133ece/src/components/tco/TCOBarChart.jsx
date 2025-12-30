import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const COLORS = {
  netPurchase: { fill: 'rgba(50, 92, 186, 0.7)', stroke: 'rgba(50, 92, 186, 0.9)' },
  energy: { fill: 'rgba(173, 81, 180, 0.7)', stroke: 'rgba(173, 81, 180, 0.9)' },
  maintenance: { fill: 'rgba(245, 73, 140, 0.7)', stroke: 'rgba(245, 73, 140, 0.9)' },
  tires: { fill: 'rgba(255, 108, 83, 0.7)', stroke: 'rgba(255, 108, 83, 0.9)' },
  other: { fill: 'rgba(255, 166, 0, 0.7)', stroke: 'rgba(255, 166, 0, 0.9)' },
};

const LABELS = {
  netPurchase: 'Achat net (−revente)',
  energy: 'Énergie',
  maintenance: 'Entretien',
  tires: 'Pneus',
  other: 'Autres',
};

const TECH_LABELS = {
  BEV: 'Électrique',
  ICE: 'Thermique',
  PHEV: 'Hybride rechargeable',
};

const CustomXAxisTick = ({ x, y, payload, isDark }) => {
  const fullLabel = payload.value;
  const isPHEV = fullLabel === 'Hybride rechargeable';
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const textColor = isDark ? '#9ca3af' : '#4b5563';

  return (
    <g transform={`translate(${x},${y})`}>
      {isPHEV && isMobile ? (
        <>
          <text x={0} y={0} dy={5} textAnchor="middle" fill={textColor} fontSize={11}>
            Hybride
          </text>
          <text x={0} y={0} dy={18} textAnchor="middle" fill={textColor} fontSize={11}>
            rechargeable
          </text>
        </>
      ) : (
        <text x={0} y={0} dy={11} textAnchor="middle" fill={textColor} fontSize={12}>
          {fullLabel}
        </text>
      )}
    </g>
  );
};

// Transform data to combine purchase and residual into netPurchase
const transformData = (data) => data.map(item => ({
  name: TECH_LABELS[item.name] || item.name,
  techId: item.name,
  netPurchase: item.purchase + item.residual, // residual is already negative
  energy: item.energy,
  maintenance: item.maintenance,
  tires: item.tires,
  other: item.other,
  total: item.total,
  // Keep original values for tooltip
  _purchase: item.purchase,
  _residual: Math.abs(item.residual),
}));

const CustomTooltip = ({ active, payload, label, hoveredKey, isDark }) => {
  if (active && payload && payload.length && hoveredKey) {
    const data = payload[0]?.payload;
    
    // Handle netPurchase specially to show purchase and residual
    if (hoveredKey === 'netPurchase') {
      return (
        <div className={isDark ? "bg-[#111827] rounded-lg p-3 border border-white/10" : "bg-white rounded-lg p-3 border border-gray-200 shadow-lg"}>
          <p className={`font-medium text-sm mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-gray-400">Achat</span>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {data?._purchase?.toLocaleString('fr-CH')} CHF
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-gray-400">Revente</span>
              <span className="font-medium text-emerald-500">
                −{data?._residual?.toLocaleString('fr-CH')} CHF
              </span>
            </div>
            <div className={`border-t pt-1.5 flex items-center justify-between gap-4 text-sm ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <span className="text-gray-400">Net</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {data?.netPurchase?.toLocaleString('fr-CH')} CHF
              </span>
            </div>
          </div>
        </div>
      );
    }
    
    const value = data?.[hoveredKey];
    return (
      <div className={isDark ? "bg-[#111827] rounded-lg p-3 border border-white/10" : "bg-white rounded-lg p-3 border border-gray-200 shadow-lg"}>
        <p className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-400 text-sm">{LABELS[hoveredKey]}</span>
          <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value?.toLocaleString('fr-CH')} CHF
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function TCOBarChart({ data, isDark = true }) {
  const chartData = transformData(data);
  const [hoveredKey, setHoveredKey] = React.useState(null);
  
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 10, left: 0, bottom: 10 }}
          barCategoryGap="20%"
        >
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxisTick isDark={isDark} />}
            interval={0}
            height={35}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#6b7280' : '#6b7280', fontSize: 11 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            content={<CustomTooltip hoveredKey={hoveredKey} isDark={isDark} />} 
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} 
          />
          
          {Object.keys(COLORS).map((key, index, arr) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={COLORS[key].fill}
              stroke={COLORS[key].stroke}
              strokeWidth={1.5}
              radius={index === arr.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {index === arr.length - 1 && (
                <LabelList
                  dataKey="total"
                  position="top"
                  formatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  fill={isDark ? '#fff' : '#111827'}
                  fontSize={12}
                  fontWeight={600}
                />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 px-4">
        {Object.entries(LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full border"
              style={{ backgroundColor: COLORS[key].fill, borderColor: COLORS[key].stroke }}
            />
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}