import 'Styles/index.scss'
import Preloader from './components/preloader'
import './data/dataVisualisation'
import fetchData from './data/getData'


class App {
  constructor() {
    this.preloader = new Preloader('.preloader')
  }
}

new App()



// Routage basique
document.querySelectorAll('.search__btn').forEach( item => {
  item.addEventListener('click', e => {
    // <Preloader hook>
    window.location.href = "/results.html"

  })
})

fetchData().then(data => {
  document.querySelector('.user__fullname').innerHTML = data[0].fullname
})
