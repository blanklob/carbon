console.log('Datavisualisation script starts here.')

const w = 270
const h = 270

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
const width = 450
const height = 450
const margin = 40

const svgBySource = d3.select(".dashboard__bysource")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var radius = Math.min(width, height) / 2 - margin

const datasetBySource = [ 64, 9, 27 ]

var color = d3.scaleOrdinal()
    .domain(datasetByType)
    .range(['#3EC865', '#D9EA75', '#EABB75']);

var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(datasetByType))

var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
  .startAngle(function(d) { return d.startAngle + Math.PI; })
  .endAngle(function(d) { return d.endAngle + Math.PI; });

svgBySource
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr('class', 'chart-data')
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

svgBySource
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.value + '%'})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)

// Graph III: Dialy Twitter
const svgDialyPollution = d3.select(".dashboard__dialypollution")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)



