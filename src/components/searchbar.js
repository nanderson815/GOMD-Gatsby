import React, { useState } from 'react'
import { filter, reduce, startCase } from 'lodash'
import { Search, Label } from 'semantic-ui-react'
import { navigate } from 'gatsby'
import { useAllSearchData } from '../hooks/searchData'
import { formatCurrency } from '../Util/Util'

import './layout.css'

const clean = str => {
  if (str) {
    return str.replace(/\W/g, '')
  }
  return null
}

export default function searchBar() {
  const data = useAllSearchData()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState()

  const resultRenderer = ({ name, product, price, neighborhood }) => (
    <div>
      <h4 style={{ margin: 0 }}>{name || product.name}</h4>
      <div style={{ fontSize: '.9rem', color: 'grey' }}>{neighborhood || price}</div>
    </div>
  )

  const categoryRenderer = ({ name }) => <Label as='span' content={startCase(name)} />

  const handleResultSelect = (e, { result }) => {
    if (result.slug) {
      navigate(`../../atlanta-happy-hour/${result.slug}`, { replace: true })
    } else if (result.product.metadata.slug) {
      navigate(`../../exclusive-dining/${result.product.metadata.slug}`, { replace: true })
    }
  }

  const handleSearchChange = (e, { value }) => {
    setValue(value)
    const searchTerm = clean(value)

    if (searchTerm) {
      setLoading(true)
      const re = new RegExp(clean(value), 'i')

      const filteredResults = reduce(
        data,
        (memo, data, name) => {
          const results = filter(data.results, result => re.test(clean(result.name) || clean(result.product.name)))
          if (results.length) {
            const cleaned = results.map((result, i) => ({
              ...result,
              key: i,
              title: result.name || result.product.name,
              price: result.price && formatCurrency(result.price)
            }))
            memo[name] = { name, results: cleaned.splice(0, 5) }
          }

          return memo
        },
        {}
      )
      setResults(filteredResults)
      setLoading(false)
    } else {
      setResults([])
    }
  }

  if (!data) return null
  return (
    <Search
      style={{ width: '100%' }}
      input={{ fluid: true }}
      categoryRenderer={categoryRenderer}
      category
      loading={loading}
      minCharacters={2}
      selectFirstResult
      size='large'
      fluid
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      placeholder='Search for a restaurant...'
      results={results}
      value={value}
    />
  )
}
