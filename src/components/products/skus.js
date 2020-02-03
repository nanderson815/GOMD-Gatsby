import React from "react"
import { useStripeSkuData } from '../../hooks/skuData'
import { Card, Label, Icon } from "semantic-ui-react"
import Img from "gatsby-image"
import { formatCurrency } from '../../Util/Util'
import { Link } from "gatsby"
import _ from 'lodash'
import { checkRemaining } from '../../Util/Util'

const Skus = ({ columns, vouchers }) => {
    const skus = useStripeSkuData();

    // Combine sku and firebase to get all data needed.
    let merged = _.map(skus, (item) => {
        return _.extend(item, _.find(vouchers, { id: item.product.id }))
    })
    console.log(merged)

    return (
        <Card.Group itemsPerRow={columns} >
            {merged.map(voucher => (
                <Card link key={voucher.id}>
                    <Link to={`/exclusive-dining/${voucher.product.metadata.slug}`}>
                        <Card style={{ boxShadow: 'none', width: "100%" }}>
                            <Img style={{ height: "200px" }} fluid={voucher.product.localFiles[0].childImageSharp.fluid}></Img>
                            <Card.Content>
                                <Label style={{ top: "-55px" }} color='blue' ribbon='right'>
                                    Remaining: {checkRemaining(voucher.vouchersSold, voucher.quantity)}
                                </Label>
                                <Card.Header style={{ marginTop: '-30px' }}>{voucher.name}</Card.Header>
                                <Card.Description style={{ minHeight: '38px' }}>{voucher.caption}</Card.Description>
                                <Card.Meta> <Icon name="map marker alternate"></Icon> {voucher.neighborhood}</Card.Meta>
                            </Card.Content>
                            <Card.Content>
                                <h3 style={{ color: "black" }}><span style={{ color: 'red', textDecoration: "line-through" }}>{formatCurrency(voucher.basePrice)}</span> {formatCurrency(voucher.price)}</h3>
                            </Card.Content>
                        </Card>
                    </Link>
                </Card>
            ))}
        </Card.Group>
    )
}

export default Skus;