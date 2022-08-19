import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebase-config'

const Navbar = () => {
  const navigate = useNavigate()
  const logout = async () => {
    const value = await signOut(auth)
    if (!value) {
      console.log('U', value)
      navigate('/')
    } else {
      console.log('login')
    }
  }
  const [addUser, setAddUser] = useState(false)
  if (addUser) {
    console.log('added')
  }
  return (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC]">
        <div className="border-b-2 rounded-b-xl h-20">
          <div>
            <div className="flex space-x-4 p-5">
              <div>
                <button
                  className="bg-white bg-opacity-50 bg-blur-xl py-2 px-5 rounded-3xl hover:bg-white"
                  onClick={() => navigate('dashboard')}
                >
                  <span>Dashboard</span>
                </button>
              </div>
              <div>
                <button
                  className="bg-white bg-opacity-50 bg-blur-xl py-2 px-6 rounded-3xl hover:bg-white"
                  onClick={() => navigate('alluser')}
                >
                  <span>ALL Users</span>
                </button>
              </div>
              <div>
                <button
                  className="bg-white bg-opacity-50 bg-blur-xl py-2 px-6 rounded-3xl hover:bg-white"
                  onClick={() => navigate('newuser')}
                >
                  <span>ADD Users</span>
                </button>
              </div>
              <div>
                <button className="bg-white bg-opacity-50 bg-blur-xl py-2 px-8 rounded-3xl hover:bg-white" onClick={(e) => logout()}>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Navbar
