import { useState, useEffect } from 'react';

function Timers (props) {
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
        <h1 className="mb-4">Timer: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</h1>
            <div className="form-group">
                <label htmlFor="timerSelect">Select Timer:</label>
                <select
                id="timerSelect"
                className="form-control"
                value={selectedOption}
                onChange={handleOptionChange}
                >
                {timerOptions.map((option, index) => (
                    <option key={index} value={index}>
                    {option.label}
                    </option>
                ))}
                </select>
            </div>
            <button className="btn btn-primary mr-2" onClick={startTimer}>
                Start
            </button>
            <button className="btn btn-warning mr-2" onClick={pauseTimer}>
                Pause
            </button>
            <button className="btn btn-danger" onClick={resetTimer}>
                Reset
            </button>
        </div>
    );
};

export default Timers;
