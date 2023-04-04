// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyDyedsEpfCIgXPgcU6fckoYxyUiiVqmqH8',
   authDomain: 'facebookimagestorage.firebaseapp.com',
   projectId: 'facebookimagestorage',
   storageBucket: 'facebookimagestorage.appspot.com',
   messagingSenderId: '157212948726',
   appId: '1:157212948726:web:4a7288b67d4c04cb7ed4d7',
   measurementId: 'G-8R8ETQYVCD',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
export const firebaseStorage = getStorage(app)
