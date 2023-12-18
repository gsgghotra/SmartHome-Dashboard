import { useState, useEffect} from 'react';
import '../Spotify/SpotifyPlayer.css';

const GetUser = (props) => {
    let accessToken = props.accessToken
    //console.log("Play music token ", accessToken)
    const [isLoaded, setIsLoaded] = useState(false);
    const [userData, setUserData] = useState();

    // Function to fetch the current playback state
    const loadUser = async () => {
        try {
            const settings = {
                headers: { 'Authorization': 'Bearer ' + accessToken },
            };
        
            const response = await fetch('https://api.spotify.com/v1/me', settings);
            const data = await response.json();

            // if(data.error){
            //     if(data.error.status === 401){
            //         props.loginBtn();
            //     }
            // }

            setUserData(data.display_name)
        
            // Check if the user has an active playback device
            if (data && data.id) {
                setIsLoaded(true);
            } else {
                setIsLoaded(false);
            }
            } catch (error) {
            console.error('Error loading User:', error);
            }
        };
    // useEffect hook to fetch playback state when the component mounts
    useEffect(() => {
        loadUser();
    }, [accessToken]); // Fetch playback state whenever the access token changes

return (
<div>
    <p className="label">{isLoaded ? `${userData}'s Music Station`: 'Getting Internal Error'}</p>
    {/* Add buttons or other components based on the playback state */}
</div>
);
};

export default GetUser;
