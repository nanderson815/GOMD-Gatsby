import React from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')

const FormExampleFieldControlId = () => {
  const [state, setState] = React.useState({})

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    const data = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...state })
    }

    console.log(data)
    fetch('/', data)
      .then(() => {
        setState({})
        document.getElementById('contactForm').reset()
        alert('Thank you! Your message has been sent.')
      })
      .catch(error => alert(error))

    e.preventDefault()
  }

  return (
    <Form
      onSubmit={handleSubmit}
      data-netlify='true'
      name='contact'
      id='contactForm'
      method='post'
      data-netlify-honeypot='bot-field'
    >
      <Form.Group widths='equal'>
        <input type='hidden' name='form-name' value='contact' />
        <p hidden>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Don’t fill this out: <input name='bot-field' onChange={handleChange} />
          </label>
        </p>
        <Form.Field
          required
          name='firstName'
          control={Input}
          label='First name'
          placeholder='First name'
          onChange={handleChange}
        />
        <Form.Field
          required
          name='lastName'
          control={Input}
          label='Last name'
          onChange={handleChange}
          placeholder='Last name'
        />
      </Form.Group>
      <Form.Field
        required
        name='message'
        control={TextArea}
        label='Message'
        placeholder='Message'
        onChange={handleChange}
      />
      <Form.Field
        required
        name='email'
        control={Input}
        label='Email'
        // error={{
        //     content: 'Please enter a valid email address',
        //     pointing: 'below',
        // }}
        error={false}
        onChange={handleChange}
      />
      <Form.Field id='form-button-control-public' control={Button} content='Confirm' />
    </Form>
  )
}

export default FormExampleFieldControlId
