import React from "react"
import { useStripeSkuData } from '../../hooks/skuData'
import { Card } from "semantic-ui-react";
import Img from "gatsby-image"
import { formatCurrency } from '../../Util/Util'
import { Link } from "gatsby";

const Skus = (props) => {
    const skus = useStripeSkuData();
    console.log(skus)

    return (
        <Card.Group>
            {skus.map(sku => (
                <Card link key={sku.id}>
                    <Link to={`/exclusive-deals`}>
                        <Card>
                            <Img style={{ height: "200px" }} fluid={sku.product.localFiles[0].childImageSharp.fluid}></Img>
                            <Card.Content>
                                <Card.Header>{sku.product.name}</Card.Header>
                                <Card.Description>{sku.product.caption}</Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <h3 style={{ color: "green" }}><span style={{ color: 'red', textDecoration: "line-through" }}>{formatCurrency(sku.product.metadata.basePrice)}</span> {formatCurrency(sku.price)}</h3>
                            </Card.Content>
                        </Card>
                    </Link>
                </Card>
            ))}
        </Card.Group>
    )
}

export default Skus;