import React from "react";
import Database from "../firebase";
import { useTable } from "react-table";
import { LoadingPage } from "../helper/loading_page";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table className="table table-hover w-6/12 m-8 ml-auto mr-auto flex justify-center" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
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
    this.setState({ data: data, loading: false });
  }
  componentDidMount() {
    this.fetch_data();
  }
  render() {
    if (this.state.loading) {
      return <LoadingPage></LoadingPage>;
    } else {
      return <Table columns={this.state.cols} data={this.state.data}></Table>;
    }
  }
}
