import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, Tooltip as BarTooltip, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts"; // Added for pie chart
import Navbar from "../Navbar/Navbar";
import "./ScoresPage.css";

function ScorePage() {
  const gg = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:7018/api/quiz/getAllScores`, {
          headers: { Authorization: "Bearer " + gg.accessToken },
        });
        console.log("API Response:", result.data);
        setData(result.data || []);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setError("Failed to fetch scores. Please try again later.");
      }
    };

    if (gg?.accessToken) fetchData();
    else setError("You are not logged in. Please log in to view your scores.");
  }, [gg?.accessToken]);

  const processData = () => {
    // Group scores by quiz and user
    const groupedByQuizAndUser = new Map();
    
    // First, group all scores by quiz and user
    data.forEach((item) => {
      const key = `${item.quizname || "Unknown Quiz"}-${item.username}`;
      if (!groupedByQuizAndUser.has(key)) {
        groupedByQuizAndUser.set(key, []);
      }
      groupedByQuizAndUser.get(key).push(item);
    });
    
    // Process each group to remove duplicates and assign attempt numbers
    const processedData = [];
    
    groupedByQuizAndUser.forEach((attempts, key) => {
      const [quizname] = key.split("-");
      
      // Sort attempts by ID to ensure consistent ordering
      attempts.sort((a, b) => a.id - b.id);
      
      // Remove duplicates based on score value
      const uniqueAttempts = [];
      const seenScores = new Set();
      
      attempts.forEach(attempt => {
        // Create a unique key for this attempt based on score
        const scoreKey = `${attempt.score}`;
        
        // Only add if we haven't seen this score before
        if (!seenScores.has(scoreKey)) {
          seenScores.add(scoreKey);
          uniqueAttempts.push(attempt);
        }
      });
      
      // Now add each unique attempt with the correct attempt number
      uniqueAttempts.forEach((item, index) => {
        processedData.push({
          id: item.id,
          quizname,
          username: item.username,
          score: item.score,
          attemptNumber: index + 1,
        });
      });
    });
    
    // Sort by quiz name and then by attempt number
    processedData.sort((a, b) => {
      if (a.quizname !== b.quizname) {
        return a.quizname.localeCompare(b.quizname);
      }
      return a.attemptNumber - b.attemptNumber;
    });

    console.log("Processed Data:", processedData);
    return processedData;
  };

  const displayData = processData();

  // Pie Chart Data
  const pieData = displayData.length > 0 ? [
    { name: "Average Score", value: displayData.reduce((sum, item) => sum + item.score, 0) / displayData.length },
    { name: "Max Possible", value: 10 - (displayData.reduce((sum, item) => sum + item.score, 0) / displayData.length) },
  ] : [];

  // Bar Chart Data
  const barData = displayData.map(item => ({
    name: `${item.quizname} (Attempt ${item.attemptNumber})`,
    score: item.score,
  }));

  const COLORS = ["#3498db", "#e74c3c"];

  return (
    <>
      <Navbar />
      <div className="scorepage-container">
        <h1 className="scorepage-title">Your Quiz Scores</h1>
        {error ? (
          <h2 className="error-message">{error}</h2>
        ) : data.length === 0 ? (
          <h2 className="no-data-message">You haven't played any quiz yet.</h2>
        ) : (
          <div className="scorepage-content">
            {/* Pie Chart */}
            <div className="chart-section">
              <h3>Average Performance</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Bar Chart */}
            <div className="chart-section">
              <h3>Score Distribution</h3>
              <BarChart width={500} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <BarTooltip />
                <Bar dataKey="score" fill="#3498db" />
              </BarChart>
            </div>

            {/* Scores Table */}
            <div className="scores-table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="scores table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Quiz Name</TableCell>
                      <TableCell align="right">Attempt Number</TableCell>
                      <TableCell align="right">Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayData.map((item) => (
                      <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell component="th" scope="row">{item.quizname}</TableCell>
                        <TableCell align="right">{item.attemptNumber}</TableCell>
                        <TableCell align="right">{item.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ScorePage;