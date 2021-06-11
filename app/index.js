import 'Styles/index.scss'
import Preloader from './components/preloader'
import './data/dataVisualisation'
import fetchData from './data/getData'
import registerServiceWoker from './utils/sw'


class App {
  constructor() {
    this.preloader = new Preloader('.preloader')
  }
}

// new App()

registerServiceWoker()

// Routage basique
document.querySelectorAll('.search__btn').forEach( item => {
  item.addEventListener('click', e => {
    // <Preloader hook>
    window.location.href = "/results"
  })
})

fetchData().then(data => {
  document.querySelector('.user__fullname').innerHTML = data[0].fullname
  document.querySelector('.score__rate').innerHTML = data[0].pollution
  document.querySelector('.score__note').innerHTML = data[0].pollutionNote
})
