import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './SpotifyPlayer.css';
import artHolder from "./images/artHolder.png";
import GetUser from './GetUser';
import WebPlayback from './WebPlayer';

const SpotifyPlayer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokens, setTokens] = useState();
    const [allPlaylistsMap, setAllPlaylistsMap] = useState(new Map());


    const fetchTokens = async () => {
        try {
            const response = await axios.get('http://192.168.86.28:3001/get-tokens');
            const fetchedTokens = response.data;

            if (fetchedTokens) {
                // Update state with the fetched tokens
                setTokens(fetchedTokens);
                console.log("I set the tokens now", fetchedTokens);
                
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

    const handleLogout = () => {
    // Clear tokens from local storage
    setIsLoggedIn(false);
    setTokens({})
    };
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

    useEffect(() => {
        // Check for tokens on component mount
        fetchTokens();
    }, []);

    const loadPlaylists = async () => {
        try {
            await fetchUserPlaylists(tokens.access_token);
            // You can do additional actions after fetching and setting playlists
        } catch (error) {
            // Handle error if needed
            console.error('Error loading playlists:', error);
        }
    };

    return (
        <div>
        {isLoggedIn ? (
            <div>
                <div className='playlists'>
                    <Container>
                        <Row>
                            <GetUser accessToken={tokens.access_token} trackUri="spotify:track:6yzxDlblhlYBepcieip20S"></GetUser>
                        </Row>
                        <Row>
                            <Col>
                            <button className="spotifyButtons" onClick={loadPlaylists}>My Library</button>
                            <button className="spotifyButtons" onClick={handleLogin}>Reload Token</button>
                            </Col>
                            <WebPlayback accessToken={tokens.access_token} playlist={allPlaylistsMap}></WebPlayback>
                        </Row>
                        <Row>
                            <Col className='flexPlaylists'>
                                {[...allPlaylistsMap.values()].map((playlist, index) => (
                                    <Card
                                        key={index}
                                        bg="Dark"
                                        className="mb-1 playlistEach"
                                    >
                                        <Card.Body className='playlistBody'>
                                            <Card.Img src={playlist.image || artHolder} className='playlistImg' />
                                            <Card.Title className='playlistTitle'>{playlist.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                ))}
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

