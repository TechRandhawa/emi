import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../firebase-config'

const ForgetPassword = () => {
  let navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    password: '',
    cpassword: '',
  })

    const forgetPassword=()=>{}
  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC] justify-center items-center">
        <div className="overflow-hidden flex relative h-[600px] w-[360px] shadow-2xl bg-gradient-to-r from-[#5D54A4] to-[#7C78B8]">
          <div className="relative z-10 h-full w-full">
            <div className="p-8 pt-12 relative space-y-5">
              <h1 className='font-semibold text-2xl'>CHANGE PASSWORD</h1>
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
                  placeholder="New Password"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-3 pl-6 font-bold w-3/4"
                  onChange={(e) =>
                    setValues((password) => ({
                      ...password,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-3 pl-6 font-bold w-3/4"
                  onChange={(e) =>
                    setValues((cpassword) => ({
                      ...cpassword,
                      cpassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex mt-11">
                <button
                  className="bg-white text-sm font-semibold mt-8 py-4 px-5 rounded-3xl w-full border border-slate-700 flex justify-center items-center shadow-md shadow-black"
                  onClick={() => forgetPassword()}
                >
                  <span>FORGET PASSWORD</span>
                </button>
              </div>
            </div>
            <div className="absolute h-36 w-32 text-center bottom-0 right-0 text-white text-lg font-semibold">
              <h1>OR</h1>
              <span
                className="underline text-sm cursor-pointer"
                onClick={() => navigate('/')}
              >
                BACK TO LOGIN
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

export default ForgetPassword
