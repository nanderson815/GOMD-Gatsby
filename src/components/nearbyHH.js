import React from 'react'
import { Grid, Image, Label, Button } from 'semantic-ui-react'
import { navigate, Link } from 'gatsby'
import './layout.css'

const handleClick = e => {
  const tag = e.target.value
  navigate('/happy-hour-finder', {
    state: { tag }
  })
}

const shuffle = array => {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

const NearbyHH = ({ happyHours }) => (
  <Grid divided='vertically'>
    {shuffle(happyHours)
      .slice(0, 5)
      .map(item => (
        <Grid.Row key={item.id} style={{ padding: '0px' }}>
          <Grid.Column verticalAlign='middle'>
            <Link to={`/atlanta-happy-hour/${item.slug}`} style={{ color: 'black' }}>
              <Image
                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                size='small'
                rounded
                alt={`${item.name} Happy Hour Atlanta`}
                floated='left'
                src={item.mainImg.fluid.src}
              />
              <h5 style={{ margin: '0px' }}>{item.name}</h5>
              <p style={{ fontSize: '12px' }}>{item.neighborhood}</p>
            </Link>
            <div className='scrolling-wrapper'>
              {item.tags.map((tag, index) => (
                <Label
                  key={tag + index}
                  as={Button}
                  color='blue'
                  style={{ marginTop: '10px' }}
                  value={tag}
                  onClick={handleClick}
                >
                  {tag}
                </Label>
              ))}
            </div>
          </Grid.Column>
        </Grid.Row>
      ))}
  </Grid>
)

export default NearbyHH
