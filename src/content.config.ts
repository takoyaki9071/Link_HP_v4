import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// お知らせ — markdown を1ファイル追加 → push で反映（docs/要件定義書.md §7.3 / docs/更新手順.md）。
// ファイル名は「YYYYMMDD_タイトル.md」を基本とし、頭8桁は日付として認識する。
// frontmatter の date があればそちらを優先（どちらかがあれば表示OK）。
// ホームにはタイトル+日付の行が最大5件出る（新しい順）。本文・写真は /news 専用ページで読む。
// frontmatter `image:` は /news の記事先頭写真（public/ 配下のパス。例: /news/xxx.jpg）。
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(), // 省略時はファイル名の頭8桁（YYYYMMDD）を使う
    category: z.enum(['重要', '通常']).default('通常'),
    /** /news の記事先頭写真（public/ 配下のパス。例: /news/xxx.jpg） */
    image: z.string().optional(),
  }),
});

// 代表からのご挨拶 — 原稿は src/content/greeting/ の markdown 1ファイル。
// published: true になるまで /about では「準備中」の枠のみ表示。
// PDF を添付する場合は public/pdf/ に置き、frontmatter の pdf にパスを書く（/about で A4 縦長の枠に表示）。
const greeting = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/greeting' }),
  schema: z.object({
    author: z.string().default('代表'),
    pdf: z.string().default(''),
    published: z.boolean().default(false),
  }),
});

export const collections = { news, greeting };
