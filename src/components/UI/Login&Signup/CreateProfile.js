import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase-config'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useSelector } from 'react-redux'

const CreateProfile = () => {
  let navigate = useNavigate()
  const state = useSelector((state) => state.uidNumber)
  const [values, setValues] = useState({
    businessName: '',
    businessOwner: '',
    tanNumber: 0,
    gstNumber: 0,
    address: '',
    pinNumber: 0,
    contactNumber1: 0,
    contactNumber2: 0,
    contactNumber3: 0,
    userType: 'admin',
  })

  //profile submittion
  const usersCollectionRef = collection(db, 'user')
  const submit = async () => {
    if (
      values.address &&
      values.businessName &&
      values.businessOwner &&
      values.gstNumber &&
      values.pinNumber &&
      values.tanNumber &&
      values.contactNumber1 &&
      values.contactNumber2 &&
      values.contactNumber3
    ) {
      await setDoc(doc(db, 'users', state), values)
      // await addDoc(usersCollectionRef,{values})
      navigate('/main/dashboard')
    }else{
      console.log("fill all details!");
    }
  }
  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC] justify-center items-center">
        <div className="overflow-hidden flex relative h-[700px] w-[640px] shadow-2xl bg-gradient-to-r from-[#5D54A4] to-[#7C78B8]">
          <div className="relative z-10 h-full w-full">
            <div className="p-8 pt-14 relative space-y-8 text-black">
              <h1 className="font-semibold text-2xl uppercase">
                Create your profile
              </h1>
              <div className="space-x-8">
                <input
                  type="text"
                  id="name"
                  placeholder="Business Name"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  onChange={(e) =>
                    setValues((businessName) => ({
                      ...businessName,
                      businessName: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Owner Name"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="name"
                  onChange={(e) =>
                    setValues((businessOwner) => ({
                      ...businessOwner,
                      businessOwner: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-x-8">
                <input
                  type="number"
                  placeholder="TAN Number"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="number"
                  onChange={(e) =>
                    setValues((tanNumber) => ({
                      ...tanNumber,
                      tanNumber: e.target.value,
                    }))
                  }
                />
                <input
                  type="number"
                  placeholder="GST Number"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="number"
                  onChange={(e) =>
                    setValues((gstNumber) => ({
                      ...gstNumber,
                      gstNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <textarea
                  type="text"
                  placeholder="Address"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-4/5"
                  id="address"
                  onChange={(e) =>
                    setValues((address) => ({
                      ...address,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-x-8">
                <input
                  type="nummber"
                  placeholder="PIN"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="number"
                  onChange={(e) =>
                    setValues((pinNumber) => ({
                      ...pinNumber,
                      pinNumber: e.target.value,
                    }))
                  }
                />
                <input
                  type="number"
                  placeholder="Contact Number 1"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="number"
                  onChange={(e) =>
                    setValues((contactNumber1) => ({
                      ...contactNumber1,
                      contactNumber1: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-x-8">
                <input
                  type="nummber"
                  placeholder="Contact Number 2"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="number"
                  onChange={(e) =>
                    setValues((contactNumber2) => ({
                      ...contactNumber2,
                      contactNumber2: e.target.value,
                    }))
                  }
                />
                <input
                  type="number"
                  placeholder="Contact Number 3"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 placeholder:text-black bg-transparent p-3 pl-6 font-bold w-[45%]"
                  id="number"
                  onChange={(e) =>
                    setValues((contactNumber3) => ({
                      ...contactNumber3,
                      contactNumber3: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex mt-11 justify-center">
                <button
                  className="bg-white text-sm font-semibold w-3/4 mt-8 py-4 px-5 rounded-3xl border border-slate-700 flex justify-center items-center shadow-md shadow-black"
                  onClick={() => submit()}
                >
                  <span>Create your profile</span>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 ">
            <div className="rotate-45">
              <div className="absolute h-[400px] w-[200px] bg-[#7E7BB9] top-[200px] right-[-400px] rounded-[32px] shadow-sm shadow-white"></div>
              <div className="absolute h-[540px] w-[190px] bg-gradient-to-b from-[#5D54A4] to-[#6A679E] top-[-150px] right-[-170px] rounded-[32px] shadow-sm shadow-white"></div>
              <div className="absolute h-[240px] w-[220px] bg-[#6C63AC] top-[-240px] right-[55px] rounded-[32px] shadow-md shadow-white"></div>
              <div className="absolute h-[640px] w-[640px] bg-white top-[40px] right-[-90px] rounded-bl-[72px] shadow-md shadow-black rotate-180"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="h-screen flex bg-gray-500">
        <div className="w-full max-w-xl m-auto bg-white rounded-lg border border-primary shadow-default py-6 px-16">
          <h1 className="text-2xl font-medium text-primary mt-3 mb-10 text-center">
            Create your profile 👨‍💻
          </h1>
          <div>
            <span>Name of the business</span>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="name"
              placeholder="Name of the business"
              onChange={(e) =>
                setValues((businessName) => ({
                  ...businessName,
                  businessName: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <span>Name of the business owner</span>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="name"
              placeholder="Name of the business owner"
              onChange={(e) =>
                setValues((businessOwner) => ({
                  ...businessOwner,
                  businessOwner: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex space-x-2">
            <div>
              <span>TAN Number</span>
              <input
                type="number"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="number"
                placeholder="TAN Number"
                onChange={(e) =>
                  setValues((tanNumber) => ({
                    ...tanNumber,
                    tanNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <span>GST Number</span>
              <input
                type="number"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="number"
                placeholder="GST Number"
                onChange={(e) =>
                  setValues((gstNumber) => ({
                    ...gstNumber,
                    gstNumber: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <span>Address</span>
            <textarea
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="address"
              placeholder="Address"
              onChange={(e) =>
                setValues((address) => ({
                  ...address,
                  address: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="flex space-x-2">
            <div>
              <span>PIN</span>
              <input
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                type="nummber"
                id="number"
                placeholder="PIN"
                onChange={(e) =>
                  setValues((pinNumber) => ({
                    ...pinNumber,
                    pinNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <span>Contact Number 1</span>
              <input
                type="number"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="number"
                placeholder="Contact Number 1"
                onChange={(e) =>
                  setValues((contactNumber1) => ({
                    ...contactNumber1,
                    contactNumber1: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className='flex space-x-2'>
            <div>
              <span>Contact Number 2</span>
              <input
                type="number"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="number"
                placeholder="Contact Number 2"
                onChange={(e) =>
                  setValues((contactNumber2) => ({
                    ...contactNumber2,
                    contactNumber2: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <span>Contact Number 3</span>
              <input
                type="number"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="number"
                placeholder="Contact Number 3"
                onChange={(e) =>
                  setValues((contactNumber3) => ({
                    ...contactNumber3,
                    contactNumber3: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-6 space-x-8">
            <button
              className={`w-48 bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
              onClick={() => submit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default CreateProfile
