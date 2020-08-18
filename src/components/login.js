import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import Header from './header/header'
import Layout from './layout'
import { getFirebase } from '../firebase/firebase'
import LoginForm from './loginForm'
import 'firebase/auth'

const Login = () => {
  // Redirects if user is logged in.
  useEffect(() => {
    const firebase = getFirebase()
    const unlisten = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate('/app/profile')
      }
    })
    return () => unlisten()
  })

  return (
    <>
      <Header />
      <Layout>
        <div style={{ minHeight: '75vh' }}>
          <h1>Sign In</h1>
          <LoginForm modal={false} />
        </div>
      </Layout>
    </>
  )
}

export default Login
