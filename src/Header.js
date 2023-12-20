import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import refreshIcon from './assets/images/icons-pack/reload.png'
import settingIcon from './assets/images/icons-pack/setting.png'
import assistantIcon from './assets/images/icons-pack/assistant.png'
import fullScreenIcon from './assets/images/icons-pack/fullscreen.png'

//ThemeBTN
import darkModeIcon from './assets/images/icons-pack/lightmode.png';
import shadedIcon from './assets/images/icons-pack/darkmode.png';
import lightIcon from './assets/images/icons-pack/theme.png';
import themeIcon from './assets/images/icons-pack/theme.png';
import { useState } from 'react';


const Header = () => {

    const [selectedThemeIcon, setThemeIcon] = useState(lightIcon);

    function refresher(){
        window.location.reload(true);
    }

    const themeHandler = () => {
        if(selectedThemeIcon === lightIcon){
            setThemeIcon(darkModeIcon);
            document.documentElement.style.setProperty('--DARK_BACKGROUND', '#191919');

        } else if (selectedThemeIcon === darkModeIcon) {
            setThemeIcon(shadedIcon)
            document.documentElement.style.setProperty('--DARK_BACKGROUND', '#000000');

        } else if(selectedThemeIcon === shadedIcon){
            document.documentElement.style.setProperty('--DARK_BACKGROUND', '#131313');
            setThemeIcon(lightIcon)
        }
    }

    var elem = document.documentElement;
    const toggleFullScreen =(e) => {
        const currentState = e.target.dataset.fullscreen;

        if (currentState === 'on'){
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
            e.target.dataset.fullscreen = "off";
        } else {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
            }
            e.target.dataset.fullscreen = "on";
        }
    }

    return (
        <>
            <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary mb-1">
                <Container>
                    <Button variant="secondary" id="fullScreen" className='buttons m-2' onClick={toggleFullScreen}>
                        <img src={fullScreenIcon} alt="Theme Button"></img>
                    </Button>
                    <Button variant="secondary" id="themeConvertor" className='buttons m-2' onClick={themeHandler}>
                        <img src={selectedThemeIcon} alt="Theme Button"></img>
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