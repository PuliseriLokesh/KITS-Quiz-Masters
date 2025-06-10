import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";
import "./GetAllQuiz.css";

function GetAllQuiz() {
    const gg = JSON.parse(localStorage.getItem("user")) || {};
    const [Data, setData] = useState([]);
    const history = useNavigate();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

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

    const handleDelete = async (quiz) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            try {
                await axios.delete(
                    `http://localhost:7018/api/quiz/deleteQuiz/${quiz.id}`,
                    { headers: { Authorization: `Bearer ${gg.accessToken}` } }
                );
                await axios.delete(
                    `http://localhost:7018/api/quiz/deleteScoresByQuizName/${quiz.heading}`,
                    { headers: { Authorization: `Bearer ${gg.accessToken}` } }
                );
                window.alert("✅ Quiz deleted successfully!");
                const result = await axios.get(
                    `http://localhost:7018/api/quiz/getAllQuizzes`,
                    { headers: { Authorization: `Bearer ${gg.accessToken}` } }
                );
                setData(result.data);
            } catch (error) {
                console.error("Error deleting quiz:", error);
                window.alert("❌ Failed to delete quiz. Please try again.");
            }
        }
    };

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
                                        onClick={() => handleDelete(item)}
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

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the quiz "{quizToDelete?.heading}"? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(quizToDelete)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GetAllQuiz;
