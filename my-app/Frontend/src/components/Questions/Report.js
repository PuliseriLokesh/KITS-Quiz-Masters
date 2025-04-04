import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Report.css';
import Navbar from '../Navbar/Navbar';

function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const { question, quizId } = location.state || {};

  const [reportText, setReportText] = useState('');

  const handleSubmit = () => {
    console.log('Report submitted:', {
      quizId,
      questionId: question?.id,
      issue: reportText,
    });
    navigate('/quiz');
  };

  return (
    <div className="report-container">
      <Navbar />
      <div className="report-content">
        <h2>Report an Issue</h2>
        <p><strong>Quiz ID:</strong> {quizId}</p>
        <p><strong>Question:</strong> {question?.question || 'No question available'}</p>
        <Form>
          <Form.Group>
            <Form.Label>Describe the issue:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Enter your issue here..."
            />
          </Form.Group>
          <Button variant="danger" onClick={handleSubmit} className="submit-report-btn">
            Submit Report
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Report;
