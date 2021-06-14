import * as d3 from 'd3'

const w = 280
const h = 280

// Graph I: By type
const datasetByType = [
  { type: 'Indirect', percentage: 30 },
  { type: 'Direct', percentage: 70 },
]

const svgByType = d3
  .select('.dashboard__bytype')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

svgByType
  .append('circle')
  .attr('cx', w / 2)
  .attr('cy', h / 2)
  .attr('r', h / 2 - 1)
  .attr('fill', '#3EC865')
  .attr('stroke', '#000000')
  .attr('stroke-width', '2px')

svgByType
  .append('circle')
  .data(datasetByType)
  .attr('cx', w / 2)
  .attr('cy', (d) => {
    return h - Math.sqrt(((((d.percentage / 100) * w) / 2) * w) / 2)
  })
  .attr('r', (d) => {
    return Math.sqrt(((((d.percentage / 100) * w) / 2) * w) / 2) - 1
  })
  .attr('fill', '#D9EA75')
  .attr('stroke', '#000000')
  .attr('stroke-width', '2px')

svgByType
  .selectAll('text')
  .data(datasetByType)
  .enter()
  .append('text')
  .text((d) => d.percentage + '%')
  .attr('class', 'headline-h4')
  .attr('x', w / 2 - 16)
  .attr('y', (d) => {
    if (d.type == 'Indirect') {
      return h - Math.sqrt(((((d.percentage / 100) * w) / 2) * w) / 2) + 6
    } else if (d.type == 'Direct') {
      return (1 - d.percentage / 100) * h
    } else {
      console.error('Type Error')
    }
  })

// Graph II: By source
const datasetBySource = [
  { percentage: 30, color: '#3EC865' },
  { percentage: 30, color: '#EABB75' },
  { percentage: 40, color: '#D9EA75' },
]

const svgBySource = d3
  .select('.dashboard__bysource')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

const pie_chart = d3.pie().value(function (d) {
  return d.percentage
})(datasetBySource)

const segments = d3
  .arc()
  .innerRadius(0)
  .outerRadius(h / 2 - 1)
  .padAngle(0.05)
  .padRadius(10)

const parts = svgBySource
  .append('g')
  .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
  .selectAll('path')
  .data(pie_chart)

parts
  .enter()
  .append('path')
  .attr('d', segments)
  .attr('stroke', '#000000')
  .attr('stroke-width', '2px')
  .attr('fill', (d) => d.data.color)

const indice = d3.select('g').selectAll('text').data(pie_chart)
indice
  .enter()
  .append('text')
  .each(function (d) {
    const center = segments.centroid(d)
    d3.select(this)
      .attr('x', center[0])
      .attr('y', center[1])
      .attr('text-anchor', 'middle')
      .attr('class', 'headline-h4')
      .text(d.data.percentage + '%')
  })

// Graph III: Dialy Twitter
let Gauge = function () {
  let config = {
    minValue: 0,
    maxValue: 100,
    transitionMs: 750,

    arcColorFn: function (value) {
      let ncolors = 5
      let colorRange = (this.maxValue - this.minValue) / ncolors
      let ticks = [
        {
          tick: colorRange * 0,
          color: '#3EC865',
          note: 'Thank you 😍',
        },
        {
          tick: colorRange * 2,
          color: '#D9EA75',
          note: 'You are doing okay 👍',
        },
        {
          tick: colorRange * 3,
          color: '#EA7575',
          note: 'You need to stop NOW 🤬',
        },
      ]
      let color, note
      ticks.forEach(function (tick) {
        if (value > tick.tick) {
          color = tick.color
          note = tick.note
          return
        }
      })
      return {
        color,
        note,
      }
    },
  }

  let foreground, arc, svg, current
  let cur_color, note
  let new_color, hold, new_note

  function deg2rad(deg) {
    return (deg * Math.PI) / 180
  }

  function render(value) {
    arc = d3
      .arc()
      .innerRadius(w / 2 - 41)
      .outerRadius(w / 2 - 1)
      .startAngle(deg2rad(-120))

    svg = d3
      .select('.dashboard__dialypollution')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .append('g')
      .attr('transform', 'translate(' + w / 2 + ',' + w / 2 + ')')

    // Append background arc to svg
    var background = svg
      .append('path')
      .datum({
        endAngle: deg2rad(120),
      })
      .attr('fill', '#555555')
      .attr('d', arc)

    // Append foreground arc to svg
    foreground = svg
      .append('path')
      .datum({
        endAngle: deg2rad(-120),
      })
      .style('fill', cur_color)
      .attr('stroke', '#000000')
      .attr('stroke-width', '2px')
      .attr('d', arc)

    // Display Current value
    current = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('class', 'headline-h4')

    note = svg
      .append('text')
      .attr('transform', 'translate(0 120)')
      .attr('text-anchor', 'middle')
      .attr('class', 'text-regular')
  }

  function update(value) {
    // Get new color
    new_color = config.arcColorFn(value).color
    new_note = config.arcColorFn(value).note

    let numPi = deg2rad(Math.floor((value * 240) / config.maxValue - 120))

    // Display Current value
    current.transition().text(value + 'gCO2')
    note.transition().text(new_note)

    // Arc Transition
    foreground
      .transition()
      .duration(config.transitionMs)
      .styleTween('fill', function () {
        return d3.interpolate(new_color, cur_color)
      })
      .call(arcTween, numPi)

    // Set colors for next transition
    hold = cur_color
    cur_color = new_color
    new_color = hold
  }

  // Update animation
  function arcTween(transition, newAngle) {
    transition.attrTween('d', function (d) {
      var interpolate = d3.interpolate(d.endAngle, newAngle)
      return function (t) {
        d.endAngle = interpolate(t)
        return arc(d)
      }
    })
  }

  render()
  update(0)

  return {
    update,
  }
}

let gauge = new Gauge()
gauge.update(80)

export { gauge }
