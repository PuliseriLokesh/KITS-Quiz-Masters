import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";

function AddAQuestion() {
  const location = useLocation();
  const quiz_id = location.state.quiz_id;
  const gg = JSON.parse(localStorage.getItem("user"));

  const [Question, setQuestion] = useState("");
  const [Option1, setOption1] = useState("");
  const [Option2, setOption2] = useState("");
  const [Option3, setOption3] = useState("");
  const [Option4, setOption4] = useState("");
  const [Answer, setAnswer] = useState("");

  const history = useNavigate();

  return (
    <>
      <AdminNavbar />
      <h1
        className="updation"
        style={{ marginLeft: "449px", marginTop: "25px" }}
      >
        Add a New Question!
      </h1>
      <div
        className="different"
        style={{
          marginLeft: "402px",
          marginTop: "20px",
          marginRight: "325px",
        }}
      >
        <label>Question</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the question"
          value={Question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <label>Option 1</label>
        <input
          type="text"
          className="form-control"
          placeholder="Option 1"
          value={Option1}
          onChange={(e) => setOption1(e.target.value)}
        />
        <label>Option 2</label>
        <input
          type="text"
          className="form-control"
          placeholder="Option 2"
          value={Option2}
          onChange={(e) => setOption2(e.target.value)}
        />
        <label>Option 3</label>
        <input
          type="text"
          className="form-control"
          placeholder="Option 3"
          value={Option3}
          onChange={(e) => setOption3(e.target.value)}
        />
        <label>Option 4</label>
        <input
          type="text"
          className="form-control"
          placeholder="Option 4"
          value={Option4}
          onChange={(e) => setOption4(e.target.value)}
        />
        <label>Answer</label>
        <input
          type="text"
          className="form-control"
          placeholder="Correct Answer"
          value={Answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button
          style={{ marginLeft: "4px", marginTop: "31px" }}
          onClick={async () => {
            try {
              await axios.post(
                `http://localhost:7018/api/quiz/AddAQuestion/${quiz_id}`, 
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
                    Authorization: `Bearer ${gg.accessToken}`,
                  },
                }
              );
              history("/see-all-quiz", { state: { quiz_id: quiz_id } });
            } catch (error) {
              console.error("Error adding question:", error);
            }
          }}
        >
          Add this Question
        </Button>
      </div>
    </>
  );
}

export default AddAQuestion;
