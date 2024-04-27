import Card from "./Card";

import VideoPlayerContext from "./context/VideoPlayerContext";
import { useContext } from "react";

const Home = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <main className="wrapper">
            <h1>{context.translateData["home"]["title"][context.currentLanguage]}</h1>
            <section className="cardContainer">
                {Object.entries(context.artistData).map(artist => // artist[0]=artist name artist[1]=data object
                    Object.entries(artist[1]["video"]).map(videoInfo => // videoInfo[0]=video id videoInfo[1]=video time
                        <Card artist={artist[0]} videoId={videoInfo[0]} key={videoInfo[0]} title={videoInfo[1][0]} time={videoInfo[1][1]} mode={0}/>)
                )}
            </section>
        </main >
    );
};

export default Home;