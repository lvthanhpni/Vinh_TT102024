import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token') || null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [id, setId] = useState(localStorage.getItem('id') || '');
    const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [tax_num, setTax_num] = useState(localStorage.getItem('tax_num') || '');
    const [is_individual, setIndividual] = useState(localStorage.getItem('is_individual') || '');
    const [is_organization, setOrganization] = useState(localStorage.getItem('is_organization') || '');
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
                setUser(user);
                setUsername(user?.username || '');
                setToken(accessToken);
                setIsLoggedIn(true);

                // Store user data in separate localStorage fields
                localStorage.setItem('username', user?.username || '');

                console.log('Stored Organization Data in localStorage:', user);


                // Fetch authenticated user's details using the retrieve endpoint
                const fetchUserDetails = async () => {
                    try {
                        const response = await axios.get(`/members/${user?.username}/`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                            },
                        });

                        setId(response.data.id || '');
                        setPhone(response.data.phone || '');
                        setEmail(response.data.email || '');
                        localStorage.setItem('id', response.data.id || '');
                        localStorage.setItem('phone', response.data.phone || '');
                        localStorage.setItem('email', response.data.email || '');

                        // Handle `is_individual` and `is_organization` conditions
                        if (response.data.is_individual) {
                            setIndividual(response.data.is_individual || '');
                            localStorage.setItem('is_individual', response.data.is_individual || '');
                        }

                        if (response.data.is_organization) {
                            setOrganization(response.data.is_organization || '');
                            setTax_num(response.data.tax_num || '');
                            localStorage.setItem('is_organization', response.data.is_organization || '');
                            localStorage.setItem('tax_num', response.data.tax_num || '');
                        }

                        console.log('Members API response:', response.data);

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
        localStorage.removeItem('username');
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
