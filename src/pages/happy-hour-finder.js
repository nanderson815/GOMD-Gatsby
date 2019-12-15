import React from "react"
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import Img from 'gatsby-image';
import { Grid, Sticky, Card, Responsive, Dropdown } from "semantic-ui-react"
import GoogleMap from '../components/googleMap'
import MobileHappyHourFinder from '../components/mobileHappyHourFinder'

const HappyHourFinder = ({ data }) => {

    let happyHours = data.allContentfulHappyHour.edges.map(item => item.node)
    console.log(happyHours)

    // Helper to handle day filtering
    let days = [
        { key: "All", value: "All", text: "All" },
        { key: "Sun", value: "Sunday", text: "Sunday" },
        { key: "Mon", value: "Monday", text: "Monday" },
        { key: "Tue", value: "Tuesday", text: "Tuesday" },
        { key: "Wed", value: "Wednesday", text: "Wednesday" },
        { key: "Thu", value: "Thursday", text: "Thursday" },
        { key: "Fri", value: "Friday", text: "Friday" },
        { key: "Sat", value: "Saturday", text: "Saturday" }
    ]
    let currentDay = days[new Date().getDay() + 1].value;
    const [day, setDay] = React.useState(currentDay)

    const changeDay = (e, { value }) => {
        setDay(value)
    }

    return (
        <>
            <SEO title="Atlanta Happy Hour Finder" />
            <Responsive minWidth={768}>
                <Grid style={{ margin: "0px" }}>
                    <Grid.Column tablet={10} computer={8} largeScreen={8} style={{ background: "white" }}>
                        <Sticky>
                            <Link to="/"><h1 style={{ padding: "0px 0px 10px 10px", marginBottom: "0px", color: "#1c70b5" }}>Georgia on my Dime</h1></Link>
                            <div style={{ height: "4px", background: "#1c70b5", margin: "0px -14px 10px -14px" }}></div>
                            <div>
                                <Dropdown selection value={day} options={days} onChange={changeDay} />
                            </div>
                        </Sticky>
                        <Card.Group itemsPerRow={2}>
                            {happyHours.map(deal => {
                                if (day === "All" || deal.days.includes(day)) {
                                    return (<Card key={deal.id}>
                                        <Img style={{ height: "150px" }} alt={deal.name} fluid={deal.mainImg.fluid} />
                                        <Card.Content>
                                            <Card.Header>{deal.name}</Card.Header>
                                        </Card.Content>
                                    </Card>)
                                } else {
                                    return null
                                }
                            })}
                        </Card.Group>

                    </Grid.Column>
                    <Grid.Column tablet={6} computer={8} largeScreen={8} style={{ padding: "0px" }}>
                        <Sticky>
                            <GoogleMap></GoogleMap>
                        </Sticky>
                    </Grid.Column>

                </Grid>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <MobileHappyHourFinder happyhours={happyHours} />
            </Responsive>
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
        mainImg{
        fluid(maxWidth: 1800, resizingBehavior: SCALE) {
        ...GatsbyContentfulFluid_tracedSVG
        }
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


export default HappyHourFinder;