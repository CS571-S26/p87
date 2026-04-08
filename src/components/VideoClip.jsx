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

        return <YouTube videoId="oU16n_WHeoU" options={options} onReady={this._onReady} id="video" />;
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

export default VideoClip;