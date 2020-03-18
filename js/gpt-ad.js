/**
 * GPT ad setup
 */

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

/**
 * Load GPT services
 */

(function() {
  let script = document.createElement("script");
  script.src = "https://www.googletagservices.com/tag/js/gpt.js";
  document.head.appendChild(script);

  googletag.cmd.push(() => {
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().enableLazyLoad({
      fetchMarginPercent: 200,
      renderMarginPercent: 100,
      mobileScaling: 2.0
    });

    googletag.enableServices();
  });
})()



/**
 * Custom element class
 */

class GPT extends HTMLElement {

  /**
   * Responsive ad sizes
   */

  static get leaderboard() {
    return googletag.sizeMapping()
      .addSize([1024, 600], [[970, 250],[970,90],[728, 90]])
      .addSize([750, 400], [728, 90])
      .addSize([0, 0], [320, 50]).build()
  }

  static get banner() {
    return googletag.sizeMapping()
      .addSize([750, 400], [728, 90])
      .addSize([0, 0], [320, 50]).build()
  }

  static get flex() {
    return googletag.sizeMapping()
      .addSize([768, 600], [300, 600])
      .addSize([0,0], [300, 250]).build()
  }
  
  /**
   * Instance properties
   */

  get size() {
    let size = [300,250];

    try {
      let parsed = JSON.parse(this.dataset.size);
      if(Array.isArray(parsed)) {
        size = parsed;
      }
    } catch(_) {
      // Do nothing
    }
  
    return size;
  }

  get path() {
    return this.dataset.path || "/7675/KCM.site_kansascity/News/Local";
  }

  get sizeMap() {
    return this.dataset.sizeMap || false;
  }

  get pl() {
    return this.dataset.pl || false;
  }

  get atf() {
    return this.dataset.atf || false;
  }

  get uid() {
    this.id = this.id || this.guid();
    return this.id;
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
    googletag.cmd.push(() => {
      let slot = googletag.defineSlot(this.path, this.size, this.uid)

      if(this.sizeMap) {
        slot.defineSizeMapping(this.constructor[this.sizeMap]);
      }

      if(this.pl) {
        slot.setTargeting("pl", this.pl);
      }

      if(this.atf) {
        slot.setTargeting("atf", this.atf);
      }

      slot.addService(googletag.pubads());
      googletag.display(this.uid);
    });
  }

  /**
   * Generate a unique id
   */

  guid() {
    let array = new Uint8Array(4);
    window.crypto.getRandomValues(array);
    return `div-gpt-ad-${array.join("")}-0`;
  }
}

customElements.define("gpt-ad", GPT);
