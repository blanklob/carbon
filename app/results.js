import {
  GraphByType,
  GraphByScore,
  GraphBySource,
  GraphByComparator
} from 'App/data/dashboards'
import Presentation from 'App/components/presentation'
import Router from "App/classes/router"
import fetchData from 'App/data/getData'


const data = fetchData(localStorage.getItem('username'))
.then(data => {
  let profile = data.dataTwitter[0]
  new Presentation().update({
    username: profile.surname,
    fullname: profile.name,
    followers: profile.followers,
    following: profile.following,
    score: 80,
    imageUrl: profile.profilPicUrl
  })
})


new GraphByType('.dashboard__bytype').update(90)
new GraphByScore('.dashboard__byscore').update(10)
new GraphBySource('.dashboard__bysource').update({green: 10, yellow: 30, red: 60})

new GraphByComparator('.dashboard__bycomparator').render([
  {person: 'You', value: 30},
  {person: 'Elon', value: 60},
  {person: 'Bezos', value: 90},
  {person: 'Macron', value: 120},
  {person: 'Emmanuel Macron', value: 160}
])




new Router('.header__cta-btn', '/')
