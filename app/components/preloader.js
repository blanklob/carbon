export default class Preloader {
  constructor(selector, duration) {
    this.element = document.querySelector(selector)
    this.duration = duration
    this.changeOpacity()
  }

  changeOpacity() {
    gsap.to(this.element, {
      duration: 2,
      opacity: 0,
      onComplete: () => {
        this.element.remove()
        gsap.to('main', {
          duration: 0.7,
          opacity: 1,
        })
      },
    })
  }
}
