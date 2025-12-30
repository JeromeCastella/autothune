// Default vehicle parameters by class - source : Tabelle 4 OFEN - prix pour small PHEV obtenu par ratio moyen entre ICE et PHEV sur les autres catégories (1.11)
export const defaultVehicleParams = {
  small: {
    BEV: { price: 30141, consumption: 15 },
    ICE: { price: 24890, consumption: 6.5, petrolConsumption: 6.5, dieselConsumption: 6.5 * 0.88 },
    PHEV: { price: 27628, consumption: 15, fuelConsumption: 6.5, petrolConsumption: 15, dieselConsumption: 15 * 0.88, fuelPetrolConsumption: 6.5, fuelDieselConsumption: 6.5 * 0.88 },
  },
  medium: {
    BEV: { price: 40719, consumption: 17 },
    ICE: { price: 40827, consumption: 7.5, petrolConsumption: 7.5, dieselConsumption: 7.5 * 0.88 },
    PHEV: { price: 45425, consumption: 17, fuelConsumption: 7.5, petrolConsumption: 17, dieselConsumption: 17 * 0.88, fuelPetrolConsumption: 7.5, fuelDieselConsumption: 7.5 * 0.88 },
  },
  premium: {
    BEV: { price: 98336, consumption: 20 },
    ICE: { price: 91752, consumption: 9.0, petrolConsumption: 9.0, dieselConsumption: 9.0 * 0.88 },
    PHEV: { price: 105862, consumption: 20, fuelConsumption: 9.0, petrolConsumption: 20, dieselConsumption: 20 * 0.88, fuelPetrolConsumption: 9.0, fuelDieselConsumption: 9.0 * 0.88 },
  },
  suv: {
    BEV: { price: 58374, consumption: 22 },
    ICE: { price: 51114, consumption: 9.5, petrolConsumption: 9.5, dieselConsumption: 9.5 * 0.88 },
    PHEV: { price: 54910, consumption: 22, fuelConsumption: 9.5, petrolConsumption: 22, dieselConsumption: 22 * 0.88, fuelPetrolConsumption: 9.5, fuelDieselConsumption: 9.5 * 0.88 },
  },
};


// Default tire costs by class and technology (CHF per 10,000 km) - Source : Tabelle 14 Reifenkosten - prix pour small PHEV obtenu par ratio moyen entre ICE et PHEV sur les autres catégories (0.94)
// BEV - Majoration de 20% selon ARVAL (annexe 4 OFEV)
export const defaultTireCosts = {
  small: {
    BEV: 254,
    ICE: 229,
    PHEV: 215,
  },
  medium: {
    BEV: 370,
    ICE: 286,
    PHEV: 227,
  },
  premium: {
    BEV: 388,
    ICE: 358,
    PHEV: 358,
  },
  suv: {
    BEV: 407,
    ICE: 262,
    PHEV: 269,
  },
};

// Default tax costs by class and technology (CHF/year)
export const defaultTaxCosts = {
  small: {
    BEV: 194,
    ICE: 194,
    PHEV: 194,
  },
  medium: {
    BEV: 356,
    ICE: 356,
    PHEV: 356,
  },
  premium: {
    BEV: 516,
    ICE: 516,
    PHEV: 516,
  },
  suv: {
    BEV: 363,
    ICE: 363,
    PHEV: 363,
  },
};

// Default insurance costs by class and technology (CHF/year)
export const defaultInsuranceCosts = {
  small: {
    BEV: 512,
    ICE: 505,
    PHEV: 480,
  },
  medium: {
    BEV: 645,
    ICE: 655,
    PHEV: 618,
  },
  premium: {
    BEV: 936,
    ICE: 1008,
    PHEV: 1048,
  },
  suv: {
    BEV: 697,
    ICE: 775,
    PHEV: 675,
  },
};

// Default maintenance costs by class and technology (CHF/km)
export const defaultMaintenanceCosts = {
  small: {
    BEV: 0.03,
    ICE: 0.05,
    PHEV: 0.06,
  },
  medium: {
    BEV: 0.03,
    ICE: 0.05,
    PHEV: 0.06,
  },
  premium: {
    BEV: 0.06,
    ICE: 0.07,
    PHEV: 0.07,
  },
  suv: {
    BEV: 0.05,
    ICE: 0.06,
    PHEV: 0.06,
  },
};

