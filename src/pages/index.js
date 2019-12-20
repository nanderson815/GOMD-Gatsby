import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Header from '../components/header'
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less';
import Background from '../images/homepagebackground.jpg'


const IndexPage = () => (
  <>
    <Header />
    <SEO title="Home" />
    <div style={{
      width: `100%`,
      margin: "-15px 0px 0px 0px",
      height: "450px",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 57%, rgba(255,255,255,0.7) 81%), url(${Background})`,
      backgroundSize: "cover",
      textAlign: "center"
    }}>
      <div style={{ alignSelf: "center" }}>
        <h1>Home Page Under Construction.</h1>
        <p>Click "Happy Hours" to browse.</p>
      </div>
    </div>
    <Layout>
    </Layout>
  </>
)

export default IndexPage
