# sphero-joystick (controller branch)

![](https://docs.google.com/drawings/d/11UkOxTHAYCFONLhi49WRn1hCaDZz25plo-yaG18Q2cc/pub?w=854&h=579)

## About
Onigo-Server の client、Controller に当たる部分です。  
SpheroをJoystickで動かすほか、HPなどを表示します。  
Onigo-Server とWebSocketで通信し、情報を交換しています。

## 準備

### モジュールをインストール
```
$ npm install
```

### Webpack ＆ Browser-sync サーバーを起動

```
$ npm run build:browser-sync
```

