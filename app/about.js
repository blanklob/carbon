import registerServiceWoker from 'App/utils/sw'
import Preloader from 'App/components/preloader'


new Preloader('.preloader', 800)
registerServiceWoker()

console.log('hello from about/privacy/error pages.')
