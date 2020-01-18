import React from 'react'
import Header from '../components/header'
import SEO from '../components/seo'
import Layout from '../components/layout'


const BottomlessMimosas = (props) => {
    let MimosaData = props.data.allContentfulHappyHour.edges.map(item => item.node);
    console.log(MimosaData)

    return (
        <div>
            <SEO
                title="Every Atlanta Restaurant with Bottomless Mimosas (2020)"
                image='/mimosas.png'
                description="Bottomless mimosas are the essential brunch beverage for a successful day of drinking. Bottomless Mimosas Atlanta - the best way to celebrate your brunch!"></SEO>
            <Header></Header>
            <Layout>
                <h1>Bottomless Mimosas</h1>
            </Layout>
        </div >
    )
}

// Gimmy those bottomless mimosa deals baby.
export const query = graphql`
  query bottomlessMimosas  {
    allContentfulHappyHour(filter: {tags: {in: "Bottomless Mimosas"}}) {
        edges {
            node {
                ...allHappyHourFields
            }
          }
        }
      }
      `


export default BottomlessMimosas;