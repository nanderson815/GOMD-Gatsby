import React, { useEffect } from 'react'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Header from '../components/header'
import { graphql, navigate } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import 'semantic-ui-less/semantic.less'
import { Card } from 'semantic-ui-react'


const Articles = ({ data }) => {

    const [screen, setScreen] = React.useState('');

    useEffect(() => {
        let screen = window ? window.screen.width : 1000;
        setScreen(screen);
    }, [])


    const handleCardClick = (slug) => {
        navigate(`/${slug}`)
    }

    const renderCards = () => {
        let articles = data.allContentfulBlogPost.edges.map(item => item.node)
        let cards = articles.map((item, index) => {

            let width;

            if (screen < 768) {
                width = "100%"
            } else {
                width = index % 5 === 0 ? "63.5%" : "31%"
            }

            return (
                <Card
                    link
                    onClick={() => handleCardClick(item.slug)}
                    key={item.id}
                    style={{ width: width }}>
                    <BackgroundImage
                        fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, item.image.fluid]}
                        alt={item.image.title}
                        style={{ height: `50vh`, borderRadius: "10px" }}
                    >
                        <div style={{ color: "white", position: "absolute", bottom: "20px", left: "10px", zIndex: "2000" }}>
                            <h2 ><span style={{ fontWeight: "lighter", fontSize: "20px" }}>{item.category[0]}:</span> <br />{item.title}</h2>
                            <Card.Meta style={{ color: "white" }}>{item.date}</Card.Meta>
                        </div>
                    </BackgroundImage>
                </Card>
            )
        })
        return cards
    }
    return (
        <>
            <SEO title="Atlanta Guides, News, and Events"
                description="Our Atlanta Articles make it easy to discover the best Atlanta has to offer! From bottomless mimosas to Atlanta United games, our guides have got you covered!">
            </SEO>
            <Header></Header>
            <BackgroundImage
                fluid={[`linear-gradient(rgba(225, 225, 225, 0.2), rgba(0, 0, 0, 0.9))`, data.desktop.childImageSharp.fluid]}
                style={{ height: "40vh", marginTop: '-10px', display: "flex", textAlign: 'center' }}
            >
                <div style={{ margin: "auto", color: "white" }}>
                    <h1 >Events. News. Guides.</h1>
                    <p>We are your source for everything <span style={{ color: '#1c70b5', fontWeight: "bolder", fontSize: "20px" }}>Food</span> in the <span style={{ color: '#1c70b5', fontWeight: "bolder", fontSize: "20px" }}>ATL</span> .</p>
                </div>
            </BackgroundImage>
            <Layout>
                <Card.Group style={{ marginTop: "10px" }}>
                    {renderCards()}
                </Card.Group>
            </Layout>
        </>
    )
}

export const query = graphql`
  query articlePageArticles  {
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
  }
  `

export default Articles