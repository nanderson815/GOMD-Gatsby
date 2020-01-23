import React from "react"
import { useStripeSkuData } from '../../hooks/skuData'


const Skus = (props) => {
    const skus = useStripeSkuData();
    console.log(skus)

    return (
        <div>
            Skus will go here.
        </div>
    )
}

export default Skus;