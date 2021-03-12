import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: '5cc194e85ca5fb617f798759d56c38c9',
  authDomain: 'your_project.firebaseapp.com',
  databaseURL: 'https://your_project.firebaseio.com',
  projectId: 'padiraharjadeveloper-e6421',
  storageBucket: 'your_project.appspot.com',
  messagingSenderId: 'your_message_sending_id',
}

const fire = firebase.initializeApp(config)
export default fire
