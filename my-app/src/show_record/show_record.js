import React from "react";
import * as d3 from "d3";
import Database from "../firebase";
import { LoadingPage } from "../helper/loading_page";

// function drawChart(svg, data) {
//   const height = 500;
//   const width = 800;
//   const margin = { top: 20, right: 30, bottom: 30, left: 60 };
//   const innerHeight = height - margin.bottom - margin.top;
//   const innerWidth = width - margin.right - margin.left;

//   console.log(d3.extent(data, (d) => d.money));
//   console.log(data.map((d) => d.date));

//   const x = d3
//     .scaleBand()
//     .domain(data.map((d) => d.date))
//     .range([innerWidth, 0]);

//   const y = d3
//     .scaleLinear()
//     .domain([d3.min(data, (d) => d.money), d3.max(data, (d) => d.money)])
//     .rangeRound([0, innerHeight]);

//   const xAxis = (g) =>
//     g
//       .attr(
//         "transform",
//         `translate(${margin.left},${height - margin.bottom + 10})`
//       )
//       .call(
//         d3
//           .axisBottom(x)
//           .tickValues(
//             d3
//               .ticks(...d3.extent(x.domain()), width / 40)
//               .filter((v) => x(v) !== undefined)
//           )
//           .tickSizeOuter(0)
//       );

//   const y1Axis = (g) =>
//     g
//       .attr("transform", `translate(${margin.left - 10},${margin.top})`)
//       .style("color", "steelblue")
//       .call(d3.axisLeft(y).ticks(null, "s"))
//       .call((g) =>
//         g
//           .append("text")
//           .attr("x", 0)
//           .attr("y", 10)
//           .attr("fill", "currentColor")
//           .attr("text-anchor", "start")
//           .text(data.y)
//       );

//   svg.select(".x-axis").call(xAxis);
//   svg.select(".y-axis").call(y1Axis);

//   var line = d3
//     .line()
//     .defined((d) => !isNaN(d.money))
//     .x((d) => x(d.date))
//     .y((d) => y(d.money));

//   svg
//     .select(".plot-area")
//     .append("path")
//     .datum(data)
//     .attr("fill", "none")
//     .attr("stroke", "steelblue")
//     .attr("stroke-width", 1.5)
//     .attr("stroke-linejoin", "round")
//     .attr("stroke-linecap", "round")
//     .attr("d", line);

//   svg
//     .select(".plot-area")
//     .selectAll("circle")
//     .data(data)
//     .join("circle")
//     .attr("cx", (d) => x(d.date))
//     .attr("cy", (d) => y(d.money))
//     .attr("r", 1)
//     .style("fill", "navy");

//   svg
//     .select(".plot-area")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   console.log("hello");
// }

// class LineChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.myReference = React.createRef();
//   }
//   componentDidMount() {
//     this.update();
//   }
//   componentDidUpdate() {
//     this.update();
//   }

//   update() {
//     let svg = d3.select(this.myReference.current);
//     drawChart(svg, this.props.data);
//   }

//   render() {
//     return (
//       <svg
//         ref={this.myReference}
//         style={{
//           height: 500,
//           width: "100%",
//           marginRight: "0px",
//           marginLeft: "0px",
//         }}
//       >
//         <g className="plot-area" />
//         <g className="x-axis" />
//         <g className="y-axis" />
//       </svg>
//     );
//   }
// }

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
    // console.log(data);
    // let line_chart = <LineChart data={data}></LineChart>;
    return data.length === 0 ? <LoadingPage /> : <p>hello</p>;
  }
}
