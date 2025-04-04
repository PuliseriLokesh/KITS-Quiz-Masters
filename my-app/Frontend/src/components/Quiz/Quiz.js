import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Quiz.css";

function Quiz() {
    const gg = JSON.parse(localStorage.getItem("user"));
    const [data, setData] = useState([]);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch all quizzes
                const result = await axios.get(`http://localhost:7018/api/quiz/getAllQuizzes`, {
                    headers: {
                        Authorization: `Bearer ${gg.accessToken}`,
                    },
                });
                console.log("Fetched Data:", result.data);
                setData(result.data);
                
                // Fetch completed quizzes for the current user
                const scoresResult = await axios.get(`http://localhost:7018/api/quiz/getAllScores`, {
                    headers: {
                        Authorization: `Bearer ${gg.accessToken}`,
                    },
                });
                
                // Extract quiz IDs that the user has completed
                const completedQuizIds = scoresResult.data
                    .filter(score => score.username === gg.username)
                    .map(score => score.quizId);
                
                console.log("Completed Quiz IDs:", completedQuizIds);
                setCompletedQuizzes(completedQuizIds);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                setError("Failed to load quizzes. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (gg?.accessToken) {
            fetchData();
        } else {
            setError("Authentication error. Please log in again.");
            setLoading(false);
        }
    }, [gg?.accessToken, gg?.username]);

    const handleAttemptQuiz = (item) => {
        navigate("/questions", { state: { tem: item } });
    };

    if (loading) {
        return (
            <div className="dashboard">
                <Navbar />
                <div className="loading-container">
                    <h2>Loading quizzes...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard">
                <Navbar />
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Navbar />
            <h1 className="quiz-title">Here are quizzes assigned to you!</h1>
            <div className="quiz-vessel">
                {data.length === 0 ? (
                    <h1 className="no-quizzes">No quizzes assigned to you as of now.</h1>
                ) : (
                    data.map((item) => {
                        const isCompleted = completedQuizzes.includes(item.id);
                        return (
                            <div key={item.id} className="quiz-box">
                                <div className="quiz-name">{item.heading}</div>
                                <button
                                    className="attempt-button"
                                    onClick={() => handleAttemptQuiz(item)}
                                >
                                    {isCompleted ? "Attempt Again" : "Attempt Quiz"}
                                </button>
                                {isCompleted && (
                                    <div className="completed-tag">Completed</div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Quiz;