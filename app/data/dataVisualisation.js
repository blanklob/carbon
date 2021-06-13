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
const datasetBySource=[{percentage:64 ,color:"#3EC865"},
                      {percentage:10 ,color:"#EABB75"},
                      {percentage:26  ,color:"#D9EA75"}];

const svgBySource = d3.select(".dashboard__bysource")
                      .append("svg")
                      .attr("width",w)
                      .attr("height",h)
const pie_chart = d3.pie().value(function(d){return d.percentage;})(datasetBySource);

const segments = d3.arc()
                   .innerRadius(0)
                   .outerRadius(h/2 -1)
                   .padAngle(.05)
                   .padRadius(10);

const parts = svgBySource.append("g").attr("transform","translate(" + w/2 +"," + h/2 +")")
                         .selectAll("path").data(pie_chart);
parts.enter().append("path")
             .attr("d", segments)
             .attr('stroke','#000000')
             .attr('stroke-width','2px')
             .attr('fill',d => d.data.color)

const indice = d3.select("g")
                 .selectAll("text").data(pie_chart);
indice.enter().append("text").each(function(d){
const center = segments.centroid(d);
d3.select(this).attr("x",center[0]).attr("y",center[1])
               .attr("text-anchor", "middle")
               .attr('class', 'headline-h4')
               .text(d.data.percentage + "%");
});

// Graph III: Dialy Twitter
const svgDialyPollution = d3.select(".dashboard__dialypollution")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)



