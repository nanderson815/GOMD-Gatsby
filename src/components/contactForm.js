import React from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

const FormExampleFieldControlId = () => (
    <Form>
        <Form.Group widths='equal'>
            <Form.Field
                id='form-input-control-first-name'
                control={Input}
                label='First name'
                placeholder='First name'
            />
            <Form.Field
                id='form-input-control-last-name'
                control={Input}
                label='Last name'
                placeholder='Last name'
            />
        </Form.Group>
        <Form.Field
            id='form-textarea-control-message'
            control={TextArea}
            label='Message'
            placeholder='Message'
        />
        <Form.Field
            id='form-input-control-error-email'
            control={Input}
            label='Email'
            // error={{
            //     content: 'Please enter a valid email address',
            //     pointing: 'below',
            // }}
            error={false}
        />
        <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Confirm'
        />
    </Form>
)

export default FormExampleFieldControlId