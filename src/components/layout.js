import React from 'react'
import PropTypes from 'prop-types'
import './layout.css'
import { Container, Icon } from 'semantic-ui-react'
import { Link } from 'gatsby'
// import BottomNav from "./header/bottomNav"

const Layout = ({ children }) => (
  <>
    <Container>
      <main>{children}</main>
      {/* <BottomNav></BottomNav> */}
    </Container>
    <footer style={{ marginTop: '20px', backgroundColor: '#1c70b5' }}>
      <div style={{ minHeight: '20px', backgroundColor: '#115287', display: 'flex', justifyContent: 'center' }}>
        <h4 style={{ margin: '20px 30px' }}>
          <Link style={{ color: 'white' }} to='/about-us'>
            About Us
          </Link>
        </h4>
        <h4 style={{ margin: '20px 30px' }}>
          <Link style={{ color: 'white' }} to='/contact'>
            Contact
          </Link>
        </h4>
      </div>
      <Container style={{ color: 'white', textAlign: 'center' }}>
        <div style={{ marginTop: '10px' }}>
          {new Date().getFullYear()} © Georgia on my Dime, LLC. All Rights Reserved.{' '}
          <span style={{ fontWeight: 'bolder', margin: '0px 5px' }}>•</span> Atlanta, GA
        </div>
        <div style={{ padding: '20px 0px' }}>
          <a style={{ color: 'white' }} href='https://www.instagram.com/georgiaonmydime/?hl=en'>
            <Icon link name='instagram' size='huge' />
          </a>
          <a style={{ color: 'white' }} href='https://www.facebook.com/GeorgiaonmyDime/'>
            <Icon link name='facebook' size='huge' />
          </a>
        </div>
      </Container>
    </footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
