/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import { Container, Icon } from "semantic-ui-react"
import { Link } from "gatsby"

const Layout = ({ children }) => {

  return (
    <>
      <Container>
        <main>{children}</main>
      </Container>
      <footer style={{ marginTop: "20px", backgroundColor: "#1c70b5" }}>
        <div style={{ minHeight: '20px', backgroundColor: "#115287", display: 'flex', justifyContent: "center" }}>
          <h4 style={{ margin: "20px 30px" }}><Link style={{ color: "white" }} to='/about-us'>About Us</Link></h4>
          <h4 style={{ margin: "20px 30px" }}><Link style={{ color: "white" }} to='/contact'>Contact</Link></h4>
          <h4 style={{ margin: "20px 30px" }}><Link style={{ color: "white" }} to='/articles'>Articles</Link></h4>
        </div>
        <Container style={{ color: 'white', textAlign: "center" }}>
          <div style={{ marginTop: "10px" }}>
            {new Date().getFullYear()} © Georgia on my Dime, LLC. All Rights Reserved. <span style={{ fontWeight: "bolder", margin: "0px 5px" }}>•</span> Atlanta, GA
          </div>
          <div style={{ padding: "20px 0px" }}>
            <a style={{ color: 'white' }} href="https://www.instagram.com/georgiaonmydime/?hl=en"><Icon link name='instagram' size='huge' /></a>
            <a style={{ color: 'white' }} href="https://www.facebook.com/GeorgiaonmyDime/"><Icon link name='facebook' size='huge' /></a>
          </div>
        </Container>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
