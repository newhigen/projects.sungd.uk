import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    /** 목록과 글머리에 그대로 뜨는 이름 */
    title: z.string(),
    /** 한 줄 — 무엇인지 */
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
    /** 이게 무엇인가 — «안드로이드 앱» · «대시보드» 처럼. 카드와 기둥 맨 위에 선다 */
    kind: z.string().optional(),
    /** 카드에 서는 앱 아이콘 (정사각 png) */
    icon: z.string().optional(),
    /** 글머리에 세우는 그림 · 낮에 쓸 판 */
    cover: z.string().optional(),
    coverLight: z.string().optional(),
    /** 글머리에 그림을 자동으로 세울지. 본문에서 직접 놓으면 끈다 */
    headCover: z.boolean().default(true),
    /** 이럴 때 쓴다 — 서너 줄 */
    use: z.array(z.string()).default([]),
    /** 그전 모습 */
    shots: z.array(z.object({
      src: z.string(),
      label: z.string().default(''),
      note: z.string().default(''),
    })).default([]),
  }),
});

/**
 * 개발기 — 같은 슬러그로 짝을 이룬다. 소개(`/슬러그`)는 «무엇을 하는 앱인가»,
 * 개발기(`/슬러그/making`)는 «어떻게 만들었나». 읽는 사람이 달라서 화면을 나눴다.
 */
const making = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/making' }),
  schema: z.object({
    /** 개발기 화면의 한 줄 */
    tagline: z.string(),
  }),
});

export const collections = { projects, making };
