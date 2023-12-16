import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import './SpotifyPlayer.css';
import artHolder from "./images/artHolder.png";
import GetUser from './GetUser';
import WebPlayback from './WebPlayer';

import libraryIcon from '../assets/images/icons-pack/library.png';
import spotifyIcon from '../assets/images/icons-pack/spotify-green.png';
import castingIcon from '../assets/images/icons-pack/cast.png';
import logoutIcon from '../assets/images/icons-pack/logout.png';

const SpotifyPlayer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokens, setTokens] = useState();
    const [allPlaylistsMap, setAllPlaylistsMap] = useState(new Map());
    const [allDevicesMap, setAllDevicesMap] = useState(new Map());
    const [dynamicPlaylist, setDynamicPlaylist] = useState(false);

    //Variables for show and hide spotify Menu
    const [displyPlaylists, setDisplayPlaylists] = useState(false);
    const [displayDevice, setDisplayDevice] = useState(false);

    const fetchTokens = async () => {
        try {
            const response = await axios.get('http://192.168.86.28:3001/get-tokens');
            const fetchedTokens = response.data;

            if (fetchedTokens) {
                // Update state with the fetched tokens
                setTokens(fetchedTokens);
                //console.log("I set the tokens now", fetchedTokens);
                
                // Update isLoggedIn based on the presence of tokens
                setIsLoggedIn(!!fetchedTokens.access_token);
            }
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const handleLogin = async () => {
        // Fetch tokens
        await fetchTokens();

            // Tokens exist, proceed with login logic
            try {
                const response = await axios.get('http://192.168.86.28:3001/login');
                const { redirectTo } = response.data;

                // If your server is redirecting, the following line won't have much effect
                // because the browser will follow the redirect.
                // Redirect the user to Spotify
                console.log('Redirecting to Spotify:', redirectTo);
                window.location.href = redirectTo;
            } catch (error) {
                console.error('Error initiating login:', error);
            }
    };

    // const handleLogout = () => {
    // // Clear tokens from local storage
    // setIsLoggedIn(false);
    // setTokens({})
    // };

    const fetchUserPlaylists = async (accessToken) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            let myPlaylists = response.data.items;
            // Update state with unique playlists using Map
            setAllPlaylistsMap(prevPlaylistsMap => {
                const updatedPlaylistsMap = new Map(prevPlaylistsMap);
                myPlaylists.forEach(playlist => {
                    const playlistKey = playlist.name;
                    const playlistData = {
                        id: playlist.id,
                        name: playlist.name,
                        image: playlist.images.length > 0 ? playlist.images[0].url : null,
                        uri: playlist.uri,
                        tracks: playlist.tracks
                        // Add other properties you want to store
                    };

                    // Only add the playlist if it doesn't exist in the Map
                    if (!updatedPlaylistsMap.has(playlistKey)) {
                        updatedPlaylistsMap.set(playlistKey, playlistData);
                    }
                });

                return updatedPlaylistsMap;
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user playlists:', error);
            throw error;
        }
    };

    const fetchAvailableDevices = async (accessToken) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player/devices', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            let myDevices = response.data.devices;
            setAllDevicesMap( () => {
                const updatedDevicesMap = new Map();

                myDevices.forEach(device => {
                    const deviceKey = device.name;
                    const deviceData = {
                        name: device.name,
                        id: device.id,
                        volume: device.volume_percent,
                    }
                    updatedDevicesMap.set(deviceKey, deviceData);

                })
                return updatedDevicesMap;
            })

            console.log(myDevices)
            return response.data;
        } catch (error) {
            console.error('Error fetching user playlists:', error);
            throw error;
        }
    }

    useEffect(() => {
        // Check for tokens on component mount
        fetchTokens();
    }, []);

    //Handle Menus
    const loadPlaylists = async () => {
        try {
            await fetchUserPlaylists(tokens.access_token);
            //Show Playlists
            setDisplayPlaylists(true);
            setDisplayDevice(false);
            // You can do additional actions after fetching and setting playlists
        } catch (error) {
            // Handle error if needed
            console.error('Error loading playlists:', error);
        }
    };

    const handleAvailableDevices = async () => {
        try {
            await fetchAvailableDevices(tokens.access_token);
        } catch (error){
            console.log("Error getting Available devices.")
        }
        setDisplayDevice(true);
        setDisplayPlaylists(false);
    }

    //When user chooses a playlist
    const handleChosenPlaylist =(e)=>{
        //console.log(e.target.dataset.playlist)
        if (e.target.dataset.playlist){
            setDynamicPlaylist(<WebPlayback accessToken={tokens.access_token} playlist={e.target.dataset.playlist}></WebPlayback>);
        }
    }

    return (
        <div>
        {isLoggedIn ? (
            <div>
                <div className='playlists'>
                    <Container>
                        <Row>
                            <GetUser accessToken={tokens.access_token} loginBtn={handleLogin} trackUri="spotify:track:6yzxDlblhlYBepcieip20S"></GetUser>
                        </Row>
                        <Row>
                            <Col className='leftPanel col-5'>
                                <Row>
                                    {dynamicPlaylist}
                                </Row>
                                    
                            </Col>
                            <Col className='playerright'>
                                <Row>
                                    <Col className='spotifyMenu'>
                                    <button className="spotifyButtons">
                                        <img src={spotifyIcon} alt="spotify-page"></img>
                                    </button>
                                    <button className="spotifyButtons" onClick={loadPlaylists}>
                                        <img src={libraryIcon} alt="library-page"></img>
                                    </button>
                                    <button className="spotifyButtons">
                                        <img src={castingIcon} alt="cast-page" onClick={handleAvailableDevices}></img>
                                    </button>
                                    <button className="spotifyButtons" onClick={handleLogin}>
                                        <img src={logoutIcon} alt="logout-page"></img>
                                    </button>
                                    </Col>
                                </Row>
                                <Row>
                                    { displyPlaylists &&
                                        <div className='flexPlaylists'>
                                            <p className='label-panel'>My Playlists</p>
                                            {[...allPlaylistsMap.values()].map((playlist, index) => (
                                                <Card
                                                    onClick={handleChosenPlaylist}
                                                    key={index}
                                                    bg="Dark"
                                                    className="mb-1 playlistEach"
                                                >
                                                    <Card.Body className='playlistBody' data-playlist={playlist.id}>
                                                        <Card.Img src={playlist.image || artHolder} className='playlistImg' />
                                                        <Card.Title className='playlistTitleCard'>{playlist.name}</Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </div>
                                    }

                                    { displayDevice &&
                                        <div className='flexPlaylists'>
                                            <p className='label-panel'>Available Devices</p>
                                            {[...allDevicesMap.values()].map((device, index) => (
                                            <div
                                                key={index}
                                                className="d-flex justify-content-between align-items-start eachDevice">
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{device.name}</div>
                                                    Volume: {device.volume}%
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                    }
                                </Row>          
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* <button onClick={handleLogout}>Logout</button> */}
                {/* Add playback controls or other features for logged-in users */}
            </div>
            ) : (
            <div>
                <h2>Login with Spotify</h2>
                <button onClick={handleLogin}>Login</button>
            </div>
            )}
        </div>
    );
    };

    export default SpotifyPlayer;

