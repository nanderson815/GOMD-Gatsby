import React from 'react'
import { Card, List } from 'semantic-ui-react'
import { Link } from 'gatsby'

export default function AboutVouchersSidebar() {
  return (
    <Card fluid>
      <Card.Content>
        <h3>How Do Dining Vouchers Work?</h3>
        <p>
          You can buy a voucher directly on Georgia on my Dime to be redeemed for an exclusive dining package. We are
          always adding more, so be sure to check back regularly. Dining vouchers are a great way to try a new
          restaurant or support your favorite local spot!
        </p>
        <p>The process is simple:</p>
        <div style={{ fontSize: 'medium' }}>
          <List ordered>
            <List.Item>
              If you haven’t already, create an account <Link to='/app/profile'>HERE</Link>.
            </List.Item>
            <List.Item>Find and purchase a voucher you want to try.</List.Item>
            <List.Item>
              The voucher will be stored in your profile. Bring your mobile device to the restaurant and show the staff.
              They’ll take care of the rest.
            </List.Item>
            <List.Item>Enjoy your curated dining package and be sure to tell your friends!</List.Item>
          </List>
        </div>
      </Card.Content>
    </Card>
  )
}
