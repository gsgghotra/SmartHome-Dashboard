import { useState, useEffect } from 'react';

function Timers () {
    const [selectedOption, setSelectedOption] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const timerOptions = [
        { label: '1 minute', value: 60 },
        { label: '2 minutes', value: 120 },
        { label: '3 minutes', value: 180 },
        { label: '5 minutes', value: 300 },
        { label: '10 minutes', value: 600 },
        { label: '15 minutes', value: 900 },
        { label: '30 minutes', value: 1800 },
    ];

    useEffect(() => {
        if (isRunning) {
        const interval = setInterval(() => {
            if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
            } else {
            setIsRunning(false);
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount or when isRunning changes
        }
    }, [isRunning, seconds]);

    const startTimer = () => {
        const selectedValue = timerOptions[selectedOption].value;
        setSeconds(selectedValue);
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsRunning(false);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(parseInt(event.target.value, 10));
    };

    return (
        <div style= {{overflow:'scroll'}} className="innerTab container mt-4">
            <div className="form-group" style={{width:'90%', margin:'0px auto'}}>
                <label htmlFor="timerSelect" style={{marginRight: '10px'}}>Timer:</label>
                <select
                id="timerSelect"
                className="form-control"
                style={{width:'50%', display:'inline-block'}}
                value={selectedOption}
                onChange={handleOptionChange}
                >
                {timerOptions.map((option, index) => (
                    <option key={index} value={index}>
                    {option.label}
                    </option>
                ))}
                </select>
                <div style={{margin:'10px', display:'inline-block'}}>
                    <button className="btn btn-primary mr-2" onClick={startTimer}>
                        Start
                    </button>
                </div>
            </div>

            {/* Timer */}
            {isRunning && 
                <h1 style={{fontSize:'6em'}} className="mb-4">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</h1>
            }

            {/* Buttons */}
            <div style={{margin:'10px'}}>
                {isRunning && 
                    <>
                        {/* <button className="btn btn-warning mr-2" onClick={pauseTimer}>
                            Pause
                        </button> */}
                        <button className="btn btn-danger" onClick={resetTimer}>
                            Reset
                        </button>
                    </>
                    }
            </div>

        </div>
    );
};

export default Timers;
