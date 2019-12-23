import React, { useEffect } from 'react'
import { Button, Input, Popup, List, Label } from 'semantic-ui-react'
import { useHappyHourData } from '../hooks/happyHourData'
import { Icon } from 'semantic-ui-react'
import * as JsSearch from 'js-search'
import { Link, navigate } from "gatsby"


const SearchBar = (props) => {
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
    }, [])

    const searchData = e => {
        const { search } = state
        if (e.target.value !== "") {
            const queryResult = search.search(e.target.value)
            const names = queryResult.map(item => item.name)
            setState({ ...state, searchResults: queryResult, nameResults: names })
        } else {
            setState({ ...state, searchResults: [], nameResults: [] })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (state.searchResults === undefined) {
            return
        } else if (state.searchResults.length > 1) {
            navigate("/happy-hour-finder", {
                state: { searchResults: state.searchResults },
            })
        } else if (state.searchResults.length === 1) {
            navigate(`atlanta-happy-hour/${state.searchResults[0].slug}`)
        }
    }

    return (
        <Popup
            wide
            position='bottom left'
            style={{ marginTop: "auto", width: "100%" }}
            open={!(state.nameResults === undefined || state.nameResults.length === 0)}
            trigger={
                <form style={{ width: "100%", marginBottom: "0px" }} >
                    <Input style={{ width: "100%" }} type='text' placeholder='Search restaurants, happy hours, etc...' action>
                        <input
                            onChange={searchData}
                            style={{ padding: props.padding }}
                        />
                        <Button onClick={handleSubmit} primary type='submit'> <Icon name='search' style={{ marginLeft: "5px" }} /></Button>
                    </Input>
                </form>}>
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