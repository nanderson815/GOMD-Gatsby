/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { Button, Form, Divider, Modal, Icon } from 'semantic-ui-react'
import * as firebase from 'firebase/app'
import { userSignIn, userSignUp, resetPassword, createStripeCustomer } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'
import 'firebase/auth'

const Login = ({ modal, handleClose }) => {
  const onChangeHandler = e => {
    setUser({ ...user, [e.target.id]: e.target.value })
  }

  const [error, setError] = useState('')
  const [createError, setCreateError] = useState('')

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (user.email && user.password) {
      const res = await userSignIn(user.email, user.password, modal)
      if (modal) handleClose()
      if (!res.user) setError(res.message)
    } else {
      setError('Please add an email and password.')
    }
  }

  const createGoogleAccount = () => {
    if (typeof window !== 'undefined') {
      const firebaseApp = getFirebase()
      const provider = new firebase.auth.GoogleAuthProvider()
      firebaseApp
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log(result)
          if (modal) handleClose()
          createStripeCustomer(result.user.email, result.user.displayName, result.user.uid)
        })
        .catch(error => {
          const errorMessage = error.message
          // The email of the user's account used.
          const { email } = error
          console.log({ errorMessage, email })
        })
    }
  }

  const createAccount = async e => {
    e.preventDefault()
    if (user.email && user.name && user.password === user.passwordConfirm) {
      const res = await userSignUp(user.email, user.password, user.name)
      if (!res.user) setCreateError(res)
      if (modal) handleClose()
    } else if (user.passwordConfirm !== user.password) {
      setCreateError('Passwords do not match.')
    }
  }

  const [resetMessage, setResetMessage] = useState()
  const forgotPassword = async e => {
    e.preventDefault()
    if (user.forgotPassword) {
      const res = await resetPassword(user.forgotPassword)
      if (res.success) {
        alert(res.success)
        setError('')
      } else {
        setResetMessage(res.message)
      }
    }
  }

  const [user, setUser] = useState('')

  return (
    <>
      <Form onSubmit={onSubmitHandler} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Field required>
          <label>Email</label>
          <input onChange={onChangeHandler} id='email' placeholder='Email' />
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <input type='password' onChange={onChangeHandler} id='password' placeholder='Password' />
        </Form.Field>
        {error ? (
          <Modal trigger={<Button color='red'>Forgot Password?</Button>} closeIcon>
            <Modal.Header>Reset Password</Modal.Header>
            <Modal.Content>
              <Form style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Form.Field required>
                  <label>Email</label>
                  <input onChange={onChangeHandler} id='forgotPassword' placeholder='Email' />
                </Form.Field>
                <Button onClick={forgotPassword} type='submit'>
                  Submit
                </Button>
                <p style={{ color: 'red' }}>{resetMessage}</p>
              </Form>
            </Modal.Content>
          </Modal>
        ) : null}
        <Button type='submit'>Submit</Button>
        <p style={{ color: 'red' }}>{error}</p>
      </Form>
      <Divider horizontal>Or</Divider>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <Button color='google plus' onClick={createGoogleAccount}>
          <Icon name='google' /> Login with Google
        </Button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Modal trigger={<Button primary>Sign Up</Button>} closeIcon>
          <Modal.Header>Sign Up</Modal.Header>
          <Modal.Content>
            <Form style={{ maxWidth: '500px', margin: '0 auto' }}>
              <Form.Field required>
                <label>Full Name (First Last)</label>
                <input onChange={onChangeHandler} id='name' placeholder='Jane Doe' />
              </Form.Field>
              <Form.Field required>
                <label>Email</label>
                <input onChange={onChangeHandler} id='email' placeholder='Email' />
              </Form.Field>
              <Form.Field required>
                <label>Password</label>
                <input type='password' onChange={onChangeHandler} id='password' placeholder='Password' />
              </Form.Field>
              <Form.Field required error={user.password !== user.passwordConfirm}>
                <label>Confirm Password</label>
                <input type='password' onChange={onChangeHandler} id='passwordConfirm' placeholder='Confirm Password' />
              </Form.Field>
              <Button onClick={createAccount} type='submit'>
                Submit
              </Button>
              <p style={{ color: 'red' }}>{createError}</p>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    </>
  )
}

export default Login
