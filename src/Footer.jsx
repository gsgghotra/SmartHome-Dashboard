import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import spotifyIcon from './assets/images/icons-pack/spotify-green.png';
import stopwatch from './assets/images/icons-pack/stopwatch.png'


const Footer = () => {
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
            <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary mb-1 footer">
                <Container>
                    <Navbar.Brand className='brand' data-fullscreen="off" onClick={toggleFullScreen}>SmartHome Dashboard</Navbar.Brand>

                    <Button variant="secondary" className='buttons m-2'>
                        <img src={stopwatch} alt="Refresh App"></img>
                        <span>Set Timer</span>
                    </Button>
                    {/* <Button variant="secondary" className='buttons m-2'>
                        <img src={todo} alt="Refresh App"></img>
                        <span>Tasks</span>
                    </Button> */}
                    <Button variant="secondary" className='buttons m-2'>
                        <img src={spotifyIcon} alt="Refresh App"></img>
                        <span>Spotify</span>
                    </Button>
                    {/* <Button variant="secondary" className='buttons me-4'>
                        <img src={playIcon} alt="Setting"></img>
                    </Button> */}
                </Container>
            </Navbar>
        </>
    )
}

export default Footer;