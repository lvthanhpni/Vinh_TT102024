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

                // Store tokens in localStorage
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                console.log('Login successful!');
                console.log('Access Token:', accessToken);
                console.log('Refresh Token:', refreshToken);

                const { user } = loginResponse.data; // Extract user data
                setUser(user); // Set the full user data
                setUsername(user?.username || ''); // Set the username
                setToken(accessToken);
                setIsLoggedIn(true);

                // Fetch authenticated user's details using the retrieve endpoint
                const fetchUserDetails = async () => {
                    try {
                        const response = await axios.get(`/members/${username}/`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });

                        console.log('Members API response:', response.data);

                        // Assuming `name` in the API response maps to `username` of the related Member model
                        const userData = response.data.find(item => item.name === username);

                        if (userData) {
                            if (userData.is_individual) {
                                const { id, name, phone, email, is_individual } = userData;
                                console.log('Individual user data:', userData);

                                // Store individual data in localStorage
                                localStorage.setItem('id', id);
                                localStorage.setItem('name', name); // This maps to Member's username
                                localStorage.setItem('phone', phone);
                                localStorage.setItem('email', email);
                                localStorage.setItem('is_individual', is_individual);

                                console.log('Stored Individual Data in localStorage:', { id, name, phone, email, is_individual });
                            } else if (userData.is_organization) {
                                const { id, name, tax_num, phone, email, is_organization } = userData;
                                console.log('Organization user data:', userData);

                                // Store organization data in localStorage
                                localStorage.setItem('id', id);
                                localStorage.setItem('name', name); // This maps to Member's username
                                localStorage.setItem('tax_num', tax_num);
                                localStorage.setItem('phone', phone);
                                localStorage.setItem('email', email);
                                localStorage.setItem('is_organization', is_organization);

                                console.log('Stored Organization Data in localStorage:', { id, name, tax_num, phone, email, is_organization });
                            }
                        } else {
                            console.log('User data not found for username:', username);
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
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('tax_num');
        localStorage.removeItem('is_individual');
        localStorage.removeItem('is_organization');
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
