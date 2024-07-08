import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import VideoPlayerContext from "../context/VideoPlayerContext";

function ClipButton({videoData}) {
    const context = useContext(VideoPlayerContext);

    const { id } = useParams();

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoData && context.player.current && (context.player.current.getPlayerState() === 1 || context.player.current.getPlayerState() === 2 || context.player.current.getPlayerState() === 3)) {
                let currentTime = context.player.current.getCurrentTime().toFixed(0);

                for (let i = 1; videoData["preference"][i]; i++) {
                    if (currentTime < videoData["preference"][i][0]) {
                        if (i > 1) {
                            document.getElementsByClassName("clipTagPrev")[0].innerText = `${videoData["preference"][i - 2][1].map(tag => context.translateData["tag"][tag][context.currentLanguage]).join(", ")}`;
                            if (document.getElementsByClassName("clipButtonPrev")[0].classList.contains("unavailable")) {
                                document.getElementsByClassName("clipButtonPrev")[0].classList.remove("unavailable")
                            }
                        }
                        else {
                            document.getElementsByClassName("clipTagPrev")[0].innerText = "";
                            document.getElementsByClassName("clipButtonPrev")[0].classList.add("unavailable");
                        }
                        document.getElementsByClassName("clipTagNow")[0].innerText = `${videoData["preference"][i - 1][1].map(tag => context.translateData["tag"][tag][context.currentLanguage]).join(", ")}`;
                        document.getElementsByClassName("clipTagNext")[0].innerText = `${videoData["preference"][i][1].map(tag => context.translateData["tag"][tag][context.currentLanguage]).join(", ")}`;
                        break;
                    }
                    //last part
                    if (!videoData["preference"][i + 1]) {
                        document.getElementsByClassName("clipTagPrev")[0].innerText = `${videoData["preference"][i - 1][1].map(tag => context.translateData["tag"][tag][context.currentLanguage]).join(", ")}`;
                        document.getElementsByClassName("clipTagNow")[0].innerText = `${videoData["preference"][i][1].map(tag => context.translateData["tag"][tag][context.currentLanguage]).join(", ")}`;
                        document.getElementsByClassName("clipTagNext")[0].innerText = "End";
                    }
                }
            }
        }, 300)
        return () => clearInterval(interval);
    }, [id, context.player, videoData, context.translateData, context.currentLanguage])

    function clickBtn(mode) {
        let currentTime = context.player.current.getCurrentTime().toFixed(0);
        for (let i = 1; videoData["preference"][i]; i++) {
            if (currentTime < videoData["preference"][i][0]) {
                switch (mode) {
                    case -1:
                        if (i >= 2)
                            context.player.current.seekTo(videoData["preference"][i - 2][0]);
                        break;
                    case 0:
                        context.player.current.seekTo(videoData["preference"][i - 1][0]);
                        break;
                    case 1:
                        context.player.current.seekTo(videoData["preference"][i][0]);
                        break;
                    default:
                        console.log("Unexpected clickBtn mode!");
                }
                break;
            }
            //last part
            if (!videoData["preference"][i + 1]) {
                switch (mode) {
                    case -1:
                        (i > 2) ? context.player.current.seekTo(videoData["preference"][i - 1][0]) : context.player.current.seekTo(0);
                        break;
                    case 0:
                        context.player.current.seekTo(videoData["preference"][i][0]);
                        break;
                    case 1:
                        context.player.current.seekTo(context.player.current.getDuration().toFixed(0) - 1); //this line is for fix display bug
                        context.player.current.seekTo(context.player.current.getDuration().toFixed(0));
                        break;
                    default:
                        console.log("Unexpected clickBtn mode!");
                }
            }
        }
    }

    return (
        <div className="clipButtonContainer">
            <div className="clipButton clipButtonPrev" onClick={() => clickBtn(-1)} tabIndex={0} onKeyDown={(e) => (e.key === "Enter") && clickBtn(-1)}>
                <span className="clipTagTitle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 6 16 18"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M8 12l6-6v12z" /> </g> </svg>
                    {context.translateData["video"]["previous part"][context.currentLanguage]}
                </span>
                <span className="clipTagContent clipTagPrev"></span>
            </div>
            <div className="clipButton clipButtonNow" onClick={() => clickBtn(0)} tabIndex={0} onKeyDown={(e) => (e.key === "Enter") && clickBtn(0)}>
                <span className="clipTagTitle">
                    {context.translateData["video"]["this part"][context.currentLanguage]}
                </span>
                <span className="clipTagContent clipTagNow"></span>
            </div>
            <div className="clipButton clipButtonNext" onClick={() => clickBtn(1)} tabIndex={0} onKeyDown={(e) => (e.key === "Enter") && clickBtn(1)}>
                <span className="clipTagTitle">
                    {context.translateData["video"]["next part"][context.currentLanguage]}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 6 16 18" style={{ transform: "scaleX(-1)" }}> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M8 12l6-6v12z" /> </g> </svg>
                </span>
                <span className="clipTagContent clipTagNext"></span>
            </div>
        </div >
    );
}

export default ClipButton;