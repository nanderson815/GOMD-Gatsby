import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less';
import Background from '../images/homepagebackground.jpg'


const IndexPage = () => (

  <Layout>
    <div style={{
      width: `100vw`,
      position: "relative",
      left: "calc(-50vw + 50%)",
      margin: "-15px 0px 0px 0px",
      height: "450px",
      overflow: "hidden",
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 57%, rgba(255,255,255,0.7) 81%), url(${Background})`,
      backgroundSize: "cover",
    }}>
    </div>
    <SEO title="Home" />
  </Layout>
)

export default IndexPage
