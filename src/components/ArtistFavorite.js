import { useContext } from "react";

import VideoPlayerContext from "./context/VideoPlayerContext";

function ArtistFavorite({ artist }) {
    const context = useContext(VideoPlayerContext);

    return (
        <div className="playerArtistInformationFavorite" onClick={() => context.actions.setArtistFavoriteData(prev => ({ ...prev, [artist]: !prev[artist] }))} tabIndex={0} onKeyDown={(e) => (e.key === "Enter") && context.actions.setArtistFavoriteData(prev => ({ ...prev, [artist]: !prev[artist] }))}>
            {!context.artistFavoriteData[artist] ?
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f15" viewBox="0 0 16 14"> <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" /> </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f15" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
            }
            <span>{!context.artistFavoriteData[artist] ? context.translateData["artistFavorite"]["btn1"][context.currentLanguage] : context.translateData["artistFavorite"]["btn2"][context.currentLanguage]}</span>
        </div>
    )
}

export default ArtistFavorite;