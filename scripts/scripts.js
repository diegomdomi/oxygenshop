// import sendForm  from "./services/apiCalls";
const URL_FORM = "https://jsonplaceholder.typicode.com/posts";
const URL_CURRENCIES = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
const regexValidation =/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

let userNameValidation = document.getElementById('input-name');
let userEmailValidation = document.querySelectorAll('.input-email');
let userCheckBoxValidation = document.getElementById('check-data')
let userSubmitValidation = document.getElementById('submit-js');
let buttonSendModal =  document.querySelector( ".popup-send" );
let inputEmail

userNameValidation.addEventListener("input", validationName );
userSubmitValidation.addEventListener("click",sendSubmit )

userEmailValidation.forEach((element) => {
  element.addEventListener('input', (e) => {
    let inputEmailValidation = regexValidation.test(e.target.value);

    if(inputEmailValidation){
      element.style.borderColor="green"
      element.style.color="black"
      buttonSendModal.setAttribute("class", "btn_active")
      buttonModalSubmit.disabled=false
      return inputEmail= e.target.value
    }else{
      element.style.borderColor="red"
      element.style.color="red"
      buttonSendModal.setAttribute("class", "popup-send")
      buttonModalSubmit.disabled=true
      
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
    clearInputEmail()
    userCheckBoxValidation.checked = false
    buttonSendModal.setAttribute("class", "popup-send")
    buttonModalSubmit.disabled=true

    alert("enviado")
  }else {
    alert("Erro to Send")
  }

}

/*Modal Functionality*/
const modalBody = document.querySelector("#popup")
const mainBody= document.querySelector('#body-popup')
const closeModalBtn = document.getElementById("close-modal-btn")
const modalSubmit = document.querySelector(".form-newsletter")
let buttonModalSubmit = document.querySelector(".popup-send")

window.addEventListener("load",onLoadTimer);

function onLoadTimer() {
  setTimeout(
    ()=>{
    if(!localStorage.getItem("modalStatus"))
      modalBody.style.display="block",
      localStorage.setItem("modalStatus",true)
    },5000)
  }

function clearInputEmail() {
  userEmailValidation.forEach(element =>{ 
    element.value ="",
    element.style.borderColor="grey"})
}

function closeModalWindow(){
  modalBody.style.display="none"
  buttonSendModal.setAttribute("class", "popup-send")
  buttonModalSubmit.disabled=true
  clearInputEmail()

}

function openWithPercent(param){
  if(param == 25 && !localStorage.getItem("modalStatus") ){
  modalBody.style.display="block"
  localStorage.setItem("modalStatus",true)
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
window.addEventListener("click",(e)=>{ (e.target !== mainBody && e.target === modalBody) && closeModalWindow()})

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


/*Currency Changes* */

const currency = document.getElementById('currency')
const amount1 = document.querySelector('.amount1')
const amount2 = document.querySelector('.amount2')
const amount3 = document.querySelector('.amount3')

 const currencyChange = async (url,currency) => {
  const response = await fetch(url)
  const data  = await response.json();

  if(currency === "usd"){
   const currency1 = (data.usd.usd).toFixed(2)
   amount1.innerText = `$ ${0}`
   amount2.innerText = `$ ${25 * currency1}`
   amount3.innerText = `$ ${60 * currency1}`
    return currency1
  }else if(currency === "eur"){
    const currency2 = (data.usd.eur).toFixed(1)
    amount1.innerText = `€ ${0}`
    amount2.innerText = `€ ${25 * currency2 }`
    amount3.innerText = `€ ${60 * currency2}`
    return currency2
  }else if(currency === "gbp"){
    const currency3 =( data.usd.gbp).toFixed(1)
    amount1.innerText = `£ ${0}`
    amount2.innerText = `£ ${25 * currency3} `
    amount3.innerText = `£ ${60 * currency3}`
    return currency3
  }

}
 
currency.addEventListener("change",()=>currencyChange(URL_CURRENCIES,currency.value))

/**Slider**/
class Slider {
  constructor(id){
      this.showImage = 0;
      this.slider = document.querySelector(`.${id}`);
      this.sliderImg = document.querySelectorAll(`.${id}_img`); 
      this.circles = document.querySelectorAll(`.${id}_circle`);
      this.next = document.querySelector(`.${id} .slider__arrowNext`)
      this.prev = document.querySelector(`.${id} .slider__arrowBefore`)

      this.mainAction();
      this.selected()
      this.autoMoveSlider(2500);
  }

  nextImage(e) {
    this.showImage += e;
    if (this.showImage >= this.sliderImg.length) {
      this.showImage = 0;
      }
      if (this.showImage < 0) {
        this.showImage = this.sliderImg.length - 1
      }
      this.moveSlides(this.showImage);
  }
    

  selected(){
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].addEventListener("click", () => {
        this.moveSlides(i);
      });
    }
  }

  moveSlides(e) {
    for (let i = 0; i < this.sliderImg.length; i++) {
    this.sliderImg[i].style.display = "none";
    this.circles[i].classList.remove("selected-active");
  }
    this.sliderImg[e].style.display = "block";
    this.circles[e].classList.add("selected-active");
  }

  mainAction(){
    this.next.addEventListener('click', ()=>this.nextImage(1))
    this.prev.addEventListener('click', ()=>this.nextImage(-1))
  }
  
  autoMoveSlider(timer){
    setInterval(()=>this.nextImage(1),timer);
  }
}
new Slider('slider');
