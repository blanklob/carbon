import colors from 'App/utils/colors'

export default class Presentation {
  constructor() {
    this.element = {
      username: document.querySelector('.user__name'),
      fullname: document.querySelector('.user__fullname'),
      followers: document.querySelector('.user__followers'),
      following: document.querySelector('.user__followings'),
      score: document.querySelector('.score__rate'),
      note: document.querySelector('.score__note'),
      image: document.querySelector('.user__img'),
    }
  }

  rate(score) {
    if (score > 80) return ['Worse', colors.red]
    else if (score > 60) return ['Bad', colors.red]
    else if (score > 40) return ['Okay', colors.orange]
    else if (score > 20) return ['Good', colors.yellow]
    else return ['Excelent', colors.green]
  }

  update(data) {
    this.element.username.innerHTML = data.username
    this.element.fullname.innerHTML = data.fullname
    this.element.followers.innerHTML = data.followers
    this.element.following.innerHTML = data.following
    this.element.score.innerHTML = data.score
    this.element.score.style.setProperty(
      '--background',
      this.rate(data.score)[1]
    )
    this.element.note.innerHTML = this.rate(data.score)[0]
    this.element.image.src = data.imageUrl
  }
}
