import React from 'react'

const Filter = (props) => {
    return(
    <form>
        <div>filter shown with <input value={props.string}
        onChange={props.handleChange}/></div>
    </form>
    )}

export default Filter