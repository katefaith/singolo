/* MENU SWITCHER */

const nav = document.querySelector('#navigation');

nav.addEventListener('click', menuSwitcher);
document.addEventListener('scroll', onScroll)

function menuSwitcher(event) {
  if (event.target.tagName === 'A') {
    nav.querySelectorAll('a').forEach(a => {
      a.classList.remove('navigation__link--active');
    });
    event.target.classList.add('navigation__link--active');
  }
}

function onScroll() {
  const currentPosition = window.scrollY + document.documentElement.clientHeight / 4;
  const sections = document.querySelectorAll('main > section');
  const headerHeight = document.querySelector('#header').offsetHeight;

  sections.forEach(elem => {
    if (elem.offsetTop - headerHeight <= currentPosition) {
      nav.querySelectorAll('a').forEach(a => {
        a.classList.remove('navigation__link--active');
        if (elem.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('navigation__link--active');
        }
      });
    }
  })
}


/* SLIDER */

const slides = document.querySelectorAll('.slider__item');
const btnNext = document.querySelector('.slider__arrow-next');
const btnPrev = document.querySelector('.slider__arrow-prev');
let currentSlide = 0;
let isEnabled = true;

btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);

function goToSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('slider__item--active', direction);
  })
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slider__item--next', direction);
  slides[currentSlide].addEventListener('animationend', function () {
    this.classList.remove('slider__item--next', direction);
    this.classList.add('slider__item--active');
    isEnabled = true;
  })
}

function previousSlide(n) {
  hideSlide('to-right')
  goToSlide(n - 1);
  showSlide('from-left');
}

function nextSlide(n) {
  hideSlide('to-left')
  goToSlide(n + 1);
  showSlide('from-right');
}

function showNextSlide() {
  if (isEnabled) {
    nextSlide(currentSlide);
    changeBackground();
  }
}

function showPrevSlide() {
  if (isEnabled) {
    previousSlide(currentSlide);
    changeBackground();
  }
}

function changeBackground() {
  document.querySelector('#promo').classList.toggle("promo--second-bg")
}


/* ACTIVATING PHONE SCREENS */
const iphoneVertical = document.querySelector('.iphone-vertical');
const iphoneHorizontal = document.querySelector('.iphone-horizontal');

iphoneVertical.addEventListener('click', activateScreen);
iphoneHorizontal.addEventListener('click', activateScreen);

function activateScreen() {
  this.firstElementChild.classList.toggle('hidden');
}


/* PORTFOLIO. SWITCH TABS */

const tags = document.querySelector('#tags');
const portfolioList = document.querySelector('#portfolio-list');

tags.addEventListener('click', tagsSwitcher);

function tagsSwitcher(event) {
  if (event.target.tagName === 'SPAN' && !event.target.classList.contains('tags__item--selected')) {
    tags.querySelectorAll('span').forEach(span => {
      span.classList.remove('tags__item--selected');
    });
    event.target.classList.add('tags__item--selected');
    shiftPortfolioByOnePosition();
  }
}

function shiftPortfolioByOnePosition() {
  let arrNodes = Array.from(portfolioList.querySelectorAll('.portfolio__item'));
  arrNodes.forEach(portfolioItem => {
    portfolioItem.classList.remove('portfolio__item--framed');
  });
  arrNodes.unshift(arrNodes.pop());

  portfolioList.innerHTML = '';
  arrNodes.forEach(node => {
    portfolioList.append(node)
  })
}


/* PORTFOLIO. INTERACTION WITH IMAGES */

portfolioList.addEventListener('click', addBorderToImage);

function addBorderToImage(event) {
  if (event.target.tagName === 'IMG') {
    portfolioList.querySelectorAll('.portfolio__item').forEach(portfolioItem => {
      portfolioItem.classList.remove('portfolio__item--framed');
    });
    event.target.parentNode.classList.add('portfolio__item--framed')
  }
}


/* FORM AND MODAL WINDOW */
const form = document.querySelector('#form');
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('.modal__overlay');
const btnClose = document.querySelector('#btn-close');
const btnSubmit = document.querySelector('#btn-submit');

btnClose.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
  if (event.keyCode === 27) {
    closeModal();
  }
});
modalOverlay.addEventListener('click', event => {
  if (event.target.classList.contains('modal__overlay')) {
    closeModal();
  }
});
form.addEventListener('submit', submitForm);

function closeModal() {
  modal.classList.remove('modal--visible');
  resetForm()
}

function submitForm(event) {
  event.preventDefault();
  const subject = document.querySelector('#subject').value
  const describe = document.querySelector('#describe').value

  addTextToModal(subject, describe);
  showModal()
}

function showModal() {
  modal.classList.add('modal--visible')
}

function addTextToModal(subject, describe) {
  modal.querySelector('.modal__subject').innerText = subject ? `Subject: ${subject}` : 'No subject';
  modal.querySelector('.modal__portfolio').innerText = describe ? `Description: ${describe}` : 'No description';
}

function resetForm() {
  form.reset();
}


/* MOBILE MENU */
const btnBurger = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.header__navigation');
const logo = document.querySelector('.logo');

btnBurger.addEventListener('click', mobileMenuToggle);
nav.addEventListener('click', closeMobileMenu);
mobileMenu.addEventListener('click', closeMobileMenu);

function mobileMenuToggle() {
  mobileMenu.classList.toggle('header__navigation--visible');
  btnBurger.classList.toggle('header__burger--rotated');
  logo.classList.toggle('logo--mobile');
}

function closeMobileMenu(event) {
  if (event.target.tagName === 'A' || event.target.tagName === 'NAV') {
    mobileMenu.classList.remove('header__navigation--visible');
    btnBurger.classList.remove('header__burger--rotated');
    logo.classList.remove('logo--mobile');
  }
}
