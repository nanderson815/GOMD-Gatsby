import React, { useEffect } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { useHappyHourData } from '../hooks/happyHourData'
import { Icon } from 'semantic-ui-react'
import * as JsSearch from 'js-search'

const SearchBar = () => {
    const happyHours = useHappyHourData();
    const [state, setState] = React.useState({
        happyHours: [],
        search: [],
        searchResults: [],
        isLoading: true,
        isError: false,
    })

    useEffect(() => {
        rebuildIndex();
    }, [])

    const rebuildIndex = () => {
        var dataToSearch = new JsSearch.Search('name');
        dataToSearch.addIndex('tags');
        dataToSearch.addIndex('days');
        dataToSearch.addIndex(['description', 'description']);
        dataToSearch.addDocuments(happyHours);
        setState({ search: dataToSearch, isLoading: false });
    }

    const searchData = e => {
        const { search } = state
        if (e.target.value !== "") {
            const queryResult = search.search(e.target.value)
            setState({ ...state, searchResults: queryResult })
            console.log(state.searchResults);
        }

    }

    return (
        <Input type='text' placeholder='Search restaurants, happy hours, etc...' action>
            <input
                onChange={searchData} />
            <Button primary type='submit'> <Icon name='search' style={{ marginLeft: "5px" }} /></Button>
        </Input>
    )
}

export default SearchBar