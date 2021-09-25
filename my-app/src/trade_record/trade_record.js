import React from "react";
import Database from "../firebase";
import { Styles, Table } from "./table";

function DataTable({ columns, data }) {
  //   const cols = React.useMemo(() => columns, []);
  const cols = React.useMemo(() => columns, [columns]);
  return (
    <Styles>
      <Table columns={cols} data={data} />
    </Styles>
  );
}

function Loading(props) {
  const load_style = {
    "fontSize": "40px",
    display: "flex",
    "justifyContent": "center",
  };
  return <p style={load_style}>{props.children}</p>;
}

export default class TradeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [
        {
          Header: "成交日",
          accessor: "date",
        },
        {
          Header: "股名",
          accessor: "ch_name",
        },
        {
          Header: "交易類別",
          accessor: "trade_type",
        },
        {
          Header: "成交價",
          accessor: "price",
        },
        {
          Header: "股數",
          accessor: "num",
        },
        {
          Header: "手續費",
          accessor: "fee",
        },
        {
          Header: "交易稅",
          accessor: "tax",
        },
      ],
      data: Array(0),
      loading: true
    }
    this.db = new Database();
  }
  async fetch_data() {
    await this.db.fetchData();
    const data = this.db.getData()
    this.setState({ data: data });
  }
  componentDidMount() {
    this.db.fetchData();
    const data = this.db.getData()
    this.setState({ data: data });
  }
  render() {
    if (this.state.data.length === 0) {
      return <Loading>Data is loading</Loading>;
    } else {
      return <DataTable columns={this.state.cols} data={this.state.data}></DataTable>;
    }
  }
}
