import React, { useEffect, useState } from 'react'
import { triviaCategories } from '../utils/categories'
import { amountArr } from '../utils/amountArr'
import { useNavigate, useSearchParams } from 'react-router-dom'

const HomePage = () => {
    const [category, setCategory] = useState(0)
    const [difficulty, setDifficulty] = useState('any')
    const [limit, setLimit] = useState(50) //map function limit
    const [amount, setAmount] = useState(1) //number being sent to backend
    const [categories, setCategories] = useState(triviaCategories)

    const navigate = useNavigate();

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };

    const handleDifficultyChange = (e) => {
      setDifficulty(e.target.value)
    }

    const handleAmountChange = (e) => {
      setAmount(e.target.value)
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
      navigate(`/questions?category=${category}&difficulty=${difficulty}&amount=${amount}`)
    }

    return (
      <div className=''>
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

        <button onClick={() => handleStart()}>Start Game</button>

      </div>
    )
}

export default HomePage