import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import imageLighton from "./assets/images/btn-on.png";
import imageLightoff from "./assets/images/btn-off.png";
import LIGHTS_URL from './secrets';
import { useEffect, useState } from 'react';

const HomeControls = () => {
    const [lights, setLights] = useState(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLights = () => {
            fetch(LIGHTS_URL)
            .then((response) => response.json())
            .then((data) => {
                const lightsDataMap = new Map(Object.entries(data));
                //console.log(lightsDataMap)
                setLights(lightsDataMap);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
            setTimeout(fetchLights, 3000);
    };

    const handleLightControl = (e) => {
        let light, state, reachable;
        // console.log(e.target.parentElement, e.target.nodeName)
        if (e.target.nodeName == "IMG" || e.target.nodeName == "SPAN"){
            light = e.target.parentElement.dataset.light;
            light = parseInt(light) + 1;
            state = e.target.parentElement.dataset.state;
            reachable = e.target.parentElement.dataset.reachable;
        } else {
            light = e.target.dataset.light;
            light = parseInt(light) + 1;
            state = e.target.dataset.state;
            reachable = e.target.dataset.reachable;
        }
        if (reachable === 'true'){
            //console.log(light, " should turn", state, " ");
            requestUpdate(light, state)
        }
    }

    const requestUpdate = (light, state) => {
        let rquestedState = state === 'true' ? false : true ;
        let data = {
            "on" : rquestedState
        }
        console.log(rquestedState)

        fetch(LIGHTS_URL+"/"+light+"/state/", {
            method: "PUT", // or 'PUT'
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success Home control")
            fetchLights()
        })
        .catch((error) => {
            setError(error);
        })

    }

    useEffect(() => {
        fetchLights();
    }, []);

    return (
        <Col className='column'>
            <p className='label'>Google Home Controls</p>
            <Container className='mt-2 homeContainer'>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error fetching lights data</p>
                ) : (
                    Array.from(lights.values()).map((light, index) => (
                        <Button key={index} data-light={index} data-state={light.state.on} data-reachable={light.state.reachable}
                            className={ light.state.reachable? light.state.on ? 'homeBtn homeBtn-on': 'homeBtn homeBtn-off' : 'homeBtn'} 
                            onClick={handleLightControl}>

                            <img src={ light.state.on && light.state.reachable ? imageLighton : imageLightoff } className='bulb' alt="Bulb on" />
                            <span className='deviceName'>{light.name}</span>
                            <span className='deviceStatus'>
                                {light.state.reachable? light.state.on && light.state.reachable ? 'ON' : "OFF" : 'Not Reachable'}
                            </span>
                        </Button>
                    ))
                )}
            </Container>
        </Col>
    );
};

export default HomeControls;