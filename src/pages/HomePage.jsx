import React, { useEffect, useState } from 'react'
import { triviaCategories } from '../utils/categories'
import { amountArr } from '../utils/amountArr'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

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
      <div className=''>
        {/*Login/Register prompt when not logged in */}
        {!localStorage.getItem('userInfo') && 
          <div>
            Make sure to <Link>log in</Link> or <Link>register</Link> to keep track of your game stats, history, and achievements. 
          </div>
        }

        {/*Mini profile when logged in */}
        {localStorage.getItem('userInfo') && userData &&
          <div className='border'>
            <div>{JSON.parse(localStorage.getItem('userInfo')).username}</div>
            {index === 0 && <div>Total Games: {userData[index]}</div>}
            {index === 1 && <div>Overall Average: {userData[index]}</div>}
            {index === 2 && <div>Total Answers Correct: {userData[index]}</div>}
            {index === 3 && <div>Total Answers Incorrect: {userData[index]}</div>}
            {index === 4 && <div>Most Played Category: {userData[index]}</div>}
            {index === 5 && <div>Current Perfect Score Streak: {userData[index]}</div>}
            {index === 6 && <div>Longest Perfect Score Streak: {userData[index]}</div>}
            <button className='bg-blue-600' onClick={() => handleNextClick()}>Next</button>
          </div>
        }

        {/*Category Dropdown */}
        <div>Category dropdown</div>
        <select name="categories" id="categories" onChange={handleCategoryChange} value={category}>
          <option value={0}>Any Category</option>
          {categories.map((optionCategory, index) => {
            return <option value={optionCategory['id']} key={index}>{optionCategory['name']}</option>
          })}
        </select>

        {/*Difficulty Dropdown */}
        <div>Difficulty Dropdown</div>
        <select name="difficulty" id="difficulty" onChange={handleDifficultyChange} value={difficulty}>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/*Amount Dropdown */}
        <div>Amount Dropdown</div>
        <select name="amount" id="amount" onChange={handleAmountChange} value={amount}>
          {amountArr.map((num, index) => {
            if(index < limit){
              return <option value={num} key={index}>{num}</option>
            }
          })}
        </select>

        {/*Gamemode Dropdown */}
        <div>Game Mode</div>
        <select name="gamemode" id="gamemode" onChange={handleGamemodeChange} value={gamemode}>
          <option value="Normal">Normal</option>
          <option value="Timed">Timed</option>
        </select>

        <button onClick={() => handleStart()}>Start Game</button>

      </div>
    )
}

export default HomePage