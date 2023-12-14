import React, { useState, useEffect } from 'react';

function WebPlayback(props) {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_skipped, setSkipped] = useState(false);
    const [is_active, setActive] = useState(false);
    const [device, setDevice] = useState(0);
    const [current_track, setTrack] = useState({
        name: "Temporary Song",
        album: {
            images: [{ url: "https://via.placeholder.com/150" }]
            },
        artists: [{ name: "Unknown Artist" }]
        });

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: cb => { cb(props.accessToken); },
            volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDevice(device_id)
            setActive(true);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
            setActive(false);
        });

        player.connect();
        };
    }, [props.accessToken]);

    useEffect(()=>{
        currentlyPlaying();
    }, [is_paused, is_skipped])

    const currentlyPlaying = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            });
        
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.text();
          // Check if the response is not empty
            if (data.trim()) {
                const jsonData = JSON.parse(data);
                console.log("playing", jsonData);
                if(jsonData){
                    setTrack({
                        name: jsonData.item.album.name,
                        album: {
                            images: [{ url: jsonData.item.album.images[0].url }]
                            },
                        artists: [{ name: "Unknown Artist" }]
                    })
                }
            } else {
                console.log("No currently playing song.");
            }
            } catch (error) {
            console.error('Error fetching currently playing song:', error);
            }
       
        };

    const handlePlay = async () => {
        let track = props.playlist
        console.log("PROPS", track)
        try {
            const trackUri = 'spotify:track:72vuBPMhwFNlSYpTSf6fVD'; // Replace TRACK_ID with the actual Spotify track ID
            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    device_ids: [device], // Use the ID of the current device
                    uris: [trackUri],
                }),
            });
        
            if (!response.ok) {
                console.error('Error playing track:', response);
                currentlyPlaying();
            } 
            
            else {
                setPaused(false);
            }
            } catch (error) {
            console.error('Error playing track:', error);
            }
        };

    const handlePause = async () => {
    try {
        await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + props.accessToken,
        },
        });
        setPaused(true);
    } catch (error) {
        console.error('Error pausing track:', error);
    }
    };
    
    const handleSkip = async () => {
    try {
        let nextResponse = await fetch('https://api.spotify.com/v1/me/player/next', {

        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + props.accessToken,
            'Content-Type': 'application/json',
        },
        });

        if (!nextResponse.ok) {
            throw new Error(`HTTP error! Status: ${nextResponse.status}`);
        } else {
            await currentlyPlaying();
            // setTimeout(()=>{currentlyPlaying()}, 1000)
            
        }

    } catch (error) {
        console.error('Error skipping track:', error);
    }
    };

    const handleTransferPlayback = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                device_ids: [device], // Use the ID of the current device
                play: !is_paused, // Continue playing if not paused
            }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } 
            if (response.ok){
                console.log("Transferred")
            }
    
        
            } catch (error) {
            console.error('Error transferring playback:', error);
            }
        };

    return (
        <>
        <div className="container">
            <div className="main-wrapper">
            <p>{current_track.name}</p>
            <img className="artImg" src={current_track.album.images[0].url} alt="Album Cover" />

            <p>Status: {is_active ? 'Active' : 'Inactive'}</p>
            <p>Paused: {is_paused ? 'Yes' : 'No'}</p>

            <div>
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleSkip}>Skip</button>
                <button onClick={handleTransferPlayback}>Transfer Playback</button>
            </div>
            </div>
        </div>
        </>
    );
}

export default WebPlayback;
