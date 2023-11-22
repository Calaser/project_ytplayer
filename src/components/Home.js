import Card from "./Card";

import VideoPlayerContext from "./context/VideoPlayerContext";
import { useContext } from "react";

const Home = () => {
    const context = useContext(VideoPlayerContext);

    return (
        <main className="wrapper">
            <h1>Recommend Video</h1>
            <div className="cardContainer">
                {Object.entries(context.artistData).map(artist => 
                    //artist[0] = channel name   artist[1]/videoInfo = [ ["videoId1","videoTitle1"]], ["videoId2","videoTitle2"]]... ]
                    //artist[1][0]/videoInfo[0] = "videoId"   artist[1][1]/videoInfo[1] = "videoTitle"
                    artist[1].map(videoInfo =>
                        <Card key={videoInfo[0]} videoId={videoInfo[0]} title={videoInfo[1]} artist={artist[0]} time={videoInfo[2]}/>)
                )}
        </div>
        </main >
    );
};

export default Home;