/**
 * Modal javascript
 */

function toggleModal(id, force) {
  let m = document.getElementById(id);

  if(m) {
    if(force === true || force === false) {
      m.hidden = !force;
    } else {
      m.hidden = !m.hidden;
    }

    if(m.classList.contains("screen")) {
      document.body.classList.toggle("freeze", !m.hidden);
    }
  }
}
