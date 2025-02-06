import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const App = () => {
    const { user } = useContext(AuthContext);
    return (
            <Router>
                <nav>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
                {user ? 
                <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
                :
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
                }
                
            </Router>
    );
};

export default App;