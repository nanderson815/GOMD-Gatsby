import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import LoginForm from './loginForm'

const LoginModal = ({ open, handleClose }) => {



    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Header icon='user' content='Requires Login' />
            <Modal.Content>
                <h3>You must be logged in to purchase or save happy hours.</h3>
                <LoginForm modal={true} handleClose={handleClose}></LoginForm>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={handleClose}>
                    <Icon name='close' /> Not now
          </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default LoginModal