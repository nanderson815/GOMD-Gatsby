import React, { useEffect, useState } from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Header from '../components/header'
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Label, Card, Segment, Button, Icon } from 'semantic-ui-react'
import SEO from '../components/seo'
import AdSense from 'react-adsense';
import Axios from 'axios';
import { getUser } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'
import { formatCurrency } from '../Util/Util'
import { checkRemaining } from '../Util/Util'

const handleClick = (e) => {
  let tag = e.target.value
  console.log(tag);
}



const ExclusiveDeal = (props) => {
  const post = get(props, 'data.stripeSku')
  console.log(post);


  let [voucher, setVoucher] = useState()
  useEffect(() => {
    let db = getFirebase().firestore()
    db.collection('vouchers').doc(post.product.id).get().then((doc) => {
      console.log(doc.data())
      setVoucher(doc.data())
    })
  }, [])


  const handleCheckout = (name, desc, price, image) => {
    let user = getUser()
    if (user) {
      let data = {
        successUrl: "http://localhost:8000/app/profile",
        cancelUrl: `http://localhost:8000/exclusive-dining/${post.product.metadata.slug}`,
        name: name,
        image: image,
        description: desc,
        price: price,
        metadata: {
          user_id: user.uid,
          user_email: user.email,
          productMeta: post.product.metadata.slug,
          couponCode: post.product.metadata.couponCode,
          caption: post.product.caption,
          voucherId: post.product.id
        }
      }
      let url = "http://us-central1-georgia-on-my-dime.cloudfunctions.net/createCheckoutSession"
      Axios.post(url, data)
        .then(res => {
          console.log(res)
          stripe.redirectToCheckout({
            sessionId: res.data.id
          }).then(res => console.log(res))
        })
        .catch(err => console.log(err))
    } else {
      console.log("You must be logged in !")
    }

  }

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [])

  const [stripe, setStripe] = useState('')
  useEffect(() => {
    const stripeObj = window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
    setStripe(stripeObj)
  }, [])

  return (
    <>
      <Header></Header>
      <SEO title={`${post.product.name} - Exclusive Deal`}
        description={`${post.product.caption} Exclusively available through Georgia on my Dime.`}
        image={post.product.localFiles[0].childImageSharp.fluid.src}
      />
      <Layout>
        <Grid>
          <Grid.Column computer={11} tablet={11} mobile={16}>
            <Card fluid raised>
              <Img style={{ maxHeight: "350px" }} alt={post.product.name} fluid={post.product.localFiles[0].childImageSharp.fluid} />
              <Card.Content>
                <Card.Header>
                  <h1 style={{ marginBottom: "-3px" }}>{post.product.name}</h1>
                  {post.product.attributes.map((tag, index) => <Label as={Button} key={`${index}label`} value={tag} onClick={handleClick}>{tag}</Label>)}
                  <div style={{ display: "inline-block", float: 'right', fontSize: "25px" }}>
                    {formatCurrency(post.price)}
                  </div>
                </Card.Header>

              </Card.Content>
              <Card.Content>
                <h2>Description</h2>
                <p>{post.product.description}</p>
              </Card.Content>
              <Card.Content>
                <Icon name="map marker"></Icon> {voucher ? voucher.neighborhood : null}
                <div style={{ display: 'inline-block', float: "right", fontWeight: "bold", fontSize: "20px" }}>
                  Remaining: {voucher ? checkRemaining(voucher.vouchersSold, voucher.quantity) : null}
                </div>
              </Card.Content>

            </Card>
          </Grid.Column>
          <Grid.Column tablet={5} computer={5} mobile={16}>
            <Card fluid raised>
              <div
                style={{ overflow: 'hidden', height: "225px" }}
              >
                <iframe title="Happy Hour Map" width="100%" height="240px" frameBorder="0" style={{ border: "0", margin: "0px" }} src={`https://www.google.com/maps/embed/v1/place?q=${post.product.metadata.address}&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`}></iframe>
              </div>
              <Card.Content style={{ background: "white" }}>
                <Card.Description>
                  <a
                    style={{ color: "grey" }}
                    href={`https://www.google.com/maps/search/?api=1&query=${post.product.metadata.address}`}>
                    {post.product.metadata.address}
                  </a>
                </Card.Description>

              </Card.Content>
            </Card>
            {voucher ? voucher.vouchersSold >= voucher.quantity ? null : <Segment raised style={{ paddingBottom: '1px', background: '#1c70b5', textAlign: "center" }}>
              <Button
                onClick={() => handleCheckout(post.product.name, post.product.description, post.price, post.product.images)}>
                BUY NOW
              </Button>
            </Segment> : null}
            <Segment raised style={{ paddingBottom: '1px' }}>
              <AdSense.Google
                client="ca-pub-4839737207231731"
                slot='4063925755'
                responsive='true'
                format='auto'
                style={{ display: 'block', width: "100% !important" }}
              />
              <p style={{ width: "100%", textAlign: 'center', fontSize: "12px" }}><i>sponsored content</i></p>
            </Segment>
          </Grid.Column>
        </Grid>
      </Layout >
    </>
  )
}

export default ExclusiveDeal

export const pageQuery = graphql`
 query SkuInfo($slug: String!) {
  stripeSku(product: {metadata: {slug: {eq: $slug}}}) {
    ...allSkuFields
  }
}
`

