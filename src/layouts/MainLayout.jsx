import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext.jsx';

const MainLayout = () => {
    const { awake } = useContext(AuthContext)

    return (
        <div className=''>
            <Navbar />
            {awake ? 
            <Outlet />
            :
            <div>loading</div>
            }
        </div>
    )
}

export default MainLayout