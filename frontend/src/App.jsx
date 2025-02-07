import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage';
import QuickMatchPage from './pages/QuickMatchPage';
import MatchSetup from './pages/MatchSetup';

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return (
        <Router>
            {user ? (
                <Routes>
                <Route path="/quick_match/match_setup" element={<MatchSetup />} />
                <Route path="/quick_match/play" element={<h1>Play</h1>} />
                <Route path="*" element={<Layout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/quick_match" element={<QuickMatchPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Layout>} />
              </Routes>
            ) : (
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;