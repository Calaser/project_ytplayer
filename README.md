# Project_YTPlayer
一個使用React開發的一頁式Youtube影片撥放器。

[**>> 點此前往網站 <<**](https://calaser.github.io/Project_YTPlayer/)

<img src="https://i.imgur.com/LuyX93y.png">

## 網站內容
一個Youtube的影片撥放器，<br />
可通過設定頁面的個人化設定調整撥放器的功能，進而改變收聽ASMR影片的體驗(詳細功能請參考**網站功能**部分)

撥放器頁面則有進度條與按鈕，可以在各個段落間切換。

## 網站功能
一個一頁式網站，主要由首頁/設定/撥放器/作者頁面組成。

+ **首頁**：依據資料生成陳列影片的頁面，方式近似於Youtube。
+ **設定**：主要由兩個功能，目前功能如下：
  - 改變語系: 目前僅英文、繁中
  - 設定固定音量<br />
    可以調整在本站撥放的影片的固定音量，與在其他網站(包含Youtube本站)的設定完全獨立。<br />
    如此一來便不需要每次切換影片類型時就得調整音量。(特別是收聽ASMR時音量調很大聲的使用者)
  - 設定個人偏好<br />
    可以選擇自己不喜歡的ASMR分類，<br />
   一旦設定完成，所有影片當中被設定的音聲分類片段都會被自動跳過。
+ **撥放器**：除了帶有固定音量/個人偏好功能的影片撥放器以外還有:
  - 進度條: 進度條會依據段落自動生成按鈕，可依據按鈕前往除了個人偏好設定跳過的段落。
  - 段落按鈕: 顯示前一個/當前/後一個段落的tag，並且可以點擊以切換片段。
  - 其他影片推薦: 在撥放器側邊/下方顯示其他相關影片。
+ **作者**：
  - 作者資料: 顯示YouTube Data API獲得的資料。
  - 影片列表: 顯示該作者的影片。
    
## 相關元素
+ HTML
  - Table
  - Semantic HTML
+ CSS
  - RWD
    * Media Quary / Container Query
    * Flex (Video list / Card)
  - Transition
  - DOM focus accessibility
  - Custom property
+ Javascript
  - Data store / utilize
  - Local storage
  - data process and related DOM creation
  - Youtube iframe API and relative function
+ React
  - JSX
  - SPA (React router v6 / useLocation)
  - Context

## 資料來源
Youtube iframe api and relative function:<br />
https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw

Youtube channels and videos data API:<br />
https://developers.google.com/youtube/v3/docs/channels?hl=zh-tw<br />
https://developers.google.com/youtube/v3/docs/videos?hl=zh-tw

影片來源頻道:<br />
Vito ASMR<br />
https://www.youtube.com/@VitoASMR<br />
周防パトラ<br />
https://www.youtube.com/@Patra_Suou
