import React from "react"
import Header from '../components/header'
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less'
import Background from '../images/homepagebackground.jpg'
import SearchBar from '../components/searchbar'
import { Button, Card, Container, Image, Label } from "semantic-ui-react"
import { navigate } from "gatsby"

const IndexPage = ({ data }) => {

  let happyHours = data.allContentfulHappyHour.edges.map(item => item.node)
  console.log(happyHours)

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
          <Card.Group itemsPerRow={3}>
            {happyHours.slice(0, 6).map((item, key) => {
              return (
                <Card key={key} link>
                  <Card.Content>
                    <Image
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                      size='small'
                      alt={item.name}
                      circular
                      floated="left"
                      src={item.mainImg.fluid.srcWebp} />
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Meta>{item.neighborhood}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>{item.tags.slice(0, 4).map((tag, index) => <Label key={index}>{tag}</Label>)}</Card.Content>
                </Card>
              )
            })}
          </Card.Group>
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
