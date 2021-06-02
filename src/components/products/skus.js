import React from 'react'
import { Card, Label, Icon, Grid } from 'semantic-ui-react'
import Img from 'gatsby-image'
import { navigate } from 'gatsby'
import _ from 'lodash'
import { formatCurrency, checkRemaining } from '../../Util/Util'
import { useStripeSkuData } from '../../hooks/skuData'

const Skus = ({ columns, vouchers }) => {
  const skus = useStripeSkuData()

  // Combine sku and firebase to get all data needed.
  const merged = _.map(skus, item => _.extend(item, _.find(vouchers, { id: item.product.id })))

  console.log(merged)

  const onClickHandler = slug => {
    navigate(`/exclusive-dining/${slug}`)
  }

  return (
    <Card.Group itemsPerRow={columns}>
      {merged
        .filter(item => item.display) // remove vouchers based on display flag.
        .map(voucher => (
          <Card link key={voucher.id} onClick={() => onClickHandler(voucher.product.metadata.slug)}>
            {/* <Link to={`/exclusive-dining/${voucher.product.metadata.slug}`}> */}
            <Img style={{ height: '200px' }} fluid={voucher.product.localFiles[0].childImageSharp.fluid} />
            <Card.Content style={{ minHeight: '130px' }}>
              <Label style={{ top: '-55px' }} color='blue' ribbon='right'>
                Remaining: {checkRemaining(voucher.vouchersSold, voucher.quantity)}
              </Label>
              <Card.Header style={{ marginTop: '-30px', minHeight: '45px' }}>{voucher.name}</Card.Header>
              <Card.Description style={{ minHeight: '38px' }}>{voucher.product.metadata.caption}</Card.Description>
            </Card.Content>
            <Card.Content>
              <Grid>
                <Grid.Column width={8}>
                  <h3 style={{ color: 'black' }}>{formatCurrency(voucher.price)}</h3>
                </Grid.Column>
                <Grid.Column width={8} textAlign='right'>
                  <Card.Meta>
                    <Icon name='map marker alternate' /> {voucher.neighborhood}
                  </Card.Meta>
                </Grid.Column>
              </Grid>
            </Card.Content>
            {/* </Link> */}
          </Card>
        ))}
    </Card.Group>
  )
}

export default Skus
