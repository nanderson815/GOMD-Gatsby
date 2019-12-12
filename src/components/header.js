import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import SearchBar from '../components/searchbar'

export default class MenuExampleMenus extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable className="borderless">
        <Menu.Item
          position="left"
        >
          <h1 style={{ color: "#1c70b5" }}>Georgia on my Dime</h1>
        </Menu.Item>

        <Menu.Item style={{ width: '50%' }}>
          <SearchBar />
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>

          <Menu.Item
            name='happyHours'
            active={activeItem === 'happyHours'}
            onClick={this.handleItemClick}
          >
            Happy Hours
          </Menu.Item>
          <Menu.Item
            name='articles'
            active={activeItem === 'articles'}
            onClick={this.handleItemClick}
          >
            Articles
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}