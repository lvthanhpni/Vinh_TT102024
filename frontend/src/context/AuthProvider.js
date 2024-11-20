import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token') || null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track logged-in status

    // Removed email and setEmail
    const [username, setUsername] = useState('');

    const login = async (username, password, rememberMe) => {
        try {
            const loginResponse = await axios.post('/api/login', {
                uname: username,
                pass: password,
                checkbox: rememberMe,
            });

            if (loginResponse.data.success) {
                const accessToken = loginResponse.data.access;
                const refreshToken = loginResponse.data.refresh;

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                console.log('Login successful!');
                console.log('Access Token:', accessToken);

                setUser(loginResponse.data.user || {});  // Set the user data from the login response
                setUsername(loginResponse.data.user?.username || '');  // Set the username
                setToken(accessToken);
                setIsLoggedIn(true);  // Set logged-in state to true
            } else {
                setError('Login failed. User does not exist or is unauthorized.');
                setIsLoggedIn(false);  // In case login fails, ensure logged-in state is false
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError('An error occurred while logging in.');
            setIsLoggedIn(false);  // Set logged-in state to false on error
        }
    };

    const logout = () => {
        setUser(null);
        setUsername('');  // Clear username
        setToken(null);
        setIsLoggedIn(false);  // Set logged-in state to false when logging out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    // Effect to check if a user is already logged in based on the token stored in localStorage
    useEffect(() => {
        if (token) {
            // Make an API call to fetch the user's info using the stored token if needed
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.data.user) {
                        setUser(response.data.user);  // Set user data from the response
                        setUsername(response.data.user.username || '');  // Set the username
                        setIsLoggedIn(true);  // Set logged-in state to true
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoggedIn(false);  // Set logged-in state to false if the fetch fails
                }
            };

            fetchUserData();
        } else {
            setIsLoggedIn(false);  // Set logged-in state to false if no token is present
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, isLoggedIn, username, login, logout, error, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
