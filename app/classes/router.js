export default class Router {
  constructor(selector, newRoute) {
    this.btn = document.querySelector(selector)
    this.btn.addEventListener('click', (e) => {
      window.location.href = newRoute
    })
  }
}
