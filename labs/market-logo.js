/**
 * Market logo helper component
 */

class MarketLogo extends HTMLElement {
  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host, img {
        display: block;
      }
    </style>

    <img src="${this.src}" height="${this.height}">
    `;
    return t;
  }

  get height() {
    return this.dataset.height || "15px";
  }

  constructor() {
    super();
  }

  connectedCallback() {
    let market = mi.pageInfo.getConf("marketInfo.domain");

    if(market) {
      this.src = `/wps/build/images/${market}/logo.svg`;
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
  }
}

/**
 * Register the element
 */

customElements.define("market-logo", MarketLogo);

/**
 * Module Export
 */

export default MarketLogo;
