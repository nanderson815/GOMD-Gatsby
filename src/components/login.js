import React, { useEffect } from 'react'
import Header from './header'
import Layout from './layout';
import { navigate } from "gatsby"
import { getFirebase } from '../firebase/firebase'
import LoginForm from './loginForm'
import 'firebase/auth';


const Login = (props) => {

    // Redirects if user is logged in.
    useEffect(() => {
        let firebase = getFirebase()
        const unlisten = firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                navigate('/app/profile')
            }
        });
        return () => unlisten()
    })


    return (
        <>
            <Header></Header>
            <Layout>
                <div style={{ minHeight: "75vh" }}>
                    <h1>Sign In</h1>
                    <LoginForm modal={false}></LoginForm>
                </div>
            </Layout>
        </>
    )
}

export default Login