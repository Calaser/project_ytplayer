import Video from "./Video";
import ProgressBar from "./ProgressBar";

function Player() {
    return (
        <div className="wrapper">
            <div className="player-size-layer">
                <Video />
                <ProgressBar />
            </div>
        </div>
    );
}

export default Player;