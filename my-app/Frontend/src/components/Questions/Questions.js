import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../Questions/Questions.css';

function Question() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visited, setVisited] = useState([]);
  const [attempted, setAttempted] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const array_of_questions = useMemo(() => location.state?.tem?.questions || [], [location.state?.tem?.questions]);
  const heading = location.state?.tem?.heading || "Unknown Quiz";
  const id_of_quiz = location.state?.tem?.id || 0;
  const currentQuestion = array_of_questions[currentIndex] || {};

  useEffect(() => {
    const totalQuestions = array_of_questions.length;
    setTimeLimit(totalQuestions * 60); // 1 minute per question
  }, [array_of_questions]);

  useEffect(() => {
    // Enter fullscreen mode when component mounts
    const enterFullscreen = async () => {
      try {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
          setIsFullscreen(true);
        }
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    };
    enterFullscreen();

    // Cleanup function to exit fullscreen when component unmounts
    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
  }, []);

  const calculateTotalScore = useCallback(() => {
    let totalScore = 0;
    const answers = [];
    array_of_questions.forEach((question) => {
      const isCorrect = selectedAnswers[question.id] === question.answer;
      if (isCorrect) {
        totalScore += 1;
      }
      answers.push({
        question: question.question,
        userAnswer: selectedAnswers[question.id] || 'Not attempted',
        correctAnswer: question.answer,
        isCorrect
      });
    });
    return { totalScore, answers };
  }, [selectedAnswers, array_of_questions]);

  const handleScoreSubmission = useCallback(() => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    const { totalScore, answers } = calculateTotalScore();
    navigate('/score', {
      state: {
        score: totalScore,
        heading_of_quiz: heading,
        id: id_of_quiz,
        totalQuestions: array_of_questions.length,
        attemptedQuestions: Object.keys(selectedAnswers).length,
        answers
      },
    });
  }, [navigate, heading, id_of_quiz, array_of_questions, selectedAnswers, calculateTotalScore, isSubmitted]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => {
        if (prev >= timeLimit && !isSubmitted) {
          clearInterval(timer);
          handleScoreSubmission();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit, handleScoreSubmission, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} Min${mins !== 1 ? 's' : ''}, ${secs} Sec`;
  };

  const handleOptionSelect = (questionId, value) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (!attempted.includes(questionId)) {
      setAttempted([...attempted, questionId]);
    }
  };

  const handleClearOption = (questionId) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
    setAttempted((prev) => prev.filter((id) => id !== questionId));
  };

  const handleNext = () => {
    if (currentIndex < array_of_questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (!visited.includes(currentQuestion.id)) {
        setVisited([...visited, currentQuestion.id]);
      }
    } else {
      handleScoreSubmission();
    }
  };

  const handleMarkForReview = () => {
    if (!markedForReview.includes(currentQuestion.id)) {
      setMarkedForReview([...markedForReview, currentQuestion.id]);
    }
  };

  const handleQuestionVisit = (index) => {
    setCurrentIndex(index);
    const questionId = array_of_questions[index].id;
    if (!visited.includes(questionId)) {
      setVisited([...visited, questionId]);
    }
  };

  const isLastQuestion = currentIndex === array_of_questions.length - 1;
  const buttonText = isLastQuestion ? 'Save and Submit' : 'Next Question';

  if (array_of_questions.length === 0) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>No questions available for this quiz.</h2>
      </div>
    );
  }

  return (
    <div className={`quiz-page ${isFullscreen ? 'fullscreen' : ''}`}>
      {!isFullscreen && <Navbar />}
      <div className="quiz-header">
        <div className="quiz-title">
          <h2>{heading}</h2>
        </div>
        <div className="quiz-timer">
          <span>Time Remaining: {formatTime(timeLimit - timeSpent)}</span>
        </div>
      </div>
      <div className="quiz-content">
        <div className="question-section">
          <h3>Question {currentIndex + 1}:</h3>
          <p>{currentQuestion.question}</p>
          <div className="options">
            {[
              currentQuestion.option1,
              currentQuestion.option2,
              currentQuestion.option3,
              currentQuestion.option4,
            ].map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={selectedAnswers[currentQuestion.id] === option}
                  onChange={(e) => handleOptionSelect(currentQuestion.id, e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="action-buttons">
            <Button onClick={() => handleClearOption(currentQuestion.id)} variant="warning">
              Clear Option
            </Button>
            <Button onClick={handleMarkForReview} variant="danger">
              Mark for Review
            </Button>
          </div>
        </div>
        <div className="question-nav-box">
          <h3>Questions Navigation:</h3>
          <div className="question-nav">
            {array_of_questions.map((q, index) => (
              <button
                key={q.id}
                className={`question-btn ${
                  markedForReview.includes(q.id)
                    ? 'marked-for-review'
                    : attempted.includes(q.id)
                    ? 'attempted'
                    : visited.includes(q.id)
                    ? 'visited'
                    : 'not-visited'
                }`}
                onClick={() => handleQuestionVisit(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={handleNext} className="next-button" disabled={isSubmitted}>
        {buttonText}
      </Button>
    </div>
  );
}

export default Question;