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

  private _resizeObserver!: ResizeObserver;

  static styles = styles;

  public static async getConfigElement() {
    return document.createElement('ember-watt-card-editor');
  }

  public static getStubConfig() {
    return {
      type: 'custom:ember-watt-card',
      home_consumption_entity: '',
      grid_import_entity: '',
      grid_export_entity: '',
      solar_entities: [],
      battery_entities: []
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
    // Initial path update after render
    setTimeout(() => this._updatePaths(), 100);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass')) {
      this._updatePaths(); // Re-calculate paths and speeds if power changes
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

    // Grid to Home Path
    const gridImport = this._getState(this._config.grid_import_entity);
    const gridExport = this._getState(this._config.grid_export_entity);
    
    let gridPower = gridImport - gridExport; // Positive = importing, Negative = exporting
    let gridColor = this._config.colors?.grid || '#3498db';
    
    if (Math.abs(gridPower) > 0) {
      newPaths.push({
        id: 'grid-home',
        d: `M ${gridCenter.x} ${gridCenter.y} L ${homeCenter.x} ${homeCenter.y}`,
        power: Math.abs(gridPower),
        color: gridColor,
        reverse: gridPower < 0
      });
    }

    // Solar Paths
    if (this._config.solar_entities) {
      this._config.solar_entities.forEach((solar, index) => {
        const node = this.shadowRoot?.querySelector(`#solar-${index}`) as HTMLElement;
        if (node) {
          const center = this._getCenter(node, containerRect);
          const power = this._getState(solar.entity);
          if (power > 0) {
            newPaths.push({
              id: `solar-${index}-home`,
              d: `M ${center.x} ${center.y} L ${homeCenter.x} ${homeCenter.y}`,
              power: power,
              color: solar.color || this._config.colors?.solar || '#f1c40f',
              reverse: false
            });
          }
        }
      });
    }

    // Battery Paths
    if (this._config.battery_entities) {
      this._config.battery_entities.forEach((battery, index) => {
        const node = this.shadowRoot?.querySelector(`#battery-${index}`) as HTMLElement;
        if (node) {
          const center = this._getCenter(node, containerRect);
          let power = this._getState(battery.entity_power);
          if (battery.invert_power) power = -power;
          
          if (Math.abs(power) > 0) {
             // Power > 0: Charging (Home to Battery)
             // Power < 0: Discharging (Battery to Home)
            newPaths.push({
              id: `battery-${index}-home`,
              d: `M ${center.x} ${center.y} L ${homeCenter.x} ${homeCenter.y}`,
              power: Math.abs(power),
              color: battery.color || this._config.colors?.battery || '#2ecc71',
              reverse: power < 0 // If discharging, dot flows from battery to home (reverse the drawn path)
            });
          }
        }
      });
    }

    this._paths = newPaths;
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
    return svg`
      <svg class="flow-container">
        ${this._paths.map(path => {
          // Duration based on power: more power = faster
          // e.g. 1000W -> 1s, 5000W -> 0.2s. clamp between 0.2 and 3s.
          const duration = Math.max(0.2, Math.min(3, 2000 / Math.max(1, path.power)));
          
          return svg`
            <path id="${path.id}" class="flow-path" d="${path.d}" />
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
          `;
        })}
      </svg>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html`<ha-card>Loading...</ha-card>`;
    }

    const homePower = this._getState(this._config.home_consumption_entity);
    const gridImport = this._getState(this._config.grid_import_entity);
    
    // Autarky calculation
    let autarky = 100;
    if (homePower > 0) {
      autarky = Math.max(0, ((homePower - gridImport) / homePower) * 100);
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
                <div class="value">${this._formatPower(Math.abs(gridImport - this._getState(this._config.grid_export_entity)))} W</div>
                <div class="name">Netz</div>
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
                <div class="value">${this._formatPower(homePower)} W</div>
                <div class="name">Verbrauch</div>
              </div>
            </div>

            <!-- Battery (Bottom) -->
            <div class="node-section battery-section">
              ${this._config.battery_entities?.map((battery, index) => {
                let power = this._getState(battery.entity_power);
                if (battery.invert_power) power = -power;
                return html`
                <div id="battery-${index}" class="node battery" style="--color-battery: ${battery.color || this._config.colors?.battery || '#2ecc71'}">
                  <ha-icon class="icon" icon="mdi:battery"></ha-icon>
                  <div class="value">${this._formatPower(Math.abs(power))} W</div>
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
