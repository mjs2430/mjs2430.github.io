/**
 * Toggle for custom search select
 */

let selectObserver = new MutationObserver(handleSelectChange);

function handleSelectChange(mutations) {
  for(let m of mutations) {
    if(m.type == "attributes" && m.attributeName == "selected") {
      let ele = m.target;

      let value = ele.getAttribute("selected");
      let name = ele.querySelector(".expander");
      let options = ele.querySelectorAll(".options .button");

      name.innerText = value;
      options.forEach(d => {
        d.classList.toggle("selected", d.dataset.name == value);
      });
      ele.querySelector(".expander").classList.remove("open");
    }
  }
}

let customSelects = document.querySelectorAll(".select");
customSelects.forEach(d => {
  selectObserver.observe(d, { attributeFilter: ['selected'] });

  d.addEventListener("click", e => {
    let value = e.target.dataset.name;
    if(value) {
      e.currentTarget.setAttribute("selected", value)
    }
  })
});
