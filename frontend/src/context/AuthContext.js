import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    logout: () => { },
    error: null,
});

export default AuthContext;
