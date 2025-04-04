import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddAQuestion from "./components/AddAQuestion/AddAQuestion";
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import ReportIssues from "./components/Dashboard/ReportIssues";
import GetAllQuiz from "./components/GetAllQuiz/GetAllQuiz";
import Login from './components/Login/Login';
import ModifyQuiz from "./components/ModifyQuiz/ModifyQuiz";
import Question from "./components/Questions/Questions";
import Quizzes from './components/Quiz/Quiz';
import QuizStats from "./components/QuizStats/QuizStats";
import Register from './components/Register/Register';
import Scores from './components/Score/Score';
import ScoresPage from "./components/ScoresPage/ScoresPage";
import StudentStats from "./components/StudentStats/StudentStats";
import SummaryQuiz from "./components/SummaryQuiz/SummaryQuiz";
import UpdateQuestion from "./components/UpdateQuestion/UpdateQuestion";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/Footer/AboutUs";
import ContactUs from "./components/Footer/ContactUs";
import TermsAndConditions from "./components/Footer/TermsAndConditions";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken ? children : <Navigate to="/login" />;
};

// Public Route Component (for login/register pages)
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return !user?.accessToken ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <>
                <PublicRoute>
                  <Login />
                </PublicRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <PublicRoute>
                  <Register />
                </PublicRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />

          {/* Protected Routes (require authentication) */}
          <Route
            path="/dashboard"
            element={
              <>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/quizzes"
            element={
              <>
              <ProtectedRoute>
                <Quizzes />
              </ProtectedRoute>
              <Footer />
              </>
            }
          />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <Question />
              </ProtectedRoute>
            }
          />
          <Route
            path="/score"
            element={
              <>
                <ProtectedRoute>
                  <Scores />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/scores-page"
            element={
              <>
                <ProtectedRoute>
                  <ScoresPage />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/admin-page"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/see-all-quiz"
            element={
              <ProtectedRoute>
                <GetAllQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-summary"
            element={
              <ProtectedRoute>
                <SummaryQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updating-a-question"
            element={
              <ProtectedRoute>
                <UpdateQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/modify-quiz"
            element={
              <ProtectedRoute>
                <ModifyQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-stats"
            element={
              <ProtectedRoute>
                <StudentStats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz-stats"
            element={
              <ProtectedRoute>
                <QuizStats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-a-question"
            element={
              <ProtectedRoute>
                <AddAQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-issues"
            element={
              <>
                <ProtectedRoute>
                  <ReportIssues />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />

         
          <Route
            path="/about-us"
            element={
              <>
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact-us"
            element={
              <>
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <>
                <TermsAndConditions />
                <Footer />
              </>
            }
          />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;