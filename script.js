const nav = document.querySelector('#navigation');
const tags = document.querySelector('#tags');
const portfolioList = document.querySelector('#portfolio-list');
const form = document.querySelector('#form');
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('.modal__overlay');
const btnClose = document.querySelector('#btn-close');
const btnSubmit = document.querySelector('#btn-submit');

nav.addEventListener('click', menuSwitcher);
tags.addEventListener('click', tagsSwitcher);
portfolioList.addEventListener('click', addBorderToImage);

// взаимодействия с с формой модальным окном
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

initSlider();

function menuSwitcher(event) {
  if (event.target.tagName === 'A') {
    nav.querySelectorAll('a').forEach(a => {
      a.classList.remove('navigation__link--active');
    });
    event.target.classList.add('navigation__link--active');
  }
}

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

function addBorderToImage(event) {
  if (event.target.tagName === 'IMG') {
    portfolioList.querySelectorAll('.portfolio__item').forEach(portfolioItem => {
      portfolioItem.classList.remove('portfolio__item--framed');
    });
    event.target.parentNode.classList.add('portfolio__item--framed')
  }
}

function initSlider() {
  const slides = document.querySelectorAll('.slider__slide');
  const btnNext = document.querySelector('.slider__arrow-next');
  const btnPrev = document.querySelector('.slider__arrow-prev');
  let currentSlide = 0;

  btnNext.addEventListener('click', showNextSlide);
  btnPrev.addEventListener('click', showPrevSlide);

  function showNextSlide() {
    goToSlide(currentSlide + 1);
  }

  function showPrevSlide() {
    goToSlide(currentSlide - 1);
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove('slider__slide--active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('slider__slide--active');
  }
}

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
