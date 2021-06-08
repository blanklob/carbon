import 'Styles/index.scss'
import Preloader from './components/preloader'
import registerServiceWoker from './utils/sw'

class App {
  constructor() {
    registerServiceWoker()
    this.preloader = new Preloader('.preloader')
  }
}

new App()

