import React, { useEffect, useState } from "react"
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Grid, Sticky, Responsive, Dropdown, Button, Icon } from "semantic-ui-react"
import GoogleMap from '../components/googleMap'
import HHFinderCardGroup from '../components/hhFinderCardGroup'
import logo from '../images/logoInlineText.svg'
import 'semantic-ui-less/semantic.less'
import MobileHappyHourMap from '../components/mobileHappyHourMap'
import { getFirebase } from '../firebase/firebase'
import LoginModal from '../components/loginModal'


const HappyHourFinder = (props) => {

    // Gets user if signed in.
    const [user, setUser] = useState()
    useEffect(() => {
        let firebase = getFirebase()
        const unlisten = firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user)
            }
        });
        return () => unlisten()
    })

    let data = props.data;
    let searchResults = props.location.state && 'searchResults' in props.location.state ? props.location.state.searchResults : undefined
    let filterTag = props.location.state && "tag" in props.location.state ? props.location.state.tag : undefined
    // Helper to handle day filtering
    let days = [
        { key: "All", value: "All", text: "All Days" },
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
        { key: "All", value: "All", text: "All Locations" },
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

    useEffect(() => {
        let displayMap = sessionStorage.getItem('displayMap') === "true"
        setDisplayMap(displayMap)
    })

    const [displayMap, setDisplayMap] = React.useState(true)
    const handleDisplayChange = () => {
        sessionStorage.setItem('displayMap', !displayMap)
        setDisplayMap(!displayMap)
    }

    // The use effect below ensures we only run map once. (could get expensive with lots of data)
    const [happyHours, setHappyHours] = React.useState([])
    const [filteredHH, setFilteredHH] = React.useState([])
    const [showClear, setShowClear] = React.useState(false)

    useEffect(() => {
        let HHdata = data.allContentfulHappyHour.edges.map(item => item.node);

        getStarredHH().then(res => {
            if (res) {
                res.forEach(item => {
                    let index = HHdata.findIndex(x => x.id === item.id)
                    HHdata[index].starred = true
                })
            }
            if (searchResults !== undefined) {
                let resultName = searchResults.map(id => id.name);
                let filteredHHData = HHdata.filter((item) => {
                    return resultName.indexOf(item.name) !== -1
                })
                setShowClear(true)
                setHappyHours(filteredHHData);
            } else if (filterTag !== undefined) {
                let filteredHHData = HHdata.filter((item) => {
                    return item.tags.indexOf(filterTag) !== -1
                })
                setShowClear(true)
                setHappyHours(filteredHHData)
            } else {
                setHappyHours(HHdata);
            }
        })
    }, [data, user]);

    const clearSearch = () => {
        let HHdata = data.allContentfulHappyHour.edges.map(item => item.node);
        setHappyHours(HHdata);
        setShowClear(false);
    }

    // Sets the inital filter to today
    useEffect(() => {
        if (filterTag || searchResults) {
            let days = "All"
            setDay(days);
            filterHappyHours();
        } else {
            let currentDay = days[new Date().getDay() + 1].value;
            setDay(currentDay);
            filterHappyHours();
        }

    }, [happyHours]);

    // Login modal logic
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    // Code for starred happy hours
    const handleStarClick = (e, index, uid) => {
        e.stopPropagation()
        if (uid) {
            let hh = [...filteredHH]
            hh[index].starred ? hh[index].starred = false : hh[index].starred = true
            if (hh[index].starred === true) {
                let happyHour = hh[index]
                let firebase = getFirebase()
                let db = firebase.firestore()
                db.collection('users').doc(uid).collection('savedHappyHours').doc(happyHour.id).set(happyHour)
                    .then(() => console.log("success"))
                    .catch(() => console.log("err"))
            } else if (hh[index].starred === false) {
                let happyHour = hh[index]
                let firebase = getFirebase()
                let db = firebase.firestore()
                db.collection('users').doc(uid).collection('savedHappyHours').doc(happyHour.id).delete()
                    .then(() => console.log("deleted"))
                    .catch(() => console.log("err"))
            }
            setFilteredHH(hh)
        } else {
            handleOpen()
        }
    }

    // code to automatically grab stars at load.
    const getStarredHH = async () => {
        let uid = user ? user.uid : null
        let firebase = getFirebase()
        let db = firebase.firestore()
        console.log(uid)
        if (uid) {
            let savedHH = []
            let hhData = await db.collection('users').doc(uid).collection('savedHappyHours').get().then(snap => {
                snap.forEach(doc => savedHH.push(doc.data()))
                return savedHH
            })
                .catch(err => err)
            return hhData
        }
    }

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
            <LoginModal open={open} handleClose={handleClose} />
            <Responsive minWidth={768}>
                <Grid style={{ margin: "0px" }}>
                    <Grid.Column tablet={10} computer={8} largeScreen={8} style={{ background: "eff0f1" }}>
                        <Sticky style={{ margin: "-14px" }}>
                            <div style={{ background: "white" }}>
                                <div style={{ background: "#1c70b5" }}>
                                    <Link to="/"><img alt="Georiga on my Dime Logo" style={{ margin: "10px 0px 0px 10px" }} src={logo} /></Link>
                                </div>
                                <div style={{ height: "4px", background: "#5d5e5e", margin: "0px 0px 10px" }}></div>
                                <div style={{ display: "inline-block", margin: "0px 5px 10px 24px" }}>
                                    Day: <Dropdown style={{ minWidth: "125px" }} selection value={day} options={days} onChange={changeDay} />
                                </div>
                                <div style={{ display: "inline-block" }}>
                                    Neighborhood: <Dropdown style={{ minWidth: "125px" }} selection value={neighborhood} options={neighborhoods} onChange={changeHood} />
                                </div>
                                {showClear ? <Button primary onClick={clearSearch} style={{ margin: "0px 5px 10px 24px" }}>Clear Search</Button> : null}
                                <div style={{ height: "1px", background: "#e3e3e3", margin: "0px 0px 10px 0px" }}></div>
                            </div>
                        </Sticky>
                        <HHFinderCardGroup happyHours={filteredHH} day={day} rows={2} handleStarClick={handleStarClick} user={user ? user.uid : null} />
                    </Grid.Column>
                    <Grid.Column tablet={6} computer={8} largeScreen={8} style={{ padding: "0px" }}>
                        <div style={{ position: 'fixed', top: "0", width: "50%", height: "100%" }}>
                            <GoogleMap
                                happyHours={filteredHH}
                                hovered={hovered}
                                isMarkerShown
                                loadingElement={<div style={{ height: `100vh`, width: "100%" }} />}
                                containerElement={<div style={{ height: `100vh` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}>

                            </GoogleMap>
                        </div>
                    </Grid.Column>

                </Grid>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <Sticky style={{ margin: "-14px" }}>
                    <div style={{ background: "white" }}>
                        <div style={{ background: "#1c70b5" }}>
                            <Link to="/"><img alt="Georgia on my Dime Logo" style={{ margin: "10px 0px 0px 20px" }} src={logo} /></Link>
                        </div>
                        <div style={{ height: "4px", background: "#5d5e5e" }}></div>
                        <h3 style={{ margin: "10px 0px 0px 20px", display: "inline-block" }}>{day} Happy Hours</h3>
                        <Icon link onClick={handleDisplayChange} style={{ display: "inline-block", float: 'right', marginRight: '20px' }} circular size='large' color='blue' name={`${displayMap ? "list" : "map"}`} />
                        <div style={{ width: "100%", margin: "0px 0px 0px 10px", display: 'inline-block' }}>
                            <div style={{ width: "45%", padding: "5px 0px 5px 10px", display: 'inline-block' }}>
                                <Dropdown style={{ minWidth: "95%" }} selection value={day} options={days} onChange={changeDay} />
                            </div>
                            <div style={{ width: "55%", padding: "5px 20px 5px 0px", display: 'inline-block' }}>
                                <Dropdown style={{ minWidth: "95%" }} selection value={neighborhood} options={neighborhoods} onChange={changeHood} />
                            </div>
                            {showClear ? <Button primary onClick={clearSearch} style={{ margin: "0px 0px 5px 10px" }}>Clear Search</Button> : null}
                        </div>
                    </div>
                </Sticky>
                {displayMap ? <MobileHappyHourMap
                    filteredHH={filteredHH}
                    hovered={hovered}
                    day={day.toLowerCase()}
                    handleStarClick={handleStarClick}
                    user={user ? user.uid : null}>
                </MobileHappyHourMap> :
                    <HHFinderCardGroup happyHours={filteredHH} hood={neighborhood} day={day} rows={1} handleStarClick={handleStarClick} user={user ? user.uid : null} setHoverHandler={setHoverHandler} clearHoveredHandler={clearHoveredHandler}></HHFinderCardGroup>}
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
                ...allHappyHourFields
            }
          }
        }
      }
      `


export default HappyHourFinder;