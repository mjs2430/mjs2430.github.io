/*
 * Fresno Bee education lab panel
 */

class LabPanel extends HTMLElement {
  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: unset !important;
    }

    .package {
      max-width: 728px;
      padding: 45px;
    }

    .package ::slotted(*) {
      position: relative;
      max-width: 100% !important;
    }

    .package ::slotted(p) {
      font: 17px/1.8em "McClatchy Sans", sans-serif !important;
    }

    /* Fill variant */

    :host(.fill) {
      position: relative;
      min-height: 45vw;
      justify-content: center;
      background-color: black;
      color: white;
      --lc: white;
    }

    :host(.fill) ::slotted(img) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 20%;
      opacity: .2;
      max-width: unset !important;
    }
    </style>

    <div class="package">
      <slot></slot>
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

customElements.define("lab-panel", LabPanel);
