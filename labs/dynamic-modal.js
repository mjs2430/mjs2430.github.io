/**
 * Dynamic Modal
 * Setup to allow serving through Adobe Target
 */

import { trackInteraction } from "./tracking.js";
import MarketLogo from "./market-logo.js"

class DynamicModal extends HTMLElement {

  /**
   * Shadow DOM template
   */

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 100px 30px 0;
        box-sizing: border-box;
        z-index: 9999;
        --bbc: #222;
        --bc: white;
      }

      :host:before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--screen-color, rgba(0,0,0,0.8));
      }

      .card {
        position: relative;
        max-width: 700px;
        margin: 0 auto;
        padding-right: 50px;
        background-color: var(--paper-color, white);
      }

      .image {
        display: none;
      }
      
      .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 15px;
        cursor: pointer;
        fill: var(--close-color, #222);
      }

      .package {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 15px;
      }

      .package > ::slotted(*) {
        margin: 10px 0 0;
      }

      .package > ::slotted(:first-child) {
        margin-top: 0;
      }

      /**
       * Contains an image
       */

      @media(min-width: 730px) {
        :host(.has-img) .card {
          display: grid;
          grid-template-columns: 350px 1fr;
          grid-gap: 15px;
          min-height: 350px;
        }

        :host(.has-img) .image {
          display: block;
          position: relative;
        }

        :host(.has-img) .image ::slotted(img) {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    </style>

    <div class="screen"></div>
    <div class="card">
      <div class="image">
        <slot name="image"></slot>
      </div>
      <div class="package">
        <slot></slot>
      </div>
      <svg class="close" width="20" height="20" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
    </div>
    `;
    return t;
  }

  /**
   * Constructor required
   */

  constructor() {
    super();
    this.stamped = false
  }

  /**
   * Fires when added to the DOM
   */

  connectedCallback() {
    if(this.g2g) {
      // Attach Shadow DOM
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));

      // Load template into Shadow DOM
      let imgSlot = this.shadowRoot.querySelector("slot[name=image]");
      imgSlot.addEventListener("slotchange", (e) => {
        this.classList.toggle("has-img", imgSlot.assignedNodes().length > 0);
      });

      // Set up close events
      let cb = this.shadowRoot.querySelector(".close");
      cb.addEventListener("click", e => {
        trackInteraction("Close", false);
        this.hidden = true;
      });

      // Check for children with interaction messages
      [...this.children].forEach((c) => {
        let message = c.dataset.interaction;

        if(message) {
          c.addEventListener("click", (e) => {
            trackInteraction(message, true)
          });
        }
      });

      // Flag for next run
      this.hidden = false;
      this.stamped = true;
    }
  }

  /**
   * Checks to see if the modal should show
   */

  get g2g() {
    // Already showing on the page
    if(this.stamped) {
      return false;
    }

    // No if there is another one on the page
    if(document.querySelector("dynamic-modal") != this) {
      return false;
    }
    
    return true;
  }
}

/**
 * Register the element
 */

customElements.define("dynamic-modal", DynamicModal);

/**
 * Module export
 */

export default DynamicModal;
