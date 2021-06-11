console.log('Datavisualisation script starts here.')

const w = 280
const h = 280

// Graph I: By type
const datasetByType = [
  {"type": "InDirect", "percentage": 60},
  {"type": "Direct", "percentage": 40}
]

const svgByType = d3.select(".dashboard__bytype")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)

const staticCircle = svgByType.append("circle")
  .attr("cx", w/2)
  .attr("cy", h/2)
  .attr("r", h/2 - 1)
  .attr('fill', '#3EC865')
  .attr('stroke', '#000000')
  .attr('stroke-width', '2px')

const dynamiqueCircle = svgByType.append("circle")
  .data(datasetByType)
  .attr("cx", w/2)
  .attr("cy", d => {
    return (h - d.percentage/100 * h/2) - 2
  })
  .attr("r", d => {
    return (d.percentage/100 * h/2) - 1
  })
  .attr('fill', '#D9EA75')
  .attr('stroke', '#000000')
  .attr('stroke-width', '2px')

const text = svgByType.selectAll('text')
  .data(datasetByType)
  .enter()
  .append('text')
  .text(d => d.percentage + "%")
  .attr('class', 'headline-h4')
  .attr('x', w/2 - 16)
  .attr('y', d => {
    if (d.type == "Direct") {
      return h/2 - (d.percentage/100 * h/2)
    } else {
      return h+5 - (d.percentage/100 * h/2)
    }
  })


// Graph II: By source
const svgBySource = d3.select(".dashboard__bysource")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)


// Graph III: Dialy Twitter
const svgDialyPollution = d3.select(".dashboard__dialypollution")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)



