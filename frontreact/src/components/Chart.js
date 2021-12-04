import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const Chart = ({ width = 600, height = 600, data }) => {
  const barChart = useRef();

  useEffect(() => {
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = d3.select(barChart.current);
    svg.attr('width', width);
    svg.attr('height', height);

    let g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, 500]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d._id))
      .range([0, iwidth])
      .padding(0.1);

    // Continue with implementation. Don't forget the tooltip

    const bars = g.selectAll("rect").data(data);

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.9)')
      .style('border-radius', '4px')
      .style('color', '#fff')
      .text('a simple tooltip');

    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "green")
      .attr("x", (d) => x(d._id))
      .attr("y", (d) => y(d.stock))
      .attr("height", (d) => iheight - y(d.stock))
      .attr("width", x.bandwidth())
      .on('mouseover', function (d, i) {
        tooltip
          .html(
            `<div>Name: ${d.target.__data__.name}</div><div>Stock: ${d.target.__data__.stock}</div>`
          )
          .style('visibility', 'visible');
      }).on('mousemove', function (e) {
        tooltip
          .style('top', e.pageX - 1 + 'px')
          .style('left', e.pageY + 1 + 'px');
      })
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden');
      });

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
  });

  return (
    <div id='chartArea'>
      <svg ref={barChart}></svg>
    </div>
  );
};
