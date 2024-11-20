// ./src/utility/Ulties.js

import { useState, useEffect } from 'react';

export const useCheckLogin = () => {  // Use named export
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/api/check-login', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(true);
                    setUsername(data.username); // Set username from the backend response
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    return { isLoggedIn, username };
};
