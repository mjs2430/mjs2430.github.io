var list = document.querySelector(".list");
var lastScroll = localStorage.getItem("scroll")

if(lastScroll && (window.innerWidth > 769)) {
  list.scrollBy(0, lastScroll);
}

list.addEventListener("click", e => {
  localStorage.setItem("scroll", list.scrollTop);
})
