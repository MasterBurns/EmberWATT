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
    min-height: 500px;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr auto 1fr;
    width: 100%;
    height: 100%;
    gap: 30px;
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
  }

  /* Individual Node */
  .node {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .node.home {
    width: 100px;
    height: 100px;
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
    text-align: center;
  }
  
  .name {
    font-size: 10px;
    opacity: 0.7;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
  }

  .soc {
    font-size: 11px;
    color: var(--color-battery);
    margin-top: 2px;
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
  }

  .flow-circle {
    fill: var(--dot-color, #fff);
    filter: drop-shadow(0 0 4px var(--dot-color, #fff));
  }
`;
