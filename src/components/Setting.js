import AdjustMajorVolume from "./setting/AdjustMajorVolume";
import Preferences from "./setting/Preferences";

const Settings = () => {
    return (
        <div className="setting wrapper">
            <h1>Settings</h1>
            <AdjustMajorVolume />
            <Preferences />
        </div>
    );
};

export default Settings;