import React, { useState } from 'react'
import { Card, Button, Modal, Icon, Responsive } from 'semantic-ui-react'
import Barcode from 'react-barcode'

const Vouchers = ({ data, rows }) => {
    console.log(data)

    const [activeVourcher, setActiveVoucher] = useState('')

    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = (voucher) => {
        console.log(voucher)
        setActiveVoucher(voucher)
        setModalOpen(true)
    }
    const handleClose = () => {
        setRedeeming(false)
        setModalOpen(false)
    }

    const [redeeming, setRedeeming] = useState(false)
    const redeemVoucher = () => {
        setRedeeming(true)
    }

    return (
        <Card.Group itemsPerRow={rows}>
            {data.map(voucher => {
                return (
                    <Card key={voucher.id} link>
                        <img style={{ margin: "0px", objectFit: "cover" }} height={200} src={voucher.images[0]} />
                        <Card.Content>
                            <Card.Header>{voucher.name}</Card.Header>
                            <Card.Description style={{ minHeight: '40px' }}>{voucher.description}</Card.Description>
                            <div style={{ textAlign: "center", marginTop: "5px" }}>
                                <Responsive {...Responsive.onlyMobile}>
                                    <Modal dimmer="blurring" open={modalOpen} trigger={<Button onClick={handleOpen.bind(this, voucher)} primary>Redeem</Button>}>
                                        {redeeming ? <>
                                            <Modal.Header>{activeVourcher.name}</Modal.Header>
                                            <Modal.Content>
                                                <Modal.Description style={{ textAlign: 'center' }}>
                                                    <p>{activeVourcher.description}</p>
                                                    <Barcode value={activeVourcher.couponCode}></Barcode>
                                                </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button onClick={handleClose} color='green' inverted>
                                                    <Icon name='checkmark' /> Done
                                        </Button>
                                            </Modal.Actions>
                                        </>
                                            : <>
                                                <Modal.Header style={{ textAlign: 'center' }}><span style={{ color: 'red' }}>WAIT! </span>Do not redeem this voucher until check out.</Modal.Header>
                                                <Modal.Content>
                                                    <Modal.Description>
                                                        <p>Wait until you are ready to pay before redeeming this voucher. <span style={{ fontWeight: 'bold' }}>This voucher will disappear automatically after use.</span></p>
                                                        <p>When you are ready, press redeem and show the screen to your waiter/waitress. </p>

                                                    </Modal.Description>
                                                </Modal.Content>
                                                <Modal.Actions>
                                                    <Button onClick={handleClose} basic>
                                                        <Icon name='remove' /> Not Yet
                                        </Button>
                                                    <Button onClick={redeemVoucher} color='green' inverted>
                                                        <Icon name='checkmark' /> Redeem
                                        </Button>
                                                </Modal.Actions>
                                            </>}
                                    </Modal>
                                </Responsive>
                                <Responsive minWidth={768}>
                                    <p style={{ fontSize: "12px" }}><i>Must redeem in store. Try again on a mobile device</i></p>
                                </Responsive>
                            </div>
                        </Card.Content>
                    </Card>
                )
            })}
        </Card.Group >
    )
}

export default Vouchers