import { gsap as animate } from 'gsap'


export default class Animation {
  constructor(element, duration) {
    this.element = element
    this.duration = duration
    this.showElement()
  }

  showElement() {
    animate.to(this.element, {
      duration: this.duration,
      opacity: 100
    })
  }
}
