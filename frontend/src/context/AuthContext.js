import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLoggedIn: false,
        username: '',
    });

    useEffect(() => {
        const fetchAuthState = async () => {
            try {
                const response = await fetch('/api/check-login', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setAuthState({ isLoggedIn: true, username: data.username });
                } else {
                    setAuthState({ isLoggedIn: false, username: '' });
                }
            } catch (error) {
                setAuthState({ isLoggedIn: false, username: '' });
            }
        };
        fetchAuthState();
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
