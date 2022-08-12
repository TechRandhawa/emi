import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [addUser, setAddUser] = useState(false)
  if (addUser) {
    console.log('added')
  }
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-red">
          <div>
            <div className="flex space-x-4 p-3">
              <div>
                <button
                  className="bg-blue-700 "
                  onClick={() => navigate('dashboard')}
                >
                  <span>Dashboard</span>
                </button>
              </div>
              <div>
                <button className="bg-blue-700"
                  onClick={() => navigate('alluser')}
                >
                  <span>ALL Users</span>
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-700 "
                  onClick={() => navigate('newuser')}
                >
                  <span>ADD Users</span>
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
