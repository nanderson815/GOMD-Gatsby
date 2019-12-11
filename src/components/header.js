import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu } from 'semantic-ui-react'

const Header = ({ siteTitle }) => (
  <Menu>
    <Menu.Item>
      <h1 style={{ margin: 5 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </Menu.Item>
  </Menu>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
