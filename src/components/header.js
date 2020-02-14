import React, { Component } from 'react'
import { Menu, Container, Icon, Responsive, Sticky, Dropdown } from 'semantic-ui-react'
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
    console.log(this.state.a)


    return (
      <div>
        <Responsive minWidth={768}>
          <Sticky>
            <Menu stackable className="borderless" style={{ marginBottom: "10px" }}>
              <Container>
                <Menu.Item
                  position="left"
                >
                  <Link to="/"><div style={{ width: "50px" }}> <Logo /></div></Link><Link to="/"><h3 style={{ color: "#1c70b5", margin: "0px 0px 0px 5px" }}>Georgia on my Dime</h3></Link>
                </Menu.Item>

                <Menu.Item style={{ width: '40%' }}>
                  <SearchBar />
                </Menu.Item>

                <Menu.Menu position='right'>
                  <Menu.Item>
                    <Dropdown item text='Restaraunts' style={{ fontWeight: "bold" }}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to='/happy-hour-finder' > <Icon name='glass martini' style={{ color: "#1c70b5" }} />Happy Hours</Dropdown.Item>
                        <Dropdown.Item as={Link} to='/exclusive-dining'>  <Icon name='food' style={{ color: "#1c70b5" }} />Packages</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>

                  <Menu.Item
                    style={{ fontWeight: "bold" }}
                    name='articles'
                    active={activeItem === 'articles'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/articles'
                  >
                    <Icon name='newspaper' style={{ color: "#1c70b5" }} /> Articles
          </Menu.Item>
                  <Menu.Item
                    name='profile'
                    style={{ fontWeight: "bold" }}
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/app/profile'
                  >
                    <Icon name='user' style={{ color: "#1c70b5" }} /> Profile
                    </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </Sticky>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Menu style={{ margin: "0px 0px 15px 0px", borderBottom: "4px solid #1c70b5" }} fluid className="borderless">
            {this.state.searching ? null :
              <>
                <Menu.Item position="left" style={{ padding: '5px' }}>
                  <Link to="/"><div style={{ width: "45px" }}> <Logo /></div></Link><Link to="/"></Link>
                </Menu.Item>
                <Menu.Item
                  name='search'
                  style={{ borderRight: "1px solid #8080807a" }}
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
          <Menu compact icon="labeled" widths={5} style={{ fontSize: '12px', minHeight: "55px", borderTop: "1.5px solid #1c70b5", bottom: "0rem", left: "0rem", right: '0rem', position: 'fixed', right: '0rem', zIndex: '20' }}>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
              as={Link}
              to='/'
            >
              <Icon name='home' style={{ color: "#1c70b5" }} />Home</Menu.Item>
            <Menu.Item
              name='packages'
              active={activeItem === 'packages'}
              onClick={this.handleItemClick}
              as={Link}
              to='/exclusive-dining'
            >
              <Icon name='food' style={{ color: "#1c70b5" }} />Packages</Menu.Item>
            <Menu.Item
              name='happyHour'
              active={activeItem === 'happyHour'}
              onClick={this.handleItemClick}
              as={Link}
              to='/happy-hour-finder'
            >
              <Icon name='glass martini' style={{ color: "#1c70b5" }} />Happy Hours</Menu.Item>
            <Menu.Item
              name='articles'
              active={activeItem === 'articles'}
              onClick={this.handleItemClick}
              as={Link}
              to='/articles'
            >
              <Icon name='newspaper' style={{ color: "#1c70b5" }} />Articles</Menu.Item>
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              as={Link}
              to='/app/profile'
            >
              <Icon name='user' style={{ color: "#1c70b5" }} />Profile</Menu.Item>
          </Menu>
        </Responsive>
      </div>
    )
  }
}