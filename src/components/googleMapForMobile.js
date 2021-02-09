import React, { useEffect } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps'
import mapIcon from '../images/mapIcon2.svg'
import focusIcon from '../images/mapIcon3.svg'

const mapStyles = [
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.government',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
]

const defaultMapOptions = {
  disableDefaultUI: true,
  styles: mapStyles
}

const HappyHourMap = ({ happyHours, focused }) => {
  const center = { lat: 33.819, lng: -84.388 }
  const zoom = 11
  const [markers, setMarkers] = React.useState([])

  const onClickHandler = id => {
    const element = document.getElementById(id)
    element.scrollIntoView({ inline: 'center' })
  }

  useEffect(() => {
    if (happyHours.length > 0) {
      const points = happyHours.map(m => (
        <Marker
          key={m.id}
          position={{ lat: m.location.lat, lng: m.location.lon }}
          icon={focused === m.id ? focusIcon : mapIcon}
          labelVisible={false}
          onClick={() => onClickHandler(m.id)}
          zIndex={focused === m.id ? 10000 : 100}
        />
      ))
      setMarkers(points)
    } else {
      setMarkers([])
    }
  }, [happyHours, focused])

  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={center} options={defaultMapOptions}>
      {markers}
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(HappyHourMap))
