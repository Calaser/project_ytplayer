import Video from "./Video";
import ProgressBar from "./ProgressBar";
import Information from "./Information";

function Player() {
    return (
        <main className="wrapper">
            <div className="player-size-layer">
                <Video />
                <ProgressBar />
                <Information />
            </div>
        </main>
    );
}

export default Player;