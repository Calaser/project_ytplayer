import { useContext } from "react";

import VideoPlayerContext from "../context/VideoPlayerContext";

const Preferences = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <div className="preferencesContainer container">
            <h2>skip content</h2>
            <form className="preferencesForm">
                <label>
                    <input type="checkbox" className="preferencesCheckbox" id="multicategory" /> preview/multicategory
                </label>
                <label>
                    <input type="checkbox" className="preferencesCheckbox" id="pencil" /> pencil
                </label>
                <label>
                    <input type="checkbox" className="preferencesCheckbox" id="keyboard" /> keyboard
                </label>
                <br />
                <button type="button" className="preferencesButton" onClick={context.actions.saveSkipPreferences}>save skip preferences</button>
                <span className="preferencesMessage">Preferences saved!</span>
            </form>
        </div>
    );
}

export default Preferences;