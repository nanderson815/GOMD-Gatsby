import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

const FormExampleFieldControlId = () => {

    const [state, setState] = React.useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const handleSubmit = () => {
        console.log(state);
    }

    return (
        <Form
            onSubmit={handleSubmit}
            data-netlify="true">
            <Form.Group widths='equal'
                name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
                <input type="hidden" name="form-name" value="contact" />
                <Form.Field
                    required
                    id='firstName'
                    control={Input}
                    label='First name'
                    placeholder='First name'
                    onChange={handleChange}
                />
                <Form.Field
                    required
                    id='lastName'
                    control={Input}
                    label='Last name'
                    onChange={handleChange}
                    placeholder='Last name'
                />
            </Form.Group>
            <Form.Field
                required
                id='message'
                control={TextArea}
                label='Message'
                placeholder='Message'
                onChange={handleChange}
            />
            <Form.Field
                required
                id='email'
                control={Input}
                label='Email'
                // error={{
                //     content: 'Please enter a valid email address',
                //     pointing: 'below',
                // }}
                error={false}
                onChange={handleChange}
            />
            <Form.Field
                id='form-button-control-public'
                control={Button}
                content='Confirm'
            />
        </Form>
    )
}

export default FormExampleFieldControlId