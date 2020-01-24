import React, { useEffect, useState } from 'react'
import { Button, Form, Divider } from 'semantic-ui-react'
import { userSignIn, isLoggedIn } from '../auth/auth'

const FormExampleForm = ({ firebase }) => {

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        userSignIn(user.email, user.password);
    }

    const [user, setUser] = useState('')
    

        return (
            <div>
                <Form style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <Form.Field>
                        <label>Email</label>
                        <input onChange={onChangeHandler} id='email' placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input onChange={onChangeHandler} id='password' placeholder='Password' />
                    </Form.Field>
                    <Button onClick={onSubmitHandler} type='submit'>Submit</Button>
                </Form>
                <Divider horizontal>Or</Divider>
                <div style={{ textAlign: "center" }}>
                    <Button primary>Create Account</Button>
                </div>
            </div>
        )
}

export default FormExampleForm