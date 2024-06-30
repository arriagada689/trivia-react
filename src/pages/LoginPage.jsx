import React from 'react'
import { useState, useContext } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext.jsx';
import { ColorRing } from 'react-loader-spinner'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { loginUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
            const response = await fetch(`${apiBaseUrl}/users/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if(response.ok){
                const data = await response.json()
                loginUser(data)
                navigate('/')
            } else {
                const error = await response.json()
                throw new Error(error.message)
              }
        } catch(error) {
            console.error('Error:', error);
            setErrorMessage(error.message)
        }
        setLoading(false)
    }
    
    return (
        <div className='flex flex-col items-center'>
            {loading && 
                <div className='flex items-center justify-center h-[250px]'>
                <ColorRing
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
                </div>
            }
            {!loading && <div className='flex flex-col space-y-3 py-10 px-10 border border-gray-500 dark:border-white  rounded mt-10'>
                <div className='text-2xl font-bold text-center'>Log In</div>

                {errorMessage && <div className='border-2 border-red-800 bg-red-300 p-1 px-2 w-fit text-red-600'>{errorMessage}</div>}

                <Form onSubmit={ submitHandler }>
                    <div className='flex flex-col space-y-2 mb-2'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username" 
                        required
                        className='border border-gray-400 dark:border-white p-2 w-64 md:w-[450px] dark:bg-primary dark:text-white'
                    />
                    </div>
                    <div className='flex flex-col space-y-2 mb-4'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className='border border-gray-400 dark:border-white p-2 w-64 md:w-[450px] dark:bg-primary dark:text-white'
                    />
                    </div>
                    <button type="submit" className='bg-secondary hover:bg-secondary-light w-fit text-white py-2 px-3 rounded mb-4'>Log In</button>

                    <div>Don't have an account? <Link to='/register' className='text-blue-500 underline'>Register</Link> </div>
                </Form>
            </div>}
        
        </div>
    )
}

export default LoginPage