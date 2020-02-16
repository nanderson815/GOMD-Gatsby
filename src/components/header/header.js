import React, { Component } from 'react'
import { Menu, Container, Icon, Responsive, Sticky, Dropdown } from 'semantic-ui-react'
import SearchBar from '../searchbar'
import { Link } from 'gatsby'
import Logo from '../logo'
import headerStyles from './header.module.css'


export default class MenuExampleMenus extends Component {
  state = {
    searching: false
  }


  handleSearchClick = (e) => this.setState({ searching: !this.state.searching })

  render() {

    const styleFooter = (url) => {
      if (typeof window !== 'undefined') {
        let isHappyHour = window.location.pathname.includes('/atlanta-happy-hour')
        if (window.location.pathname == url) {
          return headerStyles.active
        } else if (window.location.pathname.includes(url) && url !== "/") {
          return headerStyles.active
        } else if (url === '/happy-hour-finder' && isHappyHour) {
          return headerStyles.active
        } else {
          return headerStyles.footerLink
        }

      }
    }



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
                    onClick={this.handleItemClick}
                    as={Link}
                    to='/articles'
                  >
                    <Icon name='newspaper' style={{ color: "#1c70b5" }} /> Articles
          </Menu.Item>
                  <Menu.Item
                    name='profile'
                    style={{ fontWeight: "bold" }}
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
        {/* Mobile Header and navbar begins here ------------------------------------------------------------------------------- */}
        <Responsive {...Responsive.onlyMobile}>
          <Menu style={{ margin: "0px 0px 15px 0px", borderBottom: "1px solid #1c70b5" }} fluid className="borderless">
            {this.state.searching ? null :
              <>
                <Menu.Item position="left">
                  <Link to="/"><div style={{ width: "40px" }}> <Logo /></div></Link><Link to="/"><h3 style={{ color: "#1c70b5", margin: "0px 0px 0px 5px" }}>Georgia on my Dime</h3></Link>
                </Menu.Item>
                <Menu.Item
                  name='search'
                  style={{ borderRight: "1px solid #8080807a" }}
                  onClick={this.handleSearchClick}
                >
                  <Icon name='search' style={{ color: "#1c70b5" }} circular inverted color="blue" /></Menu.Item>
              </>
            }
            {this.state.searching ? <>
              <Menu.Item style={{ width: "85%" }}>
                <SearchBar style={{ width: "100%" }}></SearchBar>
              </Menu.Item>
              <Menu.Item
                name='cancel'
                onClick={this.handleSearchClick}

              >
                <Icon name='cancel' style={{ color: "gray" }} /></Menu.Item> </> : null}
          </Menu>
          {/* Footer Begins Here ---------------------------------------------------------------------------------------- */}
          <div className={headerStyles.footer} >
            <Link className={styleFooter('/')}
              onClick={this.handleItemClick}
              to='/'
            >
              <Icon size='large' style={{ margin: '3px' }} name='home' />Home</Link>

            <Link
              className={styleFooter('/exclusive-dining')}
              onClick={this.handleItemClick}
              to='/exclusive-dining'
            >
              <Icon size='large' name='food' />Packages</Link>
            <Link
              onClick={this.handleItemClick}
              className={styleFooter('/happy-hour-finder')}
              to='/happy-hour-finder'
            >
              <Icon size='large' name='glass martini' />
              Happy Hours</Link>
            <Link
              onClick={this.handleItemClick}
              className={styleFooter('/articles')}
              to='/articles'
            >
              <Icon size='large' name='newspaper' />Articles</Link>
            <Link
              onClick={this.handleItemClick}
              className={styleFooter('/app/profile')}
              to='/app/profile'
            >
              <Icon size='large' name='user' />Profile</Link>
          </div>
        </Responsive>
      </div >
    )
  }
}