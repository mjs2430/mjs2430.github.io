/**
 * Sample placeholder
 */

function showNavigation() {
  document.querySelector("#main-nav").classList.add("open");
  document.body.classList.add("freeze");
}

function closeNavigation() {
  document.querySelector("#main-nav").classList.remove("open");
  document.body.classList.remove("freeze");
}

function toggleSearchForm() {
  document.querySelectorAll(".flag").forEach(d => {
    d.classList.toggle("searching");
  });
}

function toggleSubMenu() {
  document.querySelectorAll(".flag").forEach(d => {
    d.classList.toggle("submenu-out");
  });
}
