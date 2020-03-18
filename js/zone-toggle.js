/**
 * Toggles zones for testing the story deck
 */

class ZoneToggle extends HTMLElement {

  get template() {
    let t = document.createElement("template");
    t.innerHTML = `
    <style>
      .screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        transition: background-color .4s;
      }

      .package {
        position: fixed;
        bottom: 75px;
        right: 15px;
        text-align: right;
        opacity: 0;
        transform: translateY(30px);
        transition: all .4s ease;
      }

      span {
        display: block;
        padding: 10px 0;
        color: #999;
        padding: 10px 0;
        cursor: pointer;
      }

      span:hover, span.active {
        color: #222;
      }

      .button {
        background-color: rgba(255, 255, 255, .8);
        border-radius: 50%;
        width: 45px;
        height: 45px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: fixed;
        bottom: 15px;
        right: 15px;
      }

      :host(.open) .screen {
        background-color: rgba(255,255,255,.97);
        pointer-events: auto;
      }

      :host(.open) .package {
        transform: translateY(0);
        opacity: 1;
      }
    </style>

    <div class="screen"></div>
    <div class="package">
      <span data-bucket="default">Default set</span>
      <span data-bucket="configuration-a">Configuration A</span>
      <span data-bucket="configuration-b">Configuration B</span>
      <span data-bucket="configuration-c">Configuration C</span>
    </div>

    <div class="button primary">
      <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>
    </div>
    `;
    return t;
  }
  
  /**
   * Init
   */

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    this.fab.addEventListener("click", e => {
      this.classList.toggle("open");
    });

    this.spans.forEach(span => {
      span.addEventListener("click", e => {
        let bucket = e.target.dataset.bucket;
        this.classList.remove("open");
        window.location.hash = bucket;
        window.scrollTo({ top: 0 });
        window.location.reload();
      });

      if(span.dataset.bucket == this.bucket) {
        span.classList.add("active");
      }
    });
  }

  get spans() {
    return this.shadowRoot.querySelectorAll("span");
  }

  get fab() {
    return this.shadowRoot.querySelector(".button");
  }

  get bucket() {
    return location.hash.substring(1) || "default";
  }
}

customElements.define("zone-toggle", ZoneToggle);
