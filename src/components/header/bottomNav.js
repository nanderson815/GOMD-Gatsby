import React from 'react'
import { Link } from 'gatsby'
import { Icon } from 'semantic-ui-react'
import headerStyles from './header.module.css'

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

const BottomNav = (props) => {
    return (
        <div className={headerStyles.footer} >
            <Link className={styleFooter('/')}
                to='/'
            >
                <Icon size='large' style={{ margin: '3px' }} name='home' />Home</Link>

            <Link
                className={styleFooter('/exclusive-dining')}
                to='/exclusive-dining'
            >
                <Icon size='large' name='food' />Packages</Link>
            <Link
                className={styleFooter('/happy-hour-finder')}
                to='/happy-hour-finder'
            >
                <Icon size='large' name='glass martini' />
                Happy Hours</Link>
            <Link
                className={styleFooter('/articles')}
                to='/articles'
            >
                <Icon size='large' name='newspaper' />Articles</Link>
            <Link
                className={styleFooter('/app/profile')}
                to='/app/profile'
            >
                <Icon size='large' name='user' />Profile</Link>
        </div >
    )
}

export default BottomNav;




