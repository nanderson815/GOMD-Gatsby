import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { useHappyHourData } from '../hooks/happyHourData'
import { Icon } from 'semantic-ui-react'

const SearchBar = () => {

    const data = useHappyHourData()
    console.log(data);

    return (
        <Input type='text' placeholder='Search restaurants, happy hours, etc...' action>
            <input />
            <Button primary type='submit'> <Icon name='search' style={{ marginLeft: "5px" }} /></Button>
        </Input>
    )
}

export default SearchBar