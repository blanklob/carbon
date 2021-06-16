import Router from "App/classes/router"
import registerServiceWoker from 'App/utils/sw'
registerServiceWoker()

new Router('.search__btn', '/results')
new Router('.header__cta-btn', '/')
