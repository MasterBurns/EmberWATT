import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { EmberWattConfig } from './types';

@customElement('ember-watt-card-editor')
export class EmberWattCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: EmberWattConfig;

  public setConfig(config: EmberWattConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (!target.configValue) return;

    let newValue = target.value;
    if (target.type === 'checkbox') {
      newValue = target.checked;
    }

    if (this._config[target.configValue as keyof EmberWattConfig] === newValue) {
      return;
    }

    if (newValue === '') {
      const tmpConfig = { ...this._config };
      delete tmpConfig[target.configValue as keyof EmberWattConfig];
      this._config = tmpConfig;
    } else {
      this._config = {
        ...this._config,
        [target.configValue]: newValue,
      };
    }
    
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _updateArrayValue(arrayName: 'solar_entities' | 'battery_entities', index: number, field: string, value: any) {
    const newArray = [...(this._config[arrayName] || [])];
    newArray[index] = { ...newArray[index], [field]: value };
    this._config = { ...this._config, [arrayName]: newArray };
    
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _addArrayItem(arrayName: 'solar_entities' | 'battery_entities') {
    const newArray = [...(this._config[arrayName] || [])];
    if (arrayName === 'solar_entities') {
      newArray.push({ entity: '', name: 'Neue Solarquelle' });
    } else {
      newArray.push({ entity_power: '', entity_soc: '', name: 'Neue Batterie', invert_power: false });
    }
    this._config = { ...this._config, [arrayName]: newArray };
    
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _removeArrayItem(arrayName: 'solar_entities' | 'battery_entities', index: number) {
    const newArray = [...(this._config[arrayName] || [])];
    newArray.splice(index, 1);
    this._config = { ...this._config, [arrayName]: newArray };
    
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <h3>Allgemein</h3>
        <div class="row">
          <label class="text-input-wrapper">
            Name (Verbrauch):
            <input type="text"
              .value=${this._config.name_home || ''}
              .configValue=${'name_home'}
              @input=${this._valueChanged}
            />
          </label>
          <label class="text-input-wrapper">
            Name (Netz):
            <input type="text"
              .value=${this._config.name_grid || ''}
              .configValue=${'name_grid'}
              @input=${this._valueChanged}
            />
          </label>
        </div>
        <div class="row checkbox-row">
          <label>
            <input 
              type="checkbox" 
              .checked=${this._config.always_show_paths !== false}
              .configValue=${'always_show_paths'}
              @change=${this._valueChanged}
            />
            Pfade immer sichtbar (animieren nur bei Leistungsfluss)
          </label>
        </div>

        <h3>Basis Entitäten</h3>
        <p class="description">Hinweis: Wenn "Hausverbrauch" leer bleibt, wird er automatisch berechnet.</p>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.home_consumption_entity || ''}
          .configValue=${'home_consumption_entity'}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Hausverbrauch (W) - Optional"
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.grid_import_entity || ''}
          .configValue=${'grid_import_entity'}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Netzbezug (W)"
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.grid_export_entity || ''}
          .configValue=${'grid_export_entity'}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Netzeinspeisung (W)"
        ></ha-entity-picker>

        <h3>Solaranlagen</h3>
        ${(this._config.solar_entities || []).map((solar, index) => html`
          <div class="array-item">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${solar.entity}
              @value-changed=${(ev: any) => this._updateArrayValue('solar_entities', index, 'entity', ev.target.value)}
              allow-custom-entity
              label="Solar Entität (W)"
            ></ha-entity-picker>
            <label class="text-input-wrapper">
              Anzeigename:
              <input type="text"
                .value=${solar.name || ''}
                @input=${(ev: any) => this._updateArrayValue('solar_entities', index, 'name', ev.target.value)}
              />
            </label>
            <button class="icon-button" @click=${() => this._removeArrayItem('solar_entities', index)}>
              Löschen
            </button>
          </div>
        `)}
        <button class="primary-button" @click=${() => this._addArrayItem('solar_entities')}>+ Solarquelle hinzufügen</button>

        <h3>Batterien</h3>
        ${(this._config.battery_entities || []).map((battery, index) => html`
          <div class="array-item">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${battery.entity_power}
              @value-changed=${(ev: any) => this._updateArrayValue('battery_entities', index, 'entity_power', ev.target.value)}
              allow-custom-entity
              label="Batterieleistung (W)"
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${battery.entity_soc}
              @value-changed=${(ev: any) => this._updateArrayValue('battery_entities', index, 'entity_soc', ev.target.value)}
              allow-custom-entity
              label="Ladezustand (%)"
            ></ha-entity-picker>
            <label class="text-input-wrapper">
              Anzeigename:
              <input type="text"
                .value=${battery.name || ''}
                @input=${(ev: any) => this._updateArrayValue('battery_entities', index, 'name', ev.target.value)}
              />
            </label>
            <label class="text-input-wrapper">
              Gruppenname (Optional):
              <input type="text"
                .value=${battery.group || ''}
                @input=${(ev: any) => this._updateArrayValue('battery_entities', index, 'group', ev.target.value)}
              />
            </label>
            <label class="checkbox-row" style="margin-top: 8px;">
              <input 
                type="checkbox" 
                .checked=${battery.invert_power || false}
                @change=${(ev: any) => this._updateArrayValue('battery_entities', index, 'invert_power', ev.target.checked)}
              />
              Logik umkehren (Positiver Wert = Laden)
            </label>
            <button class="icon-button" @click=${() => this._removeArrayItem('battery_entities', index)}>
              Löschen
            </button>
          </div>
        `)}
        <button class="primary-button" @click=${() => this._addArrayItem('battery_entities')}>+ Batterie hinzufügen</button>
      </div>
      
      <div style="margin-top: 24px; font-size: 12px; color: var(--secondary-text-color); text-align: center;">
        EmberWATT Card - v1.1.0
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-bottom: 24px;
      }
      h3 {
        margin: 16px 0 8px 0;
        font-size: 1.1em;
        font-weight: 500;
      }
      .description {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin-top: -8px;
        margin-bottom: 8px;
      }
      .row {
        display: flex;
        gap: 12px;
      }
      .row > * {
        flex: 1;
      }
      .checkbox-row {
        display: flex;
        align-items: center;
        font-size: 0.9em;
        cursor: pointer;
      }
      .checkbox-row input {
        margin-right: 8px;
      }
      .text-input-wrapper {
        display: flex;
        flex-direction: column;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .text-input-wrapper input {
        margin-top: 4px;
        padding: 8px;
        border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
        border-radius: 4px;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 14px;
      }
      .array-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
        border-radius: 8px;
        margin-bottom: 8px;
      }
      .primary-button {
        align-self: flex-start;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
        font-weight: 500;
      }
      .icon-button {
        align-self: flex-end;
        background: transparent;
        color: var(--error-color, red);
        border: 1px solid var(--error-color, red);
        border-radius: 4px;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 0.85em;
        margin-top: 8px;
      }
    `;
  }
}
