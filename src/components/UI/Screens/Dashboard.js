import { React, useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const Uid = useSelector((state) => state.uidNumber.uid)

  const [Users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
    getUsers()
  }, [Uid])

  const usersCollectionRef = collection(db, 'users-client')

  const getUsers = async () => {
    const q = query(
      usersCollectionRef,
      where('uid', '==', Uid),
      where('delete', '==', false),
    )
    const data = await getDocs(q)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const [userLen, setUserLen] = useState()
  const [pendingLen, setPendingLen] = useState()
  const [upcomingLen, setUpcomingLen] = useState()
  const [totalLen, setToatlLen] = useState()
  useEffect(() => {
    let len = Users.length
    setUserLen(len)
    let Arr = [...Users]
    let pendingLength = 0
    let upcomingLength = 0
    let totalLen = 0
    for (let i in Arr) {
      let installment = Arr[i].installment
      for (let j in installment) {
        const { isPaid, date } = installment[j]
        const momentDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY')
        totalLen = totalLen + 1
        if (moment().isAfter(momentDate) && !isPaid) {
          pendingLength = pendingLength + 1
        } 
        if (!moment().isAfter(momentDate) && !isPaid) {
          upcomingLength = upcomingLength + 1
        }
      }
    }
    setPendingLen(pendingLength)
    setUpcomingLen(upcomingLength)
    setToatlLen(totalLen)
  }, [Users])

  return (
    <>
      <div className="p-5 flex justify-center w-full">
        <div className="flex w-full text-xl">
          <div className=" w-1/3 p-2">
            <div className="bg-gradient-to-r to-[#C7C5F4] from-[#776BCC] p-8 space-y-2 shadow-xl border rounded-md">
              <span>All Users</span>
              <div>{userLen}</div>
              <div
                className="text-sm underline cursor-pointer"
                onClick={() => {
                  navigate('/main/alluser')
                }}
              >
                View All Users
              </div>
            </div>
          </div>
          <div className=" w-1/3 p-2">
            <div className="bg-gradient-to-br to-[#C7C5F4] from-[#776BCC] p-8 space-y-2 shadow-xl border rounded-md">
              <span>Pending</span>
              <div>
                {pendingLen}/{totalLen}
              </div>
              <div
                className="text-sm underline cursor-pointer"
                onClick={() => {
                  navigate('/main/pending')
                }}
              >
                View Pendings
              </div>
            </div>
          </div>
          <div className=" w-1/3 p-2">
            <div className="bg-gradient-to-tr to-[#C7C5F4] from-[#776BCC] p-8 space-y-2 shadow-xl border rounded-md">
              <span>Upcoming</span>
              <div>
                {upcomingLen}/{totalLen}
              </div>
              <div
                className="text-sm underline cursor-pointer"
                onClick={() => {
                  navigate('/main/upcomming')
                }}
              >
                View Upcomings
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
