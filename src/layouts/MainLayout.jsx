import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Circles } from 'react-loader-spinner';

const MainLayout = () => {
    const { awake } = useContext(AuthContext)

    return (
        <div className=''>
            <Navbar />
            {awake ? 
            <Outlet />
            :
            <div className='flex justify-center loading-height items-center'>
                <Circles
                height="80"
                width="80"
                color="#DC5F00"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
            }
        </div>
    )
}

export default MainLayout