import React from "react";
import YouTube from "react-youtube";

class VideoClip extends React.Component {
    render (){
        const options = {
            height: '480',
            width: '640',
            playerVars: {
                autoplay: 1,
                control: 1,
            },
        };

        return <YouTube videoId="nXYudS_BeTk" options={options} onReady={this._onReady} id="video" />;
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

export default VideoClip;