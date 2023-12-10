import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
const Header = () => {
    return (
        <>
            <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary mb-1">
                <Container>
                    {/* <Navbar.Brand href="#">SmartHome Dashboard</Navbar.Brand> */}
                    <Button variant="secondary" className='buttons m-2'>Refresh</Button>
                    <Button variant="secondary" className='buttons me-4'>Settings</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;