import React from 'react'
import Header from '../components/header'
import SEO from '../components/seo';
import Layout from '../components/layout';

const Profile = (props) => {
    return (
        <div>
            <SEO title="User Profile"></SEO>
            <Header></Header>
            <Layout>
                <div>Profile</div>
            </Layout>
        </div>
    )
}

export default Profile