# Project_YTPlayer
一個使用React開發的一頁式Youtube影片撥放器。

[**>> 點此前往網站 <<**](https://calaser.github.io/Project_YTPlayer/)

<img src="https://i.imgur.com/8acnxHR.png">

## 網站內容
一個Youtube的影片撥放器，<br />
可通過設定頁面的個人化設定調整撥放器的功能，進而改變收聽ASMR影片的體驗(詳細功能請參考**網站功能**部分)

撥放器頁面則有客製的進度條，可以點擊按鈕前往各個段落。

## 網站功能
一個一頁式的網站，主要由首頁/設定/撥放器三個頁面組成。

+ **首頁**：依據資料生成陳列影片的頁面，格式近似於Youtube首頁。
+ **設定**：主要由兩個功能，目前功能如下：
1. 設定固定音量<br />
   可以調整在本站撥放的影片的固定音量，與在其他網站(包含Youtube本站)的設定完全獨立。<br />
   如此一來便不需要每次切換影片類型時就得調整音量。(特別是收聽ASMR時音量調很大聲的使用者)
2. 設定個人偏好<br />
   可以選擇自己不喜歡的ASMR分類，<br />
   一旦設定完成，所有影片當中被設定的聲音分類片段都會被自動跳過。
+ **撥放器**：除了帶有固定音量/個人偏好功能的影片撥放器以外還有依據資料所生成的進度條，<br />
進度條會依據段落自動生成按鈕，可依據按鈕前往除了個人偏好設定跳過的段落。

## 相關元素
+ HTML
  - Semantic HTML
+ CSS
  - RWD
    * Media Quary
    * Responsive Unit (font)
    * Virtual Keyboard for mobile user
+ Javascript
  - ES6 module (CSS / map data)
  - local storage (map record)
  - looping for data process and print screen
  - DOM manipulate according to data
  - Render function (centralized process)
+ Vite

## 資料來源
Youtube iframe api and relative function:<br />
https://developers.google.com/youtube/iframe_api_reference?hl=zh-tw

範例頻道:<br />
Vito ASMR<br />
https://www.youtube.com/@VitoASMR
周防パトラ<br />
https://www.youtube.com/@Patra_Suou
