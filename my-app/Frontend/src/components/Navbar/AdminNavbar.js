import { useNavigate } from 'react-router-dom';
import '../Navbar/AdminNavbar.css';

function Navbar() {
    const history = useNavigate();

    const Logout = () => {
        try {
            console.log(localStorage.getItem("user"));
            localStorage.removeItem("user");
            history("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button><a className="navbar-brand" href="/Admin-page">Welcome to KITS Quiz Masters Admin Panel</a></button>
            <button className="btn btn-link" onClick={Logout} >
                Log Out
            </button>
        </nav>
    );
}

export default Navbar;