import React from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../Navbar/AdminNavbar';
import './AdminDashboard.css';
import img1 from './createQuiz.png';
import img2 from './ques.png';
import img3 from './stats.jpg';

function Dashboard() {
    var gg = JSON.parse(localStorage.getItem("user"));
    const history = useNavigate();

    return (
        <div className='Dashboard'>
            <AdminNavbar />
            <div className="dashboard-content">
                <h1 className="heading">Welcome to Admin Dashboard, {gg.username}!</h1>
                <div className="card-container">
                    <div className="card" onClick={() => history('/create-quiz')}>
                        <h2>Create a Quiz</h2>
                        <Button className="card-button">Create</Button>
                        <img src={img1} alt="Create Quiz" className="card-image" />
                    </div>
                    <div className="card" onClick={() => history('/see-all-quiz')}>
                        <h2>See Created Quizzes</h2>
                        <Button className="card-button">View</Button>
                        <img src={img2} alt="See Created Quizzes" className="card-image" />
                    </div>
                    <div className="card" onClick={() => history('/student-stats')}>
                        <h2>Show Quizzes Stats</h2>
                        <Button className="card-button">Stats</Button>
                        <img src={img3} alt="Show Quizzes Stats" className="card-image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;