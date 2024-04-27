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
            "sponge": [false, 0],

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
            "eating": [false, 2],
            "drinking": [false, 2],
            "whisper": [false, 2],
            "heartbeat": [false, 2]
        }
    );
    const [tempSkipPreferences, setTempSkipPreferences] = useState({});

    const artistData = useMemo(() => (
        {
            "VitoASMR": {
                "id": "UCxQiPuwF3iaxV_aJOzjQV-Q",
                "video": {
                    "LZh4ioW31J8": ["ASMR 99.99% of You Will SLEEP 😴💤 ASMR학과 수면학개론 제 1강", 13895],
                    "Gq5bVmgxx30": ["Guaranteed Sleep for 4 Hours🌙✨ ASMR학과 팅글학개론 제 1강", 15301]
                }
            },
            "Patra_Suou": {
                "id": "UCeLzT-7b2PBcunJplmWtoDg",
                "video": {
                    "k0BtUx8NYvM": ["【ASMR-長時間】最高の睡眠へ誘う 脳がゾクゾクたまらない最強のトリガー/ Brain Tingling Best Triggers for Deep Sleep 3Hr【周防パトラ / ハニスト】", 11232],
                    "JWbK9c7GzJY": ["【ASMR】完全寝落ち用。オイル綿棒で耳奥ゴリゴリ。吐息、囁き、マッサージ（Triggers For Sleep & Relaxing、Whispering）【周防パトラ / ハニスト】", 3766]
                }
            }
        }
    ), [])

    const [artistFavoriteData, setArtistFavoriteData] = useState({
        "VitoASMR": false,
        "Patra_Suou": false
    })

    const videoData = useMemo(() => (
        {
            "LZh4ioW31J8": {
                "perference": [
                    [0, ["multicategory", "opening"], false], //starting time / category / isThisPartSkipped
                    [147, ["multicategory", "opening"], false],
                    [564, ["pencil", "paper"], false],
                    [1053, ["keyboard", "tapping"], false],
                    [1508, ["chalk", "liquid", "crushing", "carving"], false],
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
                "artist": "VitoASMR"
            },
            "Gq5bVmgxx30": {
                "perference": [
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
                    [12464, ["rubbing"], false],
                    [12744, ["rubbing"], false],
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
                "artist": "VitoASMR"
            },
            "k0BtUx8NYvM": {
                "perference": [
                    [0, ["opening", "talking", "whisper", "rubbing"], false],
                    [40, ["whisper", "blowing", "rubbing", "tapping"], false],
                    [150, ["whisper", "blowing", "rubbing", "paper"], false],
                    [226, ["whisper", "liquid", "bubble"], false],
                    [575, ["whisper", "rubbing", "fluffy"], false],
                    [668, ["whisper", "sponge", "blowing", "rubbing"], false],
                    [812, ["whisper", "blowing", "rubbing", "fluffy"], false],
                    [944, ["whisper", "blowing", "oil", "rubbing", "eartouching"], false],
                    [1824, ["whisper", "foam", "rubbing", "eartouching"], false],
                    [2097, ["whisper", "blowing", "foam", "rubbing", "eartouching", "sponge"], false],
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
                "artist": "Patra_Suou"
            },
            "JWbK9c7GzJY": {
                "perference": [
                    [0, ["opening"], false],
                    [19, ["whisper", "blowing", "rubbing", "liquid", "spray", "eartouching"], false],
                    [366, ["whisper", "eartouching", "rubbing", "oil", "blowing", "brushing", "talking"], false],
                    [1006, ["whisper", "rubbing", "foam", "brushing", "sponge", "eartouching", "liquid"], false],
                    [1755, ["whisper", "rubbing", "eartouching", "oil", "blowing"], false],
                    [2623, ["whisper", "rubbing", "brushing"], false],
                    [2955, ["whisper", "rubbing", "eartouching", "heartbeat", "talking"], false]
                ],
                "artist": "Patra_Suou"
            }
        }
    ), [])

    const translateData = useMemo(() => (
        {
            "nav": {
                "setting": {
                    "en": "setting",
                    "zh-TW": "設定"
                }
            },
            "setting": {
                "setting": {
                    "en": "setting",
                    "zh-TW": "設定"
                },
                "change language": {
                    "en": "change language",
                    "zh-TW": "改變語言"
                },
                "Volume Auto-Setting": {
                    "en": "Volume Auto-Setting",
                    "zh-TW": "音量自動調整"
                },
                "Volume Auto-Setting2": {
                    "en": "Getting tired of changeing volume every time when you starting listening ASMR? Try out this auto-setting volume function.",
                    "zh-TW": "覺得每次開ASMR都要調音量很煩人嗎? 試試這個音量自動調整功能吧。"
                },
                "Volume Auto-Setting3": {
                    "en": "Active Volume Auto-Setting Function",
                    "zh-TW": "開啟音量自動調整功能"
                },
                "skip content": {
                    "en": "skip content",
                    "zh-TW": "跳過特定內容"
                },
                "skip content2": {
                    "en": "Feel bad about any category? Choose they to skip they in all your ASMR video.",
                    "zh-TW": "不喜歡特定的聲音種類嗎? 在所有的影片中勾選的類別將會自動被跳過。"
                },
                "skip content3": {
                    "en": "category",
                    "zh-TW": "類別"
                },
                "skip content4": {
                    "en": "specific options",
                    "zh-TW": "細項"
                },
                "skip content5": {
                    "en": "material",
                    "zh-TW": "材質"
                },
                "skip content6": {
                    "en": "sensation",
                    "zh-TW": "感官"
                },
                "skip content7": {
                    "en": "else",
                    "zh-TW": "其它"
                },
                "skip content8": {
                    "en": "save skip preferences",
                    "zh-TW": "儲存跳過偏好"
                },
                "skip content9": {
                    "en": "Preferences saved!",
                    "zh-TW": "偏好已儲存!"
                },
                "liquid": {
                    "en": "liquid",
                    "zh-TW": "液體"
                },
                "bubble": {
                    "en": "bubble",
                    "zh-TW": "泡沫"
                },
                "pencil": {
                    "en": "pencil",
                    "zh-TW": "鉛筆"
                },
                "paper": {
                    "en": "paper",
                    "zh-TW": "紙"
                },
                "keyboard": {
                    "en": "keyboard",
                    "zh-TW": "鍵盤"
                },
                "chalk": {
                    "en": "chalk",
                    "zh-TW": "石膏"
                },
                "soap": {
                    "en": "soap",
                    "zh-TW": "肥皂"
                },
                "bubblewrap": {
                    "en": "bubblewrap",
                    "zh-TW": "氣泡紙"
                },
                "crystal": {
                    "en": "crystal",
                    "zh-TW": "晶體"
                },
                "plastic": {
                    "en": "plastic",
                    "zh-TW": "塑膠"
                },
                "wood": {
                    "en": "wood",
                    "zh-TW": "木頭"
                },
                "nut": {
                    "en": "nut",
                    "zh-TW": "堅果"
                },
                "metal": {
                    "en": "metal",
                    "zh-TW": "金屬"
                },
                "glass": {
                    "en": "glass",
                    "zh-TW": "玻璃"
                },
                "gel": {
                    "en": "gel",
                    "zh-TW": "凝膠"
                },
                "oil": {
                    "en": "oil",
                    "zh-TW": "油"
                },
                "foam": {
                    "en": "foam",
                    "zh-TW": "起泡"
                },
                "spray": {
                    "en": "spray",
                    "zh-TW": "噴霧"
                },
                "sponge": {
                    "en": "sponge",
                    "zh-TW": "海綿"
                },
                "rubbing": {
                    "en": "rubbing",
                    "zh-TW": "摩擦"
                },
                "scratching": {
                    "en": "scratching",
                    "zh-TW": "刮"
                },
                "tapping": {
                    "en": "tapping",
                    "zh-TW": "輕敲"
                },
                "carving": {
                    "en": "carving",
                    "zh-TW": "削"
                },
                "crushing": {
                    "en": "crushing",
                    "zh-TW": "撞擊"
                },
                "brushing": {
                    "en": "brushing",
                    "zh-TW": "刷"
                },
                "blowing": {
                    "en": "blowing",
                    "zh-TW": "吹"
                },
                "eartouching": {
                    "en": "eartouching",
                    "zh-TW": "耳朵接觸"
                },
                "sticky": {
                    "en": "sticky",
                    "zh-TW": "黏稠"
                },
                "fluffy": {
                    "en": "fluffy",
                    "zh-TW": "蓬鬆"
                },
                "multicategory": {
                    "en": "multicategory",
                    "zh-TW": "多類別"
                },
                "opening": {
                    "en": "opening",
                    "zh-TW": "影片開頭"
                },
                "noise": {
                    "en": "noise",
                    "zh-TW": "噪音"
                },
                "talking": {
                    "en": "talking",
                    "zh-TW": "說話"
                },
                "whisper": {
                    "en": "whisper",
                    "zh-TW": "耳語"
                },
                "eating": {
                    "en": "eating",
                    "zh-TW": "咀嚼"
                },
                "drinking": {
                    "en": "drinking",
                    "zh-TW": "吞飲"
                },
                "heartbeat": {
                    "en": "heartbeat",
                    "zh-TW": "心跳"
                }
            },
            "home": {
                "title": {
                    "en": "Recommend Video",
                    "zh-TW": "為您推薦"
                }
            },
            "artist": {
                "title": {
                    "en": "Video List",
                    "zh-TW": "影片列表"
                },
                "video": {
                    "en": "videos",
                    "zh-TW": "部影片"
                },
                "about": {
                    "en": "about",
                    "zh-TW": "關於"
                },
                "unit1": {
                    "en": "K",
                    "zh-TW": "萬"
                },
                "unit2": {
                    "en": "M",
                    "zh-TW": "億"
                },
                "divisor": {
                    "en": 1000,
                    "zh-TW": 10000
                },
                "sub": {
                    "en": "subscribers",
                    "zh-TW": "位訂閱者"
                }
            },
            "artistFavorite": {
                "btn1": {
                    "en": "Add Favorite",
                    "zh-TW": "加入最愛"
                },
                "btn2": {
                    "en": "Favorited",
                    "zh-TW": "已加最愛"
                }
            },
        }
    ), [])

    const [currentLanguage, setCurrentLanguage] = useState("en");

    const location = useLocation();
    const [isDataUpdate, setIsDataUpdate] = useState(false);


    const onReady = (e) => {
        setPlayer(e.target);
        document.getElementsByClassName("loader")[0].setAttribute("style", "display: none;");
        setVideoId(e.target.getVideoData().video_id);
        setTitle(e.target.getVideoData().title);
    };

    useEffect(() => {
        const Intrerval = setInterval(() => {
            if (location.pathname !== `${root}/video/${videoId}`) {
                setPlayer(null);
                setIsDataUpdate(false);
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
                document.getElementsByClassName("preferencesMessage")[0].setAttribute("style", "opacity: 0");
        }, 2500)
    };


    useEffect(() => {
        if (player) { //初始reset
            const resetTime = setInterval(() => {
                if (player.getPlayerState() === 1) {
                    player.seekTo(0);
                    clearInterval(resetTime);
                }
            }, 200)
        }


        if (player) {
            // 獲取影片ID
            let id = player.getVideoUrl().slice(-11);
            // console.log(videoData[id][perference]);
            // videoData[id][perference] 為該影片的資料 clip為其中一個片段的資料 clip[1]是該片段的所有tag clip[2]目前用來記錄該片段是否跳過
            videoData[id]["perference"].forEach(clip => {
                clip[1].every(tag => { //every:forEach but need a return: true = loop continued / false = loop break, use break for currectly multi tag check
                    if (skipPreferences[tag] === undefined) {
                        console.log(`影片資料中含有錯誤tag: ${tag}`);
                        return true;
                    }
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
        // 將videoData做成interval 每時間單位檢查對應秒數是否跳過 若是 則秒數跳到下一段
        const interval = setInterval(() => {
            if (player && player.getPlayerState() === 1) {
                // 獲取影片ID
                let id = player.getVideoUrl().slice(-11);
                let time = 0;
                let currentTime = player.getCurrentTime().toFixed(0);
                for (let i = 0; videoData[id]["perference"][i]; i++) {
                    if (currentTime >= videoData[id]["perference"][i][0] && currentTime < (videoData[id]["perference"][i + 1] ? videoData[id]["perference"][i + 1][0] : Infinity) && videoData[id]["perference"][i][2]) { //符合skip條件
                        // console.log(`第${i}段觸發
                        //                 現在秒數:${currentTime}
                        //                 時間段為${videoData[id]["perference"][i][0]}~${(videoData[id]["perference"][i + 1] ? videoData[id]["perference"][i + 1][0] : "last")}
                        // `);
                        let j = i + 1;
                        while (true) { //若後面有連接著的跳過則記錄完才一次跳過
                            if (!videoData[id]["perference"][j]) { //本part為最後一段
                                time = 99999;
                                break;
                            }
                            else if (!videoData[id]["perference"][j][2]) { //非最後但skip到此為止
                                time = videoData[id]["perference"][j][0];
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
    }, [player, videoData, skipPreferences])


    // progressing bar time stamp maker
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

    // major volume setting
    useEffect(() => {
        const interval = setInterval(() => {
            if (location.pathname !== `${root}/video/${videoId}`) {
                clearInterval(interval);
            }
            if (player && player.getPlayerState() === 1 && parseInt(player.getVolume()) !== parseInt(majorVolume)) {
                player.setVolume(majorVolume);
            }
        }, 1000);
        if (!isMajorVolumeActive) {
            clearInterval(interval);
        }
    }, [isMajorVolumeActive, majorVolume, player, location, videoId])

    // dynamic data loading function
    async function importAPIData(id) {
        try {
            const module = await import(`../../youtubeDataAPI/${id}.json`);
            return module;
        } catch (error) {
            console.log(error);
        }
    }

    //setting localStorage part
    useEffect(() => {
        const getCurrentLanguage = JSON.parse(localStorage.getItem("currentLanguage"));
        if (getCurrentLanguage !== undefined)
            setCurrentLanguage(getCurrentLanguage);

        const getIsMajorVolumeActive = JSON.parse(localStorage.getItem("isMajorVolumeActive"));
        if (getIsMajorVolumeActive !== undefined)
            setIsMajorVolumeActive(getIsMajorVolumeActive);

        const getMajorVolume = JSON.parse(localStorage.getItem("majorVolume"));
        if (getMajorVolume !== undefined)
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

        const getArtistFavoriteData = JSON.parse(localStorage.getItem("artistFavoriteData"));
        if (getArtistFavoriteData !== undefined)
            setArtistFavoriteData(getArtistFavoriteData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem("currentLanguage", JSON.stringify(currentLanguage));
    }, [currentLanguage])

    useEffect(() => {
        localStorage.setItem("isMajorVolumeActive", JSON.stringify(isMajorVolumeActive));
    }, [isMajorVolumeActive])

    useEffect(() => {
        localStorage.setItem("majorVolume", JSON.stringify(majorVolume));
    }, [majorVolume])

    useEffect(() => {
        localStorage.setItem("skipPreferences", JSON.stringify(skipPreferences));
    }, [skipPreferences])

    useEffect(() => {
        localStorage.setItem("artistFavoriteData", JSON.stringify(artistFavoriteData));
    }, [artistFavoriteData])

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
            videoData,
            isDataUpdate,
            location,
            translateData,
            currentLanguage,
            artistFavoriteData,
            actions: {
                setVideoId: setVideoId,
                setPlayer: setPlayer,
                setMajorVolume: setMajorVolume,
                setIsMajorVolumeActive: setIsMajorVolumeActive,
                setSkipPreferences: setSkipPreferences,
                setTempSkipPreferences: setTempSkipPreferences,
                saveSkipPreferences: saveSkipPreferences,
                onReady: onReady,
                setIsDataUpdate: setIsDataUpdate,
                setCurrentLanguage: setCurrentLanguage,
                importAPIData: importAPIData,
                setArtistFavoriteData: setArtistFavoriteData
            }
        }}>
            {props.children}
        </VideoPlayerContext.Provider>
    );
};


//Youtube api and relative function: https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw
//Youtube thumbnail https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api