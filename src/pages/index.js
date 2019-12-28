import React, { useEffect } from "react"
import Header from '../components/header'
import SEO from "../components/seo"
import 'semantic-ui-less/semantic.less'
import Background from '../images/homepagebackground.jpg'
import SearchBar from '../components/searchbar'
import { Button, Grid, Container, Image, Label, Card, Icon } from "semantic-ui-react"
import { navigate, Link, graphql } from "gatsby"
import BackgroundImage from 'gatsby-background-image'


const IndexPage = ({ data }) => {

  const [screen, setScreen] = React.useState('');

  useEffect(() => {
    let screen = window ? window.screen.width : 1000;
    setScreen(screen);
  }, [])

  let happyHours = data.allContentfulHappyHour.edges.map(item => item.node)
  console.log(happyHours)

  const handleClick = (e) => {
    let tag = e.target.value
    navigate("/happy-hour-finder", {
      state: { tag: tag },
    })
  }

  const handleCardClick = (slug) => {
    navigate(`atlanta-happy-hour/${slug}`)
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

      let width;

      if (screen < 768) {
        width = "100%"
      } else {
        width = index % 3 === 0 ? "65%" : "30%"
      }

      return (
        <Card
          link
          onClick={() => handleCardClick(item.slug)}
          key={item.id}
          style={{ width: width }}>
          <BackgroundImage
            fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, item.mainImg.fluid]}
            alt={item.name}
            style={{ height: `${screen < 768 ? "20vh" : "50vh"}` }}
          >
            <h2 style={{ color: "white", position: "absolute", bottom: "20px", left: "10px", zIndex: "2000" }}><span style={{ fontWeight: "lighter", fontSize: "20px" }}>Happy Hour:</span> <br />{item.name}</h2>
          </BackgroundImage>
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

    let segment = (
      <Card link key={`mapKeyCardLink`} style={{ width: `${screen < 768 ? "100%" : '33%'}`, background: "#1c70b5" }}>
        <Card.Content>
          <Card.Header>
            <h1 style={{ color: 'white', marginTop: "20px" }}>Looking to grab a beer or a bite?</h1>
          </Card.Header>
          <br></br>
          <Card.Description>
            <h2 style={{ color: "white" }}> We might have a couple of suggestions if you're into...</h2>
            <ul style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
              <li>Sushi</li>
              <li>Beer</li>
              <li>Cocktails</li>
              <li>Trying New Things</li>
              <li>Tacos</li>
              <li>Oysters</li>
              <li>Saving Money</li>
            </ul>
            <br></br>
          </Card.Description>
          <Card.Description>
            <Button onClick={() => navigate("/happy-hour-finder")} style={{ width: "100%", textAlign: "center", marginTop: '50px' }} secondary>Find Happy Hours <Icon name="arrow right"></Icon ></Button>
          </Card.Description>
        </Card.Content>
      </Card>)

    cards.splice(6, 0, segment)
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
