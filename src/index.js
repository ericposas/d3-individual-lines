import * as d3 from 'd3'
import random from 'random'
import './style.scss'


window.linetest = () => {
	let svg = d3.select('svg')

	let data = new Array(random.int(10, 50))
	.fill(1)
	.map(a => {
		return {
			x: random.int(1, 1000),
			y: random.int(1, 1000)
		}
	})
	.sort((a, b) => b.x - a.x)

	let scX = d3.scaleLinear()
	.domain(d3.extent(data, d => d['x']))
	.range([600, 0])

	let scY = d3.scaleLinear()
	.domain(d3.extent(data, d => d['y']))
	.range([500, 0])

	let g = svg.append('g')

	g
	.selectAll('line')
	.data(data).enter()
	.append('line')
	.attr('x1', (d, i) => i < 1 ? 0 : scX(data[i-1]['x']))
	.attr('y1', (d, i) =>  i < 1 ? 0 : scY(data[i-1]['y']))
	.attr('x2', d => scX(d['x']))
	.attr('y2', d => scY(d['y']))
	.transition().duration(1000).delay((d, i) => i * 50)
	.attr('stroke', '#000')
	.attr('stroke-width', 2)

	g
	.selectAll('circle')
	.data(data).enter()
	.append('circle')
	.attr('fill', 'green').attr('r', 1)
	.attr('cx', d => scX(d['x']))
	.attr('cy', d => scY(d['y']))
	.transition().duration(1000).ease(d3.easeCubic).delay((d, i) => i * 25)
	.attr('r', 5)

}

window.ht = () => {
	let svg = d3.select('svg')

	let ht = svg.append('g').append('path')
	.attr('fill', 'none')
	.attr('stroke', 'red')
	.attr('stroke-width', 3)
	.attr('transform', 'rotate(225, 235, 145)')
	.attr('d', `M0 200 v-200 h200
    a100,100 90 0,1 0,200
    a100,100 90 0,1 -200,0
    z`)

	let totalLen = ht.node().getTotalLength()

	ht
	.attr('stroke-dasharray', totalLen + ' ' + totalLen)
	.attr('stroke-dashoffset', totalLen)
	.transition().duration(5000).ease(d3.easeLinear)
	.attr('stroke-dashoffset', 0)

}
