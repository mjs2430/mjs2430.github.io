/**
 * Custom version of Google's Paper Toast element
 * created 8/4/2020
 */

class McToast extends HTMLElement {

  static get observedAttributes() {
    return ["message"];
  }

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        display: block;
        padding: 15px 30px;
        position: fixed;
        left: 15px;
        bottom: 15px;
        background-color: var(--mc-toast-background-color, #373737);
        color: var(--mc-toast-color, white);
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.13);
        opacity: 0;
        transform: translateY(calc(100% + 15px));
        transition: opacity .3s ease, transform .6s ease-out;
        z-index: 9999;
      }

      :host(.top) {
        bottom: auto;
        top: 15px;
        transform: translateY(calc(-100% - 15px));
      }

      :host(.right) {
        left: auto;
        right: 15px;
      }

      :host(.showing) {
        opacity: 1;
        transform: translateY(0);
      }

      ::slotted(*) {
        margin: 0;
        font: 0.875rem var(--sans) !important;
      }
    </style>

    <slot>${this.message || ""}</slot>
    `;
    return t;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  get message() {
    return this.getAttribute("message");
  }

  set message(val) {
    if(val) {
      this.setAttribute("message", val);
    } else {
      this.removeAttribute("message");
    }
  }

  attributeChangedCallback(name, ov, nv) {
    switch(name) {
      case "message":
        this.shadowRoot.querySelector("slot").textContent = nv;
        break;
      default:
        // Do nothing
    }
  }

  show(duration = 0) {
    this.classList.add("showing");

    if(duration > 0) {
      window.setTimeout(() => {
        this.hide();
      }, duration);
    }
  }

  hide() {
    this.classList.remove("showing");
  }
}

// Register the element
customElements.define("mc-toast", McToast);
