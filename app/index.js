import Preloader from './components/preloader'

class App {
  constructor() {
    this.preloader = new Preloader('.preloader')
  }
}

// Routage basique
document.querySelectorAll('.search__btn').forEach((item) => {
  item.addEventListener('click', (e) => {
    // <Preloader hook>
    window.location.href = '/results.html'
  })
})
