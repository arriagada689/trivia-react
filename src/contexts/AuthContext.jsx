import React, { createContext, useState, useEffect, Children } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [gameData, setGameData] = useState(null);
    const [awake, setAwake] = useState(false);

    //Check local storage for userInfo and set isLoggedIn
    useEffect(() => {
        const storedUserData = localStorage.getItem('userInfo');
       
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setIsLoggedIn(true);
        }

        //awake the server
        const getAwakeStatus = async () => {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/users/awake`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(response.ok){
                const data = await response.json()
                setAwake(true)
            }
        }
        getAwakeStatus()
    }, []);

    const handleGameData = (data) => {
        setGameData(data)
        // console.log(data)
    }

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
        <AuthContext.Provider value={{ isLoggedIn, userData, gameData, awake, loginUser, logoutUser, registerUser, deleteProfile, handleGameData }}>
            {children}
        </AuthContext.Provider>
    );
}