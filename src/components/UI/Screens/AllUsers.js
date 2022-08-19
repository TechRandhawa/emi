import { React, useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

const AllUsers = () => {
  // let userUid = undefined
  let [userUid, setUserUid] = useState('')
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserUid(user.uid)
    } else {
      console.log('logout')
    }
  })

  const [Users, setUsers] = useState([])
  useEffect(() => {
    console.log(Users)
  }, [Users])

  useEffect(() => {
    getUsers()
    getUsers()
  }, [userUid])
  
  const usersCollectionRef = collection(db, 'users-client')

    const getUsers = async () => {
    const q = query(usersCollectionRef, where('uid', '==', userUid))
    const data = await getDocs(q)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  return (
    <>
      <div className="h-full">
        <div className="p-5">
          <div className="w-full p-2 border-2 rounded-t-xl font-semibold bg-[#8f80ff]">
            <span>ALL USERS</span>
          </div>
          <div>
            <table className="w-full border-l-2 border-r-2">
              <thead>
                <tr className="text-center border-b-2">
                  <th className="text-left py-3 pl-1">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Phone</th>
                  <th className="text-left">Product Name</th>
                  <th>Price</th>
                  <th>Initial Pay</th>
                  <th>Interest</th>
                  <th>Type of Instalment</th>
                  <th>No of Instalment</th>
                  <th>Started Date</th>
                  <th className="pr-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {Users.map((data) => {
                  return (
                    <tr className="text-center border-b-2">
                      <td className="w-40 text-left py-2 pl-1">{data.name}</td>
                      <td className="w-40 text-left">{data.email}</td>
                      <td className="w-40 text-left">{data.mobile}</td>
                      <td className="w-40 text-left">{data.pName}</td>
                      <td className="w-40 ">{data.totalPrice}</td>
                      <td className="w-40 ">{data.initialPay}</td>
                      <td className="w-40 ">{data.interest}%</td>
                      <td className="w-40 ">{data.typeOfInstalment}</td>
                      <td className="w-40 ">{data.noInstalment}</td>
                      <td className="w-40 ">{data.startDate}</td>
                      <td className="text-xl">...</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllUsers
