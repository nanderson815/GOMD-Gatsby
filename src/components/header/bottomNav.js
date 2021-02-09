import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Icon } from 'semantic-ui-react'
import headerStyles from './header.module.css'

const styleFooter = url => {
  if (typeof window !== 'undefined') {
    const isHappyHour = window.location.pathname.includes('/atlanta-happy-hour')
    if (window.location.pathname === url) {
      return headerStyles.active
    }
    if (window.location.pathname.includes(url) && url !== '/') {
      return headerStyles.active
    }
    if (url === '/happy-hour-finder' && isHappyHour) {
      return headerStyles.active
    }
    return headerStyles.footerLink
  }
  return null
}

const BottomNav = () => {
  const [show, setShow] = useState(true)
  let lastScrollTop = 0
  let showPoint = 0
  const distance = 500
  const handleScroll = () => {
    const offset = window.pageYOffset
    if (offset > lastScrollTop && offset > distance + showPoint) {
      setShow(false)
    } else if (offset < lastScrollTop) {
      showPoint = offset
      setShow(true)
    }
    lastScrollTop = offset <= 0 ? 0 : offset
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const watchScroll = () => {
        window.addEventListener('scroll', handleScroll)
      }
      watchScroll()
      // Remove listener (like componentWillUnmount)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
    return null
  }, [])

  return (
    <div className={`${headerStyles.footer} ${!show ? headerStyles.fadeOut : headerStyles.fadeIn}`}>
      <Link className={styleFooter('/')} to='/'>
        <Icon size='large' style={{ margin: '3px' }} name='home' />
        Home
      </Link>

      <Link className={styleFooter('/exclusive-dining')} to='/exclusive-dining'>
        <Icon size='large' name='food' />
        Packages
      </Link>
      <Link className={styleFooter('/happy-hour-finder')} to='/happy-hour-finder'>
        <Icon size='large' name='glass martini' />
        Happy Hours
      </Link>
      <Link className={styleFooter('/articles')} to='/articles'>
        <Icon size='large' name='newspaper' />
        Articles
      </Link>
      <Link className={styleFooter('/app/profile')} to='/app/profile'>
        <Icon size='large' name='user' />
        Profile
      </Link>
    </div>
  )
}

export default BottomNav
