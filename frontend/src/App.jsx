import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage';
import QuickMatchPage from './pages/QuickMatchPage';

const App = () => {
    const { user } = useContext(AuthContext);
    return (
            <Router>
                {user ? 
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/quick_match" element={<QuickMatchPage />} />
                        <Route path="/quick_match/start_new" element={<QuickMatchPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Layout>
            
                :
                    <Routes>
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="*" element={<Navigate to="/auth" />} />
                    </Routes>
                }
                
            </Router>
    );
};

export default App;