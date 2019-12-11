import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu, Container } from 'semantic-ui-react'

const Header = ({ siteTitle }) => (
  <Menu style={{ background: "#1c70b5" }}>
    <Container>
      <h1 style={{ margin: 5 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </Container>
  </Menu>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
