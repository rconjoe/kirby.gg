import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBlcqM5K3OUHiXz2JUHGeeAClOa6H5PoW4",
  authDomain: "kassandrabot.firebaseapp.com",
  databaseURL: "https://kassandrabot-default-rtdb.firebaseio.com",
  projectId: "kassandrabot",
  storageBucket: "kassandrabot.appspot.com",
  messagingSenderId: "960091752117",
  appId: "1:960091752117:web:f2742077d5f0c9d71ca0fc"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
