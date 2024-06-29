import React, { useEffect, useState, useContext } from 'react';
import DarkModeToggle from './DarkModeToggle'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext.jsx';

const Navbar = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {

    }, [localStorage.getItem('userInfo')])

    const logoutHandler = async (e) => {
        e.preventDefault();
        logoutUser()
        navigate('/')
    }
    
    return (
        <nav className='h-16 px-5 md:px-12 flex justify-between items-center border-b-2'>
            <Link to={'/'}>Trivia Game App</Link>

            <div className='flex items-center space-x-4'>
                <Link to={'/leaderboard'}>Leaderboard</Link>

                {isLoggedIn ? (
                    <>
                        <Link to={'/profile'}>Profile</Link>
                        <Link onClick={(e) => logoutHandler(e)}>Log out</Link>
                    </>
                ) : (
                    <>
                        <Link to={'/login'}>Log In</Link>
                        <Link to={'/register'}>Register</Link>
                    </>
                )}
                
                <DarkModeToggle />
            </div>
        </nav>
    )
}

export default Navbar