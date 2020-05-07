/**
 * Hammer Head Component
 * Adjusts font sizes of each child to fill a single line
 */

class HammerHead extends HTMLElement {

  /**
   * Initial setup extending HTMLElement
   */

  constructor() {
    super();
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.observers = {}
  }

  /**
   * Setup when added to DOM
   */

  connectedCallback() {
    this.style.display = "block";
    this.resize();
    this.removeAttribute("hidden");

    // Run it again if fonts aren't loaded yet
    document.fonts.ready.then(() => {
      this.resize();
    })

    // Observe children being injected
    if("MutationObserver" in window) {
      this.observers.mutation = new MutationObserver(this.resize.bind(this));
      this.observers.mutation.observe(this, { childList: true });
    }

    // Observe resize of this element
    if("ResizeObserver" in window) {
      this.observers.resize = new ResizeObserver(this.resize.bind(this));
      this.observers.resize.observe(this)
    }
  }

  /**
   * Cleanup if removed from DOM
   */

  disconnectedCallback() {
    if("MutationObserver" in window) {
      this.observers.mutation.disconnect();
    }

    if("ResizeObserver" in window) {
      this.observers.resize.disconnect();
    }
  }

  /**
   * Helpers
   */

  resize() {
    for(let i = 0, len = this.children.length; i < len; i++) {
      let c = this.children[i];
      c.style.fontSize = '10px';
      c.style.margin = "0px";
      c.style.textTransform = "none";
      c.style.fontSize = `calc(10px * ${this.calculateRatio(c)} - 1px)`;
    }
  }

  calculateRatio(ele) {
    let styles = window.getComputedStyle(ele);
    this.context.font = styles.font;
    let metrics = this.context.measureText(ele.textContent);
    return parseInt(styles.width) / metrics.width;
  }
}

customElements.define('hammer-head', HammerHead);
