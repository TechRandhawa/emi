import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase-config'
import { useDispatch } from 'react-redux'
import { getUserUID } from '../../Redux/action'

const Login = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()

  //login
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  //login Function
  const login = async () => {
    let user = undefined
    try {
      user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
      // notify(error.message)
    }
    if (user.user.email) {
      console.log(values)
      dispatch(getUserUID(user.user.uid))
      navigate('/main/dashboard')
    }
    console.log(user.user.uid)
  }
  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC] justify-center items-center">
        <div className="overflow-hidden flex relative h-[600px] w-[360px] shadow-2xl bg-gradient-to-r from-[#5D54A4] to-[#7C78B8]">
          <div className="relative z-10 h-full w-full">
            <div className="p-8 pt-20 relative space-y-5">
              <h1 className='font-semibold text-2xl'>LOGIN</h1>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-3 pl-6 font-bold w-3/4"
                  onChange={(e) =>
                    setValues((email) => ({ ...email, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-3 pl-6 font-bold w-3/4"
                  onChange={(e) =>
                    setValues((password) => ({
                      ...password,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col justify-center items-center space-y-4">
                <button
                  className="bg-white text-sm font-semibold mt-16 py-4 px-5 rounded-3xl w-full border border-slate-700  shadow-md shadow-black"
                  onClick={() => login()}
                >
                  <span>LOGIN NOW</span>
                </button>
                <span className='font-semibold hover:underline hover:cursor-pointer' onClick={()=>navigate("/forgetpassword")}>FORGET PASSWORD ?</span>
              </div>
            </div>
            <div className="absolute h-36 w-32 text-center bottom-0 right-0 text-white text-lg font-semibold">
              <h1>OR</h1>
              <span
                className="underline text-sm cursor-pointer"
                onClick={() => navigate('/register')}
              >
                CREATE NEW ACC
              </span>
            </div>
          </div>
          <div className="absolute inset-0 z-0 ">
            <div className="rotate-45">
              <div className="absolute h-[400px] w-[200px] bg-[#7E7BB9] top-[220px] right-[-400px] rounded-[32px] shadow-sm shadow-white"></div>
              <div className="absolute h-[540px] w-[190px] bg-gradient-to-b from-[#5D54A4] to-[#6A679E] top-[-150px] right-[-150px] rounded-[32px] shadow-sm shadow-white"></div>
              <div className="absolute h-[220px] w-[220px] bg-[#6C63AC] top-[-210px] right-[55px] rounded-[32px] shadow-sm shadow-white"></div>
              <div className="absolute h-[520px] w-[520px] bg-white top-[40px] right-[-90px] rounded-tr-[72px] shadow-lg shadow-black"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
