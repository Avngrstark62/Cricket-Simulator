import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <>
                    <p>Welcome, {user.email}</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Please log in</p>
            )}
        </div>
    );
};

export default Dashboard;