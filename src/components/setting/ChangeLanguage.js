import { useContext } from "react";
import VideoPlayerContext from "../context/VideoPlayerContext";

const ChangeLanguage = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <section className="changeLanguageContainer container">
            <h2>{context.translateData["setting"]["change language"][context.currentLanguage]}</h2>
            <label>
                <input type="radio" className="changeLanguageRadio" name="language" id="en" onChange={(e) => context.actions.setCurrentLanguage(e.target.id)} checked={context.currentLanguage === "en"} /> English
            </label>
            <label>
                <input type="radio" className="changeLanguageRadio" name="language" id="zh-TW" onChange={(e) => context.actions.setCurrentLanguage(e.target.id)} checked={context.currentLanguage === "zh-TW"} /> 繁體中文
            </label>
        </section>
    );
}

export default ChangeLanguage;