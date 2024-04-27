import { useContext } from "react";
import VideoPlayerContext from "../context/VideoPlayerContext";

const AdjustMajorVolume = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <section className="adjustMajorVolumeContainer container">
            <h2>{context.translateData["setting"]["Volume Auto-Setting"][context.currentLanguage]}</h2>
            <p className="perferenceDesc">{context.translateData["setting"]["Volume Auto-Setting2"][context.currentLanguage]}</p>
            <label>
                <input type="checkbox" className="majorVolumeCheckbox" onChange={(e) => context.actions.setIsMajorVolumeActive(e.target.checked)} checked={context.isMajorVolumeActive}/> {context.translateData["setting"]["Volume Auto-Setting3"][context.currentLanguage]}
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