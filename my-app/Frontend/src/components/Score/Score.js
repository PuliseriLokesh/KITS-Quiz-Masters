import axios from "axios";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import gif from './celebration.gif'
import "./Score.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, heading_of_quiz, id, totalQuestions, attemptedQuestions, answers } = location.state || {};
  const [showSolutions, setShowSolutions] = useState(false);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    const saveScore = async () => {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      try {
        await axios.post(
          "http://localhost:7018/api/quiz/addScore",
          {
            username: user.username,
            quizId: id,
            quizname: heading_of_quiz,
            score: score,
            answers: answers // Include answers in the score submission
          },
          {
            headers: {
              Authorization: "Bearer " + user.accessToken,
            },
          }
        );
        console.log("Score saved successfully");
      } catch (error) {
        console.error("Error saving score:", error);
      }
    };

    if (score !== undefined) {
      saveScore();
    }
  }, [score, id, heading_of_quiz, answers]);

  // Bar chart data
  const barData = {
    labels: ["Score", "Total Questions"],
    datasets: [
      {
        label: "Quiz Performance",
        data: [score || 0, totalQuestions || 0],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        label: "Quiz Breakdown",
        data: [score || 0, (totalQuestions || 0) - (score || 0)],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Determine if the user passed (e.g., 50% or higher)
  const passingScore = (totalQuestions || 0) * 0.5;
  const hasPassed = (score || 0) >= passingScore;
  const isPerfectScore = (score || 0) === (totalQuestions || 0);

  const handleViewSolutions = () => {
    setShowSolutions(true);
    setSolutions(answers || []);
  };

  return (
    <>
      <Navbar />
      <div className="score-container">
        <h1>Quiz Completed!</h1>
        <h2>Quiz: {heading_of_quiz || "Unknown Quiz"}</h2>
        <h3>Your Score: {score || 0} / {totalQuestions || 0}</h3>
        <p>Questions Attempted: {attemptedQuestions || 0} / {totalQuestions || 0}</p>

        {/* Celebratory Message */}
        {isPerfectScore ? (
          <div className="celebration-message perfect">
            <h2>🏆 Congratulations, Champion! 🏆</h2>
            <p>You achieved a perfect score! You're a quiz master!</p>
            {/* Celebration GIF */}
            <img src={gif} alt="Celebration" className="celebration-gif" />
          </div>
        ) : hasPassed ? (
          <div className="celebration-message passed">
            <h2>🎉 Well Done! 🎉</h2>
            <p>You passed the quiz! Great job!</p>
          </div>
        ) : (
          <div className="celebration-message failed">
            <h2>🍀 Better Luck Next Time! 🍀</h2>
            <p>You didn't pass this time, but keep practicing!</p>
          </div>
        )}

        {/* Bar Graph */}
        <div className="chart-container">
          <h3>Performance Overview (Bar Graph)</h3>
          <Bar
            data={barData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: totalQuestions || 10,
                  title: {
                    display: true,
                    text: "Score",
                  },
                },
              },
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <h3>Score Breakdown (Pie Chart)</h3>
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || "";
                      const value = context.raw || 0;
                      return `${label}: ${value}`;
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="button-container">
          <button className="view-solutions-button" onClick={handleViewSolutions}>
            View Solutions
          </button>
          <button className="back-button" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>

        {showSolutions && (
          <div className="solutions-container">
            <h2>Quiz Solutions</h2>
            {solutions.map((solution, index) => (
              <div key={index} className="solution-item">
                <h3>Question {index + 1}</h3>
                <p className="question-text">{solution.question}</p>
                <p className="your-answer">Your Answer: {solution.userAnswer}</p>
                <p className="correct-answer">Correct Answer: {solution.correctAnswer}</p>
                <p className={`answer-status ${solution.isCorrect ? 'correct' : 'incorrect'}`}>
                  {solution.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Score;