import firebase from 'firebase/app'
import 'firebase/messaging'

// // Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAQ2w9P1EOSWUQjhTuWoqjdbbBOC2qGK78',
  appId: '1:662752658905:web:7a5a5d40e8bb0f102185c8',
  projectId: 'padiraharjadeveloper-e6421',
  messagingSenderId: '662752658905',
})

navigator.serviceWorker
  .register('firebase-messaging-sw.js', {
    scope: 'firebase-cloud-messaging-push-scope',
  })
  .then((registration) => {
    const messaging = firebase.messaging()
    messaging.useServiceWorker(registration)
  })
  .catch((err) => {
    console.log(err)
  })

// fiebase configs end
