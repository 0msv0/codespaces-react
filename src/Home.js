import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";

const Home = () => {
  const [registrations, setRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "https://f23nd6-3001.csb.app/api/get-user-list"
      );
      setRegistrations(response.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedRegistrations = registrations.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(registrations.length / itemsPerPage);

  const data = React.useMemo(
    () => paginatedRegistrations,
    [paginatedRegistrations]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: currentPage },
        manualPagination: true,
        pageCount,
      },
      usePagination
    );

  return (
    <div className="container">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="title" style={{ color: "red" }}>
          Home Page
        </h1>
        <div className="button-group">
          <Link to="/signup" className="btn btn-danger mx-3">
            SignUp
          </Link>
          <Link to="/search-user" className="btn btn-primary">
            Search
          </Link>
        </div>
      </div>
      <div className="registrations d-flex flex-column align-items-center">
        <h2 className="section-title">Users List</h2>
        <div className="table-container" style={{ width: "100%" }}>
          <table
            className="table table-bordered table-striped"
            style={{ width: "100%", borderCollapse: "collapse" }}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-container d-flex justify-content-center">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination justify-content-center mt-3"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Home;
