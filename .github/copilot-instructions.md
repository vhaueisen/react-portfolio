# Copilot Instructions

## Stack

React 19 · TypeScript 5 · Vite 7 · Tailwind CSS 4 · Framer Motion 12 · Three.js 0.183 (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) · `react-icons`

---

## Directory structure

```
src/
├── types/          # All shared TypeScript interfaces and union types
├── constants/      # Design tokens (colors) and static data (nav links)
├── styles/         # Reusable CSSProperties objects for compound styles
├── data/           # Typed domain data arrays (experience, projects, skills…)
├── hooks/          # Custom React hooks — one concern per file
├── components/
│   ├── ui/         # Generic, reusable presentational components
│   └── three/      # WebGL / Three.js components (require an R3F Canvas context)
└── sections/       # Full-page sections; one file per route section
```

---

## TypeScript

- All domain shapes live in `src/types/index.ts`. Add interfaces there before creating new data files or components that reference that shape.
- Data files must import and use the corresponding type: `EXPERIENCE: ExperienceItem[]`.
- Prefer `interface` for object shapes, `type` for unions and aliases.
- Never use inline anonymous object types in component props — always name them.
- Use `as const` on plain-value lookup objects (e.g. `COLORS`).
- Avoid `any`. If a third-party type is wrong or too narrow, cast with `as unknown as TargetType` and add a comment.

---

## Styling strategy

Two-layer approach — pick the right layer for the job:

| Situation | Use |
|---|---|
| Single-property layout/spacing/typography | Tailwind utility class |
| Multi-property compound style (glassmorphism, gradient-clip, 3D transform sequences) | `CSSProperties` constant from `src/styles/index.ts` |
| Per-component dynamic value (accent color from a data item) | Inline `style` prop, composed with spread: `{ ...glassCard, border: ... }` |

### Style rules

- **Never duplicate** `rgba(13,13,31,0.7)` + `backdropFilter` + `border` inline. Use `glassCard` from `src/styles`.
- **Never duplicate** the gradient text clip pattern inline. Use `gradientText` or `gradientTextShort` from `src/styles`.
- **Never hardcode** palette hex values in components. Import from `COLORS` in `src/constants/colors.ts`.
- The `COLORS` object mirrors the `@theme` block in `src/index.css`. Both must stay in sync when the palette changes.
- Global utility classes defined in `src/index.css` (`.glass`, `.gradient-text`, `.btn-primary`, `.btn-secondary`) are for HTML elements that can't accept TS style objects (e.g. inside a `<style>` block or plain HTML).

---

## Custom hooks

| Hook | Returns | Use for |
|---|---|---|
| `useSectionInView<T>(margin?)` | `[ref, inView]` tuple | Scroll-triggered entrance animations on any section or card |
| `useScrollActive()` | `{ scrolled, activeSection }` | Navbar background blur + active link indicator |
| `useScrollDrum(itemCount)` | `{ scrollTrackRef, selectedIndex, drumPos, itemCount }` | Scroll-jacked drum-roll UI (Experience section) |

### Hook conventions

- Hooks return **tuples** (`[ref, inView]`) when wrapping a ref-based API.
- Hooks return **objects** (`{ scrolled, activeSection }`) when encapsulating multiple unrelated values.
- Hooks belong in `src/hooks/`. Name files `use<CamelCase>.ts`.
- Each hook file exports exactly one hook as a named export.
- Clean up all event listeners and observers in the `useEffect` return function.

---

## Reusable UI components (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `SectionHeading` | Animated `label` + `h2` + optional `subtitle` block used in every section |
| `GlassCard` | Glassmorphism card wrapper. Pass `accentColor` + `active` for hover treatment |
| `TagPill` | Single tag/badge pill with icon support; used in Projects, Skills, About |
| `SocialIconLink` | Icon `<a>` with hover color swap via CSS custom property |
| `AnimatedEntrance` | `opacity/y → visible` entrance wrapper; pass `inView` for scroll-triggered variant |

### Component conventions

- Export from `src/components/ui/index.ts` — always import from the barrel, not from the file directly.
- Props interfaces must be declared immediately above the component function and named `<ComponentName>Props`.
- Components that accept `children` should type it as `ReactNode`.
- Prefer `style` spread composition over `className` overrides for layout that varies from call site to call site.
- Use the `className` prop only for Tailwind utility overrides that don't require dynamic values.

---

## Three.js components (`src/components/three/`)

- Every file in this directory requires an active R3F `<Canvas>` context in the tree.
- Never render these outside a `<Canvas>`. If a component might be used in both contexts, split it.
- Animated meshes must use `useFrame` — never `setInterval` or `requestAnimationFrame`.
- Geometry and material props that don't change must be wrapped in `useMemo` to avoid re-allocation on every render.
- Export from `src/components/three/index.ts`.

---

## Data layer (`src/data/`)

- One file per domain entity. File extension is `.tsx` when the data contains JSX (icons), `.ts` otherwise.
- Data files are **pure** — no hooks, no side-effects, no React component definitions.
- All arrays must be typed with the corresponding interface from `src/types/`.
- Do **not** co-locate data with the section that consumes it. All data lives in `src/data/`.

---

## Animation patterns (Framer Motion)

- Section entrance: use `useSectionInView` + `AnimatedEntrance` or direct `motion.div` with `animate={inView ? { opacity:1, y:0 } : {}}`.
- Staggered children: define `containerVariants` / `charVariants` outside the component (stable references).
- Shared layout transitions: use `layoutId` for elements that move between positions (e.g. nav underline).
- Filter grid transitions: wrap with `<AnimatePresence mode="popLayout">` + `motion.div layout`.
- Never put animation variant objects inside the component body — they recreate on every render.

---

## Section conventions

- Every section exports a single **default export** — the section component.
- All sub-components used only within that section are defined in the same file, above the default export.
- The section's primary container is a `<section id="<slug>">` where `slug` matches the corresponding `href` in `NAV_LINKS`.
- Complex logic (scroll state, drum position) must be extracted into a custom hook — sections own layout and rendering only.
- Use `useSectionInView` for the heading ref. Receive `inView` from that hook; do not create a separate `useRef` + `useInView` pair.

---

## Adding a new section

1. Add `{ label: 'Name', href: '#slug' }` to `NAV_LINKS` in `src/constants/navigation.ts`.
2. Add domain interfaces to `src/types/index.ts`.
3. Create `src/data/<entity>.ts` with a typed array.
4. Create `src/sections/<Name>.tsx` consuming the data and shared primitives.
5. Mount the section in `src/App.tsx` inside `<main>`.
6. If the section needs non-trivial scroll behaviour, extract a hook into `src/hooks/`.

---

## Adding a new UI primitive

1. Create `src/components/ui/<ComponentName>.tsx`.
2. Export the component as a named export.
3. Add the export line to `src/components/ui/index.ts`.
4. Document the props interface with JSDoc comments on each field.

---

## Do not

- Import palette hex values directly in components — always use `COLORS`.
- Define inline style objects that contain more than two properties repeatedly — extract to `src/styles/`.
- Add `useState` for hover effects when a CSS transition suffices (except where JS state is genuinely needed for conditional rendering).
- Use `index` as a React `key` unless the list is static and never reordered.
- Inline `<style>` tags for responsive breakpoints — use Tailwind responsive prefixes (`md:`, `lg:`) or `@layer` utilities in `src/index.css`.
- Duplicate data arrays across files — one source of truth in `src/data/`.
