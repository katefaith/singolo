const nav = document.querySelector('#navigation');
const tags = document.querySelector('#tags');
const portfolioList = document.querySelector('#portfolio-list');

nav.addEventListener('click', menuSwitcher);
tags.addEventListener('click', tagsSwitcher);

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
  arrNodes.unshift(arrNodes.pop());

  portfolioList.innerHTML = '';
  arrNodes.forEach(node => {
    portfolioList.append(node)
  })
}
