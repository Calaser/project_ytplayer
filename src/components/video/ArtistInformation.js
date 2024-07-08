import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import VideoPlayerContext from "../context/VideoPlayerContext";

import ArtistFavorite from "../ArtistFavorite";

function ArtistInformation() {
    const context = useContext(VideoPlayerContext);

    const [apiData, setAPIData] = useState();

    let { id } = useParams();
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        context.actions.importInnerDataAPI(id, "video")
            .then(module => {
                setArtist(module["artist"]);
            })
        },[context.actions, id])

    useEffect(() => {
        if(artist)
        context.actions.importYTDataAPI(context.artistData[artist]["id"], "artist")
            .then(module => {
                setAPIData(module["items"][0]);
            })
    }, [artist, context.actions, context.artistData]);

    return (
        <div className="playerArtistInformationWrapper">
            <div className="playerArtistInformation">
                <Link to={`${context.root}/artist/${artist}`}>
                    <div className="playerArtistInformationImg" style={{ backgroundImage: `url(${apiData && apiData["snippet"]["thumbnails"]["default"]["url"]})` }}></div>
                </Link>
                <div className="playerArtistInformationInfo">
                    <Link to={`${context.root}/artist/${artist}`}>
                        <span className="playerArtistInformationInfoName">{artist}</span>
                    </Link>
                    <span className="playerArtistInformationInfoSub">{apiData && `${context.actions.unitConverter(apiData["statistics"]["subscriberCount"], 2)} ${context.translateData["meter"]["sub"][context.currentLanguage]}`}</span>
                </div>
                <ArtistFavorite artist={artist} />
            </div>
        </div>
    );
}

export default ArtistInformation;