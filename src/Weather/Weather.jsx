import { react, useState } from "react";
import { Card, Col, Container, Row, Nav } from 'react-bootstrap';
import cloudyIcon from './icons/cloudy.png';

const Weather = () => {

    const [weatherCity, setWeatherCity] = useState();
    const [weatherMain, setWeatherMain] = useState();
    const [humidity, setHumidity] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minTemp, setMinTemp] = useState();
    const [feelTemp, setFeelTemp] = useState();


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
                <Container className="innerTab">
                    <Row style={{ height: '70px'}}>
                        <Col xs={6}>
                        <h4 style={{ textAlign: 'left', margin: '20px' }}>{weatherCity}</h4>
                        </Col>
                        <Col xs={6} className="text-right">
                        <p style={{ margin: '20px' }}>{humidity}%</p>
                        </Col>
                    </Row>
                    <Row style={{ height: '250px' }}>
                        <Col xs={8} >
                        {/* Left side with weather image and temperature */}
                        <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
                            <Col xs={6}>
                            <img src={cloudyIcon}  alt="Weather" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            <p>{weatherMain}</p>
                            </Col>
                            <Col xs={6} className="text-center">
                            <p className="temprature">{Math.round(feelTemp)}°C</p>
                            <p>H: {Math.round(maxTemp)} °C</p>
                            <p>L: {Math.round(minTemp)} °C</p>
                            </Col>
                        </Row>
                        </Col>
                        <Col xs={4}>
                        {/* Right side empty Bootstrap card */}
                        <Card style={{ height: '100%', border: '1px solid #252525' , background: 'transparent'}}>
                            <Card.Body></Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    </Container>
        </>
    )
}

export default Weather;

