import { getFirebase } from '../firebase/firebase'
import { navigate } from 'gatsby';
let firebase = getFirebase();

//Sign Up
export const userSignUp = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred.user)
            verifyEmail()
            return cred.user
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
}

//Sign In
export const userSignIn = async (email, password) => {
    let res = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(cred => {
            navigate('/app/profile')
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
    console.log(!!user)
    return !!user
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
export const verifyEmail = () => {
    let user = firebase.auth().currentUser
    user.sendEmailVerification().then(() => {
        console.log("Email Sent.")
    }).catch((err) => {
        console.log(err)
    });
}