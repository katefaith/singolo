const nav = document.querySelector('#navigation');

nav.addEventListener('click', menuSwitcher)

function menuSwitcher(event) {
  if (event.target.tagName === 'A') {
    nav.querySelectorAll('a').forEach(a => {
      a.classList.remove('navigation__link--active');
    });
    event.target.classList.add('navigation__link--active');
  }
}
