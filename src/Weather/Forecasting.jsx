import dayjs from "dayjs";
import { useState } from "react";

const Forecasting = (props) => {
    // Tomorrow weather
    const [tomMaxTemp, setTomMaxTemp] = useState(0)
    const [tomMinTemp, setTomMinTemp] = useState(0)
    const [weatherStatus, setWeatherStatus] = useState(0)
    const [image, setImage] = useState(0)
    fetchForecasting("https://api.openweathermap.org/data/2.5/forecast?lat=51.517490&lon=-0.427460&units=metric&appid=" + props.token);

    //1 Days forecasting
    function fetchForecasting(queryURL){
        //console.log(queryURL);
        fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            displayforecasting(data)
            //console.log(data);
        })
    }

    //Display 5 days forecasting
    function displayforecasting(data){
        console.log("DISPLAY FORECASTING TRIGGERED")
        let weatherIcon, weatherStatus, averageTemp;
        let newTomMaxTemp = [];
        let newTomMinTemp = [];

        for(let i = 0; i < 10; i++){
            let date = parseInt(dayjs(data.list[i].dt_txt).format('DD')); //Save it as a number

            //Grab the mid day weather icon for future 5 days
            if (dayjs(data.list[i].dt_txt).format('HH') === '12'){
                    console.log("FIND ME", data.list[i].dt_txt)
                    weatherIcon =  data.list[i].weather[0].icon;
                    weatherStatus = data.list[i].weather[0].main;
                    averageTemp = Math.round(data.list[i].main.temp);
            }

            let futureDate = dayjs(data.list[i].dt_txt).format('YYYY-MM-DD');
            let curDate = dayjs().format('YYYY-MM-DD')
            const dateForecast = dayjs(futureDate)
            const dateToday = dayjs(curDate)
            let dayDiff = dateForecast.diff(dateToday ,'day')

            if(dayDiff === 1){
                newTomMaxTemp.push(Math.round(data.list[i].main.temp_max));
                newTomMinTemp.push(Math.round(data.list[i].main.temp_min));
            }
        }
            // Apply batched state updates
        setWeatherStatus(weatherStatus)
        setTomMaxTemp((prev) => Math.max(...newTomMaxTemp) || prev);
        setTomMinTemp((prev) => Math.min(...newTomMinTemp) || prev);
        setImage(`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
    }

    console.log("Forecasting Mounted")
    return(
        <>
            <p> Tomorrow </p>
            <p>{weatherStatus}</p>
            <img src={image}></img>
            <p  style={{fontSize: '18px' }}>H: {tomMaxTemp}<span style={{fontSize: '14px', position:'relative', top:'-3px'}}> °C</span></p>
            <p  style={{fontSize: '18px' }}>L: {tomMinTemp}<span style={{fontSize: '14px', position:'relative', top:'-3px'}}> °C</span></p>
        </>
    )
}

export default Forecasting;