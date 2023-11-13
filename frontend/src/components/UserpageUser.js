import React from "react";
import "../styles/UserpageUser.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function UserpageUser() {
  const [semester, setSemester] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(searchResult);
  console.log(semester);
  console.log(facultyName);

  const handleSearch = async () => {
    try {
      const values = { semester, facultyName };
      const response = await axios.post(
        "http://localhost:5000/search",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "TimeTable";
    const headers = [
      [
        "ID",
        "TIME PERIOD",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
      ],
    ];

    const data = searchResult.map((elt) => [
      elt.id,
      elt.timeperiod,
      elt.monday,
      elt.tuesday,
      elt.wednesday,
      elt.thursday,
      elt.friday,
    ]);

    let content = {
      startY: 50,
      startX: 50,
      head: headers,
      body: data,
      styles: {
        cellWidth: "wrap",
        halign: "center",
      },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
      },
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  const data = React.useMemo(() => searchResult, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "TIME PERIOD",
        accessor: "timeperiod",
      },
      {
        Header: "MONDAY",
        accessor: "monday",
      },
      {
        Header: "TUESDAY",
        accessor: "tuesday",
      },
      {
        Header: "WEDNESDAY",
        accessor: "wednesday",
      },
      {
        Header: "THURSDAY",
        accessor: "thursday",
      },
      {
        Header: "FRIDAY",
        accessor: "friday",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: searchResult });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>USERS</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div className="Headings">
          <h3>Enter the Semester :</h3>
          <h3>Enter the Faculty name :</h3>
        </div>
        <div className="Textfield2">
          <TextField
            id="standard-basic"
            variant="standard"
            style={{ width: 350, paddingBottom: 10, paddingTop: 10 }}
            onChange={(e) => setSemester(e.target.value)}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            style={{ width: 350, paddingBottom: 20 }}
            onChange={(e) => setFacultyName(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button class="button3" onClick={handleSearch}>
              <span class="button-content" style={{ fontSize: 19 }}>
                Find
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <table {...getTableBodyProps()}>
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button class="button3" onClick={exportPDF}>
          <span class="button-content" style={{ fontSize: 19 }}>
            DOWNLOAD
          </span>
        </button>
      </div>
    </div>
  );
}
