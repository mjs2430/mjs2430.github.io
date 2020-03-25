//toggle password hide/show
  const el = document.querySelector('#password-label');
  function changeType() {
  let x = document.getElementById("password-input");
  if (x.type === "password") {
      x.type = "text";  
  } else {
    x.type = "password";
  }
el.classList.toggle('active');
}
    

//submit validation
window.location = '?#';
const button = document.getElementById("submit");

button.addEventListener("click", function() {
const form = document.getElementById('sign-up-form');
const formIsValid = form.checkValidity();
const invalid = form.querySelectorAll(":invalid"); 
  if (formIsValid) {  
      toggleModal('main-modal');
  } else {
    for (let i in invalid) {
     invalid[i].classList.add("required");
    }
  } 
}); 


//show/hide cc form 
const radio = document.getElementById("cc-radio");

 function mediaQuery(x) {
  if (x.matches) { // If media query matches
      radio.checked = true; 
  } else {
      radio.checked = false; 
  }
}

var x = window.matchMedia("(min-width: 640px)")
mediaQuery(x) // Call listener function at run time
x.addListener(mediaQuery) // Attach listener function on state changes   

if (radio.checked) {
    document.getElementById('cc-form').style.display = 'block'
} else {
    document.getElementById('cc-form').style.display = 'none'
}

