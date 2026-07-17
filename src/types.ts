export interface EmberWattConfig {
  type: string;
  name?: string;
  
  // Entities
  grid_import_entity?: string;
  grid_export_entity?: string;
  
  home_consumption_entity?: string;
  
  // Lists for multiple sources
  solar_entities?: {
    entity: string;
    name?: string;
    color?: string; // Optional custom color per source
  }[];
  
  battery_entities?: {
    entity_power: string; // Positive = charging, Negative = discharging (or vice versa, needs parsing logic)
    entity_soc: string;   // State of charge (%)
    name?: string;
    color?: string;
    invert_power?: boolean; // In case the power entity uses positive for discharging
  }[];

  // Global Config / Styling
  colors?: {
    grid?: string;
    solar?: string;
    battery?: string;
    home?: string;
  };
}

// Define the global window type to include customCards for HA registry
declare global {
  interface Window {
    customCards: Array<Object>;
  }
}
