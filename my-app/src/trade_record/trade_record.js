import React from "react";
import Database from "../firebase";
import { useTable } from "react-table";

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

function LoadingPage(props) {
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-600 opacity-75 flex flex-col items-center justify-center">
      <div class=" flex justify-center items-center">
        <div class="animate-spin rounded-full h-24 w-24 mb-8 border-b-2 border-white"></div>
      </div>
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
    </div>
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
