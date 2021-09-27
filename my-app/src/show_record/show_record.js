import React from "react";
import Database from "../firebase";
import { LoadingPage } from "../helper/loading_page";
import { VegaLite } from 'react-vega'

const spec = {
  width: 800,
  height: 500,
  mark: 'line',
  encoding: {
    x: {
      "field": "Date",
      "type": "temporal",
      "axis": {
        "format": "%Y %b",
        "ticks": 50
      }
    },
    y: { field: 'money', type: 'quantitative' },
  },
  data: { name: 'table' }, // note: vega-lite data attribute is a plain object instead of an array
  transform: [
    { "calculate": "datum.date", "as": "strYMD" },
    { "calculate": "parseInt(substring(datum.strYMD, 0, 4))", "as": "intYear" },
    { "calculate": "parseInt(substring(datum.strYMD, 4, 6) - 1)", "as": "intMonth" },
    { "calculate": "parseInt(substring(datum.strYMD, 6))", "as": "intDay" },
    { "calculate": "datetime(datum.intYear, datum.intMonth, datum.intDay)", "as": "Date" },
  ]
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
    const data = this.db.getArrangeData();
    const line_data = { table: data };
    return data.length === 0 ? <LoadingPage /> : <VegaLite spec={spec} data={line_data} />;
  }
}
