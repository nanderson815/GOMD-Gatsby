import React, { useEffect, useState } from 'react';
import get from 'lodash/get'
import { graphql } from 'gatsby';
import Header from '../components/header'
import Img from 'gatsby-image';
import Layout from '../components/layout'
import { Grid, Label, Card, Segment, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import SEO from '../components/seo'
import AdSense from 'react-adsense';
import Axios from 'axios';
import { getUser } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'
import { formatCurrency } from '../Util/Util'
import { checkRemaining } from '../Util/Util'
import { navigate } from '@reach/router'
import LoginModal from '../components/loginModal'
import Swiper from '../components/swiper'
import TermsModal from '../components/termsModal'
const handleClick = (e) => {
  let tag = e.target.value
  console.log(tag);
}



const ExclusiveDeal = (props) => {
  const post = get(props, 'data.stripeSku')
  console.log(post);

  const [pageLoading, setPageLoading] = useState(true)
  const [voucher, setVoucher] = useState()
  useEffect(() => {
    let db = getFirebase().firestore()
    db.collection('vouchers').doc(post.product.id).get().then((doc) => {
      console.log(doc.data())
      setVoucher(doc.data())
      setPageLoading(false)
    })
      .catch((err) => {
        alert(`You must be connected to the internet to view!`)
        navigate("/exclusive-dining")
      })
  }, [])

  // Login modal logic
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [loading, setLoading] = useState(false)
  const handleCheckout = (name, desc, price, image) => {
    setLoading(true);
    let redirect = '';
    if (typeof window !== "undefined") {
      redirect = window.location.origin
    } else {
      redirect = "http://localhost:8000/"
    }
    let user = getUser()
    if (user) {
      console.log(user)
      let data = {
        successUrl: `${redirect}/app/profile`,
        cancelUrl: `${redirect}/exclusive-dining/${post.product.metadata.slug}`,
        name: name,
        image: image,
        description: desc,
        price: price,
        metadata: {
          duration: post.product.metadata.duration,
          user_id: user.uid,
          user_email: user.email,
          slug: post.product.metadata.slug,
          address: post.product.metadata.address,
          couponCode: post.product.metadata.couponCode,
          caption: post.product.caption,
          voucherId: post.product.id,
          vouchersSold: voucher.vouchersSold,
          quantity: voucher.quantity
        }
      }
      let url = "https://us-central1-georgia-on-my-dime.cloudfunctions.net/createCheckoutSession"
      Axios.post(url, data)
        .then(res => {
          console.log(res)
          setLoading(false)
          stripe.redirectToCheckout({
            sessionId: res.data.id
          }).then(res => console.log(res))
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    } else {
      setLoading(false)
      handleOpen()
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
        <LoginModal open={open} handleClose={handleClose} />
        {pageLoading ? <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer> : <Grid>
            <Grid.Column computer={11} tablet={11} mobile={16}>
              <Card fluid raised>
                <Img style={{ maxHeight: "350px" }} alt={post.product.name} fluid={post.product.localFiles[0].childImageSharp.fluid} />
                <Card.Content>
                  <Card.Header>
                    <h1 style={{ marginBottom: "-3px" }}>{post.product.name}</h1>
                    <p>{post.product.caption}</p>
                    {post.product.attributes.map((tag, index) => <Label as={Button} key={`${index}label`} value={tag} onClick={handleClick}>{tag}</Label>)}
                    <div style={{ display: "inline-block", float: 'right', fontSize: "25px" }}>
                      {formatCurrency(post.price)}
                    </div>
                  </Card.Header>

                </Card.Content>
                <Card.Content>
                  <h2>Description</h2>
                  {post.product.description.split("\\n").map((item, i) => <p key={i}>{item}</p>)}
                  <Swiper photos={post.product.localFiles}></Swiper>
                  <h2>Terms and Conditions</h2>
                  <p>{post.product.metadata.terms ? post.product.metadata.terms : "Must be 21 to purchase, valid ID required to redeem."}</p>
                  <p style={{ display: "inline-block", marginRight: "3px" }}>All packages are governed by the site</p><TermsModal />
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
              {voucher ? voucher.vouchersSold >= voucher.quantity ? null : <Segment raised style={{ paddingBottom: '1px', textAlign: "center" }}>
                <p>{post.product.caption}</p>
                <Button
                  primary
                  loading={loading}
                  disabled={loading}
                  style={{ marginBottom: '15px' }}
                  onClick={() => handleCheckout(post.product.name, post.product.description, post.price, post.product.images)}>
                  BUY NOW
              </Button>
              </Segment> : null}
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
          </Grid>}
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

