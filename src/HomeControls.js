import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
const HomeControls = () => {
    return(
        <Col className='column'>
            <p className='label'>Google Home Controls</p>
            <Container className='mt-2 homeContainer'>
                <Button className='homeBtn'>Light 1</Button>
                <Button className='homeBtn'>Light 2</Button>
                <Button className='homeBtn'>Light 3</Button>
            </Container>
        </Col>
    )
}
export default HomeControls;