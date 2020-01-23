import React from "react"
import { Link } from "gatsby"
import Header from '../components/header'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Skus from "../components/Products/Skus"

const AdvancedExamplePage = () => (
    <div>
        <SEO title="Exclusive Deals" />
        <Header></Header>
        <Layout>
            <h1>This is the advanced example</h1>
            <Skus />
            <div style={{ height: '200px' }}>

            </div>
        </Layout>
    </div>
)

export default AdvancedExamplePage