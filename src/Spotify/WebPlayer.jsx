import React, { useState, useEffect, useRef } from 'react';
import peachTheme from "../assets/video/ModernTheme.mp4";
import artHolder from "../assets/images/artHolder.png";
import "../playerStyle.css";

function WebPlayback(props) {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [device, setDevice] = useState(0);
    const myvideo = useRef(null);

    // Tracks from playlist
    const[tracks, setTracks] = useState({});
    const[trackNumber, setTrsckNumber] = useState(0);
    const [current_track, setTrack] = useState({
        name: "Nothing Playing",
        album: {
            images: [{ url: "https://via.placeholder.com/150" }]
            },
        artists: [{ name: "Artist" }]
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

        player.addListener('ready', async ({ device_id }) => {
            try {
                // Log device readiness
                console.log('Ready with Device ID:', device_id);
        
                // Set the device
                setDevice(device_id);
                setActive(true);
        
                // Define a function to handle player setup and actions
                const setupPlayer = async () => {
                    if (device_id) {
                        // Set the player to active state
                        // Get playlist and information about the currently playing track
                        await currentlyPlaying();
                        getPlaylist(props.playlist);
                    } else {
                        console.log("Device not set before transferring");
                    }
                };
        
                // Check if the player is available
                if (player) {
                    // Call the setup function
                    await setupPlayer();
                } else {
                    console.log("Player not set");
                }
            } catch (error) {
                console.error('Error during player setup:', error);
                        // Handle the specific error related to postMessage
                if (error.message.includes("postMessage")) {
                    console.log("Error: postMessage origin mismatch. Check your Spotify Developer Dashboard settings.");
                    // You can also redirect the user to an error page or show a user-friendly message.
                }
            }
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
            setActive(false);
        });

        player.connect();
        };
    }, [props.accessToken, props.playlist]);

    const getPlaylist =async (playlist)=> {
        // https://api.spotify.com/v1/playlists/
        try {
            const response = await fetch('https://api.spotify.com/v1/playlists/'+playlist, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            })
            .then((response)=>{
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data)=>{
                if (data.tracks.items.length > 0){
                    setTracks(data.tracks.items);
                    // handlePlay();
                }
                
            })

        } catch (error){
            console.error('Error fetching Playlist:', error);
        }
    }

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
                //console.log("playing", jsonData);
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

    const handlePlay = async (e) => {
        await handleTransferPlayback();
        let track = tracks[trackNumber].track.uri;
        
        // console.log("Track 1 - ", track ," On Device - ", device)
        console.log("Track 1 - ", track ," by ", tracks[trackNumber].track.artists[0].name)
        setTrack({
            name: tracks[trackNumber].track.name,
            album: {
                images: [{ url: tracks[trackNumber].track.album.images[0].url }]
                },
            artists: [{ name: tracks[trackNumber].track.artists[0].name }]
            });

        setTimeout( async()=>{
            try {
                const trackUri = track; // Replace TRACK_ID with the actual Spotify track ID
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
    
                // console.log("EROR", response)
            
                if (!response.ok) {
                    console.error('Error playing track:', response);
                } else {
                    setPaused(false);
                    myvideo.current.play();
                }
    
                } 
            catch (error) {
                console.error('Error playing track:', error);
                }
        }, 1000)

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
        myvideo.current.pause();
    } catch (error) {
        console.error('Error pausing track:', error);
    }
    };
    
    const handleSkip = async () => {
        // Focus on manual updates
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });

        console.log("Next song ", tracks)
        setTrsckNumber(trackNumber + 1);
        setTrack(
            {
            name: tracks[trackNumber].track.name,
            album: {
                images: [{ url: tracks[trackNumber].track.album.images[0].url }]
                },
            artists: [{ name: tracks[trackNumber].track.artists[0].name }]
            });
    };

    const handleTransferPlayback = async () => {

        //Transfer the current device
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
        <section id="playlists" className="columnPlayer">
                        <div id="mediaPlayer" className="visible">
                            {/* <div id="wrap_video">
                                <div id="video_box">
                                    <div id="video_overlays">
                                    <img src={current_track.album.images[0].url || artHolder} id="songArt" className="artOverlay" alt="Song Art" />
                                    </div>
                                    <div>
                                    <video id="artVideo" ref={myvideo} loop>
                                        <source src={peachTheme} type="video/mp4"></source>
                                        Your browser does not support the video tag.
                                    </video>
                                    </div>
                                </div>
                            </div> */}
                            <img src={current_track.album.images[0].url || artHolder} id="songArt" className="artMusic" alt="Song Art" />
                            <h4 className="musicTitle" id="songTitle"> {current_track.name || "Song Title" }</h4>
                            <p className="playlistTitle" id="playlistTitle">{current_track.artists[0].name || "Artist" }</p>
                                {/* <span className="currentTimer" id="currentTimer">0:00</span>
                                <span className="timer" id="timer">0:00</span>
                                <input type="range" id="trackSlider" /> */}
        
                            <ul className="controls">
                            <li>
                                <button onClick={handlePause} id="spotifyPrev">
                                    <span className="fa-solid fa-angle-left fa-2xl playericon"></span>
                                </button>
                            </li>
        
                            <li>
                                {is_paused ? 
                                <button onClick={handlePlay} id="spotifyPlay">
                                    <span id="playerToogleBtn" className="fa-solid fa-play fa-2xl playericon"></span>
                                </button>
                                : 
                                <button onClick={handlePause} id="spotifyPlay">
                                    <span id="playerToogleBtn" className="fa-solid fa-pause fa-2xl playericon"></span>
                                </button>
                                }
                                
                            </li>
        
                            <li>
                                <button onClick={handleSkip} id="spotifyNext">
                                    <span className="fa-solid fa-angle-right fa-2xl playericon"></span>
                                </button>
                            </li>
                            </ul>
                        </div>
                        </section>
            {/* <div className="main-wrapper">
                <p>Status: {is_active ? 'Active' : 'Inactive'}</p>
                <img className="artImg" src={current_track.album.images[0].url} alt="Album Cover" />
                <p>{current_track.name}</p>
                <p>Paused: {is_paused ? 'Yes' : 'No'}</p>
                <div>
                    <button onClick={handlePlay}>Play</button>
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={handleSkip}>Skip</button>
                    <button onClick={handleTransferPlayback}>Transfer Playback</button>
                </div>
            </div> */}
        </div>
        </>
    );
}

export default WebPlayback;
