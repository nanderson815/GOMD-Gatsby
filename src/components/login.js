import React, { useState, useEffect } from 'react'
import Header from './header'
import Layout from './layout';
import { navigate } from "gatsby"
import { Button, Form, Divider, Modal, Input } from 'semantic-ui-react'
import { userSignIn, isLoggedIn, userSignUp, resetPassword } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'

const Login = (props) => {

    // Redirects if user is logged in.
    useEffect(() => {
        let firebase = getFirebase()
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                navigate('/app/profile')
            }
        });
    })

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }

    const [error, setError] = useState('')
    const [createError, setCreateError] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (user.email && user.password) {
            let res = await userSignIn(user.email, user.password);
            if (!res.user) setError(res.message)
        } else {
            setError("Please add an email and password.")
        }
    }

    const createAccount = async (e) => {
        e.preventDefault()
        if (user.email && user.password === user.passwordConfirm) {
            let res = await userSignUp(user.email, user.password);
            if (!res.user) setCreateError(res)
        } else if (user.passwordConfirm !== user.password) {
            setCreateError('Passwords do not match.')
        }

    }

    const [resetMessage, setResetMessage] = useState()
    const forgotPassword = async (e) => {
        e.preventDefault()
        if (user.forgotPassword) {
            let res = await resetPassword(user.forgotPassword)
            if (res.success) {
                alert(res.success);
                setError('')
            } else {
                setResetMessage(res.message)
            }
        }
    }

    const [user, setUser] = useState('')

    return (
        <>
            <Header></Header>
            <Layout>
                <div style={{ minHeight: "75vh" }}>
                    <h1>Sign In</h1>
                    <Form onSubmit={onSubmitHandler} style={{ maxWidth: "500px", margin: "0 auto" }}>
                        <Form.Field required>
                            <label>Email</label>
                            <input onChange={onChangeHandler} id='email' placeholder='Email' />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input type='password' onChange={onChangeHandler} id='password' placeholder='Password' />
                        </Form.Field>
                        {error ?
                            <Modal trigger={<Button color="red">Forgot Password?</Button>} closeIcon>
                                <Modal.Header>Reset Password</Modal.Header>
                                <Modal.Content>

                                    <Form style={{ maxWidth: "500px", margin: "0 auto" }}>
                                        <Form.Field required>
                                            <label>Email</label>
                                            <input onChange={onChangeHandler} id='forgotPassword' placeholder='Email' />
                                        </Form.Field>
                                        <Button onClick={forgotPassword} type='submit'>Submit</Button>
                                        <p style={{ color: "red" }}>{resetMessage}</p>
                                    </Form>
                                </Modal.Content>
                            </Modal> : null}
                        <Button type='submit'>Submit</Button>
                        <p style={{ color: "red" }}>{error}</p>
                    </Form>
                    <Divider horizontal>Or</Divider>
                    <div style={{ textAlign: "center" }}>
                        <Modal trigger={<Button primary>Sign Up</Button>} closeIcon>
                            <Modal.Header>Sign Up</Modal.Header>
                            <Modal.Content>
                                <Form style={{ maxWidth: "500px", margin: "0 auto" }}>
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
                                    <Button onClick={createAccount} type='submit'>Submit</Button>
                                    <p style={{ color: "red" }}>{createError}</p>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Login