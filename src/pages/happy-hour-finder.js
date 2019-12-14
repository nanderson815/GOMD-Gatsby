import React from "react"
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import { Grid, Sticky } from "semantic-ui-react"
import GoogleMap from '../components/googleMap'

const happyHourFinder = (props) => {

    console.log(props)
    return (
        <>
            <SEO title="Atlanta Happy Hour Finder" />
            <Grid columns={2}>
                <Grid.Column width={5} style={{ background: "white", padding: "0px" }}>
                    <Sticky>
                        <h1 style={{ padding: "20px 0px 10px 20px", marginBottom: "0px", color: "#1c70b5" }}>Georgia on my Dime</h1>
                        <div style={{ height: "4px", background: "#1c70b5" }}></div>
                    </Sticky>

                </Grid.Column>
                <Grid.Column width={11} style={{ padding: "0px" }}>
                    <Sticky>
                        <GoogleMap></GoogleMap>
                    </Sticky>
                </Grid.Column>

            </Grid>
        </>
    )
}

export const query = graphql`
  query happyHourDataAndHappyHourData  {
  allContentfulHappyHour {
    edges {
      node {
        best
        seoDescription
        days
        fridayDesc {
          fridayDesc
        }
        hours {
          friday {
            end
            start
          }
          monday {
            end
            start
          }
          thursday {
            start
            end
          }
          tuesday {
            end
            start
          }
          wednesday {
            end
            start
          }
          saturday {
            end
            start
          }
          sunday {
            end
            start
          }
        }
        id
        location {
          lat
          lon
        }
        address
        neighborhood
        mainImg {
          fluid {
            base64
          }
          id
          title
        }
        name
        mondayDesc {
          mondayDesc
        }
        phone
        slug
        thursdayDesc {
          thursdayDesc
        }
        tuesdayDesc {
          tuesdayDesc
        }
        website
        wednesdayDesc {
          wednesdayDesc
        }
        description {
          description
        }
        tags
        sundayDesc {
          sundayDesc
        }
        saturdayDesc{
          saturdayDesc
        }
      }
    }
  }
}
`


export default happyHourFinder;