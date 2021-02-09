/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps'
import { Segment } from 'semantic-ui-react'
import { navigate } from 'gatsby'
import mapIcon from '../images/mapIcon2.svg'

const { MarkerWithLabel } = require('react-google-maps/lib/components/addons/MarkerWithLabel')

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

const HappyHourMap = ({ happyHours, center }) => {
  const zoom = 15
  const [markers, setMarkers] = React.useState([])
  const [mapCenter, setMapCenter] = React.useState({ lat: 33.819, lng: -85.388 })
  const [visible, setVisible] = React.useState('')

  const onMarkerHover = id => {
    setVisible(id)
  }
  const clearVisible = () => {
    setVisible('')
  }

  const onClickHandler = slug => {
    navigate(`/atlanta-happy-hour/${slug}`)
  }

  useEffect(() => {
    if (center) {
      setMapCenter({
        lat: parseFloat(center.lat),
        lng: parseFloat(center.lng)
      })
    }
  }, [center])

  useEffect(() => {
    if (happyHours.length > 0) {
      const points = happyHours.map(m => (
        <MarkerWithLabel
          key={m.id}
          position={{ lat: m.location.lat, lng: m.location.lon }}
          icon={mapIcon}
          lable={m.location.name}
          labelVisible={visible === m.id}
          labelAnchor={{ x: 200 / 2, y: 75 }}
          labelStyle={{ fontSize: '12px', padding: '5px' }}
          onMouseOver={onMarkerHover.bind(this, m.id)}
          onMouseOut={clearVisible}
          onClick={onClickHandler.bind(this, m.slug)}
        >
          <Segment style={{ width: '200px', minHeight: '45px', padding: '3px' }}>
            <h4 style={{ marginBottom: '0px' }}>{m.name}</h4>
            <p style={{ fontSize: '10px' }}>{m.address.substring(0, m.address.indexOf(','))}</p>
          </Segment>
        </MarkerWithLabel>
      ))
      setMarkers(points)
    } else {
      setMarkers([])
    }
  }, [happyHours, visible])

  return (
    <GoogleMap defaultZoom={zoom} center={mapCenter} options={defaultMapOptions}>
      {markers}
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(HappyHourMap))
