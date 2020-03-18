/**
 * GPT ads
 */

var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

class Ads {

  /**
   * Init
   */

  constructor() {
    this.slots = [];

    googletag.cmd.push(() => {
      this.sizeMaps = {
        "leaderboard": googletag.sizeMapping()
          .addSize([1024, 600], [[970, 250],[728, 90]])
          .addSize([750, 400], [728, 90])
          .addSize([0, 0], [320, 50]).build(),
        "banner": googletag.sizeMapping()
          .addSize([750, 400], [728, 90])
          .addSize([0, 0], [320, 50]).build(),
        "flex": googletag.sizeMapping()
          .addSize([768, 600], [300, 600])
          .addSize([0,0], [300, 250]).build()
      }

      googletag.pubads().collapseEmptyDivs();
      googletag.pubads().enableLazyLoad({
        fetchMarginPercent: 200,
        renderMarginPercent: 100,
        mobileScaling: 2.0
      });

      googletag.enableServices();
    });

    this.redraw();
  }

  /**
   * Redraws GPT ads
   */

  redraw() {
    let gptAds = document.querySelectorAll(".ad-widget[data-type=gpt]");
    gptAds.forEach(e => {
      let c = this.setup(e);

      googletag.cmd.push(() => {
        let slot = googletag.defineSlot(c.path, c.size, c.id);

        if(c.sizeMap && this.sizeMaps[c.sizeMap]) {
          slot.defineSizeMapping(this.sizeMaps[c.sizeMap])
        }

        slot.addService(googletag.pubads());
        googletag.display(c.id)
        this.slots.push(slot);
      });
    });
  }

  /**
   * Returns a setup config for a single GPT ad
   */

  setup(e) {
    // ID
    let id = e.id;
    if(!id) {
      id = e.id = this.guid();
    }

    // Size
    let size = [300,250]
    try {
      let parsed = JSON.parse(e.dataset.size);
      if(Array.isArray(parsed)) {
        size = parsed;
      }
    } catch(e) {
      // Do nothing
    }

    // Path
    let path = e.dataset.path || "/7675/KCM.site_kansascity/News/Local"

    // Size Map
    let sizeMap = e.dataset.sizeMap || false

    return { id, size, path, sizeMap }
  }

  /**
   * Generates an ad uid
   */

  guid() {
    let array = new Uint8Array(4);
    window.crypto.getRandomValues(array);
    return `div-gpt-ad-${array.join("")}-0`;
  }
}

var ads = new Ads();
