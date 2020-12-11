/* eslint-disable indent */
import React, { useState } from 'react'
import { Card, Button, Modal, Icon, Responsive } from 'semantic-ui-react'
import Barcode from 'react-barcode'
import { Link } from 'gatsby'
import Axios from 'axios'
import { formatCurrency, checkExpiration } from '../../Util/Util'
import InfoModal from './components/InfoModal'

const Vouchers = ({ data, rows, user, hideVoucher }) => {
  const [activeVourcher, setActiveVoucher] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const handleOpen = voucher => {
    setActiveVoucher(voucher)
    setModalOpen(true)
  }
  const handleClose = () => {
    setRedeeming(false)
    setModalOpen(false)
    setLoading(false)
  }

  const [loading, setLoading] = useState(false)
  const [redeeming, setRedeeming] = useState(false)
  const redeemVoucher = () => {
    setLoading(true)
    const url = 'https://us-central1-georgia-on-my-dime.cloudfunctions.net/redeemVoucher'
    Axios.post(url, {
      uid: user.uid,
      voucherId: activeVourcher.id
    })
      .then(() => {
        handleClose()
      })
      .catch(err => {
        hideVoucher(activeVourcher)
        handleClose()
        console.log(err)
      })
  }

  return (
    <div>
      {data === undefined || data.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <h3>Looks like you don't have any vouchers yet.</h3>{' '}
          <Link to='/exclusive-dining'>
            <Button style={{ marginBottom: '20px' }} primary>
              Buy Vouchers
            </Button>
          </Link>{' '}
        </div>
      ) : null}
      <Card.Group itemsPerRow={rows}>
        {data
          .filter(voucher => voucher.redeemed === false)
          .map(voucher => (
            <Card key={voucher.id}>
              <img
                alt=''
                style={{ margin: '0px', objectFit: 'cover' }}
                height={200}
                src={voucher.images[0].replace(/^http:\/\//i, 'https://')}
              />
              <Card.Content>
                <Card.Header>{voucher.name}</Card.Header>
                <Card.Description style={{ minHeight: '40px' }}>{voucher.description}</Card.Description>
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
                  <Responsive {...Responsive.onlyMobile}>
                    <Modal
                      dimmer='blurring'
                      open={modalOpen}
                      trigger={
                        <Button onClick={() => handleOpen(voucher)} primary>
                          Redeem
                        </Button>
                      }
                    >
                      {redeeming ? (
                        <>
                          <Modal.Header>{activeVourcher.name}</Modal.Header>
                          <Modal.Content>
                            <Modal.Description style={{ textAlign: 'center' }}>
                              {checkExpiration(
                                activeVourcher.purchaseDate.seconds,
                                parseInt(activeVourcher.duration, 10)
                              ) === 'Expired' ? (
                                <p style={{ color: 'red' }}>
                                  EXPIRED: Redeem for {formatCurrency(activeVourcher.price)}
                                </p>
                              ) : (
                                <p>{activeVourcher.description}</p>
                              )}
                              <Barcode value={activeVourcher.couponCode} />
                            </Modal.Description>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button loading={loading} onClick={redeemVoucher} color='green' inverted>
                              <Icon name='checkmark' /> Done
                            </Button>
                          </Modal.Actions>
                        </>
                      ) : (
                        <>
                          <Modal.Header style={{ textAlign: 'center' }}>
                            <span style={{ color: 'red' }}>WAIT! </span>Do not redeem this voucher until check out.
                          </Modal.Header>
                          <Modal.Content>
                            <Modal.Description>
                              <p>
                                Wait until you are ready to pay before redeeming this voucher.{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                  This voucher will disappear automatically after use.
                                </span>
                              </p>
                              <p>When you are ready, press redeem and show the screen to your waiter/waitress. </p>
                            </Modal.Description>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button onClick={handleClose} basic>
                              <Icon name='remove' /> Not Yet
                            </Button>
                            <Button onClick={() => setRedeeming(true)} color='green' inverted>
                              <Icon name='checkmark' /> Redeem
                            </Button>
                          </Modal.Actions>
                        </>
                      )}
                    </Modal>
                  </Responsive>
                  <Responsive minWidth={768}>
                    <p style={{ fontSize: '12px' }}>
                      <i>Must redeem in store. Try again on a mobile device</i>
                    </p>
                  </Responsive>
                </div>
              </Card.Content>
              <Card.Content>
                <InfoModal voucher={voucher} />
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </div>
  )
}

export default Vouchers
