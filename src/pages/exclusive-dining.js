import React, { useEffect } from "react"
import { Link } from "gatsby"
import Header from '../components/header'
import { Responsive } from 'semantic-ui-react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getFirebase } from '../firebase/firebase'

import Skus from "../components/Products/Skus"

const AdvancedExamplePage = () => {

    useEffect(() => {
        let db = getFirebase().firestore()
        db.collection('vouchers').get()
            .then((snap) => {
                snap.forEach(doc => {
                    console.log(doc.data())
                })
            })
            .catch(err => console.log(err))
    })
    return (
        <div>
            <SEO title="Exclusive Deals" />
            <Header></Header>
            <Layout>
                <h1>Exclusive dining options at the best restaurants in Atlanta.</h1>
                <div style={{ minHeight: '70vh' }}>
                    <Responsive minWidth={768}>
                        <Skus columns={3} />
                    </Responsive>
                    <Responsive {...Responsive.onlyMobile}>
                        <Skus columns={1} />
                    </Responsive>
                </div>
            </Layout>
        </div>
    )
}

export default AdvancedExamplePage