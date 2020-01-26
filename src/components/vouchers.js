import React, { useState } from 'react'
import { Card, Button, Modal, Icon } from 'semantic-ui-react'
import Barcode from 'react-barcode'

const Vouchers = ({ data }) => {
    console.log(data)

    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)


    return (
        <Card.Group>
            {data.map(voucher => {
                return (
                    <Card key={voucher.id}>
                        <img style={{ margin: "0px", objectFit: "cover" }} height={200} src={voucher.images[0]} />
                        <Card.Content>
                            <Card.Header>{voucher.name}</Card.Header>
                            <Card.Description>{voucher.description}</Card.Description>
                            <div style={{ textAlign: "center", marginTop: "5px" }}>
                                <Modal dimmer="blurring" open={modalOpen} onClose={handleClose} trigger={<Button onClick={handleOpen} primary>Redeem</Button>} closeIcon>
                                    <Modal.Header>Do not redeem until check out.</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <p>Wait until you are ready to pay before redeeming this voucher. This voucher will disappear after automatically use.</p>
                                            <p>When you are ready, press redeem and show the screen to your waiter/waitress. </p>

                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button onClick={handleClose} basic>
                                            <Icon name='remove' /> Not Yet
                                        </Button>
                                        <Button onClick={handleClose} color='green' inverted>
                                            <Icon name='checkmark' /> Redeem
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </div>
                        </Card.Content>
                    </Card>
                )
            })}
        </Card.Group >
    )
}

export default Vouchers