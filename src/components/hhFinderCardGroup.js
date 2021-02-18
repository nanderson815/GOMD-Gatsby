import React, { useEffect, useState } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Img from 'gatsby-image'
import { navigate } from 'gatsby'
import AdSense from 'react-adsense'
import { setHHTime } from '../Util/Util'

const navfunc = slug => {
  navigate(`/atlanta-happy-hour/${slug}`)
}

const HHFinderCardGroup = ({ happyHours, day, rows, handleStarClick, user, offset }) => {
  const [cards, setCards] = useState('')
  useEffect(() => {
    const cards = happyHours.map((deal, index) => {
      const timeField = day.toLowerCase()
      const descField = `${day.toLowerCase()}Desc`
      let descriptionString
      descriptionString = day === 'All' ? (descriptionString = '') : (descriptionString = deal[descField][descField])
      const trimmedString =
        descriptionString.length > 200 ? `${descriptionString.substring(0, 200 - 3)}...` : descriptionString

      return (
        <Card
          // onMouseEnter={setHoverHandler.bind(this, deal.id)}
          // onMouseLeave={clearHoveredHandler}
          link
          onClick={() => navfunc(deal.slug)}
          key={deal.id}
          id={deal.id}
          slug={deal.slug}
        >
          <Img style={{ height: '150px' }} alt={`${deal.name} Happy Hour atlanta`} fluid={deal.mainImg.fluid} />
          <Card.Content>
            <Card.Header style={{ marginBottom: '5px' }}>{deal.name}</Card.Header>
            {day === 'All' ? null : (
              <Card.Description>
                {setHHTime(deal, timeField)} {trimmedString}
              </Card.Description>
            )}
          </Card.Content>
          <Card.Content extra value={deal.neighborhood}>
            <Icon name='marker' />
            {deal.neighborhood}
            <Icon
              onClick={e => handleStarClick(e, index, user)}
              style={{ float: 'right' }}
              size='large'
              name={deal.starred ? 'star' : 'star outline'}
              color='yellow'
            />
          </Card.Content>
        </Card>
      )
    })

    const adsense = key => (
      <Card key={key}>
        <AdSense.Google
          client='ca-pub-4839737207231731'
          slot='1919503363'
          format='fluid'
          layoutKey='-6t+ed+2i-1n-4w'
          style={{ display: 'block', width: '100% !important', minWidth: '250px' }}
        />
      </Card>
    )

    for (let i = 0; i < cards.length; i++) {
      if (i % 10 === 0 && i !== 0) {
        cards.splice(i, 0, adsense(Math.floor(Math.random() * 1000000)))
      }
    }

    setCards(cards)
  }, [happyHours, user])

  return (
    <Card.Group itemsPerRow={rows} style={{ marginTop: offset || '20px', paddingBottom: '55px' }}>
      {cards}
    </Card.Group>
  )
}

export default HHFinderCardGroup
