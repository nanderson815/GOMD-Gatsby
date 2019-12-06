import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'

const Header = ({ siteTitle }) => (
  <AppBar>
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
  </AppBar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
