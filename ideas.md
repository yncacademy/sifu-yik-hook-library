# Sifu Yik Hook Library — Design Directions

## Three possible approaches

### 1. The Editorial Field Manual
**Very Brief Intro:** A dark, tactile content tool that feels like a strategist’s annotated reference book, with high-contrast typography and an intentional browsing rhythm. It positions the hook library as a working system rather than a generic template database.

**Probability:** 0.07

### 2. Signal Room
**Very Brief Intro:** A sharp, studio-like interface inspired by broadcast control rooms, using deep green, analytical panels, and rapid filtering. It makes content discovery feel direct, fast, and purposeful.

**Probability:** 0.04

### 3. The Garden Index
**Very Brief Intro:** An organic knowledge archive with botanical texture, open whitespace, and visual paths through content styles and niches. It emphasizes thoughtful growth and long-term creative practice.

**Probability:** 0.08

---

## Chosen Approach: The Editorial Field Manual

### Design Movement
**Contemporary editorial design** meets a **field-notes reference system**: tactile, precise, slightly archival, and designed for repeated use.

### Core Principles
1. **Discovery before decoration:** Search, niche selection, and content-style paths are immediately legible and always within reach.
2. **Editorial hierarchy:** Large serif moments establish confidence; compact mono labels make the 1,000-entry library easy to scan.
3. **Earned texture:** Fine rules, paper-grain overlays, and restrained highlight color create depth without hiding utility.
4. **Structured contrast:** Open editorial whitespace sits beside dense, useful control panels and cards.

### Color Philosophy
The site uses a near-black **forest green** as its primary field, rather than a flat black. **Parchment** creates relief for reading and example content; **moss** signals filters and active states; a sparing **citron-lime** accent marks the current choice or next action. The palette should feel like working late in a well-appointed studio: calm, focused, and materially rich.

### Layout Paradigm
The home screen is an **asymmetric reference desk**. A narrow, persistent browse rail holds search, style, and niche controls. The main canvas starts with a wide editorial masthead, then progresses into a variable-density hook index. On larger screens, the selected hook expands into a right-side detail pane with five examples and the inspiration source, avoiding a conventional centered marketing grid.

### Signature Elements
1. **Numbered shelf labels:** Bold hook IDs rendered in mono type as a visual wayfinding device.
2. **Classification stamps:** Small bordered labels for content style and recommended niches.
3. **Field-note margin:** A slim accent line and compact metadata column that runs through cards and detail panels.

### Interaction Philosophy
Browsing should feel like opening a well-organized physical archive. Filters respond instantly, the active selection remains visually anchored, and the user can copy a hook or example in one deliberate action. Control surfaces are practical, tactile, and never theatrical.

### Animation
Use 160–220ms custom ease-out transitions for selection, panel changes, and filters. Hook rows subtly lift by 2px and their edge marker brightens on hover. Results may enter in small 40ms staggered groups, while the detail panel cross-fades and translates 8px from the right. Disable nonessential movement for reduced-motion preferences.

### Typography System
**DM Serif Display** handles major editorial statements and selected-hook quotations. **Manrope** supplies readable interface text and buttons. **IBM Plex Mono** is reserved for hook IDs, filters, counts, and source metadata. Headlines use tight tracking; utility labels use uppercase tracking with generous letter spacing.

### Brand Essence
**Sifu Yik Hook Library is a disciplined content reference system for creators who want stronger opening lines without the guesswork.**

**Personality:** Exacting, grounded, generous.

### Brand Voice
Headlines should be calm, precise, and useful—not hype-driven. CTAs should describe a real action in practical language.

> “Find the opening line your next post needs.”

> “Filter the library. Keep the momentum.”

### Wordmark & Logo
The mark is a bold abstract **SY monogram** built from two interlocking brush-cut strokes inside a rounded-square seal. The wordmark pairs it with a compact, wide-tracked **SIFU YIK** inscription—not a default font treatment.

### Signature Brand Color
**Field Moss — #1B5B47.** A deep, ownable green used for active controls, markers, and brand emphasis.

## Style Decisions

- Citron-lime is reserved for a primary next action, an active selection, or one editorial emphasis per section. Field Moss carries most active-control and identity states.
- Every major content surface includes a field-manual signal: a numbered shelf label, classification stamp, slim margin rule, or mono metadata line.
- Follow language remains practical and reference-oriented. The required “AI Tips and News” CTA is paired with a concrete creator-workflow benefit.
