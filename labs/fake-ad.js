/**
 * Dummy ad component
 */

class FakeAd extends HTMLElement {

  // Watch a couple of attributes for changes
  static get observedAttributes() {
    return ["order", "columns", "size"];
  }

  // Updating the order shifts where the ad sits in the grid
  get order() {
    return this.getAttribute("order");
  }

  set order(val) {
    if(val) {
      this.setAttribute("order", val);
    } else {
      this.removeAttribute("order");
    }
  }

  // Updating the columns changes how many the ad will use
  get columns() {
    return this.getAttribute("columns");
  }

  set columns(val) {
    if(val) {
      this.setAttribute("columns", val);
    } else {
      this.removeAttribute("columns");
    }
  }

  // Shadow DOM template
  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      :host {
        --color: #f2b6be;

        display: flex;
        align-items: center;
        justify-content: center;
        order: var(--order);
      }

      @media(min-width: 660px) {
        :host([columns="2"]), :host([columns="3"]) {
          grid-column: span 2;
        }
      }

      @media(min-width: 990px) {
        :host([columns="3"]) {
          grid-column: span 3;
        }
      }
      
      .ad {
        display: none;
        background-color: var(--color);
      }

      :host(.rendered) .ad {
        display: block;
      }

      :host(.fill) {
        background-color: var(--color);
      }
    </style>

    <div class="ad"></div>
    `;
    return t;
  }

  // Load the template on construction
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    // Convenience
    this.ad = this.shadowRoot.querySelector(".ad");
  }

  // Called when added to the DOM
  connectedCallback() {
    faIntersectionObserver.observe(this);
    faResizeObserver.observe(this);
  }

  // Called when removed from the DOM
  disconnectedCallback() {
    faResizeObserver.unobserve(this);
  }

  // Fires when a watched attribute changes
  attributeChangedCallback(name, ov, nv) {
    switch(name) {
      case "order":
        this.style.setProperty("--order", nv);
        break;
      case "columns":
        // Handled with CSS instead
        break;
      case "size":
        this.renderAd(...this.size);
        break;
      default:
        // Do nothing
    }
  }

  // Size can take a single array, or nested array sizes 
  // using the following format: [width, height]
  get size() {
    let s = this.getAttribute("size");

    if(s) {
      try {
        let p = JSON.parse(s);

        if(Array.isArray(p[0])) {
          for(let i = 0; i < p.length; i++) {
            if(this.hasRoom(...p[i])) return p[i];
          }
        } else if(this.hasRoom(...p)) {
          return p;
        }
      } catch(e) {
        console.warn("fake-ad size could not be parsed", e);
      }
    }

    return [300, 250]
  }

  // Checks the width of the container to restrict ads
  hasRoom(width) {
    return width <= window.outerWidth;
  }

  // Render an ad
  renderAd(width, height) {
    this.ad.style.width = `${width}px`;
    this.ad.style.height = `${height}px`;

    if(width <= 300) {
      this.columns = 1;
    } else {
      this.columns = 3;
    }
  }
}

// ResizeObserver
var faResizeObserver = new ResizeObserver(entries => {
  entries.forEach(e => {
    let ad = e.target;
    ad.renderAd(...ad.size);
  });
});

// IntersectionObserver
var faIntersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      let ad = e.target;
      setTimeout(() => {
        ad.renderAd(...ad.size);
        ad.classList.add("rendered");
      }, 150);
    }
  });
});


// Register the element
customElements.define("fake-ad", FakeAd);
