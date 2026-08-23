import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** 목록과 글머리에 그대로 뜨는 이름 */
    title: z.string(),
    /** 한 줄 — 무엇인지. 목록에서는 잘려 나온다 */
    tagline: z.string(),
    /** 2026.08 처럼. 목록 정렬 기준 */
    period: z.string(),
    category: z.string().default('개발·엔지니어링'),
    tags: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    /** 열어볼 것 하나 — 사이트 안 경로도 된다 */
    link: z.string().optional(),
    linkLabel: z.string().optional(),
    /** 아직 안 여는 것. 목록에 이름만 남고 페이지는 안 만든다 */
    draft: z.boolean().default(false),
    /** 목록 맨 위와 글머리에 세우는 그림 */
    cover: z.string().optional(),
    /** 카드에 서는 앱 아이콘 (정사각 png) */
    icon: z.string().optional(),
    /** 낮에 쓸 판이 따로 있으면 */
    coverLight: z.string().optional(),
    /** 글머리에 그림을 자동으로 세울지. 본문에서 직접 배치하면 끈다 */
    headCover: z.boolean().default(true),
    /** 이럴 때 쓴다 — 서너 줄 */
    use: z.array(z.string()).default([]),
    /** 그전 모습 — 지금 화면이 어디서 왔는지 */
    shots: z.array(z.object({
      src: z.string(),
      label: z.string().default(''),
      note: z.string().default(''),
    })).default([]),
  }),
});

export const collections = { projects };
