import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Iframe from "./video/Iframe";
import ClipButton from "./video/ClipButton";
import ProgressBar from "./video/ProgressBar";
import VideoInformation from "./video/VideoInformation";
import ArtistInformation from "./video/ArtistInformation";
import Card from "./Card";

import VideoPlayerContext from "./context/VideoPlayerContext";

function Player() {
    const context = useContext(VideoPlayerContext);
    const { id } = useParams();

    context.player.current = null;

    // let currentKey = null;
    // if (currentKey !== context.location.key)
    //     currentKey = context.location.key;

    // init time reset
    useEffect(() => {
        const resetTime = setInterval(() => {
            if (context.player.current && context.player.current.getPlayerState() === 1) {
                context.player.current.seekTo(0);
                clearInterval(resetTime);
            }
        }, 200)
    }, [context.player, id])

    // execute preference function
    useEffect(() => {
        // videoData[id][perference] 為該影片的資料 clip為其中一個片段的資料 clip[1]是該片段的所有tag clip[2]目前用來記錄該片段是否跳過
        context.videoData[id]["perference"].forEach(clip => {
            clip[1].every(tag => { //every:forEach but need a return: true = loop continued / false = loop break, use break for currectly multi tag check
                if (context.skipPreferences[tag] === undefined) {
                    console.log(`影片資料中含有錯誤tag: ${tag}`);
                    return true;
                }
                if (context.skipPreferences[tag][0]) {
                    clip[2] = true;
                    return false;
                }
                else {
                    clip[2] = false;
                    return true;
                }
            });
        });
        // 每時間單位根據videoData檢查對應秒數是否跳過 若是則執行略過
        const interval = setInterval(() => {
            if (context.player.current && context.player.current.getPlayerState() === 1) {
                let time = 0;
                let currentTime = context.player.current.getCurrentTime() !== undefined ? context.player.current.getCurrentTime().toFixed(0) : 0;
                for (let i = 0; context.videoData[id]["perference"][i]; i++) {
                    if (currentTime >= context.videoData[id]["perference"][i][0] && currentTime < (context.videoData[id]["perference"][i + 1] ? context.videoData[id]["perference"][i + 1][0] : Infinity) && context.videoData[id]["perference"][i][2]) { //符合skip條件
                        // console.log(`第${i}段觸發
                        //                 現在秒數:${currentTime}
                        //                 時間段為${videoData[id]["perference"][i][0]}~${(videoData[id]["perference"][i + 1] ? videoData[id]["perference"][i + 1][0] : "last")}
                        // `);
                        let j = i + 1;
                        while (true) { //若後面有連接著的跳過則記錄完才一次跳過
                            if (!context.videoData[id]["perference"][j]) { //本part為最後一段
                                time = 99999;
                                break;
                            }
                            else if (!context.videoData[id]["perference"][j][2]) { //非最後但skip到此為止
                                time = context.videoData[id]["perference"][j][0];
                                break;
                            }
                            j++;
                        }
                        break;
                    }
                }
                if (time) {
                    context.player.current.seekTo(time);
                    // maybe pop a message to prompt user some part is skipped.
                }
            }
        }, 500)
        return () => clearInterval(interval);
    }, [context.player, context.skipPreferences, context.videoData, id])

    // progressing bar time stamp maker
    useEffect(() => {
        const interval = setInterval(() => {
            if (context.player.current && context.player.current.getCurrentTime() && context.player.current.getDuration()) {
                let currentTime = context.player.current.getCurrentTime() !== undefined ? context.player.current.getCurrentTime().toFixed(0) : 0;
                let videoTime = context.player.current.getDuration() !== undefined ? context.player.current.getDuration().toFixed(0) : 0;
                document.getElementsByClassName("indicator")[0].style = `margin-left: ${currentTime / videoTime * 100}%`;
            }
        }, 200)

        return () => clearInterval(interval);
    }, [context.player, id])

    // adjust volume function
    useEffect(() => {
        const interval = setInterval(() => {
            if (context.player.current && context.player.current.getPlayerState() === 1 && parseInt(context.player.current.getVolume()) !== parseInt(context.majorVolume)) {
                context.player.current.setVolume(context.majorVolume);
            }
        }, 500);
        if (!context.isMajorVolumeActive) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [context.isMajorVolumeActive, context.majorVolume, context.player, id])

    // video page space pause
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                e.preventDefault();
                if (context.player.current.getPlayerState() === 1)
                    context.player.current.pauseVideo();
                else if (context.player.current.getPlayerState() === 2)
                    context.player.current.playVideo();
            }
        })
    }, [context.player])

    const [sameArtistVideos, setSameArtistVideos] = useState(null);
    const [differentArtistVideos, setDifferentArtistVideos] = useState(null);

    function videoListCreator(mode, returnNumber) {
        let data;

        switch (mode) {
            case 1: // same artist
                data = Object.entries(context.artistData).filter(artist => context.videoData[id]["artist"] === artist[0])[0];
                break;
            case 2: // different artist
                data = Object.entries(context.artistData).filter(artist => context.videoData[id]["artist"] !== artist[0])[0];
                break;
            default:
                console.log("Unexpected mode!");
                return null;
        }

        let videoDataArray = Object.entries(data[1]["video"]);
        let videoJSX;
        for (let i = 0; i < returnNumber; i++) {
            let index = Math.floor(Math.random() * videoDataArray.length);
            if (id !== videoDataArray[index][0])
                videoJSX =
                    <>
                        {videoJSX}
                        <Card artist={data[0]} videoId={videoDataArray[index][0]} key={videoDataArray[index][0]} title={videoDataArray[index][1][0]} time={videoDataArray[index][1][1]} mode={0} />
                    </>
            else
                i--;

            videoDataArray.splice(index, 1);
            if (videoDataArray.length === 0)
                break;
        }
        return videoJSX;
    }

    useEffect(() => {
        setSameArtistVideos(videoListCreator(1, 2));
        setDifferentArtistVideos(videoListCreator(2, 4));
    }, [id]);

    return (
        <main className="wrapper">
            <div className="playerLayer">
                <Iframe />
                <ClipButton />
                <ProgressBar />
                <VideoInformation />
            </div>
            <div className="playerSideBar">
                <ArtistInformation />
                <h2>{context.translateData["video"]["same artist"][context.currentLanguage]}</h2>
                <div className="playerSideBarVideoContainer">
                    {sameArtistVideos}
                </div>
                <h2>{context.translateData["video"]["other artist"][context.currentLanguage]}</h2>
                <div className="playerSideBarVideoContainer">
                    {differentArtistVideos}
                </div>
            </div>
        </main>
    );
}

export default Player;