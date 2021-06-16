import {
  GraphByType,
  GraphByScore,
  GraphBySource
} from 'App/data/dashboards'
import Presentation from 'App/components/presentation'
import Router from "App/classes/router"


new GraphByType('.dashboard__bytype').update(30)
new GraphByScore('.dashboard__byscore').update(80)
new GraphBySource('.dashboard__bysource').update({green: 30, yellow: 30, red: 40})

new Presentation().update({
  username: 'younessidbakkasse',
  fullname: 'Youness Id bakkasse',
  followers: 340,
  following: 10,
  score: 80,
  imageUrl: 'https://images.unsplash.com/photo-1623475049193-0fe057ab80a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2897&q=80'
})

new Router('.header__cta-btn', '/')
