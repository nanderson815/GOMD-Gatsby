import React from 'react'
import { Card, Label, Icon } from 'semantic-ui-react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import _ from 'lodash'
import { formatCurrency, checkRemaining } from '../../Util/Util'
import { useStripeSkuData } from '../../hooks/skuData'

const Skus = ({ columns, vouchers }) => {
  const skus = useStripeSkuData()

  // Combine sku and firebase to get all data needed.
  const merged = _.map(skus, item => _.extend(item, _.find(vouchers, { id: item.product.id })))

  return (
    <Card.Group itemsPerRow={columns}>
      {merged.map(voucher => (
        <Card link key={voucher.id}>
          <Link to={`/exclusive-dining/${voucher.product.metadata.slug}`}>
            <Card style={{ boxShadow: 'none', width: '100%' }}>
              <Img style={{ height: '200px' }} fluid={voucher.product.localFiles[0].childImageSharp.fluid} />
              <Card.Content>
                <Label style={{ top: '-55px' }} color='blue' ribbon='right'>
                  Remaining: {checkRemaining(voucher.vouchersSold, voucher.quantity)}
                </Label>
                <Card.Header style={{ marginTop: '-30px' }}>{voucher.name}</Card.Header>
                <Card.Description style={{ minHeight: '38px' }}>{voucher.caption}</Card.Description>
                <Card.Meta>
                  {' '}
                  <Icon name='map marker alternate' /> {voucher.neighborhood}
                </Card.Meta>
              </Card.Content>
              <Card.Content>
                <h3 style={{ color: 'black' }}>
                  <span style={{ color: 'red', textDecoration: 'line-through' }}>
                    {formatCurrency(voucher.basePrice)}
                  </span>{' '}
                  {formatCurrency(voucher.price)}
                </h3>
              </Card.Content>
            </Card>
          </Link>
        </Card>
      ))}
    </Card.Group>
  )
}

export default Skus
