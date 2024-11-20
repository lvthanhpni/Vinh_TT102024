import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token') || null);
    const [error, setError] = useState(null);

    const login = async (username, password, rememberMe) => {
        try {
            // Make an API request to login
            const loginResponse = await axios.post('/api/login', {
                uname: username,
                pass: password,
                checkbox: rememberMe,
            });

            if (loginResponse.data.success) {
                // Process successful login (e.g., storing tokens and updating user state)
                const accessToken = loginResponse.data.access;
                const refreshToken = loginResponse.data.refresh;

                // Store tokens in localStorage
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                console.log('Login successful!');
                console.log('Access Token:', accessToken);

                // Optionally, update the user state if your API returns user data
                setUser(loginResponse.data.user || {});

                // Update token state
                setToken(accessToken);
            } else {
                setError('Login failed. User does not exist or is unauthorized.');
                return;
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError('An error occurred while logging in.');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    useEffect(() => {
        if (token) {
            // Optionally, you can check for token expiration and handle refreshing logic here
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
