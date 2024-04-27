import { useContext, useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import VideoPlayerContext from "./context/VideoPlayerContext";

import ArtistFavorite from "./ArtistFavorite";

function Information() {
    const context = useContext(VideoPlayerContext);

    const [apiData, setAPIData] = useState();

    let { id } = useParams();
    let artist = useMemo(() =>
        context.videoData[id]["artist"]
        , [context.videoData, id]);

    useEffect(() => {
        context.actions.importAPIData(context.artistData[artist]["id"])
            .then(module => {
                setAPIData(module["items"][0]);
            })
    }, [artist, context.actions, context.artistData]);
    return (
        <div>
            <div className="playerInformationTitle">{context.title}</div>
            <div className="playerInformationArtist">
                <Link to={`${context.root}/artist/${artist}`}>
                    <div className="playerInformationArtistImg" style={{ backgroundImage: `url(${apiData && apiData["snippet"]["thumbnails"]["default"]["url"]})` }}></div>
                </Link>
                <div className="playerInformationArtistInfo">
                    <Link to={`${context.root}/artist/${artist}`}>
                        <span className="playerInformationArtistInfoName">{artist}</span>
                    </Link>
                    <span className="playerInformationArtistInfoSub">{apiData && (
                        apiData["statistics"]["subscriberCount"] >= context.translateData["artist"]["divisor"][context.currentLanguage] ** 2 ?
                            `${apiData["statistics"]["subscriberCount"] / context.translateData["artist"]["divisor"][context.currentLanguage] ** 2}${context.translateData["artist"]["unit2"][context.currentLanguage]}` :
                            (apiData["statistics"]["subscriberCount"] >= context.translateData["artist"]["divisor"][context.currentLanguage] ?
                                `${apiData["statistics"]["subscriberCount"] / context.translateData["artist"]["divisor"][context.currentLanguage]}${context.translateData["artist"]["unit1"][context.currentLanguage]}` :
                                apiData["statistics"]["subscriberCount"]
                            )
                    )} {context.translateData["artist"]["sub"][context.currentLanguage]}</span>
                </div>
                <ArtistFavorite artist={artist}/>
            </div>
        </div>
    );
}

export default Information;