// Residual value curve (% of purchase price by year) - Source Abbildung 2 OFEN
const residualValueCurve = {
  small: {
    BEV:  [1.0000, 0.7330, 0.5614, 0.4300, 0.3385, 0.2665, 0.2098, 0.1651, 0.1300, 0.1153, 0.1023, 0.0908, 0.0806, 0.0800, 0.0800, 0.0800],
    ICE:  [1.0000, 0.6900, 0.6104, 0.5400, 0.4285, 0.3401, 0.2699, 0.2142, 0.1700, 0.1514, 0.1349, 0.1202, 0.1071, 0.0954, 0.0850, 0.0800],
    PHEV: [1.0000, 0.7120, 0.5876, 0.4850, 0.3849, 0.3055, 0.2424, 0.1924, 0.1527, 0.1360, 0.1212, 0.1079, 0.0962, 0.0857, 0.0800, 0.0800],
  },
  medium: {
    BEV:  [1.0000, 0.7600, 0.6195, 0.5050, 0.4196, 0.3486, 0.2897, 0.2407, 0.2000, 0.1823, 0.1662, 0.1515, 0.1381, 0.1258, 0.1147, 0.1046],
    ICE:  [1.0000, 0.6950, 0.6098, 0.5350, 0.4203, 0.3301, 0.2593, 0.2037, 0.1600, 0.1418, 0.1257, 0.1114, 0.1000, 0.1000, 0.1000, 0.1000],
    PHEV: [1.0000, 0.7280, 0.6153, 0.5200, 0.4085, 0.3209, 0.2521, 0.1980, 0.1555, 0.1378, 0.1222, 0.1083, 0.1000, 0.1000, 0.1000, 0.1000],
  },
  premium: {
    BEV:  [1.0000, 0.7200, 0.5940, 0.4900, 0.4212, 0.3621, 0.3113, 0.2676, 0.2300, 0.2133, 0.1977, 0.1833, 0.1700, 0.1576, 0.1461, 0.1355],
    ICE:  [1.0000, 0.6550, 0.5892, 0.5300, 0.4001, 0.3021, 0.2281, 0.1722, 0.1300, 0.1130, 0.0982, 0.0853, 0.0800, 0.0800, 0.0800, 0.0800],
    PHEV: [1.0000, 0.6880, 0.5924, 0.5100, 0.3850, 0.2907, 0.2195, 0.1657, 0.1251, 0.1087, 0.0945, 0.0821, 0.0800, 0.0800, 0.0800, 0.0800],
  },
  suv: {
    BEV:  [1.0000, 0.7130, 0.6136, 0.5280, 0.4471, 0.3787, 0.3207, 0.2716, 0.2300, 0.2117, 0.1948, 0.1792, 0.1650, 0.1518, 0.1397, 0.1286],
    ICE:  [1.0000, 0.7300, 0.6535, 0.5850, 0.4766, 0.3883, 0.3164, 0.2578, 0.2100, 0.1896, 0.1711, 0.1544, 0.1394, 0.1258, 0.1136, 0.1025],
    PHEV: [1.0000, 0.7210, 0.6331, 0.5560, 0.4530, 0.3691, 0.3007, 0.2450, 0.1996, 0.1802, 0.1626, 0.1468, 0.1325, 0.1196, 0.1080, 0.1000],
  },
};

