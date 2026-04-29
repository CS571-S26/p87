import React from "react";
import VideoClip from "../../components/VideoClip";

const API_KEY = 'AIzaSyC_1SspsHvNOJwF2cqG3oqLquWnqSOzeg0';

const Theater = () =>{

    return(
        <div>
            <h1><strong>Theater</strong></h1>
            <p>Here, you can watch recordings of past tournament sets!</p>
            <br></br>
            <VideoClip/>
        </div>
    )

}

async function fetchVideos () {

    const channelId = "UCado2vwS6mPQZc5-iZH0SLg";
    const url= `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=5&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.error.message}`);
        }

        const data = await response.json();

        // Map through the items to display the titles
        data.items.forEach(playlist => {
            console.log(`Playlist Title: ${playlist.snippet.title}`);
            console.log(`Video Count: ${playlist.contentDetails.itemCount}`);
            console.log('---');
        });

        return data.items;

    } catch (error) {
        console.error("Could not fetch playlists:", error);
    }
    
}
fetchVideos()
export default Theater;