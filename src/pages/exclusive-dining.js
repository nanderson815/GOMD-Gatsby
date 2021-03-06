import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { Dimmer, Loader, Responsive, Grid } from 'semantic-ui-react'
import { getFirebase } from '../firebase/firebase'
import Header from '../components/header/header'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Skus from '../components/products/skus'
import AboutVouchersSidebar from '../components/aboutVouchersSidebar'

const ExclusiveDiningPage = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const [vouchers, setVouchers] = useState([])
  useEffect(() => {
    setLoading(true)
    const db = getFirebase().firestore()
    const vouchers = []
    db.collection('vouchers')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          vouchers.push(doc.data())
        })
        setLoading(false)
        setVouchers(vouchers)
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  return (
    <>
      <SEO
        title='Exclusive Deals'
        description='These Atlanta Restaurant Deals are offered Exclusively by Georgia on my Dime. Check out our list of exclusive happy hours at the best restaurants in Atlanta!'
      />
      <Header />
      <BackgroundImage
        fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 1))`, data.desktop.childImageSharp.fluid]}
        style={{ height: '40vh', marginTop: '-10px', display: 'flex', textAlign: 'center' }}
      >
        <div style={{ margin: 'auto', color: 'white' }}>
          <h1>Exclusive Dining Packages</h1>
          <p>
            We partnered with the best restaurants in{' '}
            <span style={{ fontWeight: 'bolder', fontSize: '20px' }}>Atlanta</span> to bring you Curated Experiences
          </p>
        </div>
      </BackgroundImage>
      <Layout>
        {loading ? (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        ) : (
          <Grid style={{ minHeight: '70vh', marginTop: '20px' }}>
            <Grid.Column computer={11} tablet={11} mobile={16}>
              <Responsive minWidth={768}>
                <Skus vouchers={vouchers} columns={2} />
              </Responsive>
              <Responsive {...Responsive.onlyMobile}>
                <Skus vouchers={vouchers} columns={1} />
              </Responsive>
            </Grid.Column>
            <Grid.Column computer={5} tablet={5} mobile={16}>
              <AboutVouchersSidebar />
            </Grid.Column>
          </Grid>
        )}
      </Layout>
    </>
  )
}

export const query = graphql`
  query exclusiveHHImage {
    desktop: file(relativePath: { eq: "exclusiveHHBackground.jpeg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default ExclusiveDiningPage
