import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

function StudentStats() {
  const history = useNavigate();
  const gg = JSON.parse(localStorage.getItem("user"));
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7018/api/quiz/getAllQuizzes`,
          {
            headers: {
              Authorization: "Bearer " + gg?.accessToken, // ✅ Use optional chaining
            },
          }
        );
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    if (gg?.accessToken) {
      fetchData();
    }
  }, [gg?.accessToken]); 

  return (
    <>
      <AdminNavbar />
      <h1 className="stats" style={{ marginLeft: "471px", marginTop: "74px" }}>
        Welcome to Quiz Stats, Admin!
      </h1>
      
     
      <div style={{ textAlign: "right", marginRight: "20px" }}>
        <Button variant="secondary" onClick={() => history("/Admin-page")}>
          🔙 Back to Admin Page
        </Button>
      </div>

      <div className="quizzy" style={{ marginTop: "40px", marginLeft: "13px" }}>
        {Data.length === 0 ? (
          <h1
            className="nothing"
            style={{ marginLeft: "492px", marginTop: "139px", color: "red" }}
          >
            No quizzes created as of now.
          </h1>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Quiz Name</TableCell>
                  <TableCell align="right">Stats</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Data.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.heading}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="primary"
                        onClick={() => history("/quiz-stats", { state: { tem: item } })}
                      >
                        📊 View Stats
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default StudentStats;
