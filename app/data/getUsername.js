export default function () {
  let input = document.querySelector('.search__input')
  let btns = document.querySelectorAll('.search__btn')

  btns.array.forEach(btn => {
    btn.onclick = () => {
      window.localStorage.setItem('username', input.value)
    }
  })
}
