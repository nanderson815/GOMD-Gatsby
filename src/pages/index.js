import React from "react"
import Header from '../components/header'
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less'
import Background from '../images/homepagebackground.jpg'
import SearchBar from '../components/searchbar'
import { Button, Grid, Container, Image, Label, Card } from "semantic-ui-react"
import { navigate, Link } from "gatsby"
import Img from 'gatsby-image'


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

  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const renderHomePage = () => {
    let cards = shuffle(happyHours).slice(0, 10).map((item, index) => {
      return (
        <Card key={item.id} style={{ width: "30%" }}>
          <Img style={{ height: "50vh" }} alt={item.name} fluid={item.mainImg.fluid} />
          <h2 style={{ color: "white", position: "absolute", bottom: "175px", left: "10px", zIndex: "2000" }}>{item.name}</h2>
          <Card.Content>
            <Card.Description>
              {item.seoDescription}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {item.neighborhood}
          </Card.Content>
        </Card>
      )
    })
    return cards
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
                  verticalAlign="middle"
                >
                  <Link to={`/atlanta-happy-hour/${item.slug}`} style={{ color: "black" }}>
                    <Image
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                      size='small'
                      alt={item.name}
                      circular
                      floated="left"
                      src={item.mainImg.fluid.srcWebp} />
                    <h5 style={{ margin: "0px" }}>{item.name}</h5>
                    <p style={{ fontSize: "12px" }}>{item.neighborhood}</p>
                  </Link>
                  <Label as={Button} color='blue' style={{ marginTop: "10px" }} value={item.tags[0]} onClick={handleClick} tag>
                    {item.tags[0]}
                  </Label>

                </Grid.Column>
              )
            })}
          </Grid>
        </Container>
      </div>
      <Container>
        <Card.Group style={{ marginTop: "30px" }}>
          {renderHomePage()}
        </Card.Group>
      </Container>
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
