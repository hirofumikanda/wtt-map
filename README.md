# WTT Map Visualization

ITTF（International Table Tennis Federation）及びWTT（World Table Tennis）が主催する国際卓球大会の開催結果の可視化を目的とした、Vite + React + TypeScript 製のインタラクティブ地図アプリです。

## 特徴
- **高速・軽量**: Viteによる開発・ビルド環境
- **地図描画**: Mapbox GL互換スタイル、PMTiles/GeoJSON対応
- **レイヤ切替UI**: WTT風ダークデザインのレイヤスイッチャー
- **カスタムポップアップ・イベント**: 独自ロジックをTypeScriptで実装

## デモ
[GitHub Pagesで公開中](https://hirofumikanda.github.io/wtt-map/)

## ディレクトリ構成
```
├── public/
│   ├── data/         # GeoJSON, PMTiles等の地図データ
│   ├── font/         # 地図用フォントグリフ
│   ├── img/          # マーカー・イベント画像
│   └── styles/       # style.json（地図スタイル）
├── src/
│   ├── components/   # MapView, LayerSwitcher等のReactコンポーネント
│   ├── utils/        # 地図イベント・ポップアップ等のヘルパー
│   ├── App.tsx       # ルートコンポーネント
│   └── main.tsx      # エントリーポイント
├── package.json
├── vite.config.ts
└── ...
```

## 開発方法
1. 依存パッケージのインストール
   ```bash
   npm install
   ```
2. 開発サーバ起動
   ```bash
   npm run dev
   ```

## ライセンス
- コード本体: MIT License
