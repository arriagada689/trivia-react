import React, { createContext, useState, useEffect, Children } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    //Check local storage for userInfo and set isLoggedIn
    useEffect(() => {
        const storedUserData = localStorage.getItem('userInfo');
       
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }
    }, []);

    const loginUser = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
        setIsLoggedIn(true);
        setUserData(data);
    };

    const logoutUser = () => {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserData({});
    };

    const registerUser = (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data))
        setIsLoggedIn(true);
        setUserData(data);
    }

    const deleteProfile = () => {
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserData({});
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, loginUser, logoutUser, registerUser, deleteProfile }}>
            {children}
        </AuthContext.Provider>
    );
}