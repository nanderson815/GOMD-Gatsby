import React, { useEffect } from 'react'
import Header from './header'
import Layout from './layout';
import { Button } from 'semantic-ui-react';
import { userSignOut } from '../auth/auth'
import { getUser } from '../auth/auth'

const Profile = (props) => {

    useEffect(() => {
        console.log(getUser())

    })

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