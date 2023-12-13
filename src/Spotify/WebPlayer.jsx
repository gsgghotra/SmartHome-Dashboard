import React, { useState, useEffect } from 'react';

function WebPlayback(props) {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
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
            setActive(true);
        });

        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
            setActive(false);
        });

        player.connect();
        };
    }, [props.accessToken]);

    return (
        <>
        <div className="container">
            <div className="main-wrapper">
            <h2>Now Playing</h2>
            <p>{current_track.name}</p>
            <p>By: {current_track.artists.map(artist => artist.name).join(', ')}</p>
            <img src={current_track.album.images[0].url} alt="Album Cover" />

            <p>Status: {is_active ? 'Active' : 'Inactive'}</p>
            <p>Paused: {is_paused ? 'Yes' : 'No'}</p>
            </div>
        </div>
        </>
    );
}

export default WebPlayback;
