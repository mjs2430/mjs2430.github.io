class JayWalkups extends HTMLElement {
  static get observer() {
    return new IntersectionObserver(this.swap);
  }

  static swap(entries) {
    let e = entries[0];
    let t = e.target;

    if(!e.isIntersecting && t.hasShown) {
      let r = Math.floor(Math.random() * t.songs.length);
      t.textContent = t.songs[r];
    } else {
      t.hasShown = true;
    }
  }

  constructor() {
    super();
    this.hasShown = false;
  }

  get songs() {
    return JSON.parse(this.getAttribute("songs"));
  }

  connectedCallback() {
    this.constructor.observer.observe(this)
  }
}

customElements.define("jay-walkups", JayWalkups);
