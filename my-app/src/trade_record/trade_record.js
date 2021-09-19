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

function Loading() {
  const load_style = {
    "font-size": "40px",
    display: "flex",
    "justify-content": "center",
  };
  return <p style={load_style} Data is loading></p>;
}

export default class TradeRecord extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
    this.fetch_data();
  }
  async fetch_data() {
    await this.db.fetchData();
    this.setState({ state: this.state });
  }
  get_col() {
    return [
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
    ];
  }
  render() {
    let cols = this.get_col();
    let data = this.db.getData();
    if (data.length === 0) {
      return <Loading></Loading>;
    } else {
      return <DataTable columns={cols} data={data}></DataTable>;
    }
  }
}
