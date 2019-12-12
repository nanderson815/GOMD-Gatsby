import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu, Container, Sticky } from 'semantic-ui-react'
import SearchBar from "./searchbar";

const Header = ({ siteTitle }) => (
  < Sticky >
    <Menu stackable>
      <Container>
        <Menu.Item header style={{ borderLeft: "none" }}>
          <h1 style={{ margin: 5 }}>
            <Link
              to="/"
              style={{
                color: `#1c70b5`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </Menu.Item>
        <Menu.Item>
          <SearchBar></SearchBar>
        </Menu.Item>
      </Container>
    </Menu>
  </Sticky >
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
