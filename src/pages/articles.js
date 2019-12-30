import React from 'react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Header from '../components/header'

const Articles = (props) => {

    return (
        <>
            <SEO title="Atlanta Guides, News, and Events"
                description="Our Atlanta Articles make it easy to discover the best Atlanta has to offer! From bottomless mimosas to Atlanta United games, our guides have got you covered!">
            </SEO>
            <Header></Header>
            <Layout>
                <h1>Articles</h1>
            </Layout>
        </>
    )
}

export default Articles