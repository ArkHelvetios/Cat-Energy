const navigation = document.querySelector('.navigation');
const navToggle = navigation.querySelector('.navigation__toggle');

navigation.classList.remove('navigation--nojs');

navToggle.addEventListener('click', () => {
  navigation.classList.toggle('navigation--active')
});
