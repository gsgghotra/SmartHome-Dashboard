import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
const HomeControls = () => {
    return(
        <Col className='column'>
            <p className='label'>Google Home Controls</p>
            <Container className='mt-2 homeContainer'>
                <button className='homeBtn'>Light 1</button>
                <button className='homeBtn'>Light 2</button>
                <button className='homeBtn'>Light 3</button>
            </Container>
        </Col>
    )
}
export default HomeControls;