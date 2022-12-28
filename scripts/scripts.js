// import sendForm  from "./services/apiCalls";
const URL_FORM = "https://jsonplaceholder.typicode.com/posts";

/*Mobil Menu*/

const menuMobil = document.querySelector('.nav__menu');
const menuOpenMobil = menuMobil.querySelector('.btn-open')
const menuCloseMobil = document.querySelector('.btn-close');
menuCloseMobil.style.display="none";

function toggleMenu(e) {
  e.preventDefault();
  let toggleMenuMobil =  document.querySelector( ".nav__list" ).classList.toggle("is_active");
  if(toggleMenuMobil){
    menuOpenMobil.style.display="none"
    menuCloseMobil.style.display="inline-block"
  }else{
    menuOpenMobil.style.display="initial"
    menuCloseMobil.style.display="none"

  }
}
menuMobil.addEventListener('click', toggleMenu);

/* Scroll Progressive */

let postionScrollY = function scrollYAxis() {
  let scrollCurrentPossition= window.pageYOffset ;
  let bodyHeight = window.innerHeight //Wieport Height
  let offsetHeight = document.body.offsetHeight;// Body Height
  const widthProgressive = document.querySelector('.nav__scroll__progressive')
  let scrollPositionHeight = (scrollCurrentPossition * 100) / (offsetHeight - bodyHeight)
  widthProgressive.style.width= `${scrollPositionHeight}%` ;
  openWithPercent(scrollPositionHeight.toFixed(0))

  return scrollPositionHeight

}

window.addEventListener('scroll', postionScrollY);

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
let userEmailValidation = document.querySelectorAll('.input-email');
let userCheckBoxValidation = document.getElementById('check-data')
let userSubmitValidation = document.getElementById('submit-js');
let inputEmail

userNameValidation.addEventListener("input", validationName );
userSubmitValidation.addEventListener("click",sendSubmit )

userEmailValidation.forEach((element) => {
  element.addEventListener('input', (e) => {
    let inputEmailValidation = regexValidation.test(e.target.value);
    if(inputEmailValidation){
      element.style.borderColor="green"
      element.style.color="grey"
      return inputEmail= e.target.value
    }else{
      element.style.borderColor="red"
      element.style.color="red"
    }
  });
  return element
});


function validationName(e){
  let inputName = e.target.value
  let inputNameValidation = inputName.length >= 2 && inputName.length < 100

 userNameValidation.style.borderColor= (!inputNameValidation ?  "red" : "green");
}

function sendSubmit() {
  if(userEmailValidation && userNameValidation && userCheckBoxValidation.checked){
    sendForm(URL_FORM,`${userNameValidation.value}`,`${inputEmail}`)
    userNameValidation.value = ''
    userNameValidation.style.borderColor = 'grey'
    userEmailValidation.forEach(element =>{ 
      element.value ="",
      element.style.borderColor="grey"})
    userCheckBoxValidation.checked = false
    alert("enviado")
  }else {
    alert("Erro to Send")
  }

}

/*Modal Functionality*/
const mainBody= document.getElementById('body-popup')
const modalBody = document.getElementById("popup")
const closeModalBtn = document.getElementById("close-modal-btn")
let modalSubmit = document.querySelector(".form-newsletter")

// window.addEventListener("load",onLoadTimer);

// function onLoadTimer() {
//   setTimeout(
//     ()=>{
//       modalBody.style.display="block"
// },5000)
// }


function closeModalWindow(){
  modalBody.style.display="none"
}

function openWithPercent(param){
  if(param == 25 ){
  modalBody.style.display="block"
  }
}

modalSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  userCheckBoxValidation.checked=true
  sendSubmit()
  closeModalWindow();
});

/*Close Modal*/
closeModalBtn.addEventListener("click", closeModalWindow )
window.addEventListener("keyup",(e)=>{ (e.key === 'Escape'&& closeModalWindow()) } )
window.addEventListener("click",(e) => { (e.target !== mainBody && e.target === modalBody) && closeModalWindow()})

 const sendForm = async ( url, name, email) => {
    
  try{
      const result = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            Name: name ? name : null,
            Email:email,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        const data = await result.json();
        console.log(data)
    }
    catch (err) {
      alert(`Sorry we have some problems with the form: ${err}`)
    }
}
