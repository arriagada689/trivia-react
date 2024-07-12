import React, { useEffect, useState, useContext } from 'react';
import DarkModeToggle from './DarkModeToggle'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext.jsx';
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const { isLoggedIn } = useContext(AuthContext);
    const { logoutUser } = useContext(AuthContext)
    const [dropdown, setDropdown] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        
    }, [localStorage.getItem('userInfo')])

    const logoutHandler = async (e) => {
        e.preventDefault();
        logoutUser()
        setDropdown(false)
        navigate('/')
    }
    
    return (
        <nav>
            {/*Navbar for desktop */}
            <div className='hidden md:flex md:h-16 px-5 md:px-12 justify-between items-center h-full border-b-2 border-black dark:border-white'>
                <Link to={'/'} className='dark:text-white text-2xl font-semibold'>Trivia Game App</Link>

                <div className='hidden items-center md:flex space-x-2 lg:space-x-4 xl:space-x-6 text-lg font-normal'>
                    <Link to={'/leaderboard'} className={`${currentPath.includes('leaderboard') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Leaderboard</Link>

                    {isLoggedIn ? (
                        <>
                            <Link to={'/profile'} className={`${currentPath.includes('profile') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Profile</Link>
                            <Link onClick={(e) => logoutHandler(e)}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/login'} className={`${currentPath.includes('login') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Log In</Link>
                            <Link to={'/register'} className={`${currentPath.includes('register') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Register</Link>
                        </>
                    )}
                    
                    <DarkModeToggle />
                </div>
            </div>
            
            {/*Navbar for mobile */}
            <div className='flex justify-between items-center md:hidden h-16 px-5 border-b-2 border-black dark:border-white'>
                <Link to={'/'} onClick={() => setDropdown(false)} className='dark:text-white text-2xl font-semibold'>Trivia Game App</Link>
                
                <div className='flex space-x-4 text-xl'>
                    <DarkModeToggle />
                    <GiHamburgerMenu onClick={() => setDropdown(prev => !prev)} size={30}/>
                </div>
                
            </div>

            {dropdown ? 
                <div className='md:hidden flex flex-col items-center text-lg space-y-1 border-b-2 border-black dark:border-white py-2'>
                    {isLoggedIn ? (
                        <>
                            <Link onClick={() => setDropdown(false)} to={'/leaderboard'} className={`${currentPath.includes('leaderboard') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Leaderboard</Link>
                            <Link onClick={() => setDropdown(false)} to={'/profile'} className={`${currentPath.includes('profile') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Profile</Link>
                            <Link onClick={(e) => logoutHandler(e)}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link onClick={() => setDropdown(false)} to={'/login'} className={`${currentPath.includes('login') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Log In</Link>
                            <Link onClick={() => setDropdown(false)} to={'/register'} className={`${currentPath.includes('register') ? 'bg-black text-white' : ''} py-1 px-2 rounded-lg`}>Register</Link>
                        </>
                    )}
                </div>
                :
                null
            }

        </nav>
    )
}

export default Navbar