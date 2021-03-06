import React from 'react'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout'
import Header from '../components/header/header'
import SEO from '../components/seo'
import ContactForm from '../components/contactForm'

const Contact = () => (
  <div>
    <SEO title='Contact Us' />
    <Header />
    <Layout>
      <Grid style={{ minHeight: '80vh' }} stackable columns={2}>
        <Grid.Column>
          <h1>Contact Us</h1>
          <ContactForm />
        </Grid.Column>
        <Grid.Column>
          <iframe
            title='Happy Hour Map'
            width='100%'
            height='100vh'
            frameBorder='0'
            style={{ border: '0', margin: '0px', height: '100%' }}
            src={`https://www.google.com/maps/embed/v1/place?q=Atlanta,GA&key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`}
          />
        </Grid.Column>
      </Grid>
    </Layout>
  </div>
)

export default Contact
