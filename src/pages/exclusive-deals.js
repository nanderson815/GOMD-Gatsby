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
            <h1>Exlusive Deals. Discounted Prices.</h1>
            <Skus />
        </Layout>
    </div>
)

export default AdvancedExamplePage