function changePersona() {
  let p = window.location.hash.replace(/^#/, "");
  let tabs = document.querySelector('.tabs');
  let customers = document.querySelectorAll("[data-customer]");

  customers.forEach(c => {
    c.dataset.customer = p;
  });
}

window.addEventListener('hashchange', changePersona);
