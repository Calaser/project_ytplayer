import { useContext } from "react";
import VideoPlayerContext from "../context/VideoPlayerContext";

const AdjustMajorVolume = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <div className="adjustMajorVolumeContainer container">
            <h2>Adjust Major Volume</h2>
            <input
                type="range"
                name="majorvolume"
                min="0"
                max="100"
                step="1"
                value={context.majorVolume}
                onChange={(e) => context.actions.setMajorVolume(e.target.value)}
            />
            <span className="volumeValue">{context.majorVolume}</span>
        </div>
    );
}

export default AdjustMajorVolume;