import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../Navbar/AdminNavbar';
import './CreateQuiz.css'; // Import the external CSS file

function CreateQuiz() {
    const history = useNavigate();

    const [heading, setHeading] = useState('');
    const [timeLimit, setTimeLimit] = useState(30); // Default 30 minutes
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');

    const userData = JSON.parse(localStorage.getItem("user"));

    const handleAddingQuestion = (e) => {
        e.preventDefault();
        if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
            alert("All fields for the question are required!");
            return;
        }
        const newQuestion = { question, option1, option2, option3, option4, answer };
        setQuestions(prev => [...prev, newQuestion]);
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!heading || questions.length === 0) {
            alert("Quiz title and at least one question are required!");
            return;
        }
        if (!timeLimit || timeLimit <= 0) {
            alert("Time limit must be greater than 0!");
            return;
        }
        if (!userData || !userData.username) {
            alert("User data not found. Please log in again.");
            return;
        }
        try {
            const quizData = {
                heading,
                timeLimit,
                questions,
                username: userData.username
            };
            const result = await axios.post(
                "http://localhost:7018/api/quiz/createQuiz",
                quizData,
                { headers: { Authorization: `Bearer ${userData.accessToken}` } }
            );
            console.log("✅ Quiz Created Successfully:", result);
            history('/Admin-page');
        } catch (error) {
            console.error("❌ Error creating quiz:", error.response?.data || error.message);
            alert("Failed to create the quiz. Please try again.");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="quiz-container">
                <h1>Create a Quiz</h1>
                <form>
                    <div className="form-group">
                        <div className="input-section">
                            <label>Quiz Title</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Quiz Title"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                            />
                            <label>Time Limit (minutes)</label>
                            <input
                                type="number"
                                className="form-control quiz-input"
                                placeholder="Time Limit"
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                                min="1"
                            />
                            <label>Question</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Enter the question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                            <label>Option 1</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Option 1"
                                value={option1}
                                onChange={(e) => setOption1(e.target.value)}
                            />
                            <label>Option 2</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Option 2"
                                value={option2}
                                onChange={(e) => setOption2(e.target.value)}
                            />
                            <label>Option 3</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Option 3"
                                value={option3}
                                onChange={(e) => setOption3(e.target.value)}
                            />
                            <label>Option 4</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Option 4"
                                value={option4}
                                onChange={(e) => setOption4(e.target.value)}
                            />
                            <label>Correct Answer</label>
                            <input
                                type="text"
                                className="form-control quiz-input"
                                placeholder="Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                            <Button className="quiz-btn add-btn" onClick={handleAddingQuestion}>
                                Add Question
                            </Button>
                        </div>
                    </div>
                    <div className="submit-section">
                        <Button type="submit" className="quiz-btn submit-btn" onClick={handleSubmit}>
                            Create the Quiz
                        </Button>
                    </div>
                </form>
                <div className="questions-list">
                    <h3>Added Questions:</h3>
                    {questions.length === 0 ? (
                        <p>No questions added yet.</p>
                    ) : (
                        <ul>
                            {questions.map((q, index) => (
                                <li key={index}>
                                    {q.question} - <strong>{q.answer}</strong>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;