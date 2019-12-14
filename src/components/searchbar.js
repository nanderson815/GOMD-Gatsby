import React, { useEffect } from 'react'
import { Button, Input, Popup, List, Label } from 'semantic-ui-react'
import { useHappyHourData } from '../hooks/happyHourData'
import { Icon } from 'semantic-ui-react'
import * as JsSearch from 'js-search'
import { Link } from "gatsby"


const SearchBar = () => {
    const happyHours = useHappyHourData();
    const [state, setState] = React.useState({
        happyHours: [],
        search: [],
        searchResults: [],
        nameResults: [],
        isLoading: true,
        isError: false,
    })



    useEffect(() => {
        const rebuildIndex = () => {
            var dataToSearch = new JsSearch.Search('slug');
            dataToSearch.addIndex('name');
            dataToSearch.addIndex('tags');
            dataToSearch.addIndex('days');
            dataToSearch.addIndex(['description', 'description']);
            dataToSearch.addDocuments(happyHours);
            setState({ search: dataToSearch, isLoading: false });
        }

        rebuildIndex();
        console.log("I ran")
    }, [])

    const searchData = e => {
        const { search } = state
        if (e.target.value !== "") {
            const queryResult = search.search(e.target.value)
            const names = queryResult.map(item => item.name)
            setState({ ...state, searchResults: queryResult, nameResults: names })
            console.log(state.searchResults);
        } else {
            setState({ ...state, searchResults: [], nameResults: [] })
        }

    }

    return (
        <Popup
            wide
            position='bottom left'
            style={{ marginTop: "auto" }}
            open={!(state.nameResults === undefined || state.nameResults.length === 0)}
            trigger={
                <Input type='text' placeholder='Search restaurants, happy hours, etc...' action>
                    <input
                        onChange={searchData}
                    />
                    <Button primary type='submit'> <Icon name='search' style={{ marginLeft: "5px" }} /></Button>
                </Input>}>
            <Popup.Header>
                <List divided>
                    {state.searchResults ? state.searchResults.slice(0, 5).map((item) => {
                        return (
                            <List.Item key={item.id}>
                                <Link to={`/atlanta-happy-hour/${item.slug}`}>
                                    <List.Content>
                                        <List.Header>{item.name}</List.Header>
                                        {/* <List.Description style={{ fontSize: "12px" }}>{item.tags.toString()}</List.Description> */}
                                        {item.tags.map((tag, index) => <Label key={index}>{tag}</Label>)}
                                    </List.Content>
                                </Link>
                            </List.Item>

                        )
                    }) : null}
                </List>
            </Popup.Header>
        </Popup >
    )
}

export default SearchBar