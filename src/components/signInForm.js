import React from 'react'
import { Button, Form, Divider } from 'semantic-ui-react'

const FormExampleForm = () => (
    <div>
        <Form style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' />
            </Form.Field>
            <Form.Field>
                <label>Passowd</label>
                <input placeholder='Password' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
        <Divider horizontal>Or</Divider>
        <div style={{ textAlign: "center" }}>
            <Button primary>Create Account</Button>
        </div>
    </div>
)

export default FormExampleForm