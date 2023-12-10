import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CurrentTime from './CurrentTime';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary mb-1">
        <Container>
          {/* <Navbar.Brand href="#">SmartHome Dashboard</Navbar.Brand> */}
          <Button variant="secondary" className='buttons m-2'>Refresh</Button>
          <Button variant="secondary" className='buttons me-4'>Settings</Button>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col className='column'>
            <CurrentTime></CurrentTime>
          </Col>
          <Col className='column'>Google Home Controls</Col>
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
