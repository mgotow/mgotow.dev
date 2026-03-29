# AGENT.md

このファイルはAIコーディングエージェント向けにプロジェクトの概要・開発手順・アーキテクチャをまとめたものです。

---

## プロジェクト概要

**mgotow.dev** は [mgotow](https://mgotow.dev) の個人サイトです。ブログ記事と日記を管理・公開する目的で作られた Next.js 製の静的サイトです。

- 言語: 日本語
- 著者: mgotow（鳥取在住エンジニア）
- 主な機能:
  - ブログ（タグ・ページネーション・RSS フィード）
  - 日記（ページネーション・RSS フィード）
  - 動的 OG 画像生成
  - サイトマップ・構造化データ（schema.org）による SEO 対策
  - コードブロックのシンタックスハイライトとコピーボタン

---

## 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | Next.js 16 (React 18) |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS 3 + PostCSS |
| コンテンツ管理 | Contentlayer2 + MDX |
| コードハイライト | Rehype Pretty Code + Shiki (One Dark Pro) |
| Markdown 拡張 | Remark GFM, Rehype Slug, Rehype Autolink Headings |
| Lint | ESLint v9（flat config） |
| ランタイム | Node.js 22 |
| フォント | Noto Sans JP (Google Fonts), Itim |

---

## ディレクトリ構成

```
.
├── content/
│   ├── blog/           # ブログ記事 MDX ファイル
│   └── diary/          # 日記 MDX ファイル
├── public/
│   ├── icon.png        # プロフィールアイコン
│   ├── og-bg.png       # OG 画像背景
│   └── images/         # ブログ記事用画像
├── src/
│   ├── app/            # Next.js App Router のルートとページ
│   │   ├── blog/       # ブログ一覧・記事詳細・タグ・ページネーション・RSS
│   │   ├── diary/      # 日記一覧・記事詳細・ページネーション・RSS
│   │   ├── og/         # 動的 OG 画像生成エンドポイント（Edge Runtime）
│   │   ├── layout.tsx  # グローバルレイアウト・メタデータ
│   │   ├── page.tsx    # トップページ（About me）
│   │   └── sitemap.ts  # サイトマップ自動生成
│   ├── components/     # 再利用可能な UI コンポーネント
│   └── lib/
│       └── format.ts   # 日付フォーマットユーティリティ
├── contentlayer.config.js  # Contentlayer のドキュメント型定義
├── next.config.js          # Next.js 設定
├── tailwind.config.ts      # Tailwind 設定
├── eslint.config.js        # ESLint v9 flat config
├── tsconfig.json           # TypeScript 設定
├── Dockerfile
└── compose.yml
```

---

## 開発コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動（http://localhost:3000）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動（build 後に実行）
npm start

# Lint 実行
npm run lint
```

### Docker を使う場合

```bash
docker-compose up --build
```

---

## テスト

現時点でテストは設定されていません。テストコマンドは存在しません。

---

## コンテンツの追加・編集

### ブログ記事

`content/blog/<slug>.mdx` にファイルを作成します。

```mdx
---
title: 記事タイトル
publishedAt: 2025-01-01
summary: 記事の概要
tags: [タグ1, タグ2]
image: /images/<slug>/ogimage.png  # 省略可
---

ここから本文（MDX）
```

### 日記

`content/diary/<YYYY-MM-DD>.mdx` にファイルを作成します。

```mdx
---
publishedAt: 2025-01-01
---

ここから本文（MDX）
```

Contentlayer が `slug` と構造化データ（schema.org）を自動生成します。

---

## アーキテクチャのポイント

### App Router

Next.js の App Router を採用しています。`src/app/` 配下にルートが定義されており、ほとんどのページは静的生成（SSG）されます。

### Contentlayer2

MDX コンテンツの型安全な読み込みに Contentlayer2 を使用します。`contentlayer.config.js` で `Blog` と `Diary` の2つのドキュメント型を定義しています。ビルド時に `.contentlayer/generated/` へ型情報と JSON が生成されます。

### 動的 OG 画像

`src/app/og/route.tsx` が Edge Runtime で動作する OG 画像エンドポイントです。`?title=タイトル` クエリパラメータでタイトルを指定できます（1902×1080px）。

### RSS フィード

- ブログ: `/blog/feed.xml`
- 日記: `/diary/feed.xml`

### コードブロック

`rehype-pretty-code` + `shiki`（One Dark Pro テーマ）でシンタックスハイライトを行います。`src/components/pre.tsx` がカスタムレンダラーを提供し、言語バッジとコピーボタンを表示します。

---

## 主要コンポーネント一覧

| ファイル | 役割 |
|---|---|
| `src/components/main-menu.tsx` | ナビゲーションメニュー（アクティブ状態管理） |
| `src/components/mdx.tsx` | MDX カスタムレンダラー |
| `src/components/pre.tsx` | コードブロック（言語バッジ・コピーボタン） |
| `src/components/copy-button.tsx` | クリップボードへのコピーボタン（Client Component） |
| `src/components/pagination.tsx` | ページネーションコントロール |
| `src/components/blog-list-item.tsx` | ブログ記事一覧アイテム |
| `src/components/diary-item.tsx` | 日記エントリーカード |
| `src/components/tag-list.tsx` | タグ表示 |
| `src/lib/format.ts` | 日付フォーマット（`YYYY年M月D日` 形式） |
