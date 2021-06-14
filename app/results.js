import './data/dataVisualisation'
import fetchData from './data/getData'
import registerServiceWoker from './utils/sw'

registerServiceWoker()

fetchData().then((data) => {
  document.querySelector('.user__fullname').innerHTML = data[0].fullname
  document.querySelector('.score__rate').innerHTML = data[0].pollution
  document.querySelector('.score__note').innerHTML = data[0].pollutionNote
})
