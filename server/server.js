import express from 'express';
import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
const app = express();
const port = 3001;

import dotenv from 'dotenv'
dotenv.config()

// Proxy Spotify API requests
app.use(express.json());
app.use(cors({
  origin: 'http://192.168.86.28:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


// Proxy Spotify API requests
app.use('en-GB/spotify', createProxyMiddleware({
  target: 'https://accounts.spotify.com/',
  changeOrigin: true,
}));

const clientId = process.env.client_id; // Replace with your Spotify client ID
const clientSecret = process.env.client_id_secret; // Replace with your Spotify client secret
const redirectUri = 'http://192.168.86.28:3001/callback'; // Replace with your redirect URI

const handleLoginCallback = async (code) => {
  try {
    console.log("Login")
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Enable CORS for specific origin

// Enable CORS for specific origin
// Allow requests from multiple origins
app.use(cors({
  origin: '*',
}));


app.get('/login', (req, res) => {
  console.log('Reached /login route');
  const scope = "streaming \
                user-read-email \
                user-read-private";
  const spotifyAuthUrl = `http://192.168.86.28:3001/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
  console.log('Redirecting to Spotify:', spotifyAuthUrl);
  res.redirect(spotifyAuthUrl);
});

app.get('/authorize', (req, res) => {
  // Perform any necessary server-side logic if needed

  // Instead, the client will initiate the redirect
  const scope = 'user-read-private user-read-email';
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;

  res.status(200).send({ redirectTo: spotifyAuthUrl });
});


let storedTokens = {};

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokens = await handleLoginCallback(code);

    // Store the tokens
    storedTokens = {...tokens};
    res.redirect('http://192.168.86.28:3000');

    // In a real-world scenario, you would typically store tokens securely
    // and redirect the user to the frontend route or perform any other necessary actions
    // Save tokens to local storage
    console.log(tokens.access_token);
    console.log(tokens.refresh_token);

    
  } catch (error) {
    console.error('Error handling login callback:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get stored tokens
app.get('/get-tokens', (req, res) => {
  res.json(storedTokens);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
