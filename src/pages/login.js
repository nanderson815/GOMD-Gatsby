import React from 'react'
import Header from '../components/header'
import SEO from '../components/seo';
import Layout from '../components/layout';
import SignInForm from '../components/signInForm'

const Login = (props) => {
    return (
        <div>
            <SEO title="Sign In"></SEO>
            <Header></Header>
            <Layout>
                <div style={{ minHeight: "75vh" }}>
                    <h1>Sign In</h1>
                    <SignInForm></SignInForm>
                </div>
            </Layout>
        </div>
    )
}

export default Login