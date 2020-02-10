const hamburgerBtn = document.querySelector('.hamburger-btn')
const closeBtn = document.querySelector('.close-btn')
const menu = document.querySelector('.hamburger-menu-close')

hamburgerBtn.addEventListener('click', () => {
  menu.className = 'hamburger-menu-open'
})

closeBtn.addEventListener('click', () => {
  menu.className = 'hamburger-menu-close'
})