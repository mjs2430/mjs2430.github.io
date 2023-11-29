/**
 * Story Stack 
 */

class StoryStack extends HTMLElement {

  static get observedAttributes() {
    return ['href'];
  }

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
    :host {
      display: block;
      margin: 30px auto !important;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 30px;
      margin-top: 15px;
    }

    .grid ::slotted(.package) {
      padding: 0 !important;
      --lc: #222;
    }

    ::slotted(h5) {
      margin-bottom: 0;
    }

    ::slotted(p) {
      font: 0.875rem/1.5em var(--sans) !important;
    }

    ::slotted(:first-child) {
      margin-top: 0;
    }
    </style>

    <slot name="top" class="package"></slot>
    <div class="grid">
      <slot></slot>
    </div>
    <slot name="bottom" class="package"></slot>
    `;
    return t;
  }

  get href() {
    return this.getAttribute("href");
  }

  set href(url) {
    this.setAttribute("href", url);
  }

  get count() {
    return this.dataset.count || 4;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  async getDoc() {
    if(this.href) {
      let parser = new DOMParser();
      let response = await fetch(this.href);
      let xml = await response.text();
      return parser.parseFromString(xml, "text/html")
    } else {
      console.warn("custom element has no href");
    }
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case "href":
        this.doc = await this.getDoc()
        this.stamp()
    }
  }

  stamp() {
    let articles = this.doc.querySelectorAll("article.card");

    for(let i = 0, len = this.count; i < len; i++) {
      let a = articles[i];
      let p = a.querySelector(".package");

      // cleanup
      p.slot = "";
      p.classList.remove("impact");

      let kicker = p.querySelector(".kicker-id");
      if(kicker) {
        kicker.remove();
      }

      let title = p.querySelector("h3");
      if(title) {
        title.classList.remove("h1");
      }

      let summary = p.querySelector("summary");
      if(summary) {
        summary.remove();
      }

      let time = p.querySelector("time");
      if(time.classList.contains("update-date") && time.dataset.originaldate) {
        let d = new Date(time.dataset.originaldate * 1000);
        let f = Intl.DateTimeFormat("default", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        });

        time.innerText = `UPDATED ${f.format(d)}`;
      }

      // add it
      this.appendChild(p)
    }
  }
}

customElements.define("story-stack", StoryStack);
