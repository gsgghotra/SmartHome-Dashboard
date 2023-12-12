import dayjs from "dayjs";
import { useState } from "react";
import Col from 'react-bootstrap/Col';

const CurrentTime =()=> {    
    const [todaysDate, setTodaysDate] = useState(dayjs().format('DD MMMM, YYYY'));
    const [currentTime , setCurrentTime] = useState(dayjs().format('HH : mm'));

    setInterval(()=>{
        setCurrentTime(dayjs().format('HH : mm'));
        setTodaysDate(dayjs().format('DD MMMM, YYYY'));
    }, 1);
    return(
        <Col className='column'>
            <p className="currentDate">{todaysDate}</p>
            <h2 className="currentTime">{currentTime}</h2>
        </Col>
    )
}

export default CurrentTime;