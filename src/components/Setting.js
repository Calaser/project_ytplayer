import { useContext } from "react";

import VideoPlayerContext from "./context/VideoPlayerContext";

const Settings = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <div className="wrapper">
            <h1>Settings</h1>
            <h2>Preferences</h2>
            <h3>Adjust Major Volume</h3>
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

            <h3>skip content</h3>
            <form className="skippreferences">
                <label>
                    <input type="checkbox" className="skipcheckbox" id="multicategory" /> preview/multicategory
                </label>
                <label>
                    <input type="checkbox" className="skipcheckbox" id="pencil" /> pencil
                </label>
                <label>
                    <input type="checkbox" className="skipcheckbox" id="keyboard" /> keyboard
                </label>
                <br/>
                <button type="button" onClick={context.actions.saveSkipPreferences}>save skip preferences</button>
            </form>
        </div>
    );
};

export default Settings;