import { getFirebase } from '../firebase/firebase'
import { navigate } from 'gatsby';
import Axios from 'axios';

let firebase = getFirebase();

//Sign Up
export const userSignUp = async (email, password, userName) => {
    let res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            var user = firebase.auth().currentUser;
            console.log(user)
            user.updateProfile({
                displayName: userName
            })
            createStripeCustomer(email, userName, user.uid)
            verifyEmail()
            return cred
        })
        .catch(function (error) {
            var errorMessage = error.message;
            return errorMessage
        });
    return res
}

// Create Stripe Customer
export const createStripeCustomer = (email, name, uid) => {
    let url = "https://us-central1-georgia-on-my-dime.cloudfunctions.net/createCustomer"
    Axios.post(url, { email, name, uid })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

//Sign In
export const userSignIn = async (email, password, modal) => {
    let res = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(cred => {
            if (!modal) {
                navigate('/app/profile')
            }
            return cred
        })
        .catch(function (error) {
            return error
        });
    return res
}

// Check user status
export const isLoggedIn = () => {
    let user = firebase.auth().currentUser
    return !!user
}

// Get user info
export const getUser = () => {
    return firebase.auth().currentUser
}

// Sign Out
export const userSignOut = () => {
    firebase.auth().signOut()
        .then(function () {
            console.log("signed out.")
            navigate('/app/login')
        })
        .catch(function (error) {
            console.log(" error on signed out.")
            console.log(error)
        });
}

// Send Verification Email
export const verifyEmail = async () => {
    let user = firebase.auth().currentUser
    let res = await user.sendEmailVerification().then(() => {
        return ({ success: "Email Sent." })
    }).catch((err) => {
        return (err)
    });
    return res
}

// Update name
export const updateName = async (name) => {
    let user = firebase.auth().currentUser
    let res = await user.updateProfile({
        displayName: name,
    }).then(function () {
        return true
    }).catch(function (error) {
        return false
    });
    return res
}

// Reset Password
export const resetPassword = async (email) => {
    let res = await firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            return { success: "Email sent successfully. Please check your inbox." }
        })
        .catch((error) => {
            return error
        });
    return res
}

// Update Email
export const updateEmail = async (email) => {
    let user = firebase.auth().currentUser;
    if (user) {
        let res = await user.updateEmail(email).then(() => {
            return { message: "Email upated successfully." }
        })
            .catch((error) => {
                return error
            })
        return res
    } else {
        return "There is no user logged in."
    }
}