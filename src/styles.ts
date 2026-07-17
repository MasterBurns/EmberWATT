import { css } from 'lit';

export const styles = css`
  :host {
    --ember-bg-color: var(--ha-card-background, #1c1c1c);
    --ember-text-color: var(--primary-text-color, #ffffff);
    
    /* Configurable variables with defaults */
    --color-grid: var(--ember-color-grid, #3498db);
    --color-solar: var(--ember-color-solar, #f1c40f);
    --color-battery: var(--ember-color-battery, #2ecc71);
    --color-home: var(--ember-color-home, #9b59b6);
    
    --path-color: rgba(255, 255, 255, 0.1);
    --dot-size: 4px;
    
    display: block;
  }

  ha-card {
    background: var(--ember-bg-color);
    color: var(--ember-text-color);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  .card-content {
    position: relative;
    width: 100%;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto auto auto;
    width: 100%;
    height: auto;
    gap: 32px;
    z-index: 2;
  }

  /* Node Sections */
  .node-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .solar-section {
    grid-column: 1 / span 3;
    grid-row: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .grid-section {
    grid-column: 1;
    grid-row: 2;
  }

  .home-section {
    grid-column: 2;
    grid-row: 2;
  }

  .battery-section {
    grid-column: 1 / span 3;
    grid-row: 3;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    align-items: flex-start;
  }

  /* Battery Groups */
  .battery-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--color-battery);
    border-radius: 20px;
    padding: 24px 32px 16px 32px;
    position: relative;
    background: rgba(255, 255, 255, 0.02);
    box-shadow: inset 0 0 15px rgba(46, 204, 113, 0.05);
  }

  .battery-group-title {
    position: absolute;
    top: -10px;
    background: var(--ember-bg-color);
    padding: 0 12px;
    font-size: 12px;
    color: var(--color-battery);
    font-weight: bold;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  .battery-group-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  /* Individual Node */
  .node {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 90px;
    padding: 12px 16px;
    border-radius: 16px;
    background: var(--ember-bg-color);
    border: 2px solid transparent;
    z-index: 10;
    position: relative;
    box-sizing: border-box;
  }

  .node.home {
    min-width: 110px;
    padding: 16px 20px;
    border-color: var(--color-home);
    box-shadow: 0 0 15px rgba(155, 89, 182, 0.2);
  }

  .node.solar {
    border-color: var(--color-solar);
    box-shadow: 0 0 15px rgba(241, 196, 15, 0.2);
  }

  .node.battery {
    border-color: var(--color-battery);
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.2);
  }

  .node.grid {
    border-color: var(--color-grid);
    box-shadow: 0 0 15px rgba(52, 152, 219, 0.2);
  }

  .icon {
    font-size: 24px;
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  
  .name {
    font-size: 11px;
    opacity: 0.7;
    text-align: center;
    margin-top: 4px;
    word-break: break-word;
    max-width: 100%;
  }

  .soc {
    font-size: 12px;
    color: var(--color-battery);
    margin-top: 2px;
    font-weight: bold;
  }

  .autarky {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    background: rgba(255,255,255,0.1);
    padding: 4px 8px;
    border-radius: 12px;
  }

  /* SVG Animation Layer */
  .flow-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  .flow-path {
    fill: none;
    stroke: var(--path-color);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .flow-circle {
    fill: var(--dot-color, #fff);
    filter: drop-shadow(0 0 4px var(--dot-color, #fff));
  }
`;
