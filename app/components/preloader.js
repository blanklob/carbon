export default class Preloader {
  constructor(selector, duration) {
    console.log('executed')
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
        document.getElementById('main').style.display = 'block'
      },
    })
  }
}
