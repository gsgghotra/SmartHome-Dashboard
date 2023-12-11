import "./spotify.js";
import "./playerStyle.css";
import peachTheme from "./assets/video/BLACKVINYL.mp4";
import artHolder from "./assets/images/artHolder.png";

const useScript = url => {
        const script = document.createElement('script');
        const Embeddiv = document.createElement('div');

        Embeddiv.setAttribute("id", "embed-iframe")

        script.src = url;
        script.async = true;

        
        document.body.appendChild(Embeddiv);
        document.body.appendChild(script);



    };

const MusicPlayer = () => {
    
    useScript("https://open.spotify.com/embed/iframe-api/v1");

    const handleSpotifyPrev = () => {
        // Logic for handling Spotify Prev
    };
    
    const handleSpotifyPlay = () => {
        // Logic for handling Spotify Play
    };
    
    const handleSpotifyNext = () => {
        // Logic for handling Spotify Next
    };
    return(
        <>
        <div id="optionSection">
        <button className="noselect" id="option1" data-search="Sidhu moose wala">Start Player</button>
        </div>
            <section className="player" id="player">
                <div className="containerMain">
                <div className="container-fluid containerPlayer">
                    <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4" style={{ display: 'flex', justifyContent: 'center', minWidth: '380px', marginTop: '20px' }}>
        
                        <section id="playlists" className="columnPlayer">
                        <div id="mediaPlayer" className="visible">
                            <div id="wrap_video">
                            <div id="video_box">
                                <div id="video_overlays">
                                <img src={artHolder} id="songArt" className="artOverlay" alt="Song Art" />
                                </div>
                                <div>
                                <video id="artVideo" loop>
                                    <source src={peachTheme} type="video/mp4"></source>
                                    Your browser does not support the video tag.
                                </video>
                                </div>
                            </div>
                            </div>
                            <h4 className="musicTitle" id="songTitle"> Song Title</h4>
                            <p className="playlistTitle" id="playlistTitle">Playlist</p>
                            <span className="currentTimer" id="currentTimer">0:00</span>
                            <span className="timer" id="timer">0:00</span>
                            <input type="range" id="trackSlider" />
        
                            <ul className="controls">
                            <li>
                                <button onClick={() => handleSpotifyPrev()} id="spotifyPrev">
                                <span className="fa-solid fa-angle-left fa-2xl playericon"></span>
                                </button>
                            </li>
        
                            <li>
                                <button onClick={() => handleSpotifyPlay()} id="spotifyPlay">
                                <span id="playerToogleBtn" className="fa-solid fa-play fa-2xl playericon"></span>
                                </button>
                            </li>
        
                            <li>
                            <button onClick={() => handleSpotifyNext()} id="spotifyNext">
                                <span className="fa-solid fa-angle-right fa-2xl playericon"></span>
                                </button>
                            </li>
                            </ul>
                        </div>
                        </section>
        
                    </div>
                    </div>
                </div>
                </div>
            </section>
            {/* Tracks */}
            <div className="col-sm-12 col-md-6 col-lg-4" style={{ minWidth: '380px', marginTop: '20px' }}>
            <div className="row">
                {/* Playlists */}
                <div className="nextTracks">
                <h2>Next Tracks</h2>
                <div id="nextTracks">

                </div>
                </div>
            </div>
            </div>

            {/* Last Column */}
            <div className="col-sm-12 col-md-6 col-lg-4" style={{ minWidth: '380px', marginTop: '20px' }}>
            <div className="row">
                {/* Playlists */}
                <div className="playlistsSuggestions" id="similarPlaylists">
                <h2>Similar Albums</h2>
                </div>
            </div>
            </div>
        </> 
    )
}
export default MusicPlayer