// Fixed emissions by vehicle class
// Toutes les valeurs sont en gCO₂eq/km
// ICE et PHEV: Moyennes entre diesel et essence - Source : Mobitool
// vehicle et disposal: Amorties sur 200'000 km (durée de vie totale du véhicule)
export const FIXED_EMISSIONS = {
  small: {
    BEV: { maintenance: 5.19, vehicle: 44.6, disposal: 5.20, infrastructure: 16.9 },
    ICE: { maintenance: 4.73, vehicle: 29.2, disposal: 4.74, infrastructure: 15.67 },
    PHEV: { maintenance: 5.28, vehicle: 36.6, disposal: 5.10, infrastructure: 16.76 },
  },
  medium: {
    BEV: { maintenance: 6.23, vehicle: 53.9, disposal: 6.27, infrastructure: 18.3 },
    ICE: { maintenance: 5.47, vehicle: 33.8, disposal: 5.48, infrastructure: 16.74 },
    PHEV: { maintenance: 5.95, vehicle: 41.5, disposal: 5.74, infrastructure: 17.75 },
  },
  premium: {
    BEV: { maintenance: 7.76, vehicle: 78.8, disposal: 7.8, infrastructure: 20.4 },
    ICE: { maintenance: 7.15, vehicle: 44.2, disposal: 7.2, infrastructure: 19.04 },
    PHEV: { maintenance: 8.28, vehicle: 57.6, disposal: 8.0, infrastructure: 21.04 },
  },
  suv: {
    BEV: { maintenance: 9.01, vehicle: 93.0, disposal: 9.2, infrastructure: 22.2 },
    ICE: { maintenance: 8.48, vehicle: 52.7, disposal: 8.6, infrastructure: 20.9 },
    PHEV: { maintenance: 9.59, vehicle: 65.9, disposal: 9.4, infrastructure: 22.85 },
  },
};

// Fuel emission factors (gCO₂eq/L) - WTW (Well-to-Wheel)
const FUEL_EMISSION_FACTORS = {
  petrol: {
    direct: 2310,      // Tank-to-wheel (combustion directe)
    energyChain: 631,  // Well-to-tank (production, raffinage, transport)
  },
  diesel: {
    direct: 2610,      // Tank-to-wheel (combustion directe)
    energyChain: 564,  // Well-to-tank (production, raffinage, transport)
  },
};

