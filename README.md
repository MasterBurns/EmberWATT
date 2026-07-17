# EmberWATT

A premium, highly animated Power Flow Card for Home Assistant.
EmberWATT supports multiple solar arrays and batteries natively, showing them as distinct sources of energy flowing into your home, beautifully rendered with animated SVG paths.

## Installation

### HACS (Recommended)
1. Go to HACS -> Frontend
2. Click the 3 dots in the top right -> Custom Repositories
3. Add the URL to this repository and select category "Lovelace"
4. Install EmberWATT Card

### Manual
1. Download `dist/ember-watt-card.js`
2. Copy to `www/ember-watt-card.js` in your Home Assistant config directory
3. Add to your resources in Lovelace (Type: JavaScript Module)

## Configuration

Add the card to your dashboard using YAML:

```yaml
type: custom:ember-watt-card
home_consumption_entity: sensor.power_consumption
grid_import_entity: sensor.grid_power_import
grid_export_entity: sensor.grid_power_export

# You can add as many solar sources as you want
solar_entities:
  - entity: sensor.solar_power_roof
    name: "Dach"
  - entity: sensor.solar_power_garage
    name: "Garage"
    color: "#f39c12" # Optional custom color

# Multiple batteries are supported
battery_entities:
  - entity_power: sensor.battery_1_power # Positive for charging, negative for discharging
    entity_soc: sensor.battery_1_soc
    name: "Hausakku 1"
  - entity_power: sensor.battery_2_power
    entity_soc: sensor.battery_2_soc
    name: "Hausakku 2"
    invert_power: true # Set this to true if your sensor reports positive values for discharging

colors:
  grid: "#3498db"
  home: "#9b59b6"
  solar: "#f1c40f"
  battery: "#2ecc71"
```

## Features
- **Autarky Calculation**: Real-time calculation of your autarky (Autarkiegrad) based on grid import and total consumption.
- **Dynamic Animations**: The speed of the glowing dots on the paths is directly proportional to the watts flowing.
- **Multiple Sources**: Easily distinguish between different solar installations or batteries visually.
