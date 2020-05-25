import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Results from './components/Results'

const App = () =>{
    const [ searchString, setSearchString ] = useState('')
    const [ countries, setCountries] = useState([])
    const [ weather, setWeather] = useState([])


    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(searchString.toLowerCase()))

    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value)
    }

    const handleShowButtonClick = (event, id) => {
        setSearchString(id)
    }

    return(
        <div>
            <div>
                <SearchBar string={searchString} 
                handleChange={handleSearchStringChange}/>
            </div>
            <div>
                <Results countries={countriesToShow} handleShowButtonClick={handleShowButtonClick}
                setWeather={setWeather} weather={weather}/>
            </div>
        </div>
    )
}

export default App