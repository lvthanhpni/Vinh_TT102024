import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    token: null,
    isLoggedIn: false,  // Added isLoggedIn state
    username: '',  // Removed email
    login: () => { },
    logout: () => { },
    error: null,
    setUsername: () => { },  // Removed setEmail
});

export default AuthContext;
