/* eslint-disable indent */
import React, { useEffect } from 'react'
import { Button, Input, Popup, List, Label, Icon } from 'semantic-ui-react'

import * as JsSearch from 'js-search'
import { Link, navigate } from 'gatsby'
import { useAllSearchData } from '../hooks/searchData'

const SearchBar = ({ padding }) => {
  const data = useAllSearchData()
  const [state, setState] = React.useState({
    happyHours: [],
    search: [],
    searchResults: [],
    nameResults: [],
    isLoading: true,
    isError: false
  })

  useEffect(() => {})

  useEffect(() => {
    const rebuildIndex = () => {
      const dataToSearch = new JsSearch.Search('id')
      dataToSearch.addIndex('slug')
      dataToSearch.addIndex('name')
      dataToSearch.addIndex('description')
      dataToSearch.addIndex(['description', 'description'])
      dataToSearch.addIndex(['product', 'name'])
      dataToSearch.addIndex(['product', 'description'])
      dataToSearch.addDocuments(data)
      setState({ search: dataToSearch, isLoading: false })
    }

    rebuildIndex()
  }, [])

  const searchData = e => {
    const { search } = state
    if (e.target.value !== '') {
      const queryResult = search.search(e.target.value)
      const names = queryResult.map(item => item.name)
      setState({ ...state, searchResults: queryResult, nameResults: names })
    } else {
      setState({ ...state, searchResults: [], nameResults: [] })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (state.searchResults.length > 1) {
      navigate('/happy-hour-finder', {
        state: { searchResults: state.searchResults }
      })
    } else if (state.searchResults.length === 1) {
      navigate(`atlanta-happy-hour/${state.searchResults[0].slug}`)
    }
  }

  return (
    <Popup
      wide
      position='bottom left'
      style={{ marginTop: 'auto', width: '100%' }}
      open={!(state.nameResults === undefined || state.nameResults.length === 0)}
      trigger={
        <form style={{ width: '100%', marginBottom: '0px' }}>
          <Input style={{ width: '100%' }} type='text' placeholder='Search restaurants, happy hours, etc...' action>
            <input onChange={searchData} style={{ padding }} />
            <Button onClick={handleSubmit} primary type='submit'>
              {' '}
              <Icon name='search' style={{ marginLeft: '5px' }} />
            </Button>
          </Input>
        </form>
      }
    >
      <Popup.Header>
        <List divided>
          {state.searchResults
            ? state.searchResults.slice(0, 5).map(item => (
                <List.Item key={item.id}>
                  {item.name ? (
                    <Link to={`/atlanta-happy-hour/${item.slug}`}>
                      <List.Content>
                        <List.Header>{item.name}</List.Header>
                      </List.Content>
                    </Link>
                  ) : (
                    <Link to={`/exclusive-dining/${item.product.metadata.slug}`}>
                      <List.Content>
                        <List.Header>
                          <Label color='blue'>Package</Label> {item.product.name}
                        </List.Header>
                      </List.Content>
                    </Link>
                  )}
                </List.Item>
              ))
            : null}
        </List>
      </Popup.Header>
    </Popup>
  )
}

export default SearchBar
