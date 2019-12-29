import React, { Component } from 'react'
import { Menu, Container, Icon, Responsive, Sticky } from 'semantic-ui-react'
import SearchBar from '../components/searchbar'
import { Link } from 'gatsby'
import Logo from './logo'


export default class MenuExampleMenus extends Component {
  state = {
    searching: false
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleSearchClick = (e) => this.setState({ searching: !this.state.searching })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Responsive minWidth={768}>
          <Menu stackable className="borderless" style={{ marginBottom: "10px" }}>
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
          </Menu>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Sticky>
            <Menu style={{ margin: "0px 0px 15px 0px", borderBottom: "4px solid #1c70b5" }} fluid className="borderless">
              {this.state.searching ? null :
                <>
                  <Menu.Item position="left">
                    <Link to="/"><div style={{ width: "30px" }}> <Logo /></div></Link><Link to="/"><h4 style={{ color: "#1c70b5", margin: "0px 0px 0px 5px" }}>Georgia on my Dime</h4></Link>
                  </Menu.Item>
                  <Menu.Item
                    style={{ borderRight: "1px solid #8080807a" }}
                    name='happyHours'
                    active={activeItem === 'happyHours'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/happy-hour-finder'
                  >
                    <Icon name='glass martini' style={{ color: "#1c70b5" }} /></Menu.Item>
                  <Menu.Item
                    style={{ borderRight: "1px solid #8080807a" }}
                    name='articles'
                    active={activeItem === 'articles'}
                    onClick={this.handleItemClick}
                  >
                    <Icon name='utensils' style={{ color: "#1c70b5" }} /></Menu.Item>
                  <Menu.Item
                    name='search'
                    active={activeItem === 'search'}
                    onClick={this.handleSearchClick}
                  >
                    <Icon name='search' style={{ color: "#1c70b5" }} /></Menu.Item>
                </>
              }
              {this.state.searching ? <>
                <Menu.Item style={{ width: "85%" }}>
                  <SearchBar style={{ width: "100%" }}></SearchBar>
                </Menu.Item>
                <Menu.Item
                  name='cancel'
                  active={activeItem === 'cancel'}
                  onClick={this.handleSearchClick}

                >
                  <Icon name='cancel' style={{ color: "gray" }} /></Menu.Item> </> : null}
            </Menu>
          </Sticky>
        </Responsive>
      </div>
    )
  }
}