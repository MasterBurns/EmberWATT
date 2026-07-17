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
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue as keyof EmberWattConfig];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.value,
        };
      }
    }
    
    // Fire config-changed event
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _updateArrayValue(arrayName: 'solar_entities' | 'battery_entities', index: number, field: string, value: string | boolean) {
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
      newArray.push({ entity_power: '', entity_soc: '', name: 'Neue Batterie' });
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
        <h3>Basis Entitäten</h3>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.home_consumption_entity}
          .configValue=${'home_consumption_entity'}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Hausverbrauch (W)"
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.grid_import_entity}
          .configValue=${'grid_import_entity'}
          @value-changed=${this._valueChanged}
          allow-custom-entity
          label="Netzbezug (W)"
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.grid_export_entity}
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
            <ha-textfield
              label="Name"
              .value=${solar.name || ''}
              @input=${(ev: any) => this._updateArrayValue('solar_entities', index, 'name', ev.target.value)}
            ></ha-textfield>
            <mwc-icon-button @click=${() => this._removeArrayItem('solar_entities', index)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </mwc-icon-button>
          </div>
        `)}
        <mwc-button @click=${() => this._addArrayItem('solar_entities')}>Solarquelle hinzufügen</mwc-button>

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
            <ha-textfield
              label="Name"
              .value=${battery.name || ''}
              @input=${(ev: any) => this._updateArrayValue('battery_entities', index, 'name', ev.target.value)}
            ></ha-textfield>
            <mwc-icon-button @click=${() => this._removeArrayItem('battery_entities', index)}>
              <ha-icon icon="mdi:delete"></ha-icon>
            </mwc-icon-button>
          </div>
        `)}
        <mwc-button @click=${() => this._addArrayItem('battery_entities')}>Batterie hinzufügen</mwc-button>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      h3 {
        margin: 16px 0 8px 0;
        font-size: 1.1em;
        font-weight: 500;
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
      mwc-button {
        align-self: flex-start;
      }
      mwc-icon-button {
        align-self: flex-end;
      }
    `;
  }
}
