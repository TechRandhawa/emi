import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { db, auth } from '../../../firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import moment from 'moment'

const AddNewUser = () => {
  const state = useSelector((state) => state.uidNumber)
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
  })

  let userUid = ''
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userUid = user.uid
      } else {
      }
    })
    setValues((uid) => ({ ...uid, uid: userUid }))
  }, [])

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
      case 'Half Yearly':
        return 6
        break
      case 'Yearly':
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
          .format('DD:MM:YYYY'),
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
      await addDoc(usersCollectionRef, { ...values })
      console.log('done')
    } else {
    }
    console.log('error', values)
  }

  return (
    <>
      <div className="flex flex-col h-full bg-slate-500">
        <div className="flex p-2 w-full justify-center items-center">
          <div className="flex flex-col w-full bg-blue-400 p-5 space-y-3">
            <h1>Add User</h1>
            <input
              type="text"
              placeholder="name"
              onChange={(e) =>
                setValues((name) => ({ ...name, name: e.target.value }))
              }
            />
            <input
              type="number"
              placeholder="mobile"
              onChange={(e) =>
                setValues((mobile) => ({ ...mobile, mobile: e.target.value }))
              }
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e) =>
                setValues((email) => ({ ...email, email: e.target.value }))
              }
            />
            <input
              type="name"
              placeholder="product name"
              onChange={(e) =>
                setValues((pName) => ({ ...pName, pName: e.target.value }))
              }
            />
            <input
              type="name"
              placeholder="product detail"
              onChange={(e) =>
                setValues((pDetail) => ({
                  ...pDetail,
                  pDetail: e.target.value,
                }))
              }
            />
            <input
              type="number"
              placeholder="total price"
              onChange={(e) =>
                setValues((totalPrice) => ({
                  ...totalPrice,
                  totalPrice: parseInt(e.target.value, 10),
                }))
              }
            />
            <input
              type="number"
              placeholder="Initail payment"
              onChange={(e) =>
                setValues((initialPay) => ({
                  ...initialPay,
                  initialPay: parseInt(e.target.value, 10),
                }))
              }
            />
            <input
              type="number"
              placeholder="number of instalments"
              onChange={(e) =>
                setValues((noInstalment) => ({
                  ...noInstalment,
                  noInstalment: parseInt(e.target.value, 10),
                }))
              }
            />

            {/* <input
              type="text"
              placeholder="type of instalments"
              onChange={(e) =>
                setValues((typeOfInstalment) => ({
                  ...typeOfInstalment,
                  typeOfInstalment: e.target.value,
                }))
              }
            /> */}
            <select
              onChange={(e) =>
                setValues((typeOfInstalment) => ({
                  ...typeOfInstalment,
                  typeOfInstalment: e.target.value,
                }))
              }
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>

            <input
              type="number"
              placeholder="Interest Rate"
              onChange={(e) =>
                setValues((interest) => ({
                  ...interest,
                  interest: parseInt(e.target.value, 10),
                }))
              }
            />
            <input
              type="date"
              placeholder="Start Date"
              onChange={(e) =>
                setValues((startDate) => ({
                  ...startDate,
                  startDate: e.target.value,
                }))
              }
            />
            <button onClick={() => createInstallments()}>
              Create Instalments
            </button>
            <div>
              {NewTable.map((value, key) => (
                <div className="p-3">
                  <h4>Month : {key + 1}</h4>
                  <p>{value.installment}</p>
                  <p>{value.date}</p>
                </div>
              ))}
            </div>
            <button onClick={() => submit()}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewUser
