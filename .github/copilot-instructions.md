# AIエージェント向け Copilot インストラクション

## プロジェクト概要
- 本プロジェクトは Vite + TypeScript + React によるインタラクティブな地図可視化アプリです（卓球イベントや人口統計の可視化が想定されます）。
- エントリーポイントは `src/main.tsx`（`App.tsx` をマウント）。
- 地図描画・ロジックは `src/components/MapView.tsx` および `src/components/LayerSwitcher.tsx` に集約。
- 地図データ・スタイルは `public/data/`（GeoJSON, PMTiles）と `public/styles/style.json` に配置。
- 独自の地図ロジックやヘルパーは `src/utils/`（例: `onMapLoad.ts`, `popup.ts`）。

## 主要パターン・コーディング規約
- React関数コンポーネント＋フック利用（`App.tsx`, `MapView.tsx` 参照）。
- Mapbox GL 互換の地図描画（スタイル・PMTiles・フォント構成から推察）。
- レイヤー切替UIは `LayerSwitcher.tsx` のパターンに従う。
- 静的アセット（画像・フォント・データ）は `public/` 配下に配置。
- TypeScript の厳格な型チェックを有効化（`tsconfig.json` 参照）。

## 開発ワークフロー
- **開発サーバ起動:** `npm run dev`
- **本番ビルド:** `npm run build`
- **ビルドプレビュー:** `npm run preview`
- **Lint:** `npm run lint`（`eslint.config.js` 使用）
- テストスクリプトやテストファイルは未検出。テストは手動または未実装の可能性。

## 統合・データフロー
- 地図レイヤー・データは `public/data/` から読み込み、`public/styles/style.json` で設定。
- 地図用フォントグリフは `public/font/`（複数フォントファミリー対応）。
- 地図マーカーやオーバーレイ画像は `public/img/`。
- コンポーネント間通信は React の props/state のみ。グローバルステート管理は未使用。

## プロジェクト固有の注意点
- 新しい地図レイヤーやデータ追加時は、`public/data/` のGeoJSON/PMTilesと `public/styles/style.json` の両方を更新すること。
- 新規UIコントロール追加時は `LayerSwitcher.tsx` のパターンを踏襲し、ロジックはモジュール化。
- TypeScriptコードは `src/`、アセットは `public/` に限定。
- `src/` 内は相対インポートのみ使用。

## 主要ファイル・ディレクトリ
- `src/components/MapView.tsx` — 地図の主要ロジック
- `src/components/LayerSwitcher.tsx` — レイヤー切替UI
- `src/utils/` — 地図イベント・ポップアップ等のヘルパー
- `public/data/` — 地図データソース
- `public/styles/style.json` — 地図スタイル設定

---

不明点や規約で迷う場合は、`App.tsx`、`MapView.tsx`、`LayerSwitcher.tsx` を参照してください。判断に迷う場合はユーザーに確認・質問してください。
