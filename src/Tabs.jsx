import { react, useState } from "react";
import { Card, Col, Container, Row, Nav } from 'react-bootstrap';
import Weather from "./Weather/Weather";
import Timers from "./Timers/Timers";

const Tabs =() => {
        // State to manage the active tab
        const [activeTab, setActiveTab] = useState('Weather');

        // Function to handle tab switch
        const handleTabSwitch = (tab) => {
            setActiveTab(tab);
        };
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
                    <Nav.Link eventKey="To-do" onClick={() => handleTabSwitch('To-do')}>
                        To-do
                    </Nav.Link>
                </Nav.Item>
            </Nav>
    
            {/* Content based on active tab */}
            {activeTab === 'Weather' && (
                <Row>
                <Weather></Weather>
                </Row>
            )}
            {activeTab === 'Timer' && (
                <Row>
                <Timers></Timers>
                </Row>
            )}
            {activeTab === 'Health' && (
                <Row>
                {/* Health card content here */}
                {/* ... */}
                </Row>
            )}
            {activeTab === 'To-do' && (
                <Row>
                {/* Football card content here */}
                {/* ... */}
                </Row>
            )}
            </Container>
            </>
        )
    }
export default Tabs;