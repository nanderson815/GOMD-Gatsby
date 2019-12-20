import React, { useEffect } from "react"
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Grid, Sticky, Responsive, Dropdown } from "semantic-ui-react"
import GoogleMap from '../components/googleMap'
import MobileHappyHourFinder from '../components/mobileHappyHourFinder'
import HHFinderCardGroup from '../components/hhFinderCardGroup'
import logo from '../images/logoInlineText.svg'


const HappyHourFinder = ({ data }) => {

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
    // Creating an object of all the neighborhoods
    let neighborhoods = [
        { key: "All", value: "All", text: "All" },
        { key: "Mid", value: "Midtown", text: "Midtown" },
        { key: "Buc", value: "Buckhead", text: "Buckhead" },
        { key: "Wes", value: "West Midtown", text: "West Midtown" },
        { key: "Dow", value: "Downtown", text: "Downtown" },
        { key: "Old", value: "Old Fourth Ward", text: "Old Fourth Ward" },
        { key: "Bro", value: "Brookhaven", text: "Brookhaven" },
        { key: "Vir", value: "Virginia Highlands", text: "Virginia Highlands" },
        { key: "San", value: "Sandy Springs", text: "Sandy Springs" },
        { key: "Inm", value: "Inman Park", text: "Inman Park" },
        { key: "Dec", value: "Decatur", text: "Decatur" },
        { key: "Smy", value: "Smyrna", text: "Smyrna" },

    ];
    const [neighborhood, setNeighborhood] = React.useState("All")
    const [day, setDay] = React.useState('All')


    const changeDay = (e, { value }) => {
        setDay(value)
        filterHappyHours()
    }

    const changeHood = (e, { value }) => {
        setNeighborhood(value)
        filterHappyHours();
    }

    // Filter HH data here, not in children
    const filterHappyHours = () => {
        let filteredDayArray;
        let filteredArray;
        if (day === "All") {
            filteredDayArray = happyHours;
        } else {
            filteredDayArray = happyHours.filter(item => {
                return item.days.includes(day);
            });
        }

        if (neighborhood === "All") {
            filteredArray = filteredDayArray;
        } else {
            filteredArray = filteredDayArray.filter(item => {
                return item.neighborhood === neighborhood
            });
        }
        setFilteredHH(filteredArray);
    }

    useEffect(() => {
        filterHappyHours()
    }, [day, neighborhood])



    // The use effect below ensures we only run map once. (could get expensive with lots of data)
    const [happyHours, setHappyHours] = React.useState([])
    const [filteredHH, setFilteredHH] = React.useState([])

    useEffect(() => {
        let HHdata = data.allContentfulHappyHour.edges.map(item => item.node)
        setHappyHours(HHdata);
    }, [data]);

    // Sets the inital filter to today
    useEffect(() => {
        let currentDay = days[new Date().getDay() + 1].value;
        setDay(currentDay);
        filterHappyHours();
    }, [happyHours]);


    // Code for hovering and having it reflect on map
    const [hovered, setHovered] = React.useState("");
    const setHoverHandler = (id) => {
        setHovered(id)
    }
    const clearHoveredHandler = () => {
        setHovered('')
    }


    return (
        <>
            <SEO title="Atlanta Happy Hour Finder" />
            <Responsive minWidth={768}>
                <Grid style={{ margin: "0px" }}>
                    <Grid.Column tablet={10} computer={8} largeScreen={8} style={{ background: "eff0f1" }}>
                        <Sticky style={{ margin: "-14px" }}>
                            <div style={{ background: "white" }}>
                                <div style={{ background: "#1c70b5" }}>
                                    <Link to="/"><img style={{ margin: "10px 0px 0px 10px" }} src={logo} /></Link>
                                </div>
                                <div style={{ height: "4px", background: "#5d5e5e", margin: "0px 0px 10px" }}></div>
                                <div style={{ display: "inline-block", margin: "0px 5px 10px 24px" }}>
                                    Choose Day: <Dropdown style={{ minWidth: "125px" }} selection value={day} options={days} onChange={changeDay} />
                                </div>
                                <div style={{ display: "inline-block" }}>
                                    Neighborhood: <Dropdown style={{ minWidth: "125px" }} selection value={neighborhood} options={neighborhoods} onChange={changeHood} />
                                </div>
                                <div style={{ height: "1px", background: "#e3e3e3", margin: "0px 0px 10px 0px" }}></div>
                            </div>
                        </Sticky>
                        <HHFinderCardGroup happyHours={filteredHH} day={day} hood={neighborhood} rows={2} setHoverHandler={setHoverHandler} clearHoveredHandler={clearHoveredHandler} />
                    </Grid.Column>
                    <Grid.Column tablet={6} computer={8} largeScreen={8} style={{ padding: "0px" }}>
                        <div style={{ position: 'fixed', top: "0", width: "55%", height: "100%" }}>
                            <GoogleMap
                                happyHours={filteredHH}
                                hovered={hovered}
                                isMarkerShown
                                loadingElement={<div style={{ height: `100vh`, width: "100%" }} />}
                                containerElement={<div style={{ height: `100vh` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>

                            </GoogleMap>
                        </div>
                    </Grid.Column>

                </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
            <MobileHappyHourFinder happyhours={filteredHH} hood={neighborhood} day={day} />
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
            end2
            start2
          }
          monday {
                end
            start
            end2
            start2
          }
          thursday {
                start
            end
            end2
            start2
          }
          tuesday {
                end
            start
            end2
            start2
          }
          wednesday {
                end
            start
            end2
            start2
          }
          saturday {
                end
            start
            end2
            start2
          }
          sunday {
                end
            start
            end2
            start2
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