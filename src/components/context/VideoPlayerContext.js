import { createContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const VideoPlayerContext = createContext(null);

export default VideoPlayerContext;

export const VideoPlayerProvider = (props) => {
    const root = "/Project_YTPlayer";
    const [videoId, setVideoId] = useState('');
    const [title, setTitle] = useState('');
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
            "plastic": [false, 0],
            "wood": [false, 0],
            "nut": [false, 0],
            "metal": [false, 0],
            "glass": [false, 0],
            "gel": [false, 0],
            "oil": [false, 0],
            "foam": [false, 0],
            "spray": [false, 0],
            "Sponge": [false, 0],

            "rubbing": [false, 1],
            "scratching": [false, 1],
            "tapping": [false, 1],
            "carving": [false, 1],
            "crushing": [false, 1],
            "brushing": [false, 1],
            "blowing": [false, 1],
            "eartouching": [false, 1],
            "sticky": [false, 1],
            "fluffy": [false, 1],

            "multicategory": [false, 2],
            "opening": [false, 2],
            "noise": [true, 2],
            "talking": [false, 2],
            "whisper": [false, 2]
        }
    );
    const [tempSkipPreferences, setTempSkipPreferences] = useState({});

    const artistData = useMemo(() => (
        {
            "VitoASMR": [
                ["LZh4ioW31J8", "ASMR 99.99% of You Will SLEEP 😴💤 ASMR학과 수면학개론 제 1강", 13895],
                ["Gq5bVmgxx30", "Guaranteed Sleep for 4 Hours🌙✨ ASMR학과 팅글학개론 제 1강", 15301]
            ],
            "Patra_Suou": [
                ["k0BtUx8NYvM", "【ASMR-長時間】最高の睡眠へ誘う 脳がゾクゾクたまらない最強のトリガー/ Brain Tingling Best Triggers for Deep Sleep 3Hr【周防パトラ / ハニスト】", 11232]
            ]
        }
    ), [])
    const data = useMemo(() => (
        {
            "LZh4ioW31J8": [
                [0, ["multicategory", "opening"], false], //starting time / category / isThisPartSkipped
                [147, ["multicategory", "opening"], false],
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
                [7066, ["eartouching", "tapping", "rubbing"], false],
                [7531, ["eartouching", "rubbing"], false],
                [7978, ["eartouching", "rubbing"], false],
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
                [0, ["multicategory", "opening"], false],
                [314, ["plastic", "tapping", "rubbing"], false],
                [1039, ["plastic", "tapping", "rubbing"], false],
                [1448, ["plastic", "scratching"], false],
                [1608, ["wood", "tapping", "scratching", "tapping"], false],
                [2424, ["nut", "scratching"], false],
                [2542, ["nut", "scratching"], false],
                [2690, ["nut", "tapping", "rubbing"], false],
                [2783, ["nut", "tapping", "rubbing"], false],
                [2884, ["nut", "rubbing"], false],
                [3342, ["metal", "scratching"], false],
                [4179, ["soap", "tapping", "scratching"], false],
                [4658, ["soap", "sticky", "tapping", "rubbing", "scratching"], false],
                [5443, ["soap", "tapping", "scratching", "rubbing"], false],
                [5808, ["soap", "tapping", "scratching", "carving"], false],
                [6021, ["soap", "scratching", "carving"], false],
                [6167, ["soap", "carving"], false],
                [6295, ["soap", "rubbing", "scratching"], false],
                [6556, ["soap", "carving", "tapping"], false],
                [6681, ["soap", "rubbing", "scratching"], false],
                [6854, ["soap", "tapping", "scratching"], false],
                [7515, ["soap", "carving", "rubbing"], false],
                [7794, ["soap", "carving", "scratching"], false],
                [7873, ["soap", "tapping", "scratching", "rubbing", "sticky"], false],
                [8205, ["liquid", "bubble", "tapping"], false],
                [8574, ["liquid", "tapping"], false],
                [8867, ["liquid", "tapping"], false],
                [9126, ["liquid", "tapping"], false],
                [9256, ["liquid", "bubble"], false],
                [9383, ["liquid", "bubble"], false],
                [9440, ["glass", "scratching", "tapping"], false],
                [9539, ["glass", "liquid", "bubble", "scratching", "tapping"], false],
                [10018, ["liquid", "bubble"], false],
                [10389, ["rubbing", "sticky", "tapping", "eartouching"], false],
                [10636, ["rubbing", "tapping", "eartouching", "blowing", "fluffy"], false],
                [10936, ["rubbing", "tapping", "eartouching", "blowing"], false],
                [11502, ["rubbing", "scratching", "tapping", "eartouching", "blowing", "fluffy"], false],
                [11881, ["rubbing", "tapping", "eartouching", "blowing", "fluffy"], false],
                [12071, ["rubbing", "fluffy", "tapping"], false],
                [12265, ["rubbing"], false],
                // [12464, [""], false],
                // [12744, [""], false],
                [12860, ["paper", "rubbing", "sticky"], false],
                [13765, ["rubbing", "tapping", "eartouching"], false],
                [13249, ["blowing"], false],
                [13269, ["plastic", "tapping"], false],
                [13548, ["gel", "sticky", "rubbing", "tapping"], false],
                [13788, ["gel", "sticky", "rubbing", "tapping"], false],
                [13967, ["gel", "sticky", "rubbing", "tapping"], false],
                [14125, ["oil", "rubbing"], false],
                [14426, ["rubbing"], false],
                [14906, ["rubbing"], false],
                [15014, ["liquid"], false]
            ],
            "k0BtUx8NYvM": [
                [0, ["opening", "talking", "whisper", "rubbing"], false],
                [40, ["whisper", "blowing", "rubbing", "tapping"], false],
                [150, ["whisper", "blowing", "rubbing", "paper"], false],
                [226, ["whisper", "liquid", "bubble"], false],
                [575, ["whisper", "rubbing", "fluffy"], false],
                [668, ["whisper", "Sponge", "blowing", "rubbing"], false],
                [812, ["whisper", "blowing", "rubbing", "fluffy"], false],
                [944, ["whisper", "blowing", "oil", "rubbing", "eartouching"], false],
                [1824, ["whisper", "foam", "rubbing", "eartouching"], false],
                [2097, ["whisper", "blowing", "foam", "rubbing", "eartouching", "Sponge"], false],
                [2281, ["whisper", "blowing", "foam", "rubbing", "eartouching"], false],
                [2630, ["whisper", "blowing", "liquid", "rubbing", "fluffy", "eartouching"], false],
                [2902, ["whisper", "blowing", "rubbing"], false],
                [3037, ["whisper", "eartouching", "rubbing"], false],
                [3156, ["whisper", "blowing", "eartouching", "rubbing"], false],
                [3330, ["whisper", "tapping", "wood"], false],
                [3388, ["whisper", "blowing", "foam", "rubbing"], false],
                [4603, ["whisper", "blowing", "liquid", "rubbing"], false],
                [4775, ["whisper", "blowing", "brushing"], false],
                [4877, ["whisper", "blowing", "rubbing"], false],
                [5130, ["whisper", "rubbing"], false],
                [5297, ["whisper", "blowing", "eartouching", "rubbing"], false],
                [5616, ["whisper", "rubbing"], false],
                [5705, ["whisper", "rubbing", "eartouching"], false],
                [5870, ["whisper", "rubbing", "eartouching", "tapping"], false],
                [6077, ["whisper", "blowing", "oil", "eartouching", "rubbing"], false],
                [6598, ["whisper", "eartouching", "rubbing"], false],
                [6808, ["whisper", "blowing", "oil", "rubbing", "tapping"], false],
                [6888, ["whisper", "rubbing"], false],
                [7047, ["whisper", "blowing", "liquid", "oil", "eartouching", "rubbing", "tapping"], false],
                [7607, ["liquid"], false],
                [7653, ["whisper", "rubbing", "oil"], false],
                [7704, ["whisper", "blowing", "eartouching", "rubbing"], false],
                [7776, ["whisper", "blowing", "eartouching", "rubbing"], false],
                [7966, ["whisper", "blowing", "oil", "eartouching", "rubbing", "tapping"], false],
                [8442, ["whisper", "rubbing"], false],
                [8767, ["whisper", "blowing", "gel", "rubbing", "tapping"], false],
                [9198, ["whisper", "blowing", "rubbing", "eartouching"], false],
                [9313, ["whisper", "blowing", "rubbing", "eartouching"], false],
                [9416, ["whisper", "blowing", "rubbing", "eartouching", "paper"], false],
                [9632, ["whisper", "blowing", "oil", "rubbing", "eartouching"], false],
                [10114, ["whisper", "blowing", "foam", "rubbing", "eartouching"], false],
                [10267, ["whisper", "blowing", "gel", "rubbing", "eartouching"], false],
                [10419, ["whisper", "blowing", "rubbing", "eartouching"], false],
                [10504, ["whisper", "blowing", "oil", "rubbing", "eartouching"], false],
                [10941, ["blowing", "gel", "rubbing", "eartouching"], false],
                [11050, ["whisper", "blowing", "rubbing", "eartouching"], false]
            ],
        }
    ), [])

    let location = useLocation();
    const [isDataUpdate, setIsDataUpdate] = useState(false);


    const onReady = (e) => {
        setPlayer(e.target);
        document.getElementsByClassName("loader")[0].setAttribute("style", "display: none;");
        // console.log(e.target.getVideoData());
        setVideoId(e.target.getVideoData().video_id);
        setTitle(e.target.getVideoData().title);
    };

    useEffect(() => {
        const Intrerval = setInterval(() => {
            // console.log(location.pathname);
            if (location.pathname !== `${root}/video/${videoId}`) {
                setPlayer(null);
                setIsDataUpdate(false);
                // console.log("player reset!");
                clearInterval(Intrerval);
            }
        }, 1000)

        return () => clearInterval(Intrerval);
    }, [location, videoId])


    const saveSkipPreferences = () => {
        setSkipPreferences(JSON.parse(JSON.stringify(tempSkipPreferences)));

        document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 1");
        setTimeout(() => {
            if (document.getElementsByClassName("preferencesMessage")[0])
                document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 0.4");
        }, 2500)
    };


    useEffect(() => {
        if (player) { //初始reset
            const resetTime = setInterval(() => {
                if (player.getPlayerState() === -1) {
                    player.seekTo(0);
                    clearInterval(resetTime);
                    // console.log(player.videoTitle);
                }
            }, 500)
        }


        if (player) {
            // 獲取影片ID
            let id = player.getVideoUrl().slice(-11);
            // console.log(data[id]);
            //data[id] 為該影片的資料 clip為其中一個片段的資料 clip[1]是該片段的所有tag clip[2]目前用來記錄該片段是否跳過
            data[id].forEach(clip => {
                clip[1].every(tag => { //every:forEach but need a return: true = loop continued / false = loop break, use break for currectly multi tag check
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
            setIsDataUpdate(true);
        }
        //將data做成interval 每時間單位檢查對應秒數是否跳過 若是 則秒數跳到下一段
        const interval = setInterval(() => {
            if (player && player.getPlayerState() === 1) {
                // 獲取影片ID
                let id = player.getVideoUrl().slice(-11);
                let time = 0;
                let currentTime = player.getCurrentTime().toFixed(0);
                for (let i = 0; data[id][i]; i++) {
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
    }, [player, data, skipPreferences])


    //progressing bar time stamp maker
    useEffect(() => {
        const interval = setInterval(() => {
            if (player) {
                let currentTime = player.getCurrentTime().toFixed(0);
                let videoTime = player.getDuration().toFixed(0);
                document.getElementsByClassName("indicator")[0].style = `margin-left: ${currentTime / videoTime * 100}%`;
            }
        }, 200)
        if (location.pathname !== `${root}/video/${videoId}`)
            clearInterval(interval);
        return () => clearInterval(interval);
    }, [player, location, videoId])

    //major volume setting
    useEffect(() => {
        const interval = setInterval(() => {
            if (location.pathname !== `${root}/video/${videoId}`) {
                clearInterval(interval);
            }
            if (player && player.getPlayerState() === 1 && parseInt(player.getVolume()) !== parseInt(majorVolume)) {
                player.setVolume(majorVolume);
                // console.log("Volume Set!");
            }
        }, 1000);
        if (!isMajorVolumeActive) {
            clearInterval(interval);
        }
    }, [isMajorVolumeActive, majorVolume, player, location, videoId])

    //setting localStorage part
    useEffect(() => {
        const getIsMajorVolumeActive = JSON.parse(localStorage.getItem("isMajorVolumeActive"));
        if (getIsMajorVolumeActive !== undefined)
            setIsMajorVolumeActive(getIsMajorVolumeActive);

        const getMajorVolume = JSON.parse(localStorage.getItem("majorVolume"));
        if (getMajorVolume)
            setMajorVolume(getMajorVolume);

        if (JSON.parse(localStorage.getItem("skipPreferences"))) { //僅更新項目狀態以避免更新後的項目被舊版的項目覆寫
            const localSkipPreferences = JSON.parse(localStorage.getItem("skipPreferences"));
            const currentSkipPreferences = skipPreferences;
            Object.entries(localSkipPreferences).forEach(item => {
                if (skipPreferences[item[0]])
                    currentSkipPreferences[item[0]] = item[1];

            })
            setSkipPreferences(currentSkipPreferences);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            root,
            videoId,
            title,
            player,
            majorVolume,
            isMajorVolumeActive,
            skipPreferences,
            tempSkipPreferences,
            artistData,
            data,
            isDataUpdate,
            actions: {
                setVideoId: setVideoId,
                setPlayer: setPlayer,
                setMajorVolume: setMajorVolume,
                setIsMajorVolumeActive: setIsMajorVolumeActive,
                setSkipPreferences: setSkipPreferences,
                setTempSkipPreferences: setTempSkipPreferences,
                saveSkipPreferences: saveSkipPreferences,
                onReady: onReady,
                setIsDataUpdate: setIsDataUpdate
            }
        }}>
            {props.children}
        </VideoPlayerContext.Provider>
    );
};


//Youtube api and relative function: https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw
//Youtube thumbnail https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api