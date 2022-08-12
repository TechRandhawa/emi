import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCjwe7T54ZTGcQQhxco26dccRDxBGekgz0",
  authDomain: "emi-management.firebaseapp.com",
  projectId: "emi-management",
  storageBucket: "emi-management.appspot.com",
  messagingSenderId: "208895729864",
  appId: "1:208895729864:web:b8850d9fa09dd2255a85fd",
  measurementId: "G-FT8BW6DLZR"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
