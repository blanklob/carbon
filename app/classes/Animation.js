export default class Animation {
  constructor(element, duration) {
    this.element = element
    this.duration = duration
    this.showElement()
  }

  showElement() {
    gsap.to(this.element, {
      duration: this.duration,
      opacity: 100,
    })
  }
}
