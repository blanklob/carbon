export default class Component {
  constructor(selector) {
    this.element = document.querySelector(selector)
    this.data = this.element.dataset
  }
}
