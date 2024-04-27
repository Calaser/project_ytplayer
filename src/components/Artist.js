import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "./Card";
import ArtistFavorite from "./ArtistFavorite";
import VideoPlayerContext from "./context/VideoPlayerContext";

const Artist = () => {
    const context = useContext(VideoPlayerContext);

    const { artist } = useParams();

    const [apiData, setAPIData] = useState();

    useEffect(() => {
        context.actions.importAPIData(context.artistData[artist]["id"])
            .then(module => {
                setAPIData(module["items"][0]);
            })
    }, [artist, context.actions, context.artistData]);

    const [isDescriptionWindowOpen, setIsDescriptionWindowOpen] = useState(false);



    return (
        <main className="wrapper">
            <div className="artistBanner">
                <img className="artistBannerImg" src={apiData && `${apiData["brandingSettings"]["image"]["bannerExternalUrl"]}=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj`} alt="artist banner"></img>
            </div>
            <div className="artistHeader" >
                <div className="artistImg" style={{ backgroundImage: `url(${apiData && apiData["snippet"]["thumbnails"]["medium"]["url"]})` }}></div>
                <div className="artistInfo">
                    <h1 className="artistInfoTitle">{artist}</h1>
                    <div className="artistInfoContent">
                        <span>{apiData && apiData["snippet"]["customUrl"]}</span>
                        <span className="dot">‧</span>
                        <span>{apiData && (
                            apiData["statistics"]["subscriberCount"] >= context.translateData["artist"]["divisor"][context.currentLanguage] ** 2 ?
                                `${apiData["statistics"]["subscriberCount"] / context.translateData["artist"]["divisor"][context.currentLanguage] ** 2}${context.translateData["artist"]["unit2"][context.currentLanguage]}` :
                                (apiData["statistics"]["subscriberCount"] >= context.translateData["artist"]["divisor"][context.currentLanguage] ?
                                    `${apiData["statistics"]["subscriberCount"] / context.translateData["artist"]["divisor"][context.currentLanguage]}${context.translateData["artist"]["unit1"][context.currentLanguage]}` :
                                    apiData["statistics"]["subscriberCount"]
                                )
                        )} {context.translateData["artist"]["sub"][context.currentLanguage]}</span>
                        <span className="dot">‧</span>
                        <span>{apiData && ` ${apiData["statistics"]["videoCount"]} ${context.translateData["artist"]["video"][context.currentLanguage]}`}</span>
                        <div className="artistInfoDescription" onClick={() => setIsDescriptionWindowOpen(true)}>
                            <span>
                                {apiData && `${apiData["snippet"]["description"].substring(0, apiData["snippet"]["description"].indexOf('\n') !== -1 ? apiData["snippet"]["description"].indexOf('\n') : 9999)}`}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24"><path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path></svg>
                        </div>
                        <ArtistFavorite artist={artist} />
                        <div className="artistInfoDescriptionWindow" style={{ display: (isDescriptionWindowOpen ? "block" : "none") }}>
                            <div className="artistInfoDescriptionWindowBackground" onClick={() => setIsDescriptionWindowOpen(false)}></div>
                            <div className="artistInfoDescriptionWindowHeader">
                                <h3 className="artistInfoDescriptionWindowTitle">{context.translateData["artist"]["about"][context.currentLanguage]}</h3>
                                <div className="artistInfoDescriptionWindowBtn" onClick={() => setIsDescriptionWindowOpen(false)}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false"><path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path></svg></div>
                            </div>
                            <span className="artistInfoDescriptionWindowContent">
                                {apiData && apiData["snippet"]["description"]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <h2 className="cardContainerTitle">{context.translateData["artist"]["title"][context.currentLanguage]}</h2>
            <div className="cardContainer">
                {Object.entries(context.artistData[artist]["video"]).map(videoInfo => // videoInfo[0]=video id videoInfo[1]=video time
                    <Card artist={artist} videoId={videoInfo[0]} key={videoInfo[0]} title={videoInfo[1][0]} time={videoInfo[1][1]} mode={1} />)}
            </div>
        </main >
    );
};

export default Artist;