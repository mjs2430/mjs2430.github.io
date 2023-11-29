/**
 * Base section theming file
 * A simple grid with some options and slots above and below. 
 */

class SimpleGrid extends HTMLElement {

  /**
   * Template for the Shadow DOM
   */

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
    :host {
      display: block;
      transition: opacity .5s;
    }

    :host(.faded) {
      opacity: 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 30px;
      grid-auto-flow: dense;
      max-width: 1140px;
      margin: 30px auto;
      box-sizing: content-box;
    }

    @media(min-width: 630px) {
      .grid {
        padding: 0 15px;
      }

      ::slotted(.photo-lede) {
        grid-column: 1/-1;
      }

      ::slotted(.video-lede) {
        grid-column: 1/3;
        grid-row: 1/3;
      }
      
      ::slotted(.zone-el) {
        grid-column: 1;
        align-self: center;
        justify-self: center;
      }
    }

    /* Dark Theme */

    :host([theme=dark]) {
      background-color: #222;
      color: white;
      --tc: white;
      --lc: white;
    }

    :host([theme=dark]) ::slotted(.card),
    :host([theme=dark]) ::slotted(.no-img) {
      background-color: #373737 !important;
    }
    </style>

    <slot name="above"></slot>
    <slot name="nav"></slot>
    <section>
      <slot class="grid"></slot>
    </section>
    <slot name="below"></slot>
    `;
    return t;
  }

  /**
   * Required to extend an element
   */

  constructor() {
    super();

    // Original main container
    this._main = document.querySelector("#main-content");

    // Light DOM stylesheet specific to themes
    this._theme = document.createElement("style");
    this._theme.setAttribute("for", `${this.localName}-theme`);
    document.head.appendChild(this._theme);

    // Light DOM stylesheet for cleanup
    this._style = document.createElement("style");
    this._style.setAttribute("for", this.localName);
    document.head.appendChild(this._style);
  }

  /**
   * Observed attributes run a callback when changed.
   */

  static get observedAttributes() {
    return ["theme", "nav"]
  }

  /**
   * Fires when appended to DOM
   */

  connectedCallback() {
    // Skip if already done
    if(this.shadowRoot) return;

    // Attach the shadow
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    // Handles the lede story
    this.handleLede();

    // Append articles
    this._articles.forEach((a, i) => {
      a.style.order = i + 1;
      this.appendChild(a);
    });

    // Inject zones (only runs once)
    this.handleZones();

    // Move this element into position and alert
    this._main.insertAdjacentElement("beforebegin", this);
    this._main.remove();

    // Unfade and notify
    this.dispatchEvent(new Event("complete"));
    window.setTimeout(() => {
      this.classList.remove("faded");
    }, 50);
  }

  /**
   * Fires when an observed attribute changes
   */

  attributeChangedCallback(name, ov, nv) {
    switch(name) {
      case "theme":
        this.handleThemeChanged(nv, ov);
        break;
      case "nav":
        this.handleNavChanged(nv, ov);
        break;
      default:
        // Do nothing;
    }
  }

  /**
   * Queries this and main for the first match.
   * Returns a Set
   */

  query(qs) {
    let list = this.queryAll(qs);
    return Array.from(list).shift();
  }

  /**
   * Queries this and main for the all matches.
   * Returns a Set
   */

  queryAll(qs) {
    return new Set([
      ...this.querySelectorAll(qs),
      ...this._main.querySelectorAll(qs)
    ]);
  }

  /**
   * Returns an array of all article cards on the page
   */

  get _articles() {
    let list = this.queryAll("article.card, div.no-img");
    let arr = Array.from(list).filter((a) => {
      return a.querySelector(".label") == null;
    });

    return arr;
  }

  /**
   * Returns an array of all digests on the page
   */

  get _digests() {
    let list = this.queryAll(".digest");
    return Array.from(list);
  }

  /**
   * Appends raw CSS text to the inline style tag
   */

  addCSS(css) {
    this._style.textContent += css;
  }

  /**
   * Runs right before the articles are moved.
   * Default adjusts the lede story based on what type it is.
   */

  handleLede() {
    let lede = this._articles[0];

    // Different changes depending on the lede content type
    if(lede && lede.querySelector(".video") != null) {
      lede.classList.add("video-lede");

      this.addCSS(`
      .video-lede .new-video-design { 
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      @media(min-width: 960px) {
        .video-lede .h1 {
          font-size: 38px;
          line-height: 1.2em;
          font-weight: normal;
          max-width: 550px;
        }
      }`);
    } else {
      this._articles[0].classList.add("photo-lede", "horizontal", "impact", "in-depth");
    }
  }

  /**
   * Theme getter and setter
   */

  get theme() {
    return this.getAttribute("theme");
  }

  set theme(val) {
    if(val) {
      this.setAttribute("theme", val);
    } else {
      this.removeAttribute("theme");
    }
  }

  // Alters theme if specified
  handleThemeChanged(nv, ov) {
    let css = '';

    if(nv == "dark") {
      css = `
      body { 
        background-color: #222 
      }

      .subnav-section-front-organism .subnav-section-title .subnav-section-name,
      .subnav-section-front-organism .subnav-section-container .subnav-section-list .subnav-section-list-item a { 
        color: white !important; 
      }

      .subnav-section-front-organism .subnav-section-title .subnav-section-icon {
        filter: invert(1);
      }`;
    }

    // Notify
    this._theme.textContent = css
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        type: "theme",
        nv: nv, 
        ov: ov
      }
    }));
  }

  /**
   * Nav functionality
   */

  get nav() {
    return this.getAttribute("nav");
  }

  set nav(val) {
    if(val) {
      this.setAttribute("nav", val);
    } else {
      this.removeAttribute("nav");
    }
  }

  // Moves section nav on request, boolean trigger
  handleNavChanged(nv, ov) {
    let ele = this.query("#nav-section-front");

    if(ele) {
      ele.setAttribute("slot", "nav");
      ele.hidden = !this.hasAttribute("nav");

      if(nv && nv.length > 0) {
        ele.querySelector(".subnav-section-name").textContent = nv;
      }

      this.appendChild(ele);
    }

    // Notify
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        type: "nav",
        nv: nv,
        ov: ov
      }
    }));
  }

  /**
   * Zones functionality
   */

  get zones() {
    return this.getAttribute("zones");
  }

  set zones(val) {
    if(val) {
      this.setAttribute("zones", val);
    } else {
      this.removeAttribute("zones");
    }
  }

  get _zones() {
    let list = this.queryAll(".zone-el");
    return Array.from(list, z => {
      z.classList.remove("flex-columns", "rail", "main-stage");
      return z;
    });
  }

  // Returns the first zone to match a query selector
  // Can take a query string or an integer to get the zone.
  getZone(qs) {
    if(Number.isInteger(qs)) qs = `#zone-el-${qs}`;
    return this._zones.find((z) => {
      return z.matches(qs);
    });
  }

  // Injects zones if specified
  // This only runs once in the connectedCallback
  handleZones() {
    if(this.zones == "simple") {
      try {
        let z3 = this.getZone(3);
        z3.style.order = 4;
        this.appendChild(z3);

        let z5 = this.getZone(5);
        z5.style.order = 4;
        this.appendChild(z5);

        let z6 = this.getZone(6);
        z6.setAttribute("slot", "");
        z6.style.order = 4;
        this.appendChild(z6);
      } catch(e) {
        console.warn("Error moving zones:", e);
      }
    }

    // Nativo slot needs order added as well
    this.addCSS(`
    .ntv-ap {
      order: 7;
    }`);

    // Notify
    this.dispatchEvent(new CustomEvent("change", {
      detail: {
        type: "zones",
        nv: this.zones,
        ov: null
      }
    }));
  }
}

/**
 * Register the skin
 */

customElements.define("simple-grid", SimpleGrid);

/**
 * Safari does not load a global classes in ES6 modules.
 * Need to attach to the window object to be able to import and extend.
 */

window.SimpleGrid = SimpleGrid;
