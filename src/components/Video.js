import { useContext } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

import VideoPlayerContext from "./context/VideoPlayerContext";

function Video() {
    const context = useContext(VideoPlayerContext);
    let { id } = useParams();


    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    return (
        <div className="loaderShell">
            <YouTube
                videoId={id}
                className={"YouTubePlayer"}
                // title={"title"}
                opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        // start: `${context.data[id].starttime}`,
                        // stop: sec
                        controls: 1,
                        autoplay: 0,
                        // playlist: `${id}`, //自動接著撥放
                    }
                }}
                onReady={context.actions.onReady}
            // onPlay={func}
            // onPause={func}
            // onEnd={func}
            // onError={func}
            // onStateChange={func}
            // onPlaybackRateChange={func}
            // onPlaybackQualityChange={func}
            />
            <span className="loader" />
        </div>
    );
}

export default Video;
