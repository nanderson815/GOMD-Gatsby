import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { formatCurrency, checkExpiration } from '../../../Util/Util'

export default function InfoModal({ voucher }) {
  return (
    <Modal dimmer='blurring' trigger={<Button basic>More Details</Button>} closeIcon>
      <Modal.Header>{voucher.name}</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <h2>
            Expires:
            {voucher.purchaseDate
              ? checkExpiration(voucher.purchaseDate.seconds, parseInt(voucher.duration, 10))
              : null}
          </h2>
          <h4>
            Purchase Price: {formatCurrency(voucher.price)} <br /> Redeem For: {voucher.description}
          </h4>
          <div>
            {voucher.descriptionFull.split('\\n').map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
