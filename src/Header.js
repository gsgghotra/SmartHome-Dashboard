import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import refreshIcon from './assets/images/icons-pack/reload.png'
import settingIcon from './assets/images/icons-pack/setting.png'
import assistantIcon from './assets/images/icons-pack/assistant.png'


const Header = () => {

    function refresher(){
        window.location.reload(true);
    }

    return (
        <>
            <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary mb-1">
                <Container>
                    <Button variant="secondary" id="assistantButton" className='buttons m-2'>
                        <img src={assistantIcon} alt="Refresh App"></img>
                    </Button>
                    {/* <Navbar.Brand href="#">SmartHome Dashboard</Navbar.Brand> */}
                    <Button variant="secondary" className='buttons m-2' onClick={refresher}>
                        <img src={refreshIcon} alt="Refresh App"></img>
                    </Button>
                    <Button variant="secondary" className='buttons me-4'>
                        <img src={settingIcon} alt="Setting" ></img>
                    </Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;