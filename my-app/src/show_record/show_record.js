import React from "react";
import * as d3 from "d3";
import Database from "../firebase";

function drawChart(svg, data) {
  const height = 500;
  const width = 500;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.date))
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear()
    .domain([d3.min(data, (d) => d.money), d3.max(data, (d) => d.money)])
    .rangeRound([height - margin.bottom, margin.top]);

  const xAxis = (g) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickValues(
          d3
            .ticks(...d3.extent(x.domain()), width / 40)
            .filter((v) => x(v) !== undefined)
        )
        .tickSizeOuter(0)
    );

  const y1Axis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .style("color", "steelblue")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y)
      );

  svg.select(".x-axis").call(xAxis);
  svg.select(".y-axis").call(y1Axis);

  var line = d3
    .line()
    .defined((d) => !isNaN(d.money))
    .x((d) => x(d.date))
    .y((d) => y(d.money));

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("d", line);

  console.log("hello");
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.myReference = React.createRef();
  }
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }

  update() {
    let svg = d3.select(this.myReference.current);
    drawChart(svg, this.props.data);
  }

  render() {
    return (
      <svg
        ref={this.myReference}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    );
  }
}

export default class ShowRecord extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
    this.fetch_data();
  }
  async fetch_data() {
    await this.db.fetchData();
    this.setState({ state: this.state });
  }
  render() {
    let data = this.db.getArrangeData();
    console.log(data);
    return <LineChart data={data}></LineChart>;
  }
}
