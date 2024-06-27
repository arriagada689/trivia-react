import React from 'react'
import { CgDanger } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate();
  
    const goBack = () => {
        navigate(-1)
    }
    
    return (
        <div className='flex flex-col space-y-4 text-center items-center mt-10'>
            <CgDanger className='mx-auto text-yellow-400' size={150}/>
            <div className='text-5xl font-bold'>404 Not Found</div>
            <div className='text-xl'>This page does not exist</div>
            <button onClick={goBack} className='bg-blue-700 w-fit text-white py-2 px-3 rounded'>Go Back</button>
        </div>
    )
}

export default NotFoundPage