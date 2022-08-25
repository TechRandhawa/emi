import React,{useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Login from '../UI/Login&Signup/Login'
import Register from '../UI/Login&Signup/Register'
import ForgetPassword from '../UI/Login&Signup/ForgetPassword'
import CreateProfile from '../UI/Login&Signup/CreateProfile'
import Navbar from '../UI/Screens/Navbar'
import Dashboard from '../UI/Screens/Dashboard'
import AddNewUser from '../UI/Screens/AddNewUser'
import AllUsers from '../UI/Screens/AllUsers'
import { db, auth } from '../../firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

function Router() {
  const [userUid, setUserUid] = useState('')
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserUid(user.uid)
    } else {
      console.log('logout')
    }
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/createprofile" element={<CreateProfile />}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        {userUid && (
          <Route path="/main" element={<Navbar />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="newuser" element={<AddNewUser />}></Route>
            <Route path="alluser" element={<AllUsers />}></Route>
          </Route>
        )}
      </Routes>
    </>
  )
}

export default Router
