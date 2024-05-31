import { useContext, useEffect, useState } from "react";

import VideoPlayerContext from "../context/VideoPlayerContext";

function ProgressBar() {
    const context = useContext(VideoPlayerContext);

    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const getDuration = setInterval(() => {
            if (context.player.current !== null && (duration === null || context.player.current.getDuration() !== duration)) {
                setDuration(context.player.current.getDuration().toFixed(0));
            }
        }, 500)
        return () => clearInterval(getDuration);
    }, [context.player, duration])

    return (
        <>
            <div className="progressBar">
                <div className="indicator" />
                {
                    context.videoData[context.location.pathname.slice(-11)]["perference"].map(clip =>
                        <div
                            className={`timeStamp ${clip[2] ? "skip" : ""}`}
                            onClick={clip[2] ? null : () => context.player.current.seekTo(clip[0])}
                            onKeyDown={clip[2] ? null : (e) => {
                                if (e.key === "Enter")
                                    context.player.current.seekTo(clip[0])
                            }}
                            key={clip[0]}
                            tabIndex={0}
                            style={duration === null || ((clip[0] * 100) / duration) > 100 ? { display: `none` } : { marginLeft: `${(clip[0] * 100) / duration}%` }} />)
                }
            </div>
        </>
    );
}

export default ProgressBar;