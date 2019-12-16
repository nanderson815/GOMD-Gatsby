import React, { useEffect } from "react"
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Grid, Sticky, Responsive, Dropdown } from "semantic-ui-react"
import GoogleMap from '../components/googleMap'
import MobileHappyHourFinder from '../components/mobileHappyHourFinder'
import HHFinderCardGroup from '../components/hhFinderCardGroup'

const HappyHourFinder = ({ data }) => {

    // The use effect below ensures we only run map once. (could get expensive with lots of data)
    const [happyHours, setHappyHours] = React.useState([])
    useEffect(() => {
        let HHdata = data.allContentfulHappyHour.edges.map(item => item.node)
        setHappyHours(HHdata);
        console.log(HHdata);
    }, [data]);


    // Creating an object of all the neighborhoods
    let neighborhoods = [{ key: "All", value: "All", text: "All" }];
    const [neighborhood, setNeighborhood] = React.useState("All")

    happyHours.forEach(item => {
        let neighborhood = { key: item.neighborhood.substring(0, 4), value: item.neighborhood, text: item.neighborhood };
        neighborhoods.push(neighborhood);
    });

    const changeHood = (e, { value }) => {
        setNeighborhood(value)
    }


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
                    <Grid.Column tablet={10} computer={8} largeScreen={8} style={{ background: "eff0f1" }}>
                        <Sticky>
                            <Link to="/"><h1 style={{ padding: "0px 0px 10px 10px", marginBottom: "0px", color: "#1c70b5" }}>Georgia on my Dime</h1></Link>
                            <div style={{ height: "4px", background: "#1c70b5", margin: "0px -14px 10px -14px" }}></div>
                            <div style={{ display: "inline-block", marginRight: "5px" }}>
                                Choose Day: <Dropdown style={{ minWidth: "125px" }} selection value={day} options={days} onChange={changeDay} />
                            </div>
                            <div style={{ display: "inline-block" }}>
                                Neighborhood: <Dropdown style={{ minWidth: "125px" }} selection value={neighborhood} options={neighborhoods} onChange={changeHood} />
                            </div>
                        </Sticky>
                        <HHFinderCardGroup happyHours={happyHours} day={day} hood={neighborhood} rows={2} />
                    </Grid.Column>
                    <Grid.Column tablet={6} computer={8} largeScreen={8} style={{ padding: "0px" }}>
                        <Sticky>
                            <GoogleMap></GoogleMap>
                        </Sticky>
                    </Grid.Column>

                </Grid>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <MobileHappyHourFinder happyhours={happyHours} hood={neighborhood} day={day} />
            </Responsive>
        </>
    )
}

// Gets my sweet HH data from the gatsby data layer.
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