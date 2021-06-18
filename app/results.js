import {
  GraphByType,
  GraphByScore,
  GraphBySource,
  GraphByComparator
} from 'App/data/dashboards'
import Presentation from 'App/components/presentation'
import registerServiceWoker from 'App/utils/sw'
import fetchData from 'App/data/getData'
import {getDirectPbyIndirectP, getNumFollower, getScore, getBySource, getCO2} from 'App/data/processData'
import Preloader from 'App/components/preloader'

console.log('fkeo')

new Preloader('.preloader', 800)

registerServiceWoker()

fetchData(localStorage.getItem('username'))
.then(data => {
  const profile = data.userData

  const graphBySourceData = getBySource(data.dataEco.graphBySource)
  const graphByTypeData = data.dataEco.graphByType
  const graphByScoreData = data.dataEco.graphByScore

  new Presentation().update({
    username: profile.username,
    fullname: profile.fullname,
    followers: getNumFollower(profile.followers),
    following: getNumFollower(profile.following),
    score: getScore(profile.score),
    imageUrl: profile.imageUrl
  })

  new GraphByType('.dashboard__bytype').update(getDirectPbyIndirectP(graphByTypeData))

  // Not yet
  new GraphByScore('.dashboard__byscore').update(getCO2(graphByScoreData.pollutionDirect))

  new GraphBySource('.dashboard__bysource').update({
    green: graphBySourceData.text,
    yellow: graphBySourceData.image,
    red: graphBySourceData.video
  })
})
