# Copilot Instructions

## Stack

React 19 · TypeScript 5 · Vite 7 · Framer Motion 12 · Three.js 0.183 (`@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) · `react-icons`

---

## Formatting (Prettier)

All code must be formatted with Prettier before committing. Run `npm run format`.

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSameLine": false,
  "arrowParens": "always"
}
```

- **2-space indent** everywhere — no tabs.
- **Single quotes** for strings in TS/TSX; double quotes in JSX attribute values only when the string itself contains a single quote.
- **No semicolons.**
- **Trailing commas** on multi-line object/array/function-param lists (`es5` mode — no trailing comma in function type parameters).
- **100-character print width** — Prettier wraps beyond this.
- All edits must produce a clean `prettier --check` diff (i.e. the formatter changes nothing after your edit).

---

## Directory structure

```
src/
├── types/          # All shared TypeScript interfaces and union types
├── constants/      # Design tokens (colors) and static data (nav links)
├── styles/         # Reusable CSSProperties objects for compound styles
├── data/           # Typed domain data arrays (experience, projects, skills…)
├── hooks/          # Custom React hooks — one concern per file
├── context/        # React context providers, reducers, and consumer hooks
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
- Avoid `any`. If a third-party type is wrong or too narrow, use a **precise cast**: `value as Parameters<typeof fn>[0]` or `value as unknown as TargetType`. Never silently widen with `as any`. Leave a comment explaining the cast.
- Never reference the `React` namespace (e.g. `React.ReactNode`, `React.CSSProperties`) — always use named imports: `import type { ReactNode, CSSProperties } from 'react'`.
- Use `useRef<T | null>(null)` — not `useRef<T>(null!)`. The non-null assertion contradicts the `if (ref.current)` guard that is required in `useFrame` and `useEffect`. Be consistent: assert non-null only when the element is guaranteed to exist before any access.
- Guard `document.getElementById` calls with an explicit error: `if (!el) throw new Error('...')`. Silent `!` assertions hide missing DOM elements.
- Props interfaces for sub-components defined inside a section file must be named and declared immediately above the function — not as anonymous inline intersection types.

---

## Branded color type (`CSSColor`)

`src/constants/colors.ts` exports:

```ts
export type CSSColor = string & { readonly __brand: 'CSSColor' }
export const css = (v: string): CSSColor => v as CSSColor
```

- **Every** field typed as a CSS color in any `interface` (e.g. `ExperienceItem.color`, `ProjectItem.color`, `SkillGroup.color`, `StoreLink.bg`, `ContactLink.color`) must use `CSSColor`, not bare `string`.
- Use `COLORS.*` tokens wherever the value matches an existing token.
- Use `css()` for computed alpha variants that cannot be expressed as a direct token:
  ```ts
  bg: css('rgba(52,211,153,0.08)')
  ```
- Never write raw hex or rgba strings in data files or components — the branded type will reject them at compile time.
- When adding new recurring color values, first consider adding a named token to `COLORS` in `src/constants/colors.ts` **and** a matching `--color-*` custom property in the `@theme` block of `src/index.css` so both layers stay in sync.

---

## Styling strategy

Two-layer approach — pick the right layer for the job:

| Situation | Use |
|---|---|
| Multi-property compound style (glassmorphism, gradient-clip, 3D transform sequences) | `CSSProperties` constant from `src/styles/index.ts` |
| Per-component dynamic value (accent color from a data item) | Inline `style` prop, composed with spread: `{ ...glassCard, border: ... }` |

### Style rules

- **Never duplicate** `rgba(13,13,31,0.7)` + `backdropFilter` + `border` inline. Use `glassCard` from `src/styles`.
- **Never duplicate** the gradient text clip pattern inline. Use `gradientText` or `gradientTextShort` from `src/styles`.
- **Never hardcode** palette hex values in components — not in `style` props. Always use `COLORS` from `src/constants/colors.ts` or a `var(--color-*)` CSS custom property.
- The `COLORS` object mirrors the `@theme` block in `src/index.css`. Both must stay in sync when the palette changes.
- `src/styles/index.ts` exports helper functions (`accentBorder`, `iconBox`, `periodBadge`, `tagPill`) in addition to the style constants. Use them instead of recreating the same multi-property object inline.
- Global utility classes defined in `src/index.css` (`.glass`, `.gradient-text`, `.btn-primary`, `.btn-secondary`) are for HTML elements that can't accept TS style objects.
- Hover states for interactive elements belong in `src/index.css` as named CSS classes referencing `var(--color-*)` tokens. Never use `onMouseEnter`/`onMouseLeave` to imperatively mutate `e.currentTarget.style`.

---

## CSS conventions (`src/index.css`)

- All `@keyframes` animations, responsive visibility rules, and component hover states live here — no inline `<style>` tags anywhere in the component tree.
- Group rules under named section comments: `/* ─── Navbar … */`, `/* ─── Hero … */`, etc.
- CSS hover rules must reference `@theme` custom properties (`var(--color-accent-indigo)`, `var(--color-text-primary)`, …), not raw hex values.
- Responsive show/hide is handled with `.nav-desktop` / `.nav-mobile-toggle` classes and `@media` blocks in this file, not with inline `display` style toggling.

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
- Hooks must not re-export constants from data files. Consumers that need a constant import it directly from `src/data/` or `src/constants/`.
- UI layout constants (pixel heights, scroll ratios, animation timing) are **not domain data**. They belong in the hook that uses them, not in `src/data/`.
- When a parent section already has `inView`, pass it down to sub-components instead of calling `useSectionInView` inside each child — avoid creating multiple redundant `IntersectionObserver` instances for the same viewport event.

---

## Reusable UI components (`src/components/ui/`)

| Component | Purpose |
|---|---|
| `SectionHeading` | Animated `label` + `h2` + optional `subtitle` block used in every section |
| `GlassCard` | Glassmorphism card wrapper. Pass `accentColor` + `active` for hover treatment |
| `TagPill` | Single tag/badge pill with icon support; used in Projects, Skills, About |
| `SocialIconLink` | Icon `<a>` with hover color swap via CSS custom property |
| `AnimatedEntrance` | `opacity/y → visible` entrance wrapper; pass `inView` for scroll-triggered variant |
| `CanvasErrorBoundary` | Class-based error boundary that catches WebGL/R3F failures and renders a glass-card fallback |

### Component conventions

- Export from `src/components/ui/index.ts` — always import from the barrel, not from the file directly.
- Props interfaces must be declared immediately above the component function and named `<ComponentName>Props`.
- Components that accept `children` should type it as `ReactNode`.
- Prefer `style` spread composition over `className` overrides for layout that varies from call site to call site.
- Use the `className` prop only for named CSS class overrides that don't require dynamic values.
- `key` props belong only on list children. Never place `key` on an element that is not inside a `.map()` — it is a no-op and indicates a copy-paste error.

---

## Error boundaries

- Every `<Canvas>` (R3F) in the tree must be wrapped in `<CanvasErrorBoundary>` from `src/components/ui`. A WebGL context failure or Three.js runtime error must not crash the entire React tree.
- `CanvasErrorBoundary` is a class component — React's error boundary API (`getDerivedStateFromError` / `componentDidCatch`) is only available on class components. This is intentional and demonstrates correct React knowledge.
- Pass a custom `fallback` prop when the default "3D rendering not available" message does not fit the context.

---

## Three.js components (`src/components/three/`)

- Every file in this directory requires an active R3F `<Canvas>` context in the tree.
- Never render these outside a `<Canvas>`. If a component might be used in both contexts, split it.
- Animated meshes must use `useFrame` — never `setInterval` or `requestAnimationFrame`.
- Geometry and material instances that do not change must be wrapped in `useMemo` to prevent re-allocation on every render frame (~60 allocations/second otherwise).
- Side effects that target Three.js objects (e.g. `action.play()`, `mixer.update()`) must run inside `useEffect`, never in the render body. Running them during render causes double-invocation in React StrictMode.
- Export from `src/components/three/index.ts`.

---

## Data layer (`src/data/`)

- One file per domain entity. File extension is `.tsx` when the data contains JSX (icons), `.ts` otherwise.
- Data files are **pure** — no hooks, no side-effects, no React component definitions.
- All arrays must be typed with the corresponding interface from `src/types/`.
- Do **not** co-locate data with the section that consumes it. All data lives in `src/data/`.
- Do **not** include UI layout constants (heights, scroll ratios, animation durations) in data files. Those belong in the hook or component that uses them.
- A type declared in `src/types/index.ts` must be the single source of truth. Never re-declare a structurally identical interface locally inside a section or component.

---

## Animation patterns (Framer Motion)

- Section entrance: use `useSectionInView` + `AnimatedEntrance` or direct `motion.div` with `animate={inView ? { opacity:1, y:0 } : {}}`.
- Staggered children: define `containerVariants` / `charVariants` outside the component (stable references).
- Shared layout transitions: use `layoutId` for elements that move between positions (e.g. nav underline).
- Filter grid transitions: wrap with `<AnimatePresence mode="popLayout">` + `motion.div layout`.
- Conditional renders that need an exit animation **must** be wrapped in `<AnimatePresence>`. Without it, the `exit` prop is silently ignored and the element disappears instantly.
- Every `initial`/`animate` pair inside `<AnimatePresence>` must have a matching `exit` prop.
- Never put animation variant objects inside the component body — they recreate on every render.

---

## Accessibility

- Navigation links use `<a href={href}>` with `e.preventDefault()` + imperative smooth-scroll — not `<button>` elements. This makes them keyboard-navigable, right-clickable, and semantically correct as links.
- Every `<a>` tag must have an `href`. An anchor without `href` is not focusable via keyboard and has no semantic meaning. Use `<button>` for actions that are not navigations.
- Icon-only buttons and links must have `aria-label`.
- Error boundary fallback containers must have `aria-label="<description> unavailable"`.

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
- Hardcode hex values in `style` props — use `COLORS.*` tokens instead.
- Define inline style objects with more than two properties repeatedly — extract to `src/styles/`.
- Use `onMouseEnter`/`onMouseLeave` to imperatively mutate `e.currentTarget.style` — use a CSS class with a `:hover` rule in `src/index.css`.
- Write CSS hover rules with raw hex values — reference `var(--color-*)` `@theme` tokens.
- Add `useState` for hover effects when a CSS transition suffices (except where JS state is genuinely needed for conditional rendering).
- Use `index` as a React `key` unless the list is static and never reordered.
- Inline `<style>` tags anywhere — all styles go in `src/index.css` or as `style`/`className` props.
- Duplicate data arrays across files — one source of truth in `src/data/`.
- Duplicate type shapes locally — one source of truth in `src/types/index.ts`.
- Place UI layout constants (heights, ratios, durations) in `src/data/` files.
- Re-export constants from hooks — consumers import directly from the source.
- Render `<Canvas>` without a `<CanvasErrorBoundary>` wrapper.
- Run Three.js side effects (`.play()`, `.pause()`, mutations) in the render body — always `useEffect`.
- Use `React.X` namespace references — always use named `import type { X } from 'react'`.
- Cast to `any` — use `Parameters<typeof fn>[n]` or `as unknown as T` with a comment.
