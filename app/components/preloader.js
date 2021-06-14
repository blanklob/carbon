import Component from '../classes/Component'

export default class extends Component {
  constructor(element) {
    super(element)
    this.changeOpacity()
  }

  changeOpacity() {
    gsap.to(this.element, {
      duration: 2,
      opacity: 0,
      onComplete: () => {
        this.element.remove()
        document.getElementById('main').style.display = 'block'
      },
    })
  }
}
