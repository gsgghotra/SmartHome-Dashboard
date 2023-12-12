import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpotifyPlayer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokens, setTokens] = useState(null);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await axios.get('http://localhost:3001/get-tokens');
                let fetchedTokens = response.data;

                if(fetchedTokens.access_token){
                    // Update state with the fetched tokens
                    setTokens(fetchedTokens);
                }
                // Update isLoggedIn based on the presence of tokens
                setIsLoggedIn(!!fetchedTokens.access_token);
        

            } 
            catch (error){
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
    }, []);

    const handleLogin = async () => {
    try {
        const response = await axios.get('http://localhost:3001/login');
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
            console.log(response.data.items[0].name)
            return response.data;
        } catch (error) {
            console.error('Error fetching user playlists:', error);
            throw error;
        }
    };

    if(isLoggedIn){
        // console.log(tokens)
        fetchUserPlaylists(tokens.access_token);
    }




    return (
        <div>
        {isLoggedIn ? (
            <div>
                <h2>Welcome to Spotify Player!</h2>
                <button onClick={handleLogout}>Logout</button>
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

