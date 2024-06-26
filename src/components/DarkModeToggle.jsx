import React from 'react'
import { useState, useEffect } from 'react'
import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement
        const theme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (theme === 'dark' || (!theme && systemPrefersDark)) {
            root.classList.add('dark');
            setIsDarkMode(true);
        } else {
            root.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, [])

    const toggleDarkMode = () => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <button onClick={toggleDarkMode} className=''>
            {isDarkMode ? <FiSun /> : <IoMoon/>}
        </button>
    )
}

export default DarkModeToggle