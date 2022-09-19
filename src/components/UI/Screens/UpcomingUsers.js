import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from 'firebase/firestore'
import { db, auth } from '../../../firebase-config'
import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import moment from 'moment/moment'

const UpcomingUsers = () => {
  const Uid = useSelector((state) => state.uidNumber.uid)
  const navigate=useNavigate()

  const [Users, setUsers] = useState()

  useEffect(() => {
    getUsers()
    // getUsers()
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

  const [userArr, setUserArr] = useState()
  const makeUsersArray = () => {
    if (Users) {
      const usrsData = []
      let userTemp = [...Users]

      for (let i in userTemp) {
        let installment = userTemp[i].installment
        for (let k in installment) {
          const { isPaid, date } = installment[k]
          const momentDate = moment(date, 'DD-MM-YYYY').format('DD-MM-YYYY')
          if (!moment().isAfter(momentDate) && !isPaid) {
            let user = {
              email: userTemp[i].email,
              name: userTemp[i].name,
              mobile: userTemp[i].mobile,
              pName: userTemp[i].pName,
              startDate: userTemp[i].startDate,
              typeOfInstalment: userTemp[i].typeOfInstalment,
              noInstalment: userTemp[i].noInstalment,
              id: userTemp[i].id,
            }
            // console.log(user)
            user['due'] = date
            user['installmentPrice'] = installment[k].installment
            user['installment'] = null
            usrsData.push(user)
            // console.log(usrsData)
          }
        }
      }
      setUserArr(usrsData)
    }
  }

  // const [pensingUser, setPendingUser] = useState()
  useEffect(() => {
    makeUsersArray()
  }, [Users])

  const columns = [
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
      // sortable: true,
      // reorder: true,
    },
    {
      id: 3,
      name: 'Phone',
      selector: (row) => row.mobile,
      // sortable: true,
      // reorder: true,
    },
    {
      id: 4,
      name: 'Product Name',
      selector: (row) => row.pName,
      // sortable: true,
      // reorder: true,
    },
    {
      id: 5,
      name: 'Instalment Price',
      selector: (row) => row.installmentPrice,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: 'Started Date',
      selector: (row) => row.startDate,
      sortable: true,
      reorder: true,
    },
    {
      id: 7,
      name: 'Type of Instalment',
      selector: (row) => row.typeOfInstalment,
      sortable: true,
      reorder: true,
    },
    {
      id: 8,
      name: 'No of Instalment',
      selector: (row) => row.noInstalment,
      sortable: true,
      reorder: true,
    },
    {
      id: 9,
      name: 'Due Date',
      selector: (row) => row.due,
      sortable: true,
      reorder: true,
    },
    {
      id: 9,
      name: 'Due Date',
      // selector: (row) => row.due,
      cell: (row) => (
        <button onClick={(id) => view(id.target.id)} id={row.id}>
          View
        </button>
      ),
      sortable: true,
      reorder: true,
    },
  ]

  const [showInfo, setShowInfo] = useState(false)
  const [dataInfo, setDataInfo] = useState()
  const [data, setData] = useState()

  const view = (e) => {
    setShowInfo(true)
    const user = []
    for (let i in Users) {
      if (Users[i].id == e) {
        setDataInfo(Users[i])
        let userTemp = [...Users[i].installment]
        for (let j in userTemp) {
          let info = {
            date: userTemp[j].date,
            installment: userTemp[j].installment,
            isPaid: userTemp[j].isPaid,
            paidDate: userTemp[j].paidDate,
          }
          info['id'] = parseInt(j,10)+1
          info['paid'] = info.isPaid.toString()
          if (info.paidDate == null) {
            info['payDate'] = 'N/a'
          }
          user.push(info)
        }
        setData(user)
      }
    }
  }
  useEffect(() => {
    console.log('here', data)
  }, [data])

  const viewColumns = [
    {
      id: 1,
      name: 'Sr. Mo.',
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: 'Due date',
      selector: (row) => row.date,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: 'Installment',
      selector: (row) => row.installment,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: 'Paid date',
      selector: (row) => row.payDate,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: 'Paid Status',
      selector: (row) => row.paid,
      sortable: true,
      reorder: true,
    },
  ]

  const pay=()=>{
    navigate('/main/alluser')
  }

  return (
    <>
      <div>
        <div className="flex py-3 px-6">
          <div className="w-full">
            <DataTable
              title="Upcoming Users"
              columns={columns}
              data={userArr}
              pagination
              // fixedHeaderScrollHeight='240px'
            />
          </div>
        </div>
        {showInfo && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex pt-28 justify-center">
            <div className="bg-white w-4/5 h-fit rounded-lg">
              <div className="flex flex-row flex-wrap p-4">
                <div className="flex flex-col pt-5 space-y-8">
                  <div className="flex space-x-16">
                    <div className="flex flex-col">
                      <span className="font-semibold">Product Name</span>
                      <span>{dataInfo.pName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Price</span>
                      <span>{dataInfo.totalPrice}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Initial Pay</span>
                      <span>{dataInfo.initialPay}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold">Interest</span>
                      <span>{dataInfo.interest}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">Type of Instalment</span>
                      <span>{dataInfo.typeOfInstalment}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">No of Instalment</span>
                      <span>{dataInfo.noInstalment}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <DataTable
                  title="Upcoming Users"
                  columns={viewColumns}
                  data={data}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight='240px'
                />
              </div>
              <div className="space-x-2 p-3 flex justify-end font-mono">
                <button
                  className="font-semibold hover:border-black rounded-3xl border border-slate-500 py-2 px-5"
                  onClick={() => setShowInfo(false)}
                >
                  Close
                </button>
                <button
                  className="bg-[#776BCC] font-semibold hover:border-black rounded-3xl border border-slate-500 py-2 px-7"
                  onClick={()=>pay()}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UpcomingUsers
