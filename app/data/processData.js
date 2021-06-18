const getDirectPbyIndirectP = (ByTypeData) => {
  let { pollutionDirect, pollutionIndirect } = ByTypeData

  let DPpercentage = Math.floor((100 * pollutionDirect) / pollutionIndirect)

  if (DPpercentage < 1) return 1
  else if (DPpercentage > 100) return 100
  else return DPpercentage
}

const getNumFollower = (num) => {
  if (num > 999999) return Math.floor(num / 1000000) + 'M '
  else if (num > 9999) return Math.floor(num / 10000) + 'K '
  else return Math.floor(num) + ' '
}

const getScore = (score) => {
  if (score > 100) return 99
  else if (score < 1) return 1
  else return Math.floor(score)
}

const getCO2 = (PD) => {
  if (PD > 1000) return 1000
  else return Math.floor(PD)
}

const getBySource = (graphBySourceData) => {
  let { texts, images } = graphBySourceData
  let text = Math.floor(texts)
  let image = Math.floor(images)
  return {
    text: text,
    image: image,
    video: 100 - text - image,
  }
}

export { getNumFollower, getDirectPbyIndirectP, getScore, getBySource, getCO2 }
