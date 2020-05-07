/**
 * Copy highlight button class
 */

class CopyHighlight extends HTMLElement {
  
  constructor() {
    super();
  }

  connectedCallback() {
    if(navigator.clipboard) {
      this.addEventListener("click", this.clickHandler);
    } else {
      this.remove();
    }
  }

  clickHandler(e) {
    let highlight = this.previousElementSibling;
    let code = highlight.querySelector("code");

    // Copy the code to the clipboard
    navigator.clipboard.writeText(code.textContent);

    // Notify it's done
    this.classList.add("copied");
    this.textContent = "code copied √";
  }
}

customElements.define("copy-highlight", CopyHighlight);
