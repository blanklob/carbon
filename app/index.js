import registerServiceWoker from './utils/sw'

// registerServiceWoker()

// Routage basique
document.querySelectorAll('.search__btn').forEach((item) => {
  item.addEventListener('click', (e) => {
    // <Preloader hook>
    window.location.href = '/results'
  })
})
