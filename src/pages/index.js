import React from "react"
import Layout from "../components/layout"
import Header from '../components/header'
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less'
import Background from '../images/homepagebackground.jpg'
import SearchBar from '../components/searchbar'
import { Button } from "semantic-ui-react"
import { navigate } from "gatsby"

const IndexPage = () => {
  const handleClick = (e) => {
    let tag = e.target.value
    navigate("/happy-hour-finder", {
      state: { tag: tag },
    })
  }

  return (
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
        <div style={{ alignSelf: "center", maxWidth: "800px", padding: "20px" }}>
          <h3>Search our complete list of the <span>best Atlanta Happy Hours.</span>
            There are hundreds of options around the ATL so you’ll never overpay for a drink again. </h3>
          <div style={{ padding: "0px 20px" }}>
            <SearchBar padding="15px 10px" />
          </div>
          <br></br>
          <p style={{margin:"20px 0px 0px 0px"}}>Or make a selection to get started: </p>
          <Button onClick={handleClick} value="Wine" style={{ padding: "10px", margin: "2px" }} primary>Wine</Button>
          <Button onClick={handleClick} value="Tacos" style={{ padding: "10px", margin: "2px" }} primary>Tacos</Button>
          <Button onClick={handleClick} value="Sushi" style={{ padding: "10px", margin: "2px" }} primary>Sushi</Button>
          <Button onClick={handleClick} value="Cocktails" style={{ padding: "10px", margin: "2px" }} primary>Cocktails</Button>
          <Button onClick={handleClick} value="Beer" style={{ padding: "10px", margin: "2px" }} primary>Beer</Button>
        </div>
      </div>
      <Layout>
        <div></div>
      </Layout>
    </>
  )
}

export default IndexPage
