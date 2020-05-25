import React, { useEffect } from 'react'
import axios from 'axios'

// API key for openweathermap.org
const api_key = process.env.REACT_APP_API_KEY


const WeatherInfo = (props) => {
    const country = props.country
    const weatherQueryString = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`

    const hook = () => {
        console.log("query:", weatherQueryString)
        axios
            .get(weatherQueryString)
            .then(response => {
                props.setWeather(response.data)
            })
    }

    useEffect(hook, [])


    if(props.weather.length === 0){
        return(
            <></>
        )
    }
    else{

        return(
            <>
                <h2>Weather in {country.capital}</h2>
                <p>temperature: {props.weather.main.temp} / feels like: {props.weather.main.feel_like}</p>
                <p>wind: {props.weather.wind.speed}</p>
            </>
        )
    }
}

const ShowButton = (props) => {
    return(
        <button onClick={(e) => props.clickHandler(e, props.id)}>show</button>
    )
}

const Results = (props) => {
    if(props.countries.length === 1){
        const country = props.countries[0]
        return(
            <div>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map((language, i) =>
                    <p key={i}>{language.name}</p>)}
                </ul>
                <img src={country.flag} alt="" width="128" height="128"/>
                <div>
                    <WeatherInfo country={country} setWeather={props.setWeather}
                    weather={props.weather}/>
                </div>
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
                <p key={i}>{country.name} <ShowButton id={country.name} clickHandler={props.handleShowButtonClick}/></p>)}
            </ul>
        )
    }
}

export default Results