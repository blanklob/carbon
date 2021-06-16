import Router from "App/classes/router"
import registerServiceWoker from 'App/utils/sw'
import getUsername from 'App/data/getUsername'
// registerServiceWoker()


getUsername()
new Router('.search__btn', '/results')
new Router('.header__cta-btn', '/')
