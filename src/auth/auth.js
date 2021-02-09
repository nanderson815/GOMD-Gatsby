import { navigate } from 'gatsby'
import Axios from 'axios'
import { getFirebase } from '../firebase/firebase'

const firebase = getFirebase()

// Sign Up
export const userSignUp = async (email, password, userName) => {
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const user = firebase.auth().currentUser
      console.log(user)
      user.updateProfile({
        displayName: userName
      })
      createStripeCustomer(email, userName, user.uid)
      verifyEmail()
      return cred
    })
    .catch(error => {
      const errorMessage = error.message
      return errorMessage
    })
  return res
}

// Create Stripe Customer
export const createStripeCustomer = (email, name, uid) => {
  const url = 'https://us-central1-georgia-on-my-dime.cloudfunctions.net/createCustomer'
  Axios.post(url, { email, name, uid })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}

// Sign In
export const userSignIn = async (email, password, modal) => {
  const res = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      if (!modal) {
        navigate('/app/profile')
      }
      return cred
    })
    .catch(error => error)
  return res
}

// Check user status
export const isLoggedIn = () => {
  const user = firebase.auth().currentUser
  return !!user
}

// Get user info
export const getUser = () => firebase.auth().currentUser

// Sign Out
export const userSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('signed out.')
      navigate('/app/login')
    })
    .catch(error => {
      console.log(' error on signed out.')
      console.log(error)
    })
}

// Send Verification Email
export const verifyEmail = async () => {
  const user = firebase.auth().currentUser
  const res = await user
    .sendEmailVerification()
    .then(() => ({ success: 'Email Sent.' }))
    .catch(err => err)
  return res
}

// Update name
export const updateName = async name => {
  const user = firebase.auth().currentUser
  const res = await user
    .updateProfile({
      displayName: name
    })
    .then(() => true)
    .catch(() => false)
  return res
}

// Reset Password
export const resetPassword = async email => {
  const res = await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => ({ success: 'Email sent successfully. Please check your inbox.' }))
    .catch(error => error)
  return res
}

// Update Email
export const updateEmail = async email => {
  const user = firebase.auth().currentUser
  if (user) {
    const res = await user
      .updateEmail(email)
      .then(() => ({ message: 'Email upated successfully.' }))
      .catch(error => error)
    return res
  }
  return 'There is no user logged in.'
}
