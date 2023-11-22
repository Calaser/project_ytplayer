import { useContext } from "react";

import VideoPlayerContext from "./context/VideoPlayerContext";

function Information () {
    const context = useContext(VideoPlayerContext);
    return (
        <h2>{context.title}</h2>
    );
}

export default Information;