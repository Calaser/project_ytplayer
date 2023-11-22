import { Link } from "react-router-dom";

function Card(props) {
    return (
        <div className="card">
            <Link className="cardLink" to={`/video/${props.videoId}`}>
                <div className="cardImg" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg)` }} >
                    <div className="cardImgInfo">
                        <div className="cardImgInfoTop" />
                        <div className="cardImgInfoButtom">
                            <span className="cardImgInfoTime">{`${Math.floor(props.time / 3600)}:${Math.floor(props.time % 3600 / 60).toString().padStart(2, "0")}:${((props.time % 3600) % 60).toFixed(0).padStart(2, "0")}`}</span>
                        </div>
                    </div>
                </div>

                <div className="cardInfo">
                    <img className="cardInfoImg" src={`/channelImg/${props.artist}.jpg`} alt="channel icon of the artist"></img>
                    <div className="cardInfoRight">
                        <div className="cardInfoTitle">
                            {props.title}
                        </div>
                        <div className="cardInfoArtist">
                            {props.artist}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;