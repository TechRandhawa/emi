import { React, useState, useEffect } from 'react'
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../../../firebase-config'
import { useSelector } from 'react-redux'
import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { getClientUID } from '../../Redux/action'
import DataTable from 'react-data-table-component'

const AllUsers = () => {
  const Uid = useSelector((state) => state.uidNumber.uid)
  const clientUid = useSelector((state) => state.uidNumber.cuid)
  const dispatch = useDispatch()

  const [Users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
    getUsers()
  }, [Uid])

  useEffect(() => {
    for (let i in Users)
      if (Users[i].id == clientUid) {
        console.log('got id', Users[i].id)
        pay(Users[i].id)
      }
  }, [Users])

  const closePay = () => {
    setPayAction(false)
    dispatch(getClientUID(''))
  }

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

  const [payAction, setPayAction] = useState(false)
  const [delAction, setDelAction] = useState(false)
  const [userIndex, setUserIndex] = useState()

  const [Data, setData] = useState({})

  const pay = (e) => {
    for (let i in Users) {
      if (Users[i].id == e) {
        setData(Users[i])
      }
    }
    // Data.pop()
    // Data.push(Users[e])
    setPayAction(true)
    setUserIndex(e)
  }
  const updatePaidStatus = (e, val) => {
    console.log(val.target.checked)
    const paidUser = { ...Data }
    paidUser.installment[e].paidDate = val.target.checked
      ? moment().format('DD-MM-YYYY')
      : 'N/a'
    paidUser.installment[e].isPaid = val.target.checked
    setData(paidUser)
    console.log(paidUser)
  }
  const saveUser = async () => {
    const docRef = doc(db, 'users-client', Users[userIndex].id)
    await setDoc(docRef, Data)
    console.log('User Saved')
  }

  const remove = (e) => {
    setDelAction(true)
    for (let i in Users) {
      if (Users[i].id == e) {
        setUserIndex(i)
      }
    }
  }
  const deleteUser = async () => {
    const docRef = doc(db, 'users-client', Users[userIndex].id)
    const delUser = Users[userIndex]
    delUser.delete = true
    await setDoc(docRef, delUser)
    console.log(delUser)
    setDelAction(false)
    getUsers()
  }

  const mainColumns = [
    {
      id: 1,
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: 'Phone',
      selector: (row) => row.mobile,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: 'Product Name',
      selector: (row) => row.pName,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: 'Price',
      selector: (row) => row.totalPrice,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: 'Type of Instalment',
      selector: (row) => row.typeOfInstalment,
      sortable: true,
      reorder: true,
    },
    {
      id: 7,
      name: 'No of Instalment',
      selector: (row) => row.noInstalment,
      sortable: true,
      reorder: true,
    },
    {
      id: 8,
      name: 'Started Date',
      selector: (row) => row.startDate,
      sortable: true,
      reorder: true,
    },
    {
      id: 9,
      name: 'Action',
      // selector: (row) => row.paid,
      cell: (row) => (
        <div className="flex bg-white space-x-1 border-2 shadow-sm shadow-gray-700 rounded-lg p-2">
          <svg
            onClick={() => pay(row.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            onClick={() => remove(row.id)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      ),
      sortable: true,
      reorder: true,
    },
  ]

  return (
    <>
      <div className="h-full">
        <div className="p-5">
          <div className="w-full p-2 border-2 rounded-t-xl font-semibold bg-[#8f80ff]">
            <span>ALL USERS</span>
          </div>
          <div>
            <DataTable
              // title="All Users"
              columns={mainColumns}
              data={Users}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="480px"
            />
          </div>
        </div>
        {payAction && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex pt-28 justify-center">
            <div className="bg-white w-4/5 h-fit rounded-lg">
              <div className="flex flex-row flex-wrap p-4">
                <div className="flex flex-col pt-5 space-y-8">
                  <div className="flex space-x-16">
                    <div className="flex flex-col">
                      <span className="font-semibold">Product Name</span>
                      <span>{Data.pName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Price</span>
                      <span>{Data.totalPrice}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Initial Pay</span>
                      <span>{Data.initialPay}</span>
                    </div>
                  </div>
                  <div className="flex space-x-16">
                    <div className="flex flex-col">
                      <span className="font-semibold">Interest</span>
                      <span>{Data.interest}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Type of Instalment</span>
                      <span>{Data.typeOfInstalment}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">No of Instalment</span>
                      <span>{Data.noInstalment}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <table>
                    <thead>
                      <tr className="border-2">
                        <th className="px-4">Sr. No.</th>
                        <th className="px-4">Due Date</th>
                        <th className="px-4">Installment</th>
                        <th className="px-4">Paid Date</th>
                        <th className="px-4">Paid Status</th>
                        <th className="px-4">Change Paid Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data.installment.map((data, index) => {
                        return (
                          <tr className="text-center border-2">
                            <td className="">{index + 1}</td>
                            <td>{data.date}</td>
                            <td>{data.installment}</td>
                            {data.paidDate ? (
                              <td>{data.paidDate}</td>
                            ) : (
                              <td>N/a</td>
                            )}
                            {data.isPaid ? (
                              <td>{data.isPaid.toString()}</td>
                            ) : (
                              <td>{data.isPaid.toString()}</td>
                            )}
                            <td>
                              <input
                                type="checkbox"
                                id="paid"
                                name="paid"
                                value={data.isPaid}
                                checked={data.isPaid}
                                onClick={(val) => updatePaidStatus(index, val)}
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="space-x-2 p-3 flex justify-end font-mono">
                <button
                  className="font-semibold hover:border-black rounded-3xl border border-slate-500 py-2 px-5"
                  onClick={() => closePay()}
                >
                  Close
                </button>
                <button
                  className="bg-[#776BCC] font-semibold hover:border-black rounded-3xl border border-slate-500 py-2 px-5"
                  onClick={() => saveUser()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {delAction && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex pt-28 justify-center">
            <div className="bg-white w-1/3 p-4 h-fit rounded-lg">
              <div className="flex flex-col space-y-5">
                <span className="text-xl font-semibold uppercase font-mono">
                  !Inportant
                </span>
                <span>Are you sure to delete this record</span>
              </div>
              <div className="flex justify-end space-x-4 pt-4 font-mono">
                <button
                  className="font-semibold hover:border-black rounded-3xl border border-slate-500 py-2 px-5"
                  onClick={() => setDelAction(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#776BCC] font-semibold hover:border-black rounded-3xl border border-slate-500 py-2 px-5"
                  onClick={() => deleteUser()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AllUsers
