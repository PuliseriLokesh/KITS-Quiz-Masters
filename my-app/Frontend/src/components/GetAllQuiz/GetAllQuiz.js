import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import Paper from "@mui/material/Paper";
import "./GetAllQuiz.css";

function GetAllQuiz() {
    const gg = JSON.parse(localStorage.getItem("user")) || {};
    const [Data, setData] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!gg?.accessToken) return;
            try {
                const result = await axios.get(
                    `http://localhost:7018/api/quiz/getAllQuizzes`,
                    {
                        headers: { Authorization: `Bearer ${gg.accessToken}` },
                    }
                );
                setData(result.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        };
        fetchData();
    }, [gg?.accessToken]);

    return (
        <div>
            <AdminNavbar />
            <h1 className="headingd">Quizzes created by you are:</h1>
            <div className="quizzy">
                {Data.length === 0 ? (
                    <h1 className="nothing">No quizzes created as of now</h1>
                ) : (
                    <div className="quiz-holder">
                        {Data.map((item) => (
                            <Paper key={item.id} className="quiz-card">
                                <h2 className="quiz-title">{item.heading}</h2>
                                <div className="quiz-actions">
                                    <Button
                                        className="play"
                                        onClick={() => history("/modify-quiz", {
                                            state: { quiz_id: item.id, heading_of_quiz: item.heading }
                                        })}
                                    >
                                        Modify Quiz
                                    </Button>
                                    <Button
                                        className="Deletingquiz"
                                        onClick={async () => {
                                            try {
                                                await axios.delete(
                                                    `http://localhost:7018/api/quiz/deleteQuiz/${item.id}`,
                                                    { headers: { Authorization: `Bearer ${gg.accessToken}` } }
                                                );
                                                await axios.delete(
                                                    `http://localhost:7018/api/quiz/deleteScoresByQuizName/${item.heading}`,
                                                    { headers: { Authorization: `Bearer ${gg.accessToken}` } }
                                                );
                                                window.location.reload();
                                            } catch (error) {
                                                console.error("Error deleting quiz:", error);
                                            }
                                        }}
                                    >
                                        Delete Quiz
                                    </Button>
                                </div>
                                <Button
                                    className="add-question"
                                    onClick={() =>
                                        history("/add-a-question", {
                                            state: { quiz_id: item.id, heading_of_quiz: item.heading },
                                        })
                                    }
                                >
                                    Add Question
                                </Button>
                            </Paper>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default GetAllQuiz;