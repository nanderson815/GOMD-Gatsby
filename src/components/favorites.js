import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { Button, Card, Icon } from 'semantic-ui-react'
import Img from 'gatsby-image'

const navfunc = slug => {
  navigate(`/atlanta-happy-hour/${slug}`)
}

const Favorites = ({ favorites, rows }) => {
  const [favoritesData, setFavoritesData] = useState([])
  const data = useStaticQuery(graphql`
    query favoritesData {
      allContentfulHappyHour {
        edges {
          node {
            ...allHappyHourFields
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (data) {
      const HHdata = data.allContentfulHappyHour.edges.map(item => item.node)
      const favoriteArray = []
      favorites.forEach(item => {
        const index = HHdata.findIndex(x => x.id === item.id)
        if (HHdata[index]) favoriteArray.push(HHdata[index])
      })
      setFavoritesData(favoriteArray)
    }
  }, [data])

  return (
    <div>
      {favoritesData === undefined || favoritesData.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <h3>Looks like you don't have any favorites yet.</h3>
          <Link to='/happy-hour-finder'>
            <Button style={{ marginBottom: '20px' }} primary>
              Explore Happy Hours
            </Button>
          </Link>
        </div>
      ) : null}
      <Card.Group itemsPerRow={rows}>
        {favoritesData.map(favorite => (
          <Card link key={favorite.id} id={favorite.id} slug={favorite.slug} onClick={() => navfunc(favorite.slug)}>
            <Img
              style={{ height: '150px' }}
              alt={`${favorite.name} Happy Hour atlanta`}
              fluid={favorite.mainImg.fluid}
            />
            <Card.Content style={{ color: 'grey' }}>
              <Card.Header style={{ marginBottom: '5px' }}>{favorite.name}</Card.Header>
              {favorite.seoDescription}
            </Card.Content>
            <Card.Content extra value={favorite.neighborhood}>
              <Icon name='marker' />
              {favorite.neighborhood}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  )
}

export default Favorites
