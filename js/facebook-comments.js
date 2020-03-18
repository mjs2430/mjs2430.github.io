/**
 * Lazy loaded Facebook Comments
 */

class FacebookComments extends HTMLElement {
  // Fires when added to the DOM
  connectedCallback() {
    let script = document.createElement('script');
    script.crossOrigin = 'anonymous';
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0';
    document.head.appendChild(script);

    this.observer = new IntersectionObserver(this.handleIntersection);
    this.observer.observe(this);
  }

  // Intersection handler
  handleIntersection(entries, observer) {
    entries.forEach((e) => {
      if(e.isIntersecting) {
        e.target.stamp();
        e.target.observer.unobserve(e.target);
      }
    });
  }

  // Stamp the template
  stamp() {
    this.innerHTML = `
    <style>
      facebook-comments {
        left: -8px;
        align-self: stretch;
      }

      .fb-comments iframe { 
        left: -8px;
        width: 100% !important; 
      }
    </style>
    <div class="fb-comments" data-href="https://www.mcclatchy.com" data-mobile="true" data-numposts="5"></div>
    `;

    FB.init({
      status: true, 
      xfbml: true,
      version: 'v2.7'
    });
  }
}

customElements.define("facebook-comments", FacebookComments);
