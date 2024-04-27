import { useContext } from "react";

import ChangeLanguage from "./setting/ChangeLanguage";
import AdjustMajorVolume from "./setting/AdjustMajorVolume";
import Preferences from "./setting/Preferences";
import VideoPlayerContext from "./context/VideoPlayerContext";

const Settings = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <main className="setting wrapper">
            <h1>{context.translateData["setting"]["setting"][context.currentLanguage]}</h1>
            <ChangeLanguage />
            <AdjustMajorVolume />
            <Preferences />
        </main>
    );
};

export default Settings;