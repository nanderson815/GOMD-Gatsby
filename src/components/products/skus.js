import React from "react"
import { useStripeSkuData } from '../../hooks/skuData'
import { Card } from "semantic-ui-react";
import Img from "gatsby-image"

const Skus = (props) => {
    const skus = useStripeSkuData();
    console.log(skus)

    return (
        <Card.Group>
            {skus.map(sku => (
                <Card key={sku.id}>
                    <Img style={{ height: "200px" }} fluid={sku.product.localFiles[0].childImageSharp.fluid}></Img>
                    <Card.Content>
                        <Card.Header>{sku.product.name}</Card.Header>
                        <Card.Description>{sku.product.caption}</Card.Description>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
}

export default Skus;