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
                setUser(user);  // Set the full user data
                setUsername(user?.username || '');  // Set the username
                setToken(accessToken);
                setIsLoggedIn(true);

                // Fetch user details based on individual or organization
                const fetchUserDetails = async () => {
                    try {
                        const response = await axios.get('/members/', {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });

                        console.log('Members API response:', response.data);

                        // Assuming the response is an array and filtering the user by full_name
                        const userData = response.data.find(item => item.full_name === user.full_name);

                        console.log('Filtered User Data:', userData);  // Log the filtered userData

                        if (userData) {
                            if (userData.is_individual) {
                                const { id, full_name, phone, email, is_individual } = userData;
                                console.log('Individual user data:', userData);

                                // Store individual data in localStorage
                                localStorage.setItem('id', id);
                                localStorage.setItem('full_name', full_name);
                                localStorage.setItem('phone', phone);
                                localStorage.setItem('email', email);
                                localStorage.setItem('is_individual', is_individual);

                                // Verify data in localStorage after setting it
                                console.log('Stored Individual Data in localStorage:');
                                console.log('id:', localStorage.getItem('id'));
                                console.log('full_name:', localStorage.getItem('full_name'));
                                console.log('phone:', localStorage.getItem('phone'));
                                console.log('email:', localStorage.getItem('email'));
                                console.log('is_individual:', localStorage.getItem('is_individual'));
                            } else if (userData.is_organization) {
                                const { id, company_name, tax_num, phone, email, is_organization } = userData;
                                console.log('Organization user data:', userData);

                                // Store organization data in localStorage
                                localStorage.setItem('id', id);
                                localStorage.setItem('company_name', company_name);
                                localStorage.setItem('tax_num', tax_num);
                                localStorage.setItem('phone', phone);
                                localStorage.setItem('email', email);
                                localStorage.setItem('is_organization', is_organization);

                                // Verify data in localStorage after setting it
                                console.log('Stored Organization Data in localStorage:');
                                console.log('id:', localStorage.getItem('id'));
                                console.log('company_name:', localStorage.getItem('company_name'));
                                console.log('tax_num:', localStorage.getItem('tax_num'));
                                console.log('phone:', localStorage.getItem('phone'));
                                console.log('email:', localStorage.getItem('email'));
                                console.log('is_organization:', localStorage.getItem('is_organization'));
                            }
                        } else {
                            console.log('User data not found in response for full_name:', user.full_name);
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
        localStorage.removeItem('full_name');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');
        localStorage.removeItem('company_name');
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
