/**
 * Dynamic content logic
 */

class Dynamics extends Zones {

  /**
   * Initial setup
   */

  constructor(zones) {
    super();
    this.fill(zones);
  }

  /**
   * Fills a zone with templated content on the page
   */

  fill(zones) {
    this.render(zones);
    zones.forEach(z => {
      let slots = document.querySelectorAll(`[data-zone=${z.name}]`);

      if(slots.length == 0) {
        console.warn(`missing zone: ${z.name}`);
      } else {
        slots.forEach(slot => {
          z.units.forEach(u => {
            let t = document.querySelector(`template[data-unit=${u}]`);

            if(t) {
              let clone = t.content.cloneNode(true);
              let gptAd = clone.querySelector("gpt-ad");

              if(z.gpt && gptAd) {
                for(let [k,v] of Object.entries(z.gpt)) {
                  gptAd.dataset[k] = v;
                }
              }

              slot.appendChild(clone);
            } else {
              console.warn(`missing unit template: ${u}`);
            }
          });
        });
      }
    });
  }
}

/**
 * Demo code only
 */

var mi = mi || {};
mi.bucket = window.location.hash.substring(1) || "default";
mi.dynamics = new Dynamics(Typologies[mi.bucket]);
