/**
 * Connatix Top Stories ad
 */

class ConnatixTopStories extends HTMLElement {

  /**
   * Getters
   */

  get token() {
    return this.getAttribute("token");
  }

  /**
   * Template
   */

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <div id="ConnatixVideoAd" style="opacity: 1 !important"></div>
    `;
    return t;
  }

  /**
   * Init
   */

  constructor() {
    super();
  }

  /**
   * Fires when added to the DOM
   */

  connectedCallback() {
    this.constructor.observer.observe(this);
  }

  /**
   * Stamps the template into the element
   */

  stamp() {
    let script = document.createElement("script");
    script.src = "https://cdn.connatix.com/min/connatix.renderer.infeed.min.js";
    script.dataset.connatixToken = this.token;

    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector("#ConnatixVideoAd").appendChild(script);
    this.style.cssText = "display: block;"
  }

}

/**
 * Set up the IntersectionObserver
 */

ConnatixTopStories.observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.stamp();
      ConnatixTopStories.observer.unobserve(e.target);
    }
  });
}, {
  rootMargin: "100px 0px"
});

customElements.define("connatix-top-stories", ConnatixTopStories);
