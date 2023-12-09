import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary mb-4">
        <Container>
          <Navbar.Brand href="#">SmartHome Dashboard</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col className='column'>Current Time</Col>
          <Col className='column'>Google Home Controls</Col>
          <Col className='column'>Wifi Data</Col>
        </Row>
        <Row>
          <Col className='column'>Live weather</Col>
          <Col className='column'>Music</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
