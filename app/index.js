import Router from "App/classes/router"
import registerServiceWoker from 'App/utils/sw'
import getUsername from 'App/data/getUsername'
import {
  GraphByComparator
} from 'App/data/dashboards'

import Preloader from 'App/components/preloader'


new Preloader('.preloader', 800)

registerServiceWoker()


getUsername()
new Router('.search__btn', '/results')

const searchInput = document.querySelector('.search__input')
document.querySelector('.header__cta-btn')
.addEventListener('click', (e) => {
  searchInput.readOnly = false
  searchInput.focus()
})


new GraphByComparator('.dashboard__bycomparator').render([
  {person: 'Youness', value: 9},
  {person: 'Elon Musk', value: 15831},
  {person: 'Average', value: 76},
  {person: 'Cristiano', value: 12051},
  {person: 'pyc', value: 76}
])
