import { React, useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, auth } from '../../../firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

const AllUsers = () => {
  let userUid = ''
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userUid = user.uid
    } else {
    }
  })
  const [Users, setUsers] = useState([])

  useEffect(() => {
    console.log(Users)
    console.log(Users.values.uid)
  }, [Users])

  const usersCollectionRef = collection(db, 'users-client')

  useEffect(() => {
    getUsers()
    getUsers()
  }, [])

  const getUsers = async () => {
       const data = await getDocs(usersCollectionRef)
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    // console.log()
    // console.log(Object.values(Users))
    // const element = [];
    // for (let i = 0; i <= Users.length; i++) {
    //   element=Users[i]
    // }
    // console.log(element);
  }

  const [Sort, setSort] = useState(0)
  const [NameIcon, setNameIcon] = useState(false)
  const [SourceIcon, setSourceIcon] = useState(false)
  const [VerticalIcon, setVerticalIcon] = useState(false)
  const [TotalRecIcon, setTotalRecIcon] = useState(false)
  const [TodayChgIcon, setTodayChgIcon] = useState(false)
  const [DateIcon, setDateIcon] = useState(false)

  return (
    <>
      <div className=" h-full bg-[#c8c8c8]">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((data) => {
              return (
                <tr>
                  <td>{data.values.name}</td>
                  <td>{data.values.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllUsers
