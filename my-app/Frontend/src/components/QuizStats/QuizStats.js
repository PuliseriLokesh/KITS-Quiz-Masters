import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import Paper from "@mui/material/Paper";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // Import Chart.js components
import "./QuizStats.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function QuizStats() {
  const location = useLocation();
  const navigate = useNavigate();
  const gg = JSON.parse(localStorage.getItem("user"));
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:7018/api/quiz/ScoreForAQuiz/${location.state.tem.heading}`,
          {
            headers: {
              Authorization: `Bearer ${gg.accessToken}`,
            },
          }
        );
        setData(result.data);
      } catch (error) {
        console.error("Error fetching quiz scores:", error);
      }
    };

    if (gg?.accessToken && location?.state?.tem?.heading) {
      fetchData();
    }
  }, [gg?.accessToken, location?.state?.tem?.heading]);

  const handleDeleteScores = async () => {
    if (!location.state.tem.heading) {
      alert("Quiz name not found!");
      return;
    }

    if (window.confirm("Are you sure you want to delete all scores for this quiz?")) {
      try {
        await axios.delete(
          `http://localhost:7018/api/quiz/deleteScoresByQuizName/${location.state.tem.heading}`,
          {
            headers: {
              Authorization: `Bearer ${gg.accessToken}`,
            },
          }
        );
        alert("Scores deleted successfully!");
        setData([]);
        navigate("/Admin-page");
      } catch (error) {
        console.error("Error deleting quiz scores:", error.response?.data || error.message);
        alert("Failed to delete scores. Please try again.");
      }
    }
  };

  const passedCandidates = Data.filter((item) => item.number > 0);
  const failedCandidates = Data.filter((item) => item.number === 0);

  // Chart data
  const chartData = {
    labels: ["Passed", "Failed"],
    datasets: [
      {
        label: "Number of Candidates",
        data: [passedCandidates.length, failedCandidates.length],
        backgroundColor: ["#28a745", "#dc3545"], // Green for passed, Red for failed
        borderColor: ["#1e7e34", "#bd2130"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Passed vs Failed Candidates",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Candidates",
        },
      },
    },
  };

  return (
    <>
      <AdminNavbar />
      <div className="heading">
        <h1>All the students based on their ranks in this quiz:</h1>
        <p className="notice">
          Note: In case of a tie, the one who submitted first will be ranked higher.
        </p>
        <button className="delete-scores-btn" onClick={handleDeleteScores}>
          Delete All Scores
        </button>
      </div>

      {/* Chart Section */}
      <div className="chart-field">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="quizzy">
        <h2>Passed Candidates</h2>
        {passedCandidates.length === 0 ? (
          <h2 className="no-results">Nobody Passed the Quiz</h2>
        ) : (
          <div className="candidate-list">
            {passedCandidates.map((item, index) => (
              <Paper key={item.id} className="candidate-card">
                <h3 className="candidate-rank">Rank: {index + 1}</h3>
                <p className="candidate-username">Username: {item.username}</p>
                <p className="candidate-marks">Marks: {item.number}</p>
              </Paper>
            ))}
          </div>
        )}
      </div>

      <div className="failed">
        <h3>Failed Candidates</h3>
        {failedCandidates.length === 0 ? (
          <h2 className="no-results">Nobody Failed the Quiz</h2>
        ) : (
          <div className="candidate-list">
            {failedCandidates.map((item, index) => (
              <Paper key={item.id} className="candidate-card">
                <h3 className="candidate-rank">Rank: {index + 1}</h3>
                <p className="candidate-username">Username: {item.username}</p>
                <p className="candidate-marks">Marks: {item.number}</p>
              </Paper>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default QuizStats;