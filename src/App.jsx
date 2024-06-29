import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import QuestionsPage from './pages/QuestionsPage'
import ResultsPage from './pages/ResultsPage'
import Profile from './pages/Profile'
import Leaderboard from './pages/Leaderboard'
import UpdateProfile from './pages/UpdateProfile'
import ConfirmDelete from './pages/ConfirmDelete'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/questions' element={<QuestionsPage />}/>
      <Route path='/results/:id?' element={<ResultsPage />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/update_profile' element={<UpdateProfile />}/>
      <Route path='/confirm_delete' element={<ConfirmDelete />}/>
      <Route path='/leaderboard' element={<Leaderboard />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
  )
)

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
