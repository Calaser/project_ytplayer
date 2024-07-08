import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import VideoPlayerContext from "./context/VideoPlayerContext";

function Card(props) {
    const context = useContext(VideoPlayerContext);

    const [apiData, setAPIData] = useState();

    useEffect(() => {
        context.actions.importYTDataAPI(props.videoId, "video")
            .then(module => {
                setAPIData(module["items"][0]);
            })
    }, [context.actions, context.artistData, props.videoId]);

    return (
        <div className="card">
            <Link className="cardLink" to={`${context.root}/video/${props.videoId}`}>
                <div className="cardImg" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg)` }} >
                    <div className="cardImgInfo">
                        <div className="cardImgInfoTop" />
                        <div className="cardImgInfoButtom">
                            <span className="cardImgInfoTime">{`${Math.floor(props.time / 3600)}:${Math.floor(props.time % 3600 / 60).toString().padStart(2, "0")}:${((props.time % 3600) % 60).toFixed(0).padStart(2, "0")}`}</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="cardInfo"> {/* mode 0: show artist. 1: don't show */}
                {
                    props.mode === 0 ?
                        <Link to={`${context.root}/artist/${props.artist}`}>
                            <img className="cardInfoImg" src={`${context.root}/channelImg/${props.artist}.jpg`} alt="channel icon of the artist"></img>
                        </Link> :
                        null
                }
                <div className="cardInfoRight">
                    <Link className="cardLink" to={`${context.root}/video/${props.videoId}`}>
                        <div className="cardInfoTitle">
                            {props.title}
                        </div>
                    </Link>
                    {
                        props.mode === 0 ?
                            <Link to={`${context.root}/artist/${props.artist}`}>
                                <div className="cardInfoArtist">
                                    {props.artist}
                                </div>
                            </Link> :
                            null
                    }
                    <div className="cardInfoVideo">
                        {apiData && `${context.actions.unitConverter(apiData["statistics"]["viewCount"], 1)} ${context.translateData["meter"]["view"][context.currentLanguage]}`}
                        <span className="dot">‧</span>
                        {apiData && context.actions.timeConverter(apiData["snippet"]["publishedAt"])}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Card;