import { createContext, useEffect, useRef, useState } from "react";

const VideoPlayerContext = createContext(null);

export default VideoPlayerContext;

export const VideoPlayerProvider = (props) => {
    const [videoId, setVideoId] = useState('');
    const [player, setPlayer] = useState(null);
    const [majorVolume, setMajorVolume] = useState(100);
    const skipPreferences = useRef({});
    const data = {
        "LZh4ioW31J8": [
            [147, ["multicategory"], false],
            [564, ["multicategory"], false],
            [1053, ["pencil"], false],
            [1507, ["wood", "keyboard"], false],
            [3120, ["mineral"], false]
        ],
        "Gq5bVmgxx30": {
            starttime: 10
        },
        "cjS5btICT8Y": {
            starttime: 15
        }
    }

    const onReady = (e) => {
        setPlayer(e.target);
        document.getElementsByClassName("loader")[0].setAttribute("style", "display: none;");
    };

    const saveSkipPreferences = () => {
        const checkboxes = Array.from(document.getElementsByClassName("skipcheckbox"));
        checkboxes.forEach(checkbox =>
            skipPreferences.current[checkbox.id] = checkbox.checked);
        console.log(skipPreferences.current);
    };

    useEffect(() => {
        if (player) {
            //獲取影片ID
            let id = player.getVideoUrl().slice(player.getVideoUrl().indexOf("=") + 1); 
            //data[id] 為該影片的資料 clip為其中一個片段的資料 clip[1]是該片段的所有tag clip[2]目前用來記錄該片段是否跳過
            data[id].forEach(clip => {
                clip[1].forEach(tag => {
                    if (skipPreferences.current[tag])
                        clip[2] = true;
                });
            })
            //將data做成interval 每時間單位檢查對應秒數是否跳過 若是 則秒數跳到下一段
        }
        const interval = setInterval(() => {
            if (player)
                console.log((player.getCurrentTime()).toFixed(0));
        }, 1000)
        return () => clearInterval(interval);
    }, [player])

    return (
        <VideoPlayerContext.Provider value={{
            videoId,
            player,
            majorVolume,
            skipPreferences,
            data,
            actions: {
                setVideoId: setVideoId,
                setPlayer: setPlayer,
                setMajorVolume: setMajorVolume,
                saveSkipPreferences: saveSkipPreferences,
                onReady: onReady
            }
        }}>
            {props.children}
        </VideoPlayerContext.Provider>
    );
};