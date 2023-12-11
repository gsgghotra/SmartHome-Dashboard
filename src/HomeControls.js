import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import imageLighton from "./assets/images/btn-on.png"
import imageLightoff from "./assets/images/btn-off.png"
const HomeControls = () => {
    return(
        <Col className='column'>
            <p className='label'>Google Home Controls</p>
            <Container className='mt-2 homeContainer'>
                <Button className='homeBtn'>
                    <img src={imageLighton} className='bulb' alt="Bulb on"></img>
                    Light 1
                    </Button>
                <Button className='homeBtn'>
                    <img src={imageLightoff} className='bulb' alt="Bulb off"></img>
                    Light 2
                    </Button>
                <Button className='homeBtn'>
                    <img src={imageLighton} className='bulb' alt="Bulb on"></img>
                    Light 3
                </Button>
            </Container>
        </Col>
    )
}
export default HomeControls;