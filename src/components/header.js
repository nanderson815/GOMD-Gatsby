import React, { Component } from 'react'
import { Menu, Container, Icon } from 'semantic-ui-react'
import SearchBar from '../components/searchbar'
import { Link } from 'gatsby'
import Logo from './logo'

export default class MenuExampleMenus extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable className="borderless">
        {/* <div className="container"> */}
        <Container>
          <Menu.Item
            position="left"
          >
            <Link to="/"><div style={{ width: "50px" }}> <Logo /></div></Link><Link to="/"><h2 style={{ color: "#1c70b5", margin: "0px 0px 0px 5px" }}>Georgia on my Dime</h2></Link>
          </Menu.Item>

          <Menu.Item style={{ width: '40%' }}>
            <SearchBar />
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              style={{ fontWeight: "bold" }}
              name='happyHours'
              active={activeItem === 'happyHours'}
              onClick={this.handleItemClick}
              as={Link}
              to='/happy-hour-finder'
            >
              <Icon name='glass martini' style={{ color: "#1c70b5" }} />Happy Hours
            </Menu.Item>
            <Menu.Item
              style={{ fontWeight: "bold" }}
              name='articles'
              active={activeItem === 'articles'}
              onClick={this.handleItemClick}
            >
              <Icon name='utensils' style={{ color: "#1c70b5" }} /> Articles
          </Menu.Item>
          </Menu.Menu>
        </Container>
        {/* </div> */}
      </Menu>
    )
  }
}