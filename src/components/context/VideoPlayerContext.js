import { createContext, useEffect, useMemo, useRef, useState } from "react";

const VideoPlayerContext = createContext(null);

export default VideoPlayerContext;

export const VideoPlayerProvider = (props) => {
    const [videoId, setVideoId] = useState('');
    const [player, setPlayer] = useState(null);
    const [majorVolume, setMajorVolume] = useState(100);
    const skipPreferences = useRef({});
    const data = useMemo(() => (
        {
            "LZh4ioW31J8": [
                [147, ["multicategory"], false],
                [564, ["multicategory"], false],
                [1053, ["pencil"], false],
                [1507, ["wood", "keyboard"], false],
                [3120, ["mineral"], false]
            ],
            "Gq5bVmgxx30": [
                [147, ["multicategory"], false]
            ],
            "cjS5btICT8Y": [
                [147, ["multicategory"], false]
            ],
        }
    ), [])

    const onReady = (e) => {
        setPlayer(e.target);
        document.getElementsByClassName("loader")[0].setAttribute("style", "display: none;");
    };

    const saveSkipPreferences = () => {
        const checkboxes = Array.from(document.getElementsByClassName("preferencesCheckbox"));
        checkboxes.forEach(checkbox =>
            skipPreferences.current[checkbox.id] = checkbox.checked);
        console.log(skipPreferences.current);
        document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 1");
        setTimeout(() => {
            if (document.getElementsByClassName("preferencesMessage")[0])
                document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 0");
        }, 2500)
    };

    useEffect(() => {
        if (player) {
            const resetTime = setInterval(() => {
                if (player.getPlayerState() === -1) {
                    player.seekTo(0);
                    clearInterval(resetTime);
                }
            }, 1000)
        }

        if (player) {
            // 獲取影片ID
            let id = player.getVideoUrl().slice(-11);
            //data[id] 為該影片的資料 clip為其中一個片段的資料 clip[1]是該片段的所有tag clip[2]目前用來記錄該片段是否跳過
            data[id].forEach(clip => {
                clip[1].forEach(tag => {
                    if (skipPreferences.current[tag])
                        clip[2] = true;
                    else
                        clip[2] = false;
                });
            })
            //將data做成interval 每時間單位檢查對應秒數是否跳過 若是 則秒數跳到下一段
        }
        const interval = setInterval(() => {
            if (player && player.getPlayerState() === 1) {
                // 獲取影片ID
                let id = player.getVideoUrl().slice(-11);
                let currentTime = player.getCurrentTime().toFixed(0);
                for (let i = 0; data[id][i]; i++) {
                    // console.log(`currentTime:${currentTime}
                    // data[id][i - 1][0]:${(i ? currentTime >= data[id][i - 1][0] : "pass")} data[id][i][0]:${data[id][i][0]} data[id][i][2]:${data[id][i][2]}`)
                    if ((i ? currentTime >= data[id][i - 1][0] : true) && currentTime < data[id][i][0] && data[id][i][2]) {
                        // console.log(`第${i + 1}段觸發
                        //             現在秒數:${currentTime}
                        //             時間段為${i ? currentTime >= data[id][i - 1][0] : 0}~ ${data[id][i][0]}`);
                        player.seekTo(data[id][i][0]);
                    }
                }
            }
        }, 500)
        return () => clearInterval(interval);
    }, [player, data])

    useEffect(() => {

    }, [videoId, data])

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