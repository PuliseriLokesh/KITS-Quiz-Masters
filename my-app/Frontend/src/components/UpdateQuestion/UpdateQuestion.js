import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";

function UpdateQuestion() {
  const location = useLocation();
  const question_details = location.state.question;
  const quiz_id = location.state.quiz_id;
  const gg = JSON.parse(localStorage.getItem("user"));

  const [Question_id] = useState(question_details.id);
  const [Question, setQuestion] = useState(question_details.question);
  const [Option1, setOption1] = useState(question_details.option1);
  const [Option2, setOption2] = useState(question_details.option2);
  const [Option3, setOption3] = useState(question_details.option3);
  const [Option4, setOption4] = useState(question_details.option4);
  const [Answer, setAnswer] = useState(question_details.answer);

  const history = useNavigate();

  const handleUpdateQuestion = async () => {
    try {
      const response = await axios.put( 
        `http://localhost:7018/api/quiz/updateQuestion/${Question_id}`,
        {
          question: Question,
          option1: Option1,
          option2: Option2,
          option3: Option3,
          option4: Option4,
          answer: Answer,
        },
        {
          headers: {
            Authorization: "Bearer " + gg?.accessToken,
          },
        }
      );

      if (response.status === 200) {
        window.alert("✅ Question updated successfully!"); 
        history("/modify-quiz", { state: { quiz_id: quiz_id } });
      } else {
        window.alert("❌ Failed to update question."); 
      }
    } catch (error) {
      console.error("Error updating question:", error);
      window.alert("❌ Error updating question. Please try again."); 
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="updation text-center mt-4">On Question Updation Page!</h1>

      <div className="container mt-3">
        <Form>
          <Form.Group>
            <Form.Label htmlFor="question">Question</Form.Label>
            <Form.Control
              type="text"
              id="question"
              placeholder="Enter the question"
              value={Question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="option1">Option 1</Form.Label>
            <Form.Control
              type="text"
              id="option1"
              placeholder="Option 1"
              value={Option1}
              onChange={(e) => setOption1(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="option2">Option 2</Form.Label>
            <Form.Control
              type="text"
              id="option2"
              placeholder="Option 2"
              value={Option2}
              onChange={(e) => setOption2(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="option3">Option 3</Form.Label>
            <Form.Control
              type="text"
              id="option3"
              placeholder="Option 3"
              value={Option3}
              onChange={(e) => setOption3(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="option4">Option 4</Form.Label>
            <Form.Control
              type="text"
              id="option4"
              placeholder="Option 4"
              value={Option4}
              onChange={(e) => setOption4(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="answer">Answer</Form.Label>
            <Form.Control
              type="text"
              id="answer"
              placeholder="Answer"
              value={Answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" className="mt-3" onClick={handleUpdateQuestion}>
            Update Question
          </Button>
        </Form>
      </div>

      <div className="d-flex justify-content-between mt-4 container">
        <Button variant="secondary" onClick={() => history("/Admin-page")}>
          🔙 Back to Admin Dashboard
        </Button>

        <Button
          variant="warning"
          onClick={() => history("/modify-quiz", { state: { quiz_id: quiz_id } })}
        >
          ✏️ Back to Modify Questions
        </Button>
      </div>
    </>
  );
}

export default UpdateQuestion;
