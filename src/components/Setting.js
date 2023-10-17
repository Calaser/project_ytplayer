import AdjustMajorVolume from "./setting/AdjustMajorVolume";
import Preferences from "./setting/Preferences";

const Settings = () => {
    return (
        <main className="setting wrapper">
            <h1>Settings</h1>
            <AdjustMajorVolume />
            <Preferences />
        </main>
    );
};

export default Settings;