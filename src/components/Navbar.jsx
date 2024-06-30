import React, { useEffect, useState, useContext } from 'react';
import DarkModeToggle from './DarkModeToggle'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext.jsx';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
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
            <div className='hidden md:flex md:h-16 px-5 md:px-12 justify-between items-center h-full border-b-2 border-black dark:border-white'>
                <Link to={'/'} className='dark:text-white text-2xl font-semibold'>Trivia Game App</Link>

                <div className='hidden items-center md:flex lg:space-x-4 xl:space-x-6 text-lg font-normal'>
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
            </div>
            
            <div className='flex justify-between items-center md:hidden h-16 px-5 border-b-2 border-black dark:border-white'>
                <Link to={'/'} className='dark:text-white text-2xl font-semibold'>Trivia Game App</Link>
                
                <div className='flex space-x-4 text-xl'>
                    <DarkModeToggle />
                    <GiHamburgerMenu onClick={() => setDropdown(prev => !prev)} size={30}/>
                </div>
                
            </div>

            {dropdown ? 
                <div className='md:hidden flex flex-col items-center text-lg space-y-1 border-b-2 border-black dark:border-white py-2 underline'>
                    {isLoggedIn ? (
                        <>
                            <Link onClick={() => setDropdown(false)} to={'/profile'}>Profile</Link>
                            <Link onClick={(e) => logoutHandler(e)}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link onClick={() => setDropdown(false)} to={'/login'}>Log In</Link>
                            <Link onClick={() => setDropdown(false)} to={'/register'}>Register</Link>
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