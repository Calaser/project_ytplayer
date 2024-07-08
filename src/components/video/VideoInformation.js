import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import VideoPlayerContext from "../context/VideoPlayerContext";

function VideoInformation() {
    const context = useContext(VideoPlayerContext);

    const [apiData, setAPIData] = useState();
    const [isExpandDescription, setIsExpandDescription] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        setIsExpandDescription(false);
    }, [id])

    useEffect(() => {
        context.actions.importYTDataAPI(id, "video")
            .then(module => {
                setAPIData(module["items"][0]);
            })
    }, [context.actions, id]);

    return (
        <div className="playerVideoInformation">
            <div className="playerVideoInformationStatistic">
                {apiData && `${context.actions.unitConverter(apiData["statistics"]["viewCount"], 1)} ${context.translateData["meter"]["view"][context.currentLanguage]}`}
                <span className="dot">‧</span>
                {apiData && context.actions.timeConverter(apiData["snippet"]["publishedAt"])}
            </div>
            <div className={`playerVideoInformationDescription ${isExpandDescription && "expand"}`}>
                {apiData && apiData["snippet"]["description"]}
            </div>
            {
                !isExpandDescription &&
                <button className="playerVideoInformationDescriptionBtn showMoreBtn" onClick={() => setIsExpandDescription(true)}>
                    {context.translateData["video"]["show more"][context.currentLanguage]}
                </button>
            }
            {
                isExpandDescription &&
                <button className="playerVideoInformationDescriptionBtn showLessBtn" onClick={() => setIsExpandDescription(false)}>
                    {context.translateData["video"]["show less"][context.currentLanguage]}
                </button>
            }
        </div>
    );
}

export default VideoInformation;