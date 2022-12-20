const menuMobil = document.querySelector('.nav__menu');

function toggleMenu(e) {
    document.querySelector( ".nav__list" ).classList.toggle("is_active");
    e.preventDefault();
}
menuMobil.addEventListener('click', toggleMenu);

/* Scroll Progressive */
let scrollPositionHeight 

 window.addEventListener('scroll', function () {
    const scrollCurrentPossition= window.pageYOffset ;
    const bodyHeight = window.innerHeight //Wieport Height
    const offsetHeight = document.body.offsetHeight;// Body Height
    scrollPositionHeight = (scrollCurrentPossition * 100) / (offsetHeight - bodyHeight)
    const widthProgressive = document.querySelector('.nav__scroll__progressive')
    widthProgressive.style.width= `${scrollPositionHeight}%` ;
});
/* Button to top */
//create div and img elemnts
let newDiv = document.createElement("div");
newDiv.setAttribute("id","scrollToTop")
let newImg = document.createElement("img");
newImg.setAttribute("src", "img/totop.png");

newDiv.appendChild(newImg); 

// Apply elemts to DOM
document.body.appendChild(newDiv);

const displayButton = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      newDiv.style.display = "block";
    } else {
      newDiv.style.display = "none";
    }
  });
};

newDiv.addEventListener("click", function (e){
  e.preventDefault();
  setTimeout(()=>{window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });},200)
})
displayButton();

/** Form Validation **/
let regexValidation =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let userNameValidation = document.getElementById('input-name');
let userEmailValidation = document.getElementById('input-email');
let userCheckBoxValidation = document.getElementById('check-data')
let userSubmitValidation = document.getElementById('submit-js');

userNameValidation.addEventListener("input", validationName );
userEmailValidation.addEventListener("input",validationEmail )
userSubmitValidation.addEventListener("click",sendSubmit )



function validationEmail(e){
  let inputEmail = e.target.value;
  let inputEmailValidation = regexValidation.test(inputEmail);
 userEmailValidation.style.borderBlockColor = (!inputEmailValidation ?  "red" : "green")
}

function validationName(e){
  let inputName = e.target.value
  let inputNameValidation = inputName.length >= 2 && inputName.length < 100
 userNameValidation.style.borderColor= (!inputNameValidation ?  "red" : "green");
}

function sendSubmit() {
  if(userEmailValidation && userNameValidation && userCheckBoxValidation.checked){
    sendForm()
    userNameValidation.value = ''
    userEmailValidation.value = ''
    userCheckBoxValidation.checked = false
    alert("enviado")
  }else {
    alert("Wrong")
  }

}

async function sendForm(){
  try{
    const result = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          Name: `${userNameValidation.value}`,
          Email: `${userEmailValidation.value}`,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await result.json();
      return data
  }
  catch (err) {
    alert(`Sorry we have some problems with the form: ${err}`)
  }
 
}