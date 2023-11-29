/*
 * Fundraising chart for Fresno EDU lab landing page
 */

class FundraisingChart extends HTMLElement {
  get collected() {
    return parseInt(this.getAttribute("collected"));
  }

  set collected(amount) {
    this.setAttribute("collected", amount);
  }

  get goal() {
    console.log(this.shadowRoot.querySelectorAll("chart-phase"));
    return parseInt(this.getAttribute("goal"));
  }

  set goal(amount) {
    return this.setAttribute("goal", amount);
  }

  get percentComplete() {
    return Math.floor((this.collected / this.goal) * 100);
  }

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
    :host {
      display: block;
    }

    .phases {
      display: flex;
      justify-content: space-between;
    }

    .titles {
      font: 11px/1em "McClatchy Sans", sans-serif;
    }

    .amounts {
      font: 600 21px/1em "McClatchy Sans", sans-serif;
    }

    .bar {
      position: relative;
      background-color: #ddd;
      border: 1px solid #757575;
      border-radius: 4px;
      height: 30px;
    }

    .fill {
      background-color: #31409F;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
    </style>

    <div class="phases">
      <chart-phase value="${this.collected}" class="received">Received to date</chart-phase>
      <slot></slot>
    </div>

    <div class="bar">
      <div class="fill" style="width: ${this.percentComplete}%"></div>
    </div>
    `;
    return t;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("fundraising-chart", FundraisingChart);


/**
 * Chart Phase helper component
 */

class ChartPhase extends HTMLElement {
  get value() {
    return parseInt(this.getAttribute("value"));
  }

  set value(amount) {
    return this.setAttribute("value", amount)
  }

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      :host > * {
        margin: 0 0 5px;
      }

      :host(.received) {
        align-items: flex-start;
      }

      :host(:last-child) {
        align-items: flex-end;
      }

      :host(.received) .bar,
      :host(:last-child) .bar {
        opacity: 0;
      }

      .label {
        font: 11px/1em "McClatchy Sans", sans-serif;
        text-transform: uppercase;
      }

      .value {
        font: 600 21px/1em "McClatchy Sans", sans-serif;
      }
    </style>

    <slot class="label"></slot>
    <span class="value">${this.formatCurrency(this.value)}</span>
    <span class="bar">|</span>
    `;
    return t;
  }

  formatCurrency(amount) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    });

    return formatter.format(amount);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define("chart-phase", ChartPhase);
