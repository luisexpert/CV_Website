const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav__menu--open");
    changeToggleIcon();
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.toggle("nav__menu--open");
        changeToggleIcon();
    });
});

//Change the nav toggle icon
function changeToggleIcon(){
    if (navMenu.classList.contains("nav__menu--open")) {
      navToggle.classList.replace("ri-menu-4-line", "ri-close-line");
    } else {
        navToggle.classList.replace("ri-close-line", "ri-menu-4-line");
    }
}

//Active nav link on scroll
function addActiveLink(){
    const section = document.querySelectorAll("section[id]");
    section.forEach((section) => {
        const scrollY = window.scrollY,
        sectionTop = section.offsetTop - 80,
        sectionHeight = section.offsetHeight,
        sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document
            .querySelector(".nav__link[href*=" + sectionId + "]")
            .classList.add("nav__link--active");
        } else {
            document
            .querySelector(".nav__link[href*=" + sectionId + "]")
            .classList.remove("nav__link--active");
        }
    });
}

window.addEventListener("scroll", addActiveLink);

//Incrementar contador
function startCounter(counter){
    //numero de tarjeta
    const targetNumber = counter.getAttribute("data-target");
    const increment = setInterval(() => {
        counter.textContent++;

        if(counter.textContent == targetNumber){
            clearInterval (increment);
        }

    }, 2000 / targetNumber);
}

const counterSection = document.querySelector(".counter");
const counters = document.querySelectorAll(".counter__number");
let started = false;

window.addEventListener("scroll", () =>{
    if(window.scrollY >= counterSection.offsetTop - 400){
        if(!started){
            counters.forEach((counter) => startCounter(counter));
        }
        started = true;
    }
});

//Testimonial Swiper

const TestimonialSwiper = new Swiper(".testimonial__wrapper", {
    spaceBetween: 40,
    loop: true,
    grabCursor: true,
    centerSlides: true,
    slidesPerView: "auto",
    pagination: {
        el: ".swiper-pagination",
        clickeable: true,
    },
});

//ScrollTop

const scrolltop = document.getElementById("scrolltop");

window.addEventListener("scroll", () => {
    if (this.scrollY >= 300) {
        scrolltop.classList.add("scrolltop--show");
    } else{
        scrolltop.classList.remove("scrolltop--show");
    }
});

//Dark theme


//Check for select theme in locastorage
let theme = localStorage.getItem("theme");

const themeToggle = document.getElementById("theme-toggle");

const enableDarkTheme = () => {
    //Agregar tema dark
    document.body.classList.add("dark-theme");
    //cambiar color tema
    themeToggle.classList.replace("ri-moon-line" , "ri-sun-line");
    //Update the selected theme in localstorage
    localStorage.setItem("theme", "dark-theme");
};

const disableDarkTheme  = () => {
    //Quitar dark theme
    document.body.classList.remove("dark-theme");
    //Cambiar icono de toggle
    themeToggle.classList.replace("ri-sun-line", "ri-moon-line");
    //actualizar el tema selecto
    localStorage.setItem("theme", null);
}

//Checar si el usuario activo el modo dark
if (theme === "dark-theme") {
    enableDarkTheme();
}

//Agregar toggle theme event
themeToggle.addEventListener("click", () => {
    //Selecionar el tema deseado
    theme = localStorage.getItem("theme");
    if (theme !== "dark-theme"){
        enableDarkTheme();
    } else {
        disableDarkTheme();
    }
});

const sr = ScrollReveal({
    origin: "top",
    distance: "100px",
    duration: 2500,
    reset: true,
});

sr.reveal(".home__content, .about__img, .service__content, .contact__content", {
    origin: "left",
});

sr.reveal(".home__img, .about__content, .service__info, .contact__form", {
    origin: "right",
});

sr.reveal(".skills__wrapper, .counter__wrapper, .portfolio__wrapper, .testimonial__wrapper, .blog__wrapper, .footer__content",{
    origin: "bottom"
});

/*Enviar Email JS */
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-mesage')

const sendEmail = (e) =>{
    e.preventDefault()

    //ServiceID, TemplateID, #Form - publickey
    emailjs.sendForm('service_d1gr9hi', 'template_ypox1p5', '#contact-form', 'EWDxleXlUvylCiNAD')
    .then(() =>{
        //Show sent Message
        contactMessage.textContent = 'Enviado correctamente ✅'

        //Remover mensaje despues de 5 segundos
        setTimeout(() =>{
            contactMessage.textContent = ''
        }, 5000)

        //Limpiar campos
        contactForm.reset()
    }, () =>{
        //Mensaje de error
        contactMessage.textContent = 'Ocurrio un error'
    })
}

contactForm.addEventListener('submit', sendEmail)