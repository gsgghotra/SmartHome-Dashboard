import dayjs from "dayjs";
import { useState } from "react";
import Col from 'react-bootstrap/Col';

const CurrentTime =()=> {    
    const [todaysDate, setTodaysDate] = useState(dayjs().format('ddd, DD MMM YYYY'));
    const [currentTime , setCurrentTime] = useState(dayjs().format('hh : mm'));

    setInterval(()=>{
        setCurrentTime(dayjs().format('hh : mm'));
        setTodaysDate(dayjs().format('ddd, DD MMM YYYY'));
    }, 1);
    return(
        <Col className='column'>
            <p className="currentDate">{todaysDate}</p>
            <h2 className="currentTime">{currentTime}</h2>
        </Col>
    )
}

export default CurrentTime;