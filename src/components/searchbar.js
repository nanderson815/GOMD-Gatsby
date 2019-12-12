import React from 'react'
import { Button, Select, Input } from 'semantic-ui-react'
import { useHappyHourData } from '../hooks/happyHourData'

const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'articles', text: 'Articles', value: 'articles' },
    { key: 'happyHours', text: 'Happy Hours', value: 'happyHours' },
]

const SearchBar = () => {

    const data = useHappyHourData()
    console.log(data);

    return (
        <Input type='text' placeholder='Search...' action>
            <input />
            <Select compact options={options} defaultValue='happyHours' />
            <Button primary type='submit'>Search</Button>
        </Input>
    )
}

export default SearchBar