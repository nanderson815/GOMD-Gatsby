import React, { useState } from 'react'
import { filter, reduce, startCase } from 'lodash'
import { Search, Label, Grid, Header, Segment } from 'semantic-ui-react'
import { Link, navigate } from 'gatsby'
import { useAllSearchData } from '../hooks/searchData'

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

  const resultRenderer = ({ name, product }) => <Label content={name || product.name} />
  const categoryRenderer = ({ name }) => <Label as='span' content={startCase(name)} />

  const handleResultSelect = (e, { result }) => {
    console.log(result)
  }

  const handleSearchChange = (e, { value }) => {
    setValue(value)
    const searchTerm = clean(value)

    if (searchTerm) {
      setLoading(true)
      const re = new RegExp(clean(value), 'i')
      console.log(re)

      const filteredResults = reduce(
        data,
        (memo, data, name) => {
          const results = filter(data.results, result => re.test(clean(result.name) || clean(result.product.name)))
          if (results.length) memo[name] = { name, results }

          return memo
        },
        {}
      )
      console.log(filteredResults)
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
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={results}
      value={value}
    />
  )
}
