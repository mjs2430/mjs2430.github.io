/**
 * Zone-Swapper base element
 * created 6/25/2020
 */

class ZoneSwap extends HTMLElement {

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        display: block;
      }
    </style>

    <slot></slot>
    `;
    return t;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if(!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
      this.updatePosition();
    }
  }

  get zone() {
    return this.getAttribute("zone");
  }

  set zone(z) {
    if(z) {
      this.setAttribute("zone", z);
    } else {
      this.removeAtribute("zone");
    }
  }

  zoneElement(zone = this.zone) {
    let ele = undefined;
    let comboZones = document.querySelectorAll(".story-body .zone.combo");

    switch(parseInt(this.zone)) {
      case 1:
        ele = document.querySelector("#zone-el-2");
        break;
      case 2:
        ele = document.querySelector("#ConnatixVideoAd");
        break;
      case 3:
        ele = comboZones[0];
        break;
      case 4: 
        ele = comboZones[1];
        break;
      case 5:
        ele = document.querySelector("#zone-el-105");
        break;
      default:
        // Do nothing
    }

    return ele;
  }

  updatePosition() {
    let ele = this.zoneElement();

    if(ele) {
      this.hidden = false;
      ele.insertAdjacentElement("afterend", this);
      ele.hidden = true;
    } else if(this.zone == 2) {
      // Zone 2 is injected so we need to ping until it's there.
      window.setTimeout(this.updatePosition.bind(this), 1000);
    } else {
      console.warn(`${this.localName} is unable to replace zone ${this.zone}`);
    }
  }
}

// Register the custom element
customElements.define("zone-swap", ZoneSwap);

// Export for modules
export default ZoneSwap;
