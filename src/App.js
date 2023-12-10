import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CurrentTime from './CurrentTime';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Container fluid className='mainContainer'>
        <Row className='topRow'>
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
