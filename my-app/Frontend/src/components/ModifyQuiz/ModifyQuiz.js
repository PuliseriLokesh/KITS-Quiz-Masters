import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/AdminNavbar";

function ModifyQuiz() {
  const location = useLocation();
  const heading_of_quiz = location.state?.heading_of_quiz || "Unknown Quiz"; 
  const id_of_quiz = location.state?.quiz_id;

  const navigate = useNavigate();
  const gg = JSON.parse(localStorage.getItem("user"));
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id_of_quiz) {
        setError("Quiz ID is missing!");
        setLoading(false);
        return;
      }

      try {
        const result = await axios.get(
          `http://localhost:7018/api/quiz/GetAllQuestions/${id_of_quiz}`,
          {
            headers: { Authorization: `Bearer ${gg?.accessToken || ""}` },
          }
        );

        if (Array.isArray(result.data)) {
          setData(result.data);
        } else if (result.data.questions) {
          setData(result.data.questions);
        } else {
          setData([]);
        }
      } catch (error) {
        setError("Failed to load questions. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id_of_quiz, gg?.accessToken]);

  const handleDelete = async (questionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:7018/api/quiz/removeQuestion/${id_of_quiz}/${questionId}`,
        {
          headers: { Authorization: `Bearer ${gg?.accessToken || ""}` },
        }
      );

      if (response.status === 200) {
        setData((prev) => prev.filter((q) => q.id !== questionId));
        alert("Question deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete the question.");
    }
  };

  const handleUpdate = (question) => {
    navigate("/updating-a-question", { state: { question, quiz_id: id_of_quiz } });
  };

  return (
    <div>
      <AdminNavbar />
      <h1 style={{ marginLeft: "299px", marginTop: "24px" }}>
        Welcome to {heading_of_quiz} Quiz modification page, Admin!
      </h1>

      {loading ? (
        <h2 style={{ marginTop: "50px", textAlign: "center" }}>Loading...</h2>
      ) : error ? (
        <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>
      ) : Data.length > 0 ? (
        Data.map((it, index) => (
          <div
            className="question ml-sm-5 pl-sm-5 pt-2"
            style={{ marginTop: "44px", marginBottom: "44px" }}
            key={it.id}
          >
            <div className="py-2 h5">
              <b>{index + 1}. {it.question}</b>
            </div>
            <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
              {[it.option1, it.option2, it.option3, it.option4].map((option, i) => (
                <label key={i} className="options">
                  {option}
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
            <Button className="deleting" onClick={() => handleDelete(it.id)}>
              Delete this question
            </Button>
            <Button className="Updating" style={{ marginLeft: "19px" }} onClick={() => handleUpdate(it)}>
              Update this question
            </Button>
          </div>
        ))
      ) : (
        <h2 className="not-present" style={{ marginTop: "217px", marginLeft: "399px" }}>
          No questions present under this quiz as of now!
        </h2>
      )}
    </div>
  );
}

export default ModifyQuiz;
