const menuMobil = document.querySelector('.nav__menu');

function toggleMenu(e) {
    // this.classList.toggle('is-active');
    document.querySelector( ".nav__list" ).classList.toggle("is_active");
    e.preventDefault();
}
menuMobil.addEventListener('click', toggleMenu,false);

