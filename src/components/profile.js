import React from 'react'
import Header from './header'
import SEO from './seo';
import Layout from './layout';
import { Button } from 'semantic-ui-react';
import { userSignOut } from '../auth/auth'
const Profile = (props) => {
    return (
        <div>
            <Header></Header>
            <Layout>
                <div style={{ height: '10vh' }}>Profile</div>
                <Button onClick={userSignOut}>Sign Out</Button>
            </Layout>
        </div>
    )
}

export default Profile