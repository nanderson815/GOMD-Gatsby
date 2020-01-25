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
            <h1>Exclusive rewards for the best restaurants in town.</h1>
            <div style={{ height: '70vh' }}>
                <Skus />
            </div>
        </Layout>
    </div>
)

export default AdvancedExamplePage