export function calculateTCO(params, duration, annualKm, vehicleClass = 'medium') {
  const { vehicles, energy, costs, macro, climate } = params;
  
  const results = {
    BEV: [],
    ICE: [],
    PHEV: [],
  };

  const totals = {
    BEV: { purchase: 0, energy: 0, maintenance: 0, tires: 0, other: 0, residual: 0 },
    ICE: { purchase: 0, energy: 0, maintenance: 0, tires: 0, other: 0, residual: 0 },
    PHEV: { purchase: 0, energy: 0, maintenance: 0, tires: 0, other: 0, residual: 0 },
  };

  // Calculate weighted electricity price
  const weightedElecPrice = 
    (energy.rechargeProfile.home / 100) * energy.electricityPrices.home +
    (energy.rechargeProfile.work / 100) * energy.electricityPrices.work +
    (energy.rechargeProfile.public / 100) * energy.electricityPrices.public;

  ['BEV', 'ICE', 'PHEV'].forEach(tech => {
    const vehicle = vehicles[tech];
    const costParams = costs[tech];
    let cumulative = vehicle.price;
    
    // Add home charger cost for BEV and PHEV
    if (tech === 'BEV' || tech === 'PHEV') {
      cumulative += costs.homeCharger;
      totals[tech].purchase = vehicle.price + costs.homeCharger;
    } else {
      totals[tech].purchase = vehicle.price;
    }

    for (let year = 1; year <= duration; year++) {
      const inflationEnergy = Math.pow(1 + macro.energyInflation / 100, year - 1);
      const inflationOpex = Math.pow(1 + macro.opexInflation / 100, year - 1);
      const discountFactor = Math.pow(1 + macro.discountRate / 100, year);

      // Energy cost calculation
      let energyCost = 0;
      if (tech === 'BEV') {
        energyCost = (vehicle.consumption / 100) * annualKm * weightedElecPrice * inflationEnergy;
      } else if (tech === 'ICE') {
        const fuelPrice = energy.fuelPrices?.[energy.fuelType || 'petrol'] || energy.fuelPrice || 1.85;
        energyCost = (vehicle.consumption / 100) * annualKm * fuelPrice * inflationEnergy;
      } else { // PHEV
        const electricKm = annualKm * (energy.phevElectricShare / 100);
        const fuelKm = annualKm * (1 - energy.phevElectricShare / 100);
        const fuelPrice = energy.fuelPrices?.[energy.fuelType || 'petrol'] || energy.fuelPrice || 1.85;
        const electricCost = (vehicle.consumption / 100) * electricKm * weightedElecPrice * inflationEnergy;
        const fuelCost = (vehicle.fuelConsumption / 100) * fuelKm * fuelPrice * inflationEnergy;
        energyCost = electricCost + fuelCost;
      }

      // Maintenance cost
      const maintenanceCost = costParams.maintenance * annualKm * inflationOpex;

      // Tire cost (prorated) - now using costParams.tireCost
      const tireCost = (annualKm / 10000) * costParams.tireCost * inflationOpex;

      // Other costs (tax + insurance)
      const otherCost = (costParams.tax + costParams.insurance) * inflationOpex;

      // Residual value (only in last year)
      const residualValue = year === duration 
        ? vehicle.price * (residualValueCurve[vehicleClass]?.[tech]?.[duration] || 0.10)
        : 0;

      // Calculate discounted flow
      const yearlyFlow = energyCost + maintenanceCost + tireCost + otherCost;
      const discountedFlow = year === duration
        ? (yearlyFlow - residualValue) / discountFactor
        : yearlyFlow / discountFactor;

      cumulative += discountedFlow;

      results[tech].push({
        year,
        energy: Math.round(energyCost),
        maintenance: Math.round(maintenanceCost),
        tires: Math.round(tireCost),
        other: Math.round(otherCost),
        residual: Math.round(residualValue),
        discountedFlow: Math.round(discountedFlow),
        cumulative: Math.round(cumulative),
      });

      // Accumulate totals (non-discounted for bar chart)
      totals[tech].energy += energyCost;
      totals[tech].maintenance += maintenanceCost;
      totals[tech].tires += tireCost;
      totals[tech].other += otherCost;
      if (year === duration) {
        totals[tech].residual = residualValue;
      }
    }
  });

  // Format bar chart data
  const barChartData = ['BEV', 'ICE', 'PHEV'].map(tech => ({
    name: tech,
    purchase: Math.round(totals[tech].purchase),
    energy: Math.round(totals[tech].energy),
    maintenance: Math.round(totals[tech].maintenance),
    tires: Math.round(totals[tech].tires),
    other: Math.round(totals[tech].other),
    residual: Math.round(-totals[tech].residual), // Negative for stacking
    total: Math.round(
      totals[tech].purchase + 
      totals[tech].energy + 
      totals[tech].maintenance + 
      totals[tech].tires + 
      totals[tech].other - 
      totals[tech].residual
    ),
  }));

  // Format line chart data
  const lineChartData = [];
  for (let i = 0; i < duration; i++) {
    lineChartData.push({
      year: i + 1,
      BEV: results.BEV[i].cumulative,
      ICE: results.ICE[i].cumulative,
      PHEV: results.PHEV[i].cumulative,
    });
  }

  // Calculate KPIs
  const totalKm = duration * annualKm;
  
  // Calculate CO2 emissions (cycle de vie complet)
  const co2Emissions = {};
  const fuelType = energy.fuelType || 'petrol';
  const fuelFactors = FUEL_EMISSION_FACTORS[fuelType];
  
  ['BEV', 'ICE', 'PHEV'].forEach(tech => {
    const vehicle = vehicles[tech];
    
    // Électricité - chaîne énergétique uniquement (pas d'émissions directes)
    let energyChainElectricityGPerKm = 0;
    if (tech === 'BEV') {
      energyChainElectricityGPerKm = (vehicle.consumption / 100) * climate.electricityEmissionFactor;
    } else if (tech === 'PHEV') {
      const electricShare = energy.phevElectricShare / 100;
      energyChainElectricityGPerKm = (vehicle.consumption / 100) * climate.electricityEmissionFactor * electricShare;
    }
    
    // Carburant - émissions directes (échappement)
    let fuelDirectGPerKm = 0;
    if (tech === 'ICE') {
      fuelDirectGPerKm = (vehicle.consumption / 100) * fuelFactors.direct;
    } else if (tech === 'PHEV') {
      const fuelShare = 1 - (energy.phevElectricShare / 100);
      fuelDirectGPerKm = (vehicle.fuelConsumption / 100) * fuelFactors.direct * fuelShare;
    }
    
    // Carburant - chaîne énergétique (production, raffinage)
    let fuelEnergyChainGPerKm = 0;
    if (tech === 'ICE') {
      fuelEnergyChainGPerKm = (vehicle.consumption / 100) * fuelFactors.energyChain;
    } else if (tech === 'PHEV') {
      const fuelShare = 1 - (energy.phevElectricShare / 100);
      fuelEnergyChainGPerKm = (vehicle.fuelConsumption / 100) * fuelFactors.energyChain * fuelShare;
    }
    
    // Total chaîne énergétique
    const totalEnergyChainGPerKm = energyChainElectricityGPerKm + fuelEnergyChainGPerKm;
    
    // Émissions fixes du cycle de vie
    const fixedEmissions = FIXED_EMISSIONS[vehicleClass]?.[tech] || FIXED_EMISSIONS.medium[tech];
    
    // Total gCO2/km (cycle de vie complet)
    const totalGPerKm = fuelDirectGPerKm + totalEnergyChainGPerKm + 
                        fixedEmissions.maintenance + 
                        fixedEmissions.vehicle + 
                        fixedEmissions.disposal + 
                        fixedEmissions.infrastructure;
    const annualCO2Kg = (totalGPerKm * annualKm) / 1000;
    
    co2Emissions[tech] = {
      annualKg: Math.round(annualCO2Kg),
      totalKg: Math.round(annualCO2Kg * duration),
      gPerKm: Math.round(totalGPerKm),
      fuelDirectGPerKm: Math.round(fuelDirectGPerKm),
      energyChainGPerKm: Math.round(totalEnergyChainGPerKm),
      maintenanceGPerKm: Math.round(fixedEmissions.maintenance * 10) / 10,
      vehicleGPerKm: Math.round(fixedEmissions.vehicle * 10) / 10,
      disposalGPerKm: Math.round(fixedEmissions.disposal * 10) / 10,
      infrastructureGPerKm: Math.round(fixedEmissions.infrastructure * 10) / 10,
    };
  });
  
  const kpis = ['BEV', 'ICE', 'PHEV'].map(tech => ({
    tech,
    costPerKm: results[tech][duration - 1].cumulative / totalKm,
    totalCost: results[tech][duration - 1].cumulative,
    co2: co2Emissions[tech],
  }));

  return {
    yearlyData: results,
    barChartData,
    lineChartData,
    kpis,
    co2Emissions,
  };
}

