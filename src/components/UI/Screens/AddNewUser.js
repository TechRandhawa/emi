import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { db, auth } from '../../../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import moment from 'moment'

const AddNewUser = () => {
  const Uid = useSelector((state) => state.uidNumber.uid)
  const navigate = useNavigate()
  //   Add User
  // -> name
  // -> mobile
  // -> email
  // -> product_name
  // -> product_details
  // -> initail payment //left
  // -> total_price
  // -> number_of_installments
  // -> type_of_installment (monthly, quarterly, half year, yearly)
  // -> Interest_percentage
  // -> start_date
  // —> Button(Create Installments) on click of button total_price, number_of _installments, start_date, type_of_installment and intrust should be filled up.
  // start_date -> number_of_installments -> type(Month)
  const [values, setValues] = useState({
    uid: '',
    name: '',
    mobile: '',
    email: '',
    pName: '',
    pDetail: '',
    totalPrice: 0,
    initialPay: 0,
    noInstalment: 0,
    typeOfInstalment: 'monthly',
    interest: 0,
    startDate: '',
    installment: [],
    delete: false,
  })

  useEffect(() => {
    setValues((uid) => ({ ...uid, uid: Uid }))
  }, [Uid])

  const [NewTable, setNewTable] = useState([])

  //Add Users
  const usersCollectionRef = collection(db, 'users-client')

  //create intallments new method
  const monthsToBeAdded = (string) => {
    switch (string) {
      case 'monthly':
        return 1
        break
      case 'quarterly':
        return 3
        break
      case 'yearly':
        return 12
        break
      default:
        return 0
    }
  }

  const createInstallments = () => {
    const {
      startDate,
      interest,
      noInstalment,
      typeOfInstalment,
      initialPay,
      totalPrice,
    } = values

    console.log('Values', values)
    let TOTAL_INTREST = ((totalPrice - initialPay) * interest) / 100
    let totalAmount = parseInt(TOTAL_INTREST + (totalPrice - initialPay))
    let tableValues = []

    let totalLoopAmount = 0
    console.log('Here', monthsToBeAdded(typeOfInstalment))
    for (let i = 1; i <= noInstalment; i++) {
      let obj = {
        date: moment(startDate)
          .add(monthsToBeAdded(typeOfInstalment) * i, 'M')
          .format('DD-MM-YYYY'),
        installment: Math.round(totalAmount / noInstalment),
        isPaid: false,
        paidDate: null,
      }

      totalLoopAmount += Math.round(totalAmount / noInstalment)
      tableValues.push(obj)
    }

    let difference = parseInt(totalAmount - totalLoopAmount)

    tableValues[tableValues.length - 1].installment =
      tableValues[tableValues.length - 1].installment + difference

    setNewTable([...tableValues])

    console.log(difference, totalLoopAmount)
  }

  useEffect(() => {
    setValues((installment) => ({ ...installment, installment: NewTable }))
  }, [NewTable])
  const [loader, setLoader] = useState(false)
  const submit = async () => {
    if (
      values.uid &&
      values.name &&
      values.email &&
      values.pName &&
      values.pDetail &&
      values.totalPrice &&
      values.initialPay &&
      values.noInstalment &&
      values.typeOfInstalment &&
      values.interest &&
      values.startDate
    ) {
      setLoader(true)
      await addDoc(usersCollectionRef, { ...values })
      setLoader(false)
      navigate('/main/alluser')
    } else {
    }
    console.log('error', values)
  }
  console.log(NewTable)

  return (
    <>
      <div className="h-full px-4">
        <div className="w-full flex">
          <div className="w-1/2 border-r-2 px-4 py-2">
            <h1 className="font-semibold text-lg">ADD NEW EMI</h1>
            <div className="flex pt-2 space-x-4">
              <div className="flex flex-1 flex-col space-y-1">
                <span>Name*</span>
                <input
                  type="text"
                  placeholder="name"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((name) => ({ ...name, name: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-1 flex-col space-y-1">
                <span>Mobile No.*</span>
                <input
                  type="number"
                  placeholder="mobile"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((mobile) => ({
                      ...mobile,
                      mobile: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex pt-3 space-x-4">
              <div className="flex flex-1 flex-col space-y-1">
                <span>Email*</span>
                <input
                  type="email"
                  placeholder="email"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((email) => ({ ...email, email: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-1 flex-col space-y-1">
                <span>Product Name*</span>
                <input
                  type="name"
                  placeholder="product name"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((pName) => ({ ...pName, pName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex pt-3 space-x-4">
              <div className="flex flex-1 flex-col space-y-1">
                <span>Product Details*</span>
                <input
                  type="name"
                  placeholder="product detail"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((pDetail) => ({
                      ...pDetail,
                      pDetail: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-1 flex-col space-y-1">
                <span>Total Price*</span>
                <input
                  type="number"
                  placeholder="total price"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((totalPrice) => ({
                      ...totalPrice,
                      totalPrice: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex pt-3 space-x-4">
              <div className="flex flex-1 flex-col space-y-1">
                <span>Initail Payment*</span>
                <input
                  type="number"
                  placeholder="Initail payment"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((initialPay) => ({
                      ...initialPay,
                      initialPay: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </div>
              <div className="flex flex-1 flex-col space-y-1">
                <span>No of Installments*</span>
                <input
                  type="number"
                  placeholder="number of instalments"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((noInstalment) => ({
                      ...noInstalment,
                      noInstalment: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex pt-3 space-x-4">
              <div className="flex flex-1 flex-col space-y-1">
                <span>Type of Installment*</span>
                <select
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) => {
                    setValues((typeOfInstalment) => ({
                      ...typeOfInstalment,
                      typeOfInstalment: e.target.value,
                    }))
                    let temp = [...NewTable]
                    temp = []
                    setNewTable(temp)
                  }}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="flex flex-1 flex-col space-y-1">
                <span>Intearest*</span>
                <input
                  type="number"
                  placeholder="Interest Rate"
                  className="border-transparent outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((interest) => ({
                      ...interest,
                      interest: parseInt(e.target.value, 10),
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex pt-3 space-x-4">
              <div className="flex flex-1 flex-col space-y-1">
                <span>Start Date*</span>
                <input
                  type="date"
                  placeholder="Start Date"
                  className="border-transparent w-1/2 outline-none border-b-2 border-b-slate-700 bg-transparent p-2 pl-3 placeholder:text-black"
                  onChange={(e) =>
                    setValues((startDate) => ({
                      ...startDate,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex pt-2 space-x-4">
              <button
                className="bg-white font-semibold hover:border-white w-3/4 2xl:mt-8 py-4 px-5 rounded-3xl border border-slate-500 flex justify-center items-center shadow-md shadow-black"
                onClick={() => createInstallments()}
              >
                Create Instalments
              </button>
              {/* {NewTable.length ? ( */}
                <button
                  disabled={!NewTable.length}
                  className="bg-white font-semibold hover:border-white w-3/4 2xl:mt-8 py-4 px-5 rounded-3xl border border-slate-500 flex justify-center items-center shadow-md shadow-black"
                  onClick={() => submit()}
                >
                  {loader ? 'Loading...' : 'Submit'}
                </button>
              {/* ) : null} */}
            </div>
          </div>
          <div className="p-4 w-1/2">
            <table className="w-full border-2">
              <thead>
                <tr className="text-center border-b-2">
                  <th className="w-28 py-3 text-left pl-2">
                    Installment Basis
                  </th>
                  <th className="w-28">Installments</th>
                  <th className="w-28">Due Dates</th>
                </tr>
              </thead>
              <tbody>
                {NewTable.map((value, key) => (
                  <tr className="border-b-2">
                    <td className="pl-2">
                      {values.typeOfInstalment} : {key + 1}
                    </td>
                    <td className="text-center">{value.installment}</td>
                    <td className="text-center">{value.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*           
          <div className='flex w-1/2 h-fit justify-center pt-10'>
            <p className='text-2xl p-2 rounded-lg bg-white'>Fill the details to get EMI</p>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default AddNewUser
