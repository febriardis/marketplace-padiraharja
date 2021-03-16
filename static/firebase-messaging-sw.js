// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

try {
  firebase.initializeApp({
    apiKey: 'AIzaSyAQ2w9P1EOSWUQjhTuWoqjdbbBOC2qGK78',
    authDomain: 'padiraharjadeveloper-e6421.firebaseapp.com',
    projectId: 'padiraharjadeveloper-e6421',
    storageBucket: 'padiraharjadeveloper-e6421.appspot.com',
    messagingSenderId: '662752658905',
    appId: '1:662752658905:web:7a5a5d40e8bb0f102185c8',
    measurementId: 'G-ZL88QCGEQZ',
  })

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging()
  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload)
    // Customize notification here
    const notificationTitle = 'Background Message Title'
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '../assets/images/icon.png',
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
  })
} catch (error) {
  console.log('firebase error', error)
}
