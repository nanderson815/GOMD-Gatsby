/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import { Container } from "semantic-ui-react"
import { Link } from "gatsby"

const Layout = ({ children }) => {

  return (
    <>
      <Container>
        <main>{children}</main>
      </Container>
      <footer style={{ marginTop: "20px", backgroundColor: "#1c70b5" }}>
        <div style={{ minHeight: '20px', backgroundColor: "#a0a0a0", display: 'flex', justifyContent: "center" }}>
          <h4 style={{ margin: "30px" }}><Link style={{ color: "white" }} to='/about'>About Us</Link></h4>
          <h4 style={{ margin: "30px" }}><Link style={{ color: "white" }} to='/contact'>Contact</Link></h4>
          <h4 style={{ margin: "30px" }}><Link style={{ color: "white" }} to='/articles'>Articles</Link></h4>
        </div>
        <Container style={{}}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Container>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
