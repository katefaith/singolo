const nav = document.querySelector('#navigation');
const tags = document.querySelector('#tags');
const portfolioList = document.querySelector('#portfolio-list');

nav.addEventListener('click', menuSwitcher);
tags.addEventListener('click', tagsSwitcher);
portfolioList.addEventListener('click', addBorderToImage);

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
