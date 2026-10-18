/**
 * お知らせ（news collection）の共通ロジック。
 * Home の一覧（タイトル+日付・最大5件・/news へのリンク）と /news 専用ページの両方が使う。
 */
import type { CollectionEntry } from 'astro:content';

export type NewsEntry = CollectionEntry<'news'>;

/** 表示日付: frontmatter の date を優先、なければファイル名の頭8桁（YYYYMMDD）から補完 */
export const dateOf = (item: NewsEntry): Date | null => {
  if (item.data.date instanceof Date) return item.data.date;
  const m = item.id.match(/^(\d{8})/);
  if (!m) return null;
  const v = m[1];
  return new Date(Number(v.slice(0, 4)), Number(v.slice(4, 6)) - 1, Number(v.slice(6, 8)));
};

/** 新しい順（古いものは下に蓄積）。日付が取れないものは最下部 */
export const sortByDateDesc = (items: NewsEntry[]): NewsEntry[] =>
  [...items].sort((a, b) => (dateOf(b)?.valueOf() ?? -1) - (dateOf(a)?.valueOf() ?? -1));

export const formatDate = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

export const isoDate = (date: Date | null) => (date ? date.toISOString().slice(0, 10) : undefined);

/** /news ページ内の各記事のアンカー id（ファイル名の拡張子を除いたもの） */
export const articleId = (item: NewsEntry) => item.id.replace(/\.[a-z]+$/i, '');

/** 本文（markdown）が空でないか */
export const hasBody = (item: NewsEntry) => Boolean(item.body && item.body.trim().length > 0);
