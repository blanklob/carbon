import Preloader from './components/preloader'
import registerServiceWoker from './utils/sw'

class App {
  constructor() {
    this.preloader = new Preloader('.preloader')
  }
}

registerServiceWoker()

// Routage basique
document.querySelectorAll('.search__btn').forEach((item) => {
  item.addEventListener('click', (e) => {
    // <Preloader hook>
    window.location.href = '/results'
  })
})
