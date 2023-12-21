import { react, useState } from "react";
import { Card, Col, Container, Row, Nav } from 'react-bootstrap';
const Weather = () => {

    const [weatherCity, setWeatherCity] = useState();
    const [weatherMain, setWeatherMain] = useState();
    const [humidity, setHumidity] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minTemp, setMinTemp] = useState();
    const [feelTemp, setFeelTemp] = useState();
      // State to manage the active tab
    const [activeTab, setActiveTab] = useState('Weather');

    // Function to handle tab switch
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };

    const halfNumber = "4ed3e1";
    const mixMatch = "bea4ef0388";
    const encrypt = "ded72698";
    const endCode = "1457aa53";

    let temp_token = halfNumber+mixMatch+encrypt+endCode;

    //By deafult load London

    let queryURL = urlGenerator('weather','London', 51.517490, -0.427460);


    //The location will be used to get lon and lat cordinates
    function urlGenerator (requestType, cityName, latitude, longitude){
        //Generate the url for weather fetch
        let baseURL = "https://api.openweathermap.org/data/2.5/"+requestType+"?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+temp_token;
        
        if (requestType === 'weather'){ //If request type is weather, fetch weather
            fetchWeather(baseURL, cityName);
        }
        else if (requestType === 'forecast'){ // return baseURL;
            return baseURL;
        }
    }

    //Fetch current weather
    function fetchWeather(queryURL, cityName){
        fetch(queryURL)
        .then(function(response){
            //Response
            return response.json();
        })
        .then(function(data){
            //Display Weather data
            //console.log("This is weather data ", data);

            //Information structure using ES6+ object destructuring
            const {name, weather, main, wind, sys, timezone} = data;

            //Forecasting 5 days url
            queryURL = urlGenerator('forecast',cityName, data.coord.lat, data.coord.lon);
            fetchForecasting(queryURL);
            //Display

            //displayWeather(cityName, weather, main, wind, sys, timezone);
            console.log(sys)
            setWeatherMain(weather[0].main)
            setWeatherCity(name)
            setMaxTemp(main.temp_max)
            setMinTemp(main.temp_min)
            setFeelTemp(main.feels_like)
            setHumidity(main.humidity)
        })
    }

    //5 Days forecasting
    function fetchForecasting(queryURL){
        //console.log(queryURL);
        fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //console.log(data);
        })
    }


    return(
        <>
        <Container className='multiTabContainer'>
        {/* Navigation menu */}
        <Nav fill variant="tabs" defaultActiveKey="Weather">
            <Nav.Item>
            <Nav.Link eventKey="Weather" onClick={() => handleTabSwitch('Weather')}>
                Weather
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Timer" onClick={() => handleTabSwitch('Timer')}>
                Timer
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Health" onClick={() => handleTabSwitch('Health')}>
                Health
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="Football" onClick={() => handleTabSwitch('Football')}>
                Football
            </Nav.Link>
            </Nav.Item>
        </Nav>

        {/* Content based on active tab */}
        {activeTab === 'Weather' && (
            <Row>
            {/* Weather card content here */}
            {/* ... */}
            </Row>
        )}
        {activeTab === 'Timer' && (
            <Row>
            {/* Timer card content here */}
            {/* ... */}
            </Row>
        )}
        {activeTab === 'Health' && (
            <Row>
            {/* Health card content here */}
            {/* ... */}
            </Row>
        )}
        {activeTab === 'Football' && (
            <Row>
            {/* Football card content here */}
            {/* ... */}
            </Row>
        )}
        </Container>
        </>
    )
}

export default Weather;

