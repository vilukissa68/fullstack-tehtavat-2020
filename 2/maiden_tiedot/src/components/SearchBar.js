import React from 'react'

const SearchBar = (props) => {
    return(
        <form>
            <div>Find countries <input value={props.string}
            onChange={props.handleChange}/></div>
        </form>
    )
}

export default SearchBar