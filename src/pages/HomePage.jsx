import React, { useEffect, useState } from 'react'
import { triviaCategories } from '../utils/categories'
import { amountArr } from '../utils/amountArr'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import AchievementTable from '../components/AchievementTable'
import { FaArrowRight } from "react-icons/fa";

const HomePage = () => {
    const [category, setCategory] = useState(0)
    const [difficulty, setDifficulty] = useState('any')
    const [limit, setLimit] = useState(50) //map function limit
    const [amount, setAmount] = useState(1) //number being sent to backend
    const [categories, setCategories] = useState(triviaCategories)
    const [userData, setUserData] = useState(null)
    const [index, setIndex] = useState(0)
    const [gamemode, setGamemode] = useState('Normal')

    const navigate = useNavigate();

    {/*Grabs user data for mini profile */}
    useEffect(() => {
      if(localStorage.getItem('userInfo')){
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        const getUserData = async () => {
          const response = await fetch(`${apiBaseUrl}/users/user_data`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          if(response.ok){
            const data = await response.json()
            // console.log(data)
            setUserData(data)
          }
        }
        getUserData()
      }
    }, [])

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };

    const handleDifficultyChange = (e) => {
      setDifficulty(e.target.value)
    }

    const handleAmountChange = (e) => {
      setAmount(e.target.value)
    }

    const handleGamemodeChange = (e) => {
      setGamemode(e.target.value)
    }
    
    {/*Handles dynamic amount */}
    useEffect(() => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
      if(category !== 0){
        const getAmount = async () => {
          const response = await fetch(`${apiBaseUrl}/trivia/amount?categoryId=${category}&difficulty=${difficulty}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if(response.ok){
            const data = await response.json()
            setLimit(data.amount)
          }
        }
        getAmount()
      }
    }, [category, difficulty])

    const handleStart = () => {
      if(gamemode === 'Normal'){
        navigate(`/questions?category=${category}&difficulty=${difficulty}&amount=${amount}`)
      } else {
        navigate(`/timed_questions?category=${category}&difficulty=${difficulty}&amount=${amount}`)
      }
    }

    const handleNextClick = () => {
      if(index + 1 === userData.length){
        setIndex(0)
      } else {
        setIndex(prev => prev + 1)
      }
    }

    return (
      <div className='flex flex-col justify-center items-center space-y-4'>

        {/*Login/Register prompt when not logged in */}
        {!localStorage.getItem('userInfo') && 
          <div className='bg-lighterPrimary text-white px-3 py-6 rounded-lg  text-lg m-2 md:mt-5'>
            Make sure to <Link to={'/login'} className='text-secondary hover:underline'>log in</Link> or <Link to={'/register'} className='text-secondary hover:underline'>register</Link> to keep track of your game stats, history, and achievements. 
          </div>
        }

        {/*Mini profile when logged in */}
        {localStorage.getItem('userInfo') && userData &&
          <div className='flex flex-col bg-lighterPrimary text-white w-[350px] p-3 rounded-md mt-3 md:mt-5'>
            <div className='text-center text-xl font-medium'>{JSON.parse(localStorage.getItem('userInfo')).username}</div>
            <div className='flex space-x-5 justify-between items-center text-lg'>
              {index === 0 && <div>Total Games: {userData[index]}</div>}
              {index === 1 && <div>Overall Average: {userData[index]}</div>}
              {index === 2 && <div>Total Answers Correct: {userData[index]}</div>}
              {index === 3 && <div>Total Answers Incorrect: {userData[index]}</div>}
              {index === 4 && <div>Most Played Category: {userData[index]}</div>}
              {index === 5 && <div>Current Perfect Score Streak: {userData[index]}</div>}
              {index === 6 && <div>Longest Perfect Score Streak: {userData[index]}</div>}
              <button className='bg-blue-600 p-2 rounded-md' onClick={() => handleNextClick()}><FaArrowRight size={20}/></button>
            </div>
          </div>
        }

        {/*Prompt Section */}
        <div className='border border-black rounded-lg p-3 space-y-2 md:space-y-4 lg:w-[500px]'>
          {/*Category Dropdown */}
          <div className='space-y-2'>
            <div className='text-center text-2xl font-medium'>Select <span className='text-secondary'>Category</span></div>
            <select name="categories" id="categories" onChange={handleCategoryChange} value={category} className='w-full text-center border dark:bg-primary dark:border-white border-black p-1 text-lg'>
              <option value={0}>Any Category</option>
              {categories.map((optionCategory, index) => {
                return <option value={optionCategory['id']} key={index}>{optionCategory['name']}</option>
              })}
            </select>
          </div>

          {/*Difficulty Dropdown */}
          <div className='space-y-2'>
            <div className='text-center text-2xl font-medium'>Select <span className='text-secondary'>Difficulty</span></div>
            <select name="difficulty" id="difficulty" onChange={handleDifficultyChange} value={difficulty} className='w-full text-center border dark:bg-primary dark:border-white border-black p-1 text-lg'>
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/*Amount Dropdown */}
          <div className='space-y-2'>
            <div className='text-center text-2xl font-medium'>Select <span className='text-secondary'>Amount</span></div>
            <select name="amount" id="amount" onChange={handleAmountChange} value={amount} className='w-full text-center border dark:bg-primary dark:border-white border-black p-1 text-lg'>
              {amountArr.map((num, index) => {
                if(index < limit){
                  return <option value={num} key={index}>{num}</option>
                }
              })}
            </select>
          </div>

          {/*Gamemode Dropdown */}
          <div className='space-y-2'>
            <div className='text-center text-2xl font-medium'>Select <span className='text-secondary'>Game Mode</span></div>
            <select name="gamemode" id="gamemode" onChange={handleGamemodeChange} value={gamemode} className='w-full text-center border dark:bg-primary dark:border-white border-black p-1 text-lg'>
              <option value="Normal">Normal</option>
              <option value="Timed">Timed</option>
            </select>
          </div>
            
          <div className='text-center'>
            <button onClick={() => handleStart()} className='bg-secondary hover:bg-secondary-light w-fit text-white py-2 px-3 rounded mb-4 text-lg'>Start Game</button>
          </div>
        </div>
        
        <AchievementTable />

      </div>
    )
}

export default HomePage