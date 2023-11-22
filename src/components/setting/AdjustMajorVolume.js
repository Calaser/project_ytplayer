import { useContext } from "react";
import VideoPlayerContext from "../context/VideoPlayerContext";

const AdjustMajorVolume = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <section className="adjustMajorVolumeContainer container">
            <h2>Major Volume Function</h2>
            <p className="perferenceDesc">Getting tired of changeing volume every time when you starting listening ASMR? Try out this auto-setting volume function.</p>
            <label>
                <input type="checkbox" className="majorVolumeCheckbox" onChange={(e) => context.actions.setIsMajorVolumeActive(e.target.checked)} checked={context.isMajorVolumeActive}/> Active Major Volume Function
            </label>
            <input
                type="range"
                name="majorvolume"
                disabled={!context.isMajorVolumeActive}
                min="0"
                max="100"
                step="1"
                value={context.majorVolume}
                onChange={(e) => context.actions.setMajorVolume(e.target.value)}
            />
            <span className="volumeValue">{context.majorVolume}</span>
        </section>
    );
}

export default AdjustMajorVolume;