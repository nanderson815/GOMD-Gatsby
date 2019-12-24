import React from "react"
import Header from '../components/header'
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less'
import Background from '../images/homepagebackground.jpg'
import SearchBar from '../components/searchbar'
import { Button, Grid, Container, Image, Label, Segment } from "semantic-ui-react"
import { navigate, Link } from "gatsby"

const IndexPage = ({ data }) => {

  let happyHours = data.allContentfulHappyHour.edges.map(item => item.node)
  console.log(happyHours)

  const handleClick = (e) => {
    let tag = e.target.value
    navigate("/happy-hour-finder", {
      state: { tag: tag },
    })
  }

  const navfunc = (e) => {
    // navigate("/atlanta-happy-hour/" + slug)
    console.log(e.target)
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
          <p style={{ margin: "20px 0px 0px 0px" }}>Or make a selection to get started: </p>
          <Button onClick={handleClick} value="Wine" style={{ padding: "10px", margin: "2px", minWidth: "80px" }} primary>Wine</Button>
          <Button onClick={handleClick} value="Tacos" style={{ padding: "10px", margin: "2px", minWidth: "80px" }} primary>Tacos</Button>
          <Button onClick={handleClick} value="Sushi" style={{ padding: "10px", margin: "2px", minWidth: "80px" }} primary>Sushi</Button>
          <Button onClick={handleClick} value="Cocktails" style={{ padding: "10px", margin: "2px", minWidth: "80px" }} primary>Cocktails</Button>
          <Button onClick={handleClick} value="Beer" style={{ padding: "10px", margin: "2px", minWidth: "80px" }} primary>Beer</Button>
        </div>
      </div>
      <div style={{ background: "white" }}>
        <Container>
          <h2>Featured Restaurants</h2>
          <Grid divided stackable columns={4} style={{ padding: "0px 5px 10px 5px" }}>
            {happyHours.slice(0, 4).map((item) => {
              return (
                <Grid.Column
                  key={item.id}
                  onClick={navfunc}
                >
                  {/* <Link to={`/atlanta-happy-hour/${item.slug}`} style={{ color: "black" }}> */}
                  <Image
                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    size='small'
                    alt={item.name}
                    circular
                    floated="left"
                    src={item.mainImg.fluid.srcWebp} />
                  <h5 style={{ margin: "0px" }}>{item.name}</h5>
                  <p style={{ fontSize: "12px" }}>{item.neighborhood}</p>
                  <Label as='a' color='blue' tag>
                    {item.tag[0]}
                  </Label>
                  {/* </Link> */}

                </Grid.Column>
              )
            })}
          </Grid>
        </Container>
      </div>
    </>
  )

}
export const query = graphql`
  query homePageHappyHours  {
          allContentfulHappyHour {
          edges {
          node {
          ...allHappyHourFields
        }
        }
      }
    }
    `



export default IndexPage
