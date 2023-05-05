const burger = document.getElementById('burger');
const header = document.getElementById('header');
const inMenuBurger = document.getElementById('inMenuBurger')

burger.addEventListener('click', () => {
  header.classList.remove('invisible');
  inMenuBurger.classList.remove('hidden');
  inMenuBurger.classList.add('flex');
});

inMenuBurger.children[0].addEventListener('click', () => {
  header.classList.add('invisible');
  inMenuBurger.classList.remove('flex');
  inMenuBurger.classList.add('hidden');
  console.log("premuto");
});
