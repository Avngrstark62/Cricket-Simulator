import { createContext, useState, useEffect } from 'react';
import { getMe, loginUser, logoutUser } from '../api/api.js';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await getMe();
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data)); // Save user data
        } catch (error) {
            console.log(error);
            setUser(null);
            localStorage.removeItem("user");
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Listen for changes in localStorage (e.g., logout in another tab)
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "user") {
                setUser(JSON.parse(event.newValue)); // Sync user state across tabs
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const login = async (data) => {
        await loginUser(data);
        await checkAuth();
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        localStorage.removeItem("user");
        localStorage.setItem("logout", Date.now()); // Trigger event across tabs
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext();