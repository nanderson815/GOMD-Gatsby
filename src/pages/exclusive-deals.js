import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Skus from "../components/Products/Skus"

const AdvancedExamplePage = () => (
    <Layout>
        <SEO title="Exclusive Deals" />
        <h1>This is the advanced example</h1>
        <Skus />
        <div style={{ height: '200px' }}>

        </div>
    </Layout>
)

export default AdvancedExamplePage