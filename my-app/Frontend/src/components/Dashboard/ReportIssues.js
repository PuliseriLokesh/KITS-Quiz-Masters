import React, { useState } from 'react';
import './ReportIssues.css';

const ReportIssues = () => {
    const [issue, setIssue] = useState('');
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('General');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Issue reported successfully!\nSubject: ${subject}\nCategory: ${category}\nDescription: ${issue}`);
        setSubject('');
        setCategory('General');
        setIssue('');
    };

    return (
        <div className="report-issues">
            <h1>Report Issues</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />

                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="General">General</option>
                    <option value="Technical">Technical</option>
                    <option value="Account Issues">Account Issues</option>
                    <option value="Feedback">Feedback</option>
                </select>

                <label htmlFor="issue">Describe your issue:</label>
                <textarea
                    id="issue"
                    rows="4"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    required
                ></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReportIssues;