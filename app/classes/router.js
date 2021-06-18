export default class Router {
  constructor(selector, newRoute) {
    this.btns = document.querySelectorAll(selector)
    this.btns.forEach((item) => {
      item.addEventListener('click', (e) => {
        window.location.href = newRoute + '.html'
      })
    })
  }
}