export function getDefaultParams(vehicleClass) {
  const vehicleDefaults = defaultVehicleParams[vehicleClass];
  const tireDefaults = defaultTireCosts[vehicleClass];
  const taxDefaults = defaultTaxCosts[vehicleClass];
  const insuranceDefaults = defaultInsuranceCosts[vehicleClass];
  const maintenanceDefaults = defaultMaintenanceCosts[vehicleClass];
  
  return {
    vehicles: {
      BEV: { ...vehicleDefaults.BEV },
      ICE: { ...vehicleDefaults.ICE },
      PHEV: { ...vehicleDefaults.PHEV },
    },
    energy: {
      fuelType: 'petrol', // 'petrol' or 'diesel'
      fuelPrices: {
        petrol: 1.85,
        diesel: 1.95,
      },
      electricityPrices: {
        home: 0.25,
        work: 0.30,
        public: 0.55,
      },
      rechargeProfile: {
        home: 70,
        work: 20,
        public: 10,
      },
      phevElectricShare: 45,
    },
    costs: {
      BEV: { tax: taxDefaults.BEV, insurance: insuranceDefaults.BEV, maintenance: maintenanceDefaults.BEV, tireCost: tireDefaults.BEV },
      ICE: { tax: taxDefaults.ICE, insurance: insuranceDefaults.ICE, maintenance: maintenanceDefaults.ICE, tireCost: tireDefaults.ICE },
      PHEV: { tax: taxDefaults.PHEV, insurance: insuranceDefaults.PHEV, maintenance: maintenanceDefaults.PHEV, tireCost: tireDefaults.PHEV },
      homeCharger: 3040,
    },
    macro: {
      discountRate: 3,
      energyInflation: 2,
      opexInflation: 1.5,
    },
    climate: {
      // Intensité carbone électricité (gCO2eq/kWh) - ajustable par l'utilisateur
      electricityEmissionFactor: 50, // Mix suisse ~50, EU ~350
    },
  };
}