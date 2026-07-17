import { LitElement, html, TemplateResult, PropertyValues, svg } from 'lit';
import { customElement, property, state, queryAll } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { EmberWattConfig } from './types';
import { styles } from './styles';
import './editor';

@customElement('ember-watt-card')
export class EmberWattCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: EmberWattConfig;
  
  @queryAll('.node') private _nodes!: NodeListOf<HTMLElement>;
  
  @state() private _paths: { id: string, d: string, power: number, color: string, reverse: boolean }[] = [];
  @state() private _junctions: { id: string, x: number, y: number, color: string }[] = [];

  private _resizeObserver!: ResizeObserver;

  static styles = styles;

  public static async getConfigElement() {
    return document.createElement('ember-watt-card-editor');
  }

  public static getStubConfig() {
    return {
      type: 'custom:ember-watt-card',
      always_show_paths: true
    };
  }

  public setConfig(config: EmberWattConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this._updatePaths());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    const container = this.shadowRoot?.querySelector('.card-content');
    if (container) {
      this._resizeObserver.observe(container);
    }
    setTimeout(() => this._updatePaths(), 100);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      this._updatePaths();
    }
  }

  private _getCenter(element: HTMLElement, containerRect: DOMRect) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2
    };
  }

  private _updatePaths() {
    const container = this.shadowRoot?.querySelector('.card-content') as HTMLElement;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const homeNode = this.shadowRoot?.querySelector('.node.home') as HTMLElement;
    const gridNode = this.shadowRoot?.querySelector('.node.grid') as HTMLElement;
    
    if (!homeNode || !gridNode) return;

    const homeCenter = this._getCenter(homeNode, containerRect);
    const gridCenter = this._getCenter(gridNode, containerRect);
    
    const newPaths: typeof this._paths = [];
    const newJunctions: typeof this._junctions = [];
    const alwaysShow = this._config.always_show_paths !== false;

    // --- Grid Path ---
    const gridImport = this._getState(this._config.grid_import_entity);
    const gridExport = this._getState(this._config.grid_export_entity);
    let gridPower = gridImport - gridExport;
    let gridColor = this._config.colors?.grid || '#3498db';
    
    if (Math.abs(gridPower) > 0 || alwaysShow) {
      newPaths.push({
        id: 'grid-home',
        d: `M ${gridCenter.x} ${gridCenter.y} L ${homeCenter.x} ${homeCenter.y}`,
        power: Math.abs(gridPower),
        color: gridColor,
        reverse: gridPower < 0
      });
    }

    // --- Solar Orthogonal Bus Routing ---
    if (this._config.solar_entities && this._config.solar_entities.length > 0) {
      const solarBusY = homeCenter.y - 70;
      const solarColor = this._config.colors?.solar || '#f1c40f';
      let anySolarActive = false;
      let totalSolarPower = 0;

      this._config.solar_entities.forEach((solar, index) => {
        const node = this.shadowRoot?.querySelector(`#solar-${index}`) as HTMLElement;
        if (node) {
          const center = this._getCenter(node, containerRect);
          const power = this._getState(solar.entity);
          totalSolarPower += power;
          
          if (power > 0 || alwaysShow) {
            anySolarActive = true;
            // Orthogonal path: Node -> down to Bus -> across to Center -> down to Home
            newPaths.push({
              id: `solar-${index}-path`,
              d: `M ${center.x} ${center.y} L ${center.x} ${solarBusY} L ${homeCenter.x} ${solarBusY} L ${homeCenter.x} ${homeCenter.y}`,
              power: power,
              color: solar.color || solarColor,
              reverse: false
            });
          }
        }
      });
      
      if (anySolarActive || alwaysShow) {
        newJunctions.push({ id: 'solar-junc', x: homeCenter.x, y: solarBusY, color: solarColor });
      }
    }

    // --- Battery Orthogonal Bus Routing ---
    if (this._config.battery_entities && this._config.battery_entities.length > 0) {
      const batteryBusY = homeCenter.y + 70;
      const batteryColor = this._config.colors?.battery || '#2ecc71';
      let anyBatteryActive = false;

      this._config.battery_entities.forEach((battery, index) => {
        const node = this.shadowRoot?.querySelector(`#battery-${index}`) as HTMLElement;
        if (node) {
          const center = this._getCenter(node, containerRect);
          let power = this._getState(battery.entity_power);
          if (battery.invert_power) power = -power; // Invert logic configured by user
          
          if (Math.abs(power) > 0 || alwaysShow) {
            anyBatteryActive = true;
            // Orthogonal path: Battery -> up to Bus -> across to Center -> up to Home
            // Note: because the dot flows from battery to home on discharge,
            // the drawn path starts at battery. 
            // If charging (Home to Battery), reverse is true, and dot travels backwards.
            newPaths.push({
              id: `battery-${index}-path`,
              d: `M ${center.x} ${center.y} L ${center.x} ${batteryBusY} L ${homeCenter.x} ${batteryBusY} L ${homeCenter.x} ${homeCenter.y}`,
              power: Math.abs(power),
              color: battery.color || batteryColor,
              reverse: power < 0 // power < 0 means discharging (Battery -> Home). Oh wait.
              // If power < 0 (discharging), dot should flow FROM battery TO home.
              // The path starts at battery (M center.x center.y) and ends at home.
              // So if discharging, reverse should be FALSE!
              // If power > 0 (charging), dot should flow FROM home TO battery.
              // So if charging, reverse should be TRUE!
              // Let's fix that logic:
              // power > 0 (Charging): dot travels 1 -> 0 (Home to Battery). So reverse = true.
              // power < 0 (Discharging): dot travels 0 -> 1 (Battery to Home). So reverse = false.
            });
            // Re-apply the fixed logic:
            newPaths[newPaths.length - 1].reverse = power > 0;
          }
        }
      });

      if (anyBatteryActive || alwaysShow) {
        newJunctions.push({ id: 'battery-junc', x: homeCenter.x, y: batteryBusY, color: batteryColor });
      }
    }

    this._paths = newPaths;
    this._junctions = newJunctions;
  }

  private _getState(entityId?: string): number {
    if (!entityId || !this.hass || !this.hass.states[entityId]) return 0;
    const state = parseFloat(this.hass.states[entityId].state);
    return isNaN(state) ? 0 : state;
  }

  private _formatPower(power: number): string {
    return Math.round(power).toString();
  }

  private _renderSVG() {
    const alwaysShow = this._config.always_show_paths !== false;
    
    return svg`
      <svg class="flow-container">
        ${this._paths.map(path => {
          const isFlowing = path.power > 0;
          const duration = isFlowing ? Math.max(0.4, Math.min(4, 3000 / Math.max(1, path.power))) : 0;
          const opacity = isFlowing ? 1 : (alwaysShow ? 0.3 : 0);
          
          return svg`
            <path id="${path.id}" class="flow-path" d="${path.d}" style="opacity: ${opacity};" />
            ${isFlowing ? svg`
              <circle class="flow-circle" r="4" style="--dot-color: ${path.color}">
                <animateMotion 
                  dur="${duration}s" 
                  repeatCount="indefinite"
                  keyPoints="${path.reverse ? '1;0' : '0;1'}"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href="#${path.id}" />
                </animateMotion>
              </circle>
            ` : ''}
          `;
        })}
        ${this._junctions.map(j => svg`
          <circle cx="${j.x}" cy="${j.y}" r="3" fill="${j.color}" style="opacity: 0.8" />
        `)}
      </svg>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html`<ha-card>Loading...</ha-card>`;
    }

    const gridImport = this._getState(this._config.grid_import_entity);
    const gridExport = this._getState(this._config.grid_export_entity);
    const gridPower = gridImport - gridExport;

    let totalSolarPower = 0;
    this._config.solar_entities?.forEach(solar => {
      totalSolarPower += this._getState(solar.entity);
    });

    let totalBatteryPower = 0;
    this._config.battery_entities?.forEach(battery => {
      let power = this._getState(battery.entity_power);
      if (battery.invert_power) power = -power;
      totalBatteryPower += power; // Positive is charging, Negative is discharging
    });

    // Auto calculate home power if entity is not provided
    let homePower = 0;
    if (this._config.home_consumption_entity) {
      homePower = this._getState(this._config.home_consumption_entity);
    } else {
      // Home = Solar + GridImport - GridExport - BatteryCharging + BatteryDischarging
      homePower = totalSolarPower + gridPower - totalBatteryPower;
      if (homePower < 0) homePower = 0; // Precaution
    }
    
    // Autarky calculation
    let autarky = 100;
    if (homePower > 0) {
      autarky = Math.max(0, ((homePower - gridImport) / homePower) * 100);
      if (autarky > 100) autarky = 100;
    }

    return html`
      <ha-card>
        <div class="autarky">Autarkie: ${autarky.toFixed(0)}%</div>
        <div class="card-content">
          ${this._renderSVG()}
          
          <div class="grid-container">
            <!-- Grid (Left) -->
            <div class="node-section grid-section">
              <div class="node grid" style="--color-grid: ${this._config.colors?.grid || '#3498db'}">
                <ha-icon class="icon" icon="mdi:transmission-tower"></ha-icon>
                <div class="value">${this._formatPower(Math.abs(gridPower))} W</div>
                <div class="name">${this._config.name_grid || 'Netz'}</div>
              </div>
            </div>

            <!-- Solar (Top) -->
            <div class="node-section solar-section">
              ${this._config.solar_entities?.map((solar, index) => html`
                <div id="solar-${index}" class="node solar" style="--color-solar: ${solar.color || this._config.colors?.solar || '#f1c40f'}">
                  <ha-icon class="icon" icon="mdi:solar-panel"></ha-icon>
                  <div class="value">${this._formatPower(this._getState(solar.entity))} W</div>
                  <div class="name">${solar.name || 'Solar'}</div>
                </div>
              `)}
            </div>

            <!-- Home (Center) -->
            <div class="node-section home-section">
              <div class="node home" style="--color-home: ${this._config.colors?.home || '#9b59b6'}">
                <ha-icon class="icon" icon="mdi:home"></ha-icon>
                <div class="value">${this._formatPower(Math.abs(homePower))} W</div>
                <div class="name">${this._config.name_home || 'Verbrauch'}</div>
              </div>
            </div>

            <!-- Battery (Bottom) -->
            <div class="node-section battery-section">
              ${this._config.battery_entities?.map((battery, index) => {
                let power = this._getState(battery.entity_power);
                if (battery.invert_power) power = -power;
                
                const isCharging = power > 0;
                const isDischarging = power < 0;
                let icon = 'mdi:battery';
                if (isCharging) icon = 'mdi:battery-charging';
                if (isDischarging) icon = 'mdi:battery-minus';

                // Ensure value is always positive in UI
                const displayPower = Math.abs(power);

                return html`
                <div id="battery-${index}" class="node battery" style="--color-battery: ${battery.color || this._config.colors?.battery || '#2ecc71'}">
                  <ha-icon class="icon" icon="${icon}"></ha-icon>
                  <div class="value">
                    ${isCharging ? html`<ha-icon icon="mdi:arrow-down" style="width: 14px; height: 14px; margin-right: 2px; color: var(--color-battery)"></ha-icon>` : ''}
                    ${isDischarging ? html`<ha-icon icon="mdi:arrow-up" style="width: 14px; height: 14px; margin-right: 2px; color: var(--color-solar)"></ha-icon>` : ''}
                    ${this._formatPower(displayPower)} W
                  </div>
                  <div class="soc">${Math.round(this._getState(battery.entity_soc))}%</div>
                  <div class="name">${battery.name || 'Batterie'}</div>
                </div>
              `})}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ember-watt-card",
  name: "EmberWATT Card",
  preview: true,
  description: "Advanced animated power flow card."
});
