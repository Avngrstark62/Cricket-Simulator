import { createContext, useState, useEffect } from 'react';
import { getMe, loginUser, logoutUser } from '../api/api.js';


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const checkAuth = async () => {
        try {
            const response = await getMe();
            setUser(response.data);
        } catch (error) {
            console.log(error)
            setUser(null);
        }
    };
    
    useEffect(() => {
        checkAuth();
    }, []);
    
    const login = async (data) => {
        await loginUser(data);
        await checkAuth();
    };
    
    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext();