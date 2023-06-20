import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";

const Home = () => {
  const [registrations, setRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(
        "https://0msv0-crispy-space-orbit-4vpp59w6x6q2794r-3001.preview.app.github.dev/api/registrations"
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
      <h1>Welcome to the Home Page</h1>
      <p>Click the link below to register:</p>
      <Link to="/register" className="btn btn-primary">
        Register
      </Link>

      <Link to="/all-register" className="btn btn-primary">
        List All Of Registers
      </Link>
      <h1 className="text-center mt-4">Registrations</h1>
      <table
        className="table table-bordered table-striped"
        {...getTableProps()}
      >
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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
  );
};

export default Home;
