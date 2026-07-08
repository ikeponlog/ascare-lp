# ASCare Learning LP

外国人材教育プラットフォーム「ASCare Learning」の B2B サービス LP。Figma ワイヤーフレームをもとに、HTML / CSS / Vanilla JS でピクセル忠実に実装しています。

## 特徴

- **デザイン準拠**: Figma ワイヤーフレーム（`ASCare 2B Service LP`）の全セクションを再現。カラー・タイポグラフィ・余白・角丸は Figma の実測値に基づく
- **デザインシステム**: Sparkle Design System の shadow / radius トークンの命名思想に沿った CSS 変数レイヤーを定義
- **モーション**: スクロール連動フェードイン（IntersectionObserver）、カード/ボタンのホバーリフト、スティッキーヘッダー、FAQ アコーディオン、図解のパルス演出など
- **レスポンシブ**: デスクトップ（1440px）〜モバイル（390px）対応。ハンバーガーメニュー搭載
- **アクセシビリティ**: セマンティック HTML、スキップリンク、`prefers-reduced-motion` 対応

## 構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | ページ全体のマークアップ |
| `styles.css` | デザイントークン + 全セクションのスタイル |
| `script.js` | スクロールリビール / アコーディオン / ナビ制御 |

## ローカルでの確認

```sh
python3 -m http.server 8000
# http://localhost:8000 を開く
```

## セクション一覧

Header / Hero / Trust / Problem / Solution（プラットフォーム図解）/ Value Chain / Features / Benefits / Recommended / Use Case（Before-After）/ Price / Flow / FAQ / CTA / Footer
