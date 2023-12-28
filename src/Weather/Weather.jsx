import { useState } from "react";
import { Card, Col, Container, Row } from 'react-bootstrap';
import cloudyIcon from './icons/cloudy.png';
import tempIcon from './icons/range.png';
import windIcon from './icons/windwhite.png';
import humidityIcon from './icons/humidity.png';
import Forecasting from "./Forecasting";
import dayjs from "dayjs";

const Weather = () => {

    // console.log("Weather Triggered")

    const [weatherCity, setWeatherCity] = useState();
    const [weatherMain, setWeatherMain] = useState();
    const [humidity, setHumidity] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minTemp, setMinTemp] = useState();
    const [feelTemp, setFeelTemp] = useState();
    const [wind, setWind] = useState();

    const [updatedTime, setUpdatedTime] = useState(0)

    // Math.round(wind.speed * 3.6)+ " KPH"
    const halfNumber = "4ed3e1";
    const mixMatch = "bea4ef0388";
    const encrypt = "ded72698";
    const endCode = "1457aa53";

    let temp_token = halfNumber+mixMatch+encrypt+endCode;
    //By deafult load London
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=51.517490&lon=-0.427460&units=metric&appid=" + temp_token;

    fetchWeather(queryURL);
    setInterval (()=>{
        fetchWeather(queryURL);
    }, 1200000)
            

    //Fetch current weather
    function fetchWeather(queryURL){
        fetch(queryURL)
        .then(function(response){
            //Response
            return response.json();
        })
        .then(function(data){
            //Display Weather data
            //console.log("This is weather data ", data);
            let currentTime = dayjs();
            setUpdatedTime(dayjs(currentTime).format('hh:mm'))
            //Information structure using ES6+ object destructuring
            // const {name, weather, main, wind, sys, timezone} = data;
            const {name, weather, main, wind } = data;

            //Forecasting 5 days url
            // queryURL = urlGenerator('forecast',cityName, data.coord.lat, data.coord.lon);
            //Display

            //displayWeather(cityName, weather, main, wind, sys, timezone);
            // console.log(wind)
            setWind(wind.speed)
            setWeatherMain(weather[0].main)
            setWeatherCity(name)
            setMaxTemp(main.temp_max)
            setMinTemp(main.temp_min)
            setFeelTemp(main.feels_like)
            setHumidity(main.humidity)
        })
    }
    return(
        <>
                <Container className="innerTab">
                    <Row style={{ height: '70px'}}>
                        <Col xs={6}>
                        <h4 style={{ textAlign: 'left', margin: '20px' }}>{weatherCity}</h4>
                        </Col>
                        <Col xs={6} className="text-right weatherTopRight">
                            <span>Last Update: {updatedTime}</span>
                            {/* <p>Feel Like: {Math.round(feelTemp)} °C</p> */}
                        </Col>
                    </Row>
                    <Row style={{ height: '230px' }}>
                        <Col xs={8} >
                        {/* Left side with weather image and temperature */}
                        <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
                            <Col xs={6}>
                            <img src={cloudyIcon}  alt="Weather" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            <p>{weatherMain}</p>
                            <span style={{fontSize: '18px'}}>{Math.round(minTemp)} 
                                <span style={{fontSize: '12px', position: 'relative', top: '-4px'}}> °C</span>
                            </span>
                            <img src={tempIcon} alt="temprature range Icon" style={{width: '30px', margin: '0px 5px'}}></img> 

                            <span style={{fontSize: '18px'}}>{Math.round(maxTemp)} 
                                <span style={{fontSize: '12px', position: 'relative', top: '-4px'}}> °C</span>
                            </span>
                            </Col>

                            
                            <Col xs={6} className="text-center">
                            <p className="temprature">{Math.round(feelTemp)}<span style={{fontSize: '24px'}}>°C</span></p>
                            <p style={{ margin: '20px' }}><img src={humidityIcon} alt="Weather humidity Icon" style={{width: '30px'}}></img> {humidity}%</p>
                            <p style={{ margin: '20px' }}><img src={windIcon} alt="Weather wind Icon" style={{width: '30px'}}></img> {Math.round(wind * 3.6)}  KPH</p>
                            </Col>
                        </Row>
                        </Col>
                        <Col xs={4}>
                        {/* Right side empty Bootstrap card */}
                        <Card style={{ height: '100%' , background: 'transparent'}}>
                            <Card.Body>
                                <Forecasting token={temp_token}></Forecasting>
                            </Card.Body>

                        </Card>
                        </Col>
                    </Row>
                    </Container>
        </>
    )
}

export default Weather;

