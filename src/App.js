import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CurrentTime from './CurrentTime';
import Header from './Header';
import HomeControls from './HomeControls';
import SpotifyPlayer from './Spotify/SpotifyPlayer';
import Footer from './Footer';
import Weather from './Weather/Weather';
import Tabs from './Tabs';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Container fluid className='mainContainer'>
        <Row className='topRow'>
          {/* Time Column */}
            <CurrentTime></CurrentTime>
          {/* Home Controls */}
            <HomeControls></HomeControls>
        </Row>
        <Row className='bottomRow'>
          <Col className='column'>
            <Tabs></Tabs>
            </Col>
          <Col className='column'>
            {/* <MusicPlayer></MusicPlayer> */}
            {/* <SpotifyPlayer></SpotifyPlayer> */}
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
