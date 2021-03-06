import React, { useState } from 'react'
import { Menu, Container, Icon, Responsive, Sticky } from 'semantic-ui-react'
import { Link } from 'gatsby'
import SearchBar from '../searchbar'
import Logo from '../logo'
import BottomNav from './bottomNav'

export default function Header() {
  const [searching, setSearching] = useState(false)

  return (
    <div>
      <Responsive minWidth={768}>
        <Sticky>
          <Menu stackable className='borderless' style={{ marginBottom: '10px' }}>
            <Container>
              <Menu.Item position='left'>
                <Link to='/'>
                  <div style={{ width: '50px' }}>
                    <Logo />
                  </div>
                </Link>
                <Link to='/'>
                  <h3 style={{ color: '#1c70b5', margin: '0px 0px 0px 5px' }}>Georgia on my Dime</h3>
                </Link>
              </Menu.Item>

              <Menu.Item style={{ flexGrow: 1 }}>
                <SearchBar />
              </Menu.Item>

              <Menu.Menu position='right'>
                <Menu.Item style={{ fontWeight: 'bold' }} name='happyHours' as={Link} to='/happy-hour-finder'>
                  <Icon name='glass martini' style={{ color: '#1c70b5' }} /> Happy Hours
                </Menu.Item>
                <Menu.Item style={{ fontWeight: 'bold' }} name='packages' as={Link} to='/exclusive-dining'>
                  <Icon name='food' style={{ color: '#1c70b5' }} /> Packages
                </Menu.Item>
                <Menu.Item name='profile' style={{ fontWeight: 'bold' }} as={Link} to='/app/profile'>
                  <Icon name='user' style={{ color: '#1c70b5' }} /> Profile
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Sticky>
      </Responsive>
      {/* Mobile Header and navbar begins here ---------------------------------------------------------- */}
      <Responsive {...Responsive.onlyMobile}>
        <Menu style={{ margin: '0px 0px 15px 0px', borderBottom: '1px solid #1c70b5' }} fluid className='borderless'>
          {searching ? null : (
            <>
              <Menu.Item position='left'>
                <Link to='/'>
                  <div style={{ width: '40px' }}>
                    <Logo />
                  </div>
                </Link>
                <Link to='/'>
                  <h3 style={{ color: '#1c70b5', margin: '0px 0px 0px 5px' }}>Georgia on my Dime</h3>
                </Link>
              </Menu.Item>
              <Menu.Item
                name='search'
                style={{ borderRight: '1px solid #8080807a' }}
                onClick={() => setSearching(true)}
              >
                <Icon name='search' style={{ color: '#1c70b5' }} circular inverted color='blue' />
              </Menu.Item>
            </>
          )}
          {searching ? (
            <>
              <Menu.Item style={{ width: '85%' }}>
                <SearchBar style={{ width: '100%' }} />
              </Menu.Item>
              <Menu.Item name='cancel' onClick={() => setSearching(false)}>
                <Icon name='cancel' style={{ color: 'gray' }} />
              </Menu.Item>
            </>
          ) : null}
        </Menu>
        <BottomNav />
      </Responsive>
    </div>
  )
}
