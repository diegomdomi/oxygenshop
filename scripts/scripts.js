const menuMobil = document.querySelector('.nav__menu');

function toggleMenu(e) {
    document.querySelector( ".nav__list" ).classList.toggle("is_active");
    e.preventDefault();
}
menuMobil.addEventListener('click', toggleMenu);

/* Scroll Progressive */
 window.addEventListener('scroll', function() {
    const scrollCurrentPossition= window.pageYOffset ;
    const bodyHeight = window.innerHeight //Wieport Height
    const offsetHeight = document.body.offsetHeight;// Body Height
    const scrollPositionHeight = (scrollCurrentPossition * 100) / (offsetHeight - bodyHeight)
    console.log(scrollPositionHeight)
    const widthProgressive = document.querySelector('.nav__scroll__progressive')
    widthProgressive.style.width= `${scrollPositionHeight}%` ;
});

/* Button to top */

document.body.onload = addElement;

function addElement () {
  // crea un nuevo div
  // y añade contenido
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode("Hola!¿Qué tal?");
  newDiv.appendChild(newContent); //añade texto al div creado.

  // añade el elemento creado y su contenido al DOM
  var currentDiv = document.getElementById("contact");
  document.body.insertBefore(newDiv, currentDiv);
}


