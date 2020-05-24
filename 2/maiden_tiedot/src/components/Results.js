import React from 'react'
import { createPortal } from 'react-dom'

const Results = (props) => {
    if(props.countries.length === 1){
        const country = props.countries[0]
        console.log(country)
        return(
            <div>
                <h1>{country.name} / {country.nativeName}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map((language, i) =>
                    <p key={i}>{language.name}</p>)}
                </ul>
                <img src={country.flag} width="128" height="128"/>
            </div>
        )
    }
    if(props.countries.length > 10){
        return(
            <p>Too many matches, specify another filter</p>
        )
    }
    else{
        return(
            <ul>
                {props.countries.map((country, i) =>
                <p key={i}>{country.name}</p>)}
            </ul>
        )
    }
}

export default Results