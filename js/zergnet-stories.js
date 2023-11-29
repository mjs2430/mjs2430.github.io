/**
 * Zergnet Story Ad
 */

class ZergnetStories extends HTMLElement {

  /**
   * Getters
   */

  get zergId() {
    return this.dataset.id || "53329";
  }

  /**
   * Template
   */

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <section class="zergnet" id="zergnet-widget-${this.zergId}"></section>
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
    script.src = `https://www.zergnet.com/zerg.js?id=${this.zergId}`;

    this.appendChild(this.template.content.cloneNode(true));
    this.querySelector(".zergnet").appendChild(script);
  }
}

ZergnetStories.observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.stamp();
      ZergnetStories.observer.unobserve(e.target);
    }
  });
},{
  rootMargin: "50% 0px"
});

customElements.define("zergnet-stories", ZergnetStories);
