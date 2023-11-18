import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function AdminpageAdmin() {
  const [inputFormat, setInputFormat] = useState([
    {
      id: 1,
      title: "For monday",
    },
    {
      id: 2,
      title: "For tuesday",
    },
    {
      id: 3,
      title: "For wednesday",
    },
    {
      id: 4,
      title: "For thursday",
    },
    {
      id: 5,
      title: "For friday",
    },
    {
      id: 6,
      title: "Time interval for each period",
    },
  ]);

  const [semester, setSemesterName] = useState("");
  const [mondaySubject, setMondaySubject] = useState(Array(7).fill(""));
  const [tuesdaySubject, setTuesdaySubject] = useState(Array(7).fill(""));
  const [wednesdaySubject, setWednesdaySubject] = useState(Array(7).fill(""));
  const [thursdaySubject, setThursdaySubject] = useState(Array(7).fill(""));
  const [fridaySubject, setFridaySubject] = useState(Array(7).fill(""));
  const [timeInterval, setTimeInterval] = useState(Array(7).fill(""));

  const handleInputChange = (day, index, newValue) => {
    switch (day) {
      case "For monday":
        setMondaySubject((prev) => {
          const copy = [...prev];
          copy[index] = newValue;
          return copy;
        });
        break;
      case "For tuesday":
        setTuesdaySubject((prev) => {
          const copy = [...prev];
          copy[index] = newValue;
          return copy;
        });
        break;
      case "For wednesday":
        setWednesdaySubject((prev) => {
          const copy = [...prev];
          copy[index] = newValue;
          return copy;
        });
        break;
      case "For thursday":
        setThursdaySubject((prev) => {
          const copy = [...prev];
          copy[index] = newValue;
          return copy;
        });
        break;
      case "For friday":
        setFridaySubject((prev) => {
          const copy = [...prev];
          copy[index] = newValue;
          return copy;
        });
        break;
      case "Time interval for each period":
        setTimeInterval((prev) => {
          const copy = [...prev];
          copy[index] = newValue;
          return copy;
        });
        break;
      default:
        break;
    }
  };
  const [subjectNames, setSubjectNames] = useState(
    Array.from({ length: 8 }, () => "")
  );

  const [facultyNames, setFacultyNames] = useState(
    Array.from({ length: 8 }, () => "")
  );
    const [deleteSemester, setDeleteSemester] = useState(" ");

    const handleSubjectNameChange = (index, value) => {
      const newSubjectNames = [...subjectNames];
      newSubjectNames[index] = value;
      setSubjectNames(newSubjectNames);
    };

    const handleFacultyNameChange = (index, value) => {
      const newFacultyNames = [...facultyNames];
      newFacultyNames[index] = value;
      setFacultyNames(newFacultyNames);
    };

    const sendDataToServer = async () => {
      try {
        const lowerCaseSemesterName = semester.toLowerCase();
        const data = inputFormat.map((item, dayIndex) => {
          return {
            timeperiod: timeInterval[dayIndex],
            monday: mondaySubject[dayIndex],
            tuesday: tuesdaySubject[dayIndex],
            wednesday: wednesdaySubject[dayIndex],
            thursday: thursdaySubject[dayIndex],
            friday: fridaySubject[dayIndex],
          };
        });
        data.push({
          timeperiod: timeInterval[6],
          monday: mondaySubject[6],
          tuesday: tuesdaySubject[6],
          wednesday: wednesdaySubject[6],
          thursday: thursdaySubject[6],
          friday: fridaySubject[6],
        });
        console.log(data);
        await axios.post(
          "http://localhost:5000/insert-timeperiod",
          { semester: lowerCaseSemesterName, data },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const subAndFacultyData = Array.from({ length: 8 }, (_, subIndex) => {
          const id = subIndex + 1;
          return {
            id,
            subject: subjectNames[subIndex],
            faculty: facultyNames[subIndex],
          };
        });
        console.log(subAndFacultyData);
        await axios.post(
          "http://localhost:5000/insert-subandfaculty",
          { subAndFacultyData, semester: lowerCaseSemesterName },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(subAndFacultyData);
        console.log("Data sent successfully");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    const handleDelete = async () => {
      try {
        const deletedata = { semester: deleteSemester };
        await axios.delete("http://localhost:5000/deletetable", {
          data: deletedata,

          headers: { "Content-Type": "application/json" },
        });
        console.log("SUCCESSFULLY DELETED");
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>Admin</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 20,
            }}
          >
            <h3>Enter the semester:</h3>
            <TextField
              id="standard-basic"
              variant="standard"
              style={{ paddingTop: 8 }}
              value={semester}
              onChange={(e) => setSemesterName(e.target.value)}
            />
          </div>
          {inputFormat.map((item, dayIndex) => (
            <div key={item.id}>
              <h3>{item.title}:</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                  justifyContent: "space-between",
                  paddingLeft: 25,
                  paddingRight: 25,
                }}
              >
                {Array(7)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: 10,
                      }}
                    >
                      <h3>{index + 1}:</h3>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        style={{ width: 60, paddingTop: 8 }}
                        value={
                          item.title === "For monday"
                            ? mondaySubject[index]
                            : item.title === "For tuesday"
                            ? tuesdaySubject[index]
                            : item.title === "For wednesday"
                            ? wednesdaySubject[index]
                            : item.title === "For thursday"
                            ? thursdaySubject[index]
                            : item.title === "For friday"
                            ? fridaySubject[index]
                            : timeInterval[index]
                        }
                        onChange={(e) =>
                          handleInputChange(item.title, index, e.target.value)
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <h3>Subject name and Faculty name: </h3>
        {Array.from({ length: 8 }, (_, subIndex) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 200,
              justifyContent: "space-evenly",
            }}
            key={subIndex}
          >
            <div
              style={{ display: "flex", flexDirection: "row", columnGap: 10 }}
            >
              <h3>Subject name {subIndex + 1}: </h3>
              <TextField
                id={`subjectName${subIndex + 1}`}
                variant="standard"
                style={{ paddingTop: 8 }}
                value={subjectNames[subIndex]}
                onChange={(e) =>
                  handleSubjectNameChange(subIndex, e.target.value)
                }
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", columnGap: 10 }}
            >
              <h3>Faculty name: </h3>
              <TextField
                id={`facultyName${subIndex + 1}`}
                variant="standard"
                style={{ paddingTop: 8 }}
                value={facultyNames[subIndex]}
                onChange={(e) =>
                  handleFacultyNameChange(subIndex, e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="button3" onClick={sendDataToServer}>
            <span className="button-content" style={{ fontSize: 19 }}>
              Submit
            </span>
          </button>
        </div>
        <h2>TO DELETE:</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 20,
            }}
          >
            <h3>Enter the semester:</h3>
            <TextField
              id="standard-basic"
              variant="standard"
              style={{ paddingTop: 8 }}
              onChange={(e) => setDeleteSemester(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="button3" onClick={handleDelete}>
              <span className="button-content" style={{ fontSize: 19 }}>
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    );
}
