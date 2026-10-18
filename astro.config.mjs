// @ts-check
import { defineConfig } from 'astro/config';

// 第1期は静的出力のみ。外部サービス・追加依存なし（docs/ホーム設計プラン.md §1）。
// GitHub Pages(プロジェクトサイト)用の設定。
// site = https://<ユーザー名>.github.io / base = <リポジトリ名>
export default defineConfig({
  site: 'https://takoyaki9071.github.io',
  base: '/Link_HP_v4',
});
