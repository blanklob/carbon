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

    this.text1 = this.svg
      .append('text')
      .attr('x', settings.RADIUS)
      .attr('text-anchor', 'middle')
      .attr('class', 'headline-h4')
      .style('opacity', 0)

    this.text2 = this.svg
      .append('text')
      .attr('x', settings.RADIUS)
      .attr('text-anchor', 'middle')
      .attr('class', 'headline-h4')
      .style('opacity', 0)
  }

  update(dPercentage) {
    let newArea = (settings.ARIA * dPercentage) / 100
    if (dPercentage < 3) newArea = (settings.ARIA * 5 * dPercentage) / 100
    this.foreground
      .attr('cy', (d) => {
        return settings.DIAMETRE - Math.sqrt(newArea / Math.PI)
      })
      .transition()
      .duration(this.animation.duration)
      .attr('r', (d) => {
        return Math.sqrt(newArea / Math.PI) - settings.STROKE / 2
      })

    this.text1
      .text((d) => {
        if (dPercentage < 3) return '<' + dPercentage + '%'
        else return dPercentage + '%'
      })
      .attr('y', settings.DIAMETRE - Math.sqrt(newArea / Math.PI) + 8)
      .transition()
      .duration(this.animation.duration * 1.2)
      .style('opacity', 1)

    this.text2
      .text((d) => {
        if (dPercentage > 70) return ''
        else return 100 - dPercentage + '%'
      })
      .attr('y', settings.DIAMETRE - 2 * Math.sqrt(newArea / Math.PI) + 8 - 30)
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
    this.maxValue = 1000
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

    this.text.transition().text((d) => {
      if (val > 999) return '+' + (val - 1) + 'geqCO2'
      else return val + 'geqCO2'
    })

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

    const arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(settings.RADIUS - settings.STROKE / 2)
      .padAngle(0)
      .padRadius(10)

    const parts = this.svg
      .append('g')
      .attr('transform', `translate(${settings.RADIUS},${settings.RADIUS})`)

    parts
      .selectAll('path')
      .data(pie)
      .enter()
      .append('path')
      .attr('stroke', colors.black)
      .attr('stroke-width', settings.STROKE)
      .attr('fill', (d) => d.data.color)
      .attr('d', arcGenerator)

    parts
      .append('g')
      .selectAll('text')
      .data(pie)
      .enter()
      .append('text')
      .each(function (d) {
        var centroid = arcGenerator.centroid(d)
        d3.select(this)
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('class', (d) => {
            if (d.data.percentage < 10) return 'headline-h5'
            return 'headline-h4'
          })
          .attr('text-anchor', 'middle')
          .text((d) => {
            if (d.data.percentage < 2) return ''
            return d.data.percentage + '%'
          })
      })
  }
}

class GraphByComparator {
  constructor(el) {
    this.element = document.querySelector(el)
    this.width = settings.DIAMETRE * 4
    this.height = settings.DIAMETRE * 2
    this.animation = {
      duration: 800,
    }
    this.svg = d3
      .select(this.element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
  }

  render(data) {
    this.svg
      .append('g')
      .attr('transform', `translate(80, -40)`)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 230)
      .attr('y', (d) => {
        if (d.value > 99) return this.height - 30 - (d.value / 110) * 3
        else return this.height - 30 - d.value * 1.5
      })
      .attr('width', 80)
      .attr('height', 0)
      .attr('rx', '10')
      .attr('fill', (d) => {
        if (d.value > 80) return colors.red
        else if (d.value > 40) return colors.yellow
        else return colors.green
      })

      .transition()
      .duration(this.animation.duration)
      .attr('height', (d) => {
        if (d.value > 99) return (d.value / 110) * 3
        else return d.value * 1.5
      })

    const textGroup1 = this.svg.append('g')
    const textGroup2 = this.svg.append('g')

    textGroup1
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => {
        return d.person
      })
      .attr('x', (d, i) => i * 230 + 120)
      .attr('y', this.height - 30)
      .attr('class', 'headline-h4')
      .attr('text-anchor', 'middle')

    textGroup2
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => {
        return d.value + ' geqCO2'
      })
      .attr('x', (d, i) => i * 230 + 120)
      .attr('y', this.height - 5)
      .attr('class', 'text-small')
      .attr('text-anchor', 'middle')
  }
}

export { GraphByType, GraphByScore, GraphBySource, GraphByComparator }
