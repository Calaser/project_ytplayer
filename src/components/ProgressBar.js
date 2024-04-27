import { useContext } from "react";

import VideoPlayerContext from "./context/VideoPlayerContext";

function ProgressBar() {
    const context = useContext(VideoPlayerContext);


    //use transparentSpace to make hover progressBar better
    return (
        <>
            <div className="transparentSpace">
            </div>
            <div className="progressBar">
                <div className="indicator" />
                {context.player && context.isDataUpdate ? context.videoData[context.videoId]["perference"].map(clip =>
                    <div
                        className={`timeStamp ${clip[2] ? "skip" : ""}`}
                        onClick={clip[2] ? null : () => context.player.seekTo(clip[0])}
                        onKeyDown={clip[2] ? null : (e) => {
                            if (e.key === "Enter" || e.key === " ")
                                context.player.seekTo(clip[0])
                        }}
                        key={clip[0]}
                        tabIndex={0}
                        style={{ marginLeft: `${clip[0] * 100 / context.player.getDuration().toFixed(0)}%` }} />) : null
                }
            </div>
        </>
    );
}

export default ProgressBar;