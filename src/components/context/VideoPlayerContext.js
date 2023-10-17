import { createContext, useEffect, useMemo, useState } from "react";

const VideoPlayerContext = createContext(null);

export default VideoPlayerContext;

export const VideoPlayerProvider = (props) => {
    const [videoId, setVideoId] = useState('');
    const [player, setPlayer] = useState(null);
    const [isMajorVolumeActive, setIsMajorVolumeActive] = useState(false);
    const [majorVolume, setMajorVolume] = useState(100);
    const [skipPreferences, setSkipPreferences] = useState(
        {
            "liquid": [false, 0], //first value is skip setting, second value is preferences category
            "bubble": [false, 0],
            "pencil": [false, 0],
            "paper": [false, 0],
            "keyboard": [false, 0],
            "chalk": [false, 0],
            "soap": [false, 0],
            "bubblewrap": [false, 0],
            "crystal": [false, 0],

            "rubbing": [false, 1],
            "scratching": [false, 1],
            "tapping": [false, 1],
            "carving": [false, 1],
            "crushing": [false, 1],
            "brushing": [false, 1],
            "eardigging": [false, 1],
            "sticky": [false, 1],

            "multicategory": [false, 2]
        }
    );
    const [tempSkipPreferences, setTempSkipPreferences] = useState({});

    const data = useMemo(() => (
        {
            "LZh4ioW31J8": [
                [0, ["multicategory"], false], //starting time / category / isThisPartSkipped
                [147, ["multicategory"], false],
                [564, ["pencil", "paper"], false],
                [1053, ["keyboard", "tapping"], false],
                [1507, ["chalk", "liquid", "crushing", "carving"], false],
                [3120, ["chalk", "carving", "brushing"], false],
                [3533, ["keyboard", "tapping"], false],
                [4207, ["keyboard", "tapping"], false],
                [4810, ["keyboard", "tapping"], false],
                [5352, ["keyboard", "tapping"], false],
                [5774, ["keyboard", "tapping"], false],
                [6211, ["keyboard", "tapping"], false],
                [6488, ["bubblewrap", "rubbing"], false],
                [7066, ["eardigging", "tapping", "rubbing"], false],
                [7531, ["eardigging", "rubbing"], false],
                [7978, ["eardigging", "rubbing"], false],
                [8429, ["scratching"], false],
                [8825, ["scratching"], false],
                [9256, ["crystal", "scratching"], false],
                [10028, ["soap", "sticky", "rubbing"], false],
                [10397, ["soap", "scratching", "rubbing"], false],
                [10822, ["soap", "sticky", "rubbing", "scratching", "tapping"], false],
                [11337, ["soap", "rubbing", "scratching"], false],
                [11600, ["rubbing"], false],
                [11844, ["rubbing", "tapping", "scratching"], false],
                [12546, ["liquid", "bubble"], false],
                [12947, ["tapping", "rubbing"], false],
                [13392, ["tapping"], false]
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
        setSkipPreferences(JSON.parse(JSON.stringify(tempSkipPreferences)));

        document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 1");
        setTimeout(() => {
            if (document.getElementsByClassName("preferencesMessage")[0])
                document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 0");
        }, 2500)
    };

    useEffect(() => {
        if (player) { //初始reset
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
                clip[1].every(tag => { //every:forEach but need a return: true = loop continued / false = loop break, use break for multi tag check
                    if (skipPreferences[tag][0]) {
                        clip[2] = true;
                        return false;
                    }
                    else {
                        clip[2] = false;
                        return true;
                    }
                });
            })
            //將data做成interval 每時間單位檢查對應秒數是否跳過 若是 則秒數跳到下一段
        }
        const interval = setInterval(() => {
            if (player && player.getPlayerState() === 1) {
                // 獲取影片ID
                let id = player.getVideoUrl().slice(-11);
                let time = 0;
                let currentTime = player.getCurrentTime().toFixed(0);
                for (let i = 0; data[id][i]; i++) {
                    // console.log(`currentTime:${currentTime}
                    if (currentTime >= data[id][i][0] && currentTime < (data[id][i + 1] ? data[id][i + 1][0] : Infinity) && data[id][i][2]) { //符合skip條件
                        // console.log(`第${i}段觸發
                        //                 現在秒數:${currentTime}
                        //                 時間段為${data[id][i][0]}~${(data[id][i + 1] ? data[id][i + 1][0] : "last")}
                        // `);
                        let j = i + 1;
                        while (true) { //若後面有連接著的跳過則記錄完才一次跳過
                            if (!data[id][j]) { //本part為最後一段
                                time = 99999;
                                break;
                            }
                            else if (!data[id][j][2]) { //非最後但skip到此為止
                                time = data[id][j][0];
                                break;
                            }

                            j++;
                        }

                        break;
                    }
                }
                if (time) {
                    player.seekTo(time);
                    // maybe pop a message to prompt user some part is skipped.
                }
            }
        }, 500)
        return () => clearInterval(interval);
    }, [player, data])

    useEffect(() => {
        const getIsMajorVolumeActive = JSON.parse(localStorage.getItem("isMajorVolumeActive"));
        if (getIsMajorVolumeActive !== undefined)
            setIsMajorVolumeActive(getIsMajorVolumeActive);

        const getMajorVolume = JSON.parse(localStorage.getItem("majorVolume"));
        if (getMajorVolume)
            setMajorVolume(getMajorVolume);

        if (JSON.parse(localStorage.getItem("skipPreferences")))
            setSkipPreferences(JSON.parse(localStorage.getItem("skipPreferences")));
    }, [])

    useEffect(() => {
        localStorage.setItem("isMajorVolumeActive", JSON.stringify(isMajorVolumeActive));
    }, [isMajorVolumeActive])

    useEffect(() => {
        localStorage.setItem("majorVolume", JSON.stringify(majorVolume));
    }, [majorVolume])

    useEffect(() => {
        localStorage.setItem("skipPreferences", JSON.stringify(skipPreferences));
    }, [skipPreferences])

    return (
        <VideoPlayerContext.Provider value={{
            videoId,
            player,
            majorVolume,
            isMajorVolumeActive,
            skipPreferences,
            tempSkipPreferences,
            data,
            actions: {
                setVideoId: setVideoId,
                setPlayer: setPlayer,
                setMajorVolume: setMajorVolume,
                setIsMajorVolumeActive: setIsMajorVolumeActive,
                setSkipPreferences: setSkipPreferences,
                setTempSkipPreferences: setTempSkipPreferences,
                saveSkipPreferences: saveSkipPreferences,
                onReady: onReady
            }
        }}>
            {props.children}
        </VideoPlayerContext.Provider>
    );
};


//Youtube api and relative function: https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw
//Youtube thumbnail https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api