import Video from "./Video";
import ProgressBar from "./ProgressBar";

function Player() {
    return (
        <main className="wrapper">
            <div className="player-size-layer">
                <Video />
                <ProgressBar />
            </div>
        </main>
    );
}

export default Player;