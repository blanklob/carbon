import * as d3 from 'd3'
import colors from 'App/utils/colors'

const settings = {
  DIAMETRE: 280,
  RADIUS: 140,
  ARIA: Math.floor(Math.PI * 140 * 140),
  STROKE: 2,
}

class GraphByType {
  constructor(el) {
    this.element = document.querySelector(el)
    this.animation = {
      duration: 800,
    }

    this.svg = d3
      .select(this.element)
      .append('svg')
      .attr('width', settings.DIAMETRE)
      .attr('height', settings.DIAMETRE)

    this.render()
  }

  render() {
    this.background = this.svg
      .append('circle')
      .attr('transform', `translate(${settings.RADIUS},${settings.RADIUS})`)
      .attr('r', settings.RADIUS - settings.STROKE / 2)
      .attr('fill', colors.green)
      .attr('stroke', colors.black)
      .attr('stroke-width', settings.STROKE)

    this.foreground = this.svg
      .append('circle')
      .attr('cx', settings.RADIUS)
      .attr('fill', colors.yellow)
      .attr('stroke', colors.black)
      .attr('stroke-width', settings.STROKE)

    this.text = this.svg
      .append('text')
      .attr('x', settings.RADIUS - 15)
      .attr('class', 'headline-h4')
      .style('opacity', 0)
  }

  update(dPercentage) {
    let newArea = (settings.ARIA * dPercentage) / 100
    this.foreground
      .attr('cy', (d) => {
        return settings.DIAMETRE - Math.sqrt(newArea / Math.PI)
      })
      .transition()
      .duration(this.animation.duration)
      .attr('r', (d) => {
        return Math.sqrt(newArea / Math.PI) - settings.STROKE / 2
      })

    this.text
      .text((d) => dPercentage + '%')
      .attr('y', settings.DIAMETRE - Math.sqrt(newArea / Math.PI) + 8)
      .transition()
      .duration(this.animation.duration * 1.2)
      .style('opacity', 1)

    return this
  }
}

class GraphByScore {
  constructor(el) {
    this.element = document.querySelector(el)
    this.curColor = null
    this.arcWidth = 40
    this.maxValue = 100
    this.animation = {
      duration: 800,
    }

    this.svg = d3
      .select(this.element)
      .append('svg')
      .attr('width', settings.DIAMETRE)
      .attr('height', settings.DIAMETRE)
      .append('g')
      .attr('transform', `translate(${settings.RADIUS},${settings.RADIUS})`)

    this.render()
  }

  deg2rad(deg) {
    return (deg * Math.PI) / 180
  }

  color(val) {
    let colorRange = this.maxValue / 5
    if (val > colorRange * 3) return colors.red
    else if (val > colorRange * 2) return colors.orange
    else return colors.green
  }

  render() {
    this.arc = d3
      .arc()
      .innerRadius(settings.RADIUS - this.arcWidth - settings.STROKE / 2)
      .outerRadius(settings.RADIUS - settings.STROKE / 2)
      .startAngle(this.deg2rad(-120))

    this.background = this.svg
      .append('path')
      .datum({
        endAngle: this.deg2rad(120),
      })
      .style('fill', colors.gray)
      .attr('d', this.arc)

    this.foreground = this.svg
      .append('path')
      .datum({
        endAngle: this.deg2rad(-120),
      })
      .style('fill', this.curColor)
      .attr('stroke', colors.black)
      .attr('stroke-width', settings.STROKE)
      .attr('d', this.arc)

    this.text = this.svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('class', 'headline-h4')

    this.update(0)
  }

  update(val) {
    let valToAngle = this.deg2rad(Math.floor((val * 240) / this.maxValue - 120))
    let valToColor = this.color(val),
      hold

    this.text.transition().text(val + 'gCO2')

    hold = this.curColor
    this.curColor = valToColor
    valToColor = hold

    this.foreground
      .transition()
      .duration(this.animation.duration)
      .styleTween('fill', () => {
        return d3.interpolate(valToColor, this.curColor)
      })
      .call((transition, newAngle) => {
        transition.attrTween('d', (d) => {
          let inter = d3.interpolate(d.endAngle, newAngle)
          return (t) => {
            d.endAngle = inter(t)
            return this.arc(d)
          }
        })
      }, valToAngle)
  }
}

class GraphBySource {
  constructor(el) {
    this.element = document.querySelector(el)
    this.animation = {
      duration: 800,
    }
    this.svg = d3
      .select(this.element)
      .append('svg')
      .attr('width', settings.DIAMETRE)
      .attr('height', settings.DIAMETRE)
  }

  update(data) {
    this.data = [
      { percentage: data.green, color: colors.green },
      { percentage: data.yellow, color: colors.yellow },
      { percentage: data.red, color: colors.red },
    ]

    const pie = d3.pie().value((d) => {
      return d.percentage
    })(this.data)

    this.segment = d3
      .arc()
      .innerRadius(0)
      .outerRadius(settings.RADIUS - settings.STROKE / 2)
      .padAngle(0)
      .padRadius(10)

    this.svg
      .append('g')
      .attr('transform', `translate(${settings.RADIUS},${settings.RADIUS})`)
      .selectAll('path')
      .data(pie)
      .enter()
      .append('path')
      .attr('stroke', colors.black)
      .attr('stroke-width', settings.STROKE)
      .attr('fill', (d) => d.data.color)
      .attr('d', this.segment)
  }
}

export { GraphByType, GraphByScore, GraphBySource }
