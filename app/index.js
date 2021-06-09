import 'Styles/index.scss'
import Preloader from './components/preloader'

class App {
  constructor() {
    this.preloader = new Preloader('.preloader')
  }
}

new App()

