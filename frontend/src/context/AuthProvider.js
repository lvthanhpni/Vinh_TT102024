import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token') || null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

                const { user } = loginResponse.data; // Extract user data
                setUser(user);  // Set the full user data
                setUsername(user?.username || '');  // Set the username
                setToken(accessToken);
                setIsLoggedIn(true);

                // Fetch additional user data (e.g., phone, email) from /individuals/
                const fetchUserDetails = async () => {
                    try {
                        const response = await axios.get('/individuals/', {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });

                        // Assuming the API returns a list of individuals, and we pick the first one or specific user
                        const userData = response.data.find(individual => individual.full_name === user.username);

                        if (userData) {
                            const { phone, email } = userData;

                            // Store phone and email in localStorage
                            localStorage.setItem('phone', phone);
                            localStorage.setItem('email', email);
                        }
                    } catch (error) {
                        console.error('Error fetching user details:', error);
                    }
                };

                fetchUserDetails();
            } else {
                setError('Login failed. User does not exist or is unauthorized.');
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setError('An error occurred while logging in.');
            setIsLoggedIn(false);
        }
    };

    const logout = () => {
        setUser(null);
        setUsername('');
        setToken(null);
        setIsLoggedIn(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
    };

    useEffect(() => {
        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.data.user) {
                        setIsLoggedIn(true);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoggedIn(false);
                }
            };

            fetchUserData();
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoggedIn,
            username,
            login,
            logout,
            error,
            setUsername
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
