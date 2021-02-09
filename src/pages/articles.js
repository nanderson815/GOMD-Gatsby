import React, { useEffect } from 'react'
import 'semantic-ui-less/semantic.less'
import { graphql, navigate } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import { Card } from 'semantic-ui-react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Header from '../components/header/header'

const Articles = ({ data }) => {
  const [screen, setScreen] = React.useState('')

  useEffect(() => {
    const screen = window ? window.screen.width : 1000
    setScreen(screen)
  }, [])

  const handleCardClick = slug => {
    navigate(`/articles/${slug}`)
  }

  const renderCards = () => {
    const articles = data.allContentfulBlogPost.edges.map(item => item.node)
    const cards = articles.map((item, index) => {
      let width

      if (screen < 768) {
        width = '100%'
      } else {
        width = index % 5 === 0 ? '63.5%' : '31%'
      }

      return (
        <Card link onClick={() => handleCardClick(item.slug)} key={item.id} style={{ width }}>
          <BackgroundImage
            fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, item.image.fluid]}
            alt={item.image.title}
            style={{ height: `50vh`, borderRadius: '10px' }}
          >
            <div style={{ color: 'white', position: 'absolute', bottom: '20px', left: '10px', zIndex: '2000' }}>
              <h2>
                <span style={{ fontWeight: 'lighter', fontSize: '20px' }}>{item.category[0]}:</span> <br />
                {item.title}
              </h2>
              <Card.Meta style={{ color: 'white' }}>{item.date}</Card.Meta>
            </div>
          </BackgroundImage>
        </Card>
      )
    })
    let width
    if (screen < 768) {
      width = '100%'
    } else {
      width = '31%'
    }

    const mimosas = (
      <Card
        link
        onClick={() => handleCardClick('bottomless-mimosas-atlanta')}
        key='bottomles-123-baby'
        style={{ width }}
      >
        <BackgroundImage
          fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, data.mimosa.childImageSharp.fluid]}
          alt='Bottomless Mimosas in Atlanta'
          style={{ height: `50vh`, borderRadius: '10px' }}
        >
          <div style={{ color: 'white', position: 'absolute', bottom: '20px', left: '10px', zIndex: '2000' }}>
            <h2>
              <span style={{ fontWeight: 'lighter', fontSize: '20px' }}>Guides:</span> <br />
              Bottomless Mimosas in Atlanta (2020)
            </h2>
            <Card.Meta style={{ color: 'white' }}>January 10, 2020</Card.Meta>
          </div>
        </BackgroundImage>
      </Card>
    )
    const bestHHs = (
      <Card
        link
        onClick={() => handleCardClick('best-happy-hours-atlanta')}
        key='bestATLHappyHours-123'
        style={{ width }}
      >
        <BackgroundImage
          fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, data.bestHH.childImageSharp.fluid]}
          alt='Best Happy Hours in Atlanta'
          style={{ height: `50vh`, borderRadius: '10px' }}
        >
          <div style={{ color: 'white', position: 'absolute', bottom: '20px', left: '10px', zIndex: '2000' }}>
            <h2>
              <span style={{ fontWeight: 'lighter', fontSize: '20px' }}>Guides:</span> <br />
              Best Happy Hours in Atlanta (2020)
            </h2>
            <Card.Meta style={{ color: 'white' }}>January 20, 2020</Card.Meta>
          </div>
        </BackgroundImage>
      </Card>
    )
    const wineWednesday = (
      <Card link onClick={() => handleCardClick('wine-wednesday-atlanta')} key='wineWednesday-123' style={{ width }}>
        <BackgroundImage
          fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, data.wineW.childImageSharp.fluid]}
          alt='Best Happy Hours in Atlanta'
          style={{ height: `50vh`, borderRadius: '10px' }}
        >
          <div style={{ color: 'white', position: 'absolute', bottom: '20px', left: '10px', zIndex: '2000' }}>
            <h2>
              <span style={{ fontWeight: 'lighter', fontSize: '20px' }}>Guides:</span> <br />
              Wine Wednesday in Atlanta
            </h2>
            <Card.Meta style={{ color: 'white' }}>January 26, 2020</Card.Meta>
          </div>
        </BackgroundImage>
      </Card>
    )
    cards.splice(1, 0, mimosas)
    cards.splice(1, 0, bestHHs)
    cards.splice(1, 0, wineWednesday)
    return cards
  }

  return (
    <>
      <SEO
        title='Atlanta Guides, News, and Events'
        description='Our Atlanta Articles make it easy to discover the best Atlanta has to offer! From bottomless mimosas to Atlanta United games, our guides have got you covered!'
      />
      <Header />
      <BackgroundImage
        fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, data.desktop.childImageSharp.fluid]}
        style={{ height: '40vh', marginTop: '-10px', display: 'flex', textAlign: 'center' }}
      >
        <div style={{ margin: 'auto', color: 'white' }}>
          <h1>Events. News. Guides.</h1>
          <p>
            We are your source for everything{' '}
            <span style={{ color: '#1c70b5', fontWeight: 'bolder', fontSize: '20px' }}>Food</span> in the{' '}
            <span style={{ color: '#1c70b5', fontWeight: 'bolder', fontSize: '20px' }}>ATL</span> .
          </p>
        </div>
      </BackgroundImage>
      <Layout>
        <Card.Group style={{ marginTop: '10px' }}>{renderCards()}</Card.Group>
      </Layout>
    </>
  )
}

export const query = graphql`
  query articlePageArticles {
    allContentfulBlogPost {
      edges {
        node {
          ...allBlogPostFields
        }
      }
    }
    desktop: file(relativePath: { eq: "articlesBackground.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mimosa: file(relativePath: { eq: "mimosas.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    bestHH: file(relativePath: { eq: "Bazati.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    wineW: file(relativePath: { eq: "winewed.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default Articles
