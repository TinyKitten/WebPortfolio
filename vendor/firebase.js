import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBNO8zp5APTgz82lbhqXmBm-o5Nz3RYhJ0',
  authDomain: 'webportfolio-4c591.firebaseapp.com',
  databaseURL: 'https://webportfolio-4c591.firebaseio.com',
  projectId: 'webportfolio-4c591',
  storageBucket: 'webportfolio-4c591.appspot.com',
  messagingSenderId: '971929767429',
  appId: '1:971929767429:web:bf3bcf0d0c04b5b9'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
