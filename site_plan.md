# Sifu Yik Hook Library — Website Plan

## Product objective

The website will turn the enriched 1,000-hook collection into a fast, focused discovery tool. Visitors should be able to begin with the type of content they want to make, narrow the list by their niche, open one strong hook, see five concrete adaptations, and copy the version that fits their next post.

The experience will be branded as **Created by Sifu Yik** and will retain the source-status and inspiration-link context already present in the library. It will not present supplemental hooks as externally sourced material.

## Chosen design direction

The interface will follow the **Editorial Field Manual** philosophy: a contemporary dark-green reference desk with structured browsing, tactile detail, and unusually strong typographic hierarchy. Rather than a generic template catalogue, it should feel like a content strategist’s working library.

The visual system centers on near-black forest green, field moss, parchment, and a sparing citron accent. A large editorial masthead will use a dark studio still life as its background; the rest of the site will favor utility, structured labels, and readable density.

## Proposed information architecture

| Area | Purpose | Primary interactions |
|---|---|---|
| Masthead | Explain the library’s value and establish Sifu Yik branding. | Scroll to library; open methodology note. |
| Discovery rail | Keep the main browsing controls permanently visible on larger screens. | Search; select a content style; select a recommended niche; clear filters. |
| Results index | Show the matching hook count and a compact, readable list of hooks. | Select a hook; copy the hook; load more results. |
| Hook detail pane | Make one hook actionable without leaving the page. | Copy original hook; copy any of five niche examples; open inspiration source. |
| Browse paths | Give creators fast entry points by intent rather than only category. | Jump to styles such as How-to, Personal Story, Myth Busting, or Authority. |
| Provenance footer | Clarify the creator, the library’s source convention, and supplemental-hook labels. | Review source-status explanation. |

## Core user flow

1. A creator arrives and sees the positioning: **“Find the opening line your next post needs.”**
2. They choose a content style, a niche, or type a phrase into search.
3. The results index updates instantly and tells them how many hooks match.
4. They open a hook to see its recommended niches, full source status, and five ready-to-use cross-niche examples.
5. They copy either the template or an example. Where an original source exists, they may open the original inspiration URL in a new tab.

## Visual and interaction decisions

The page will use a **wide editorial masthead** rather than a conventional centered hero. On desktop, a narrow left browse rail and a large right reading canvas create a reference-desk layout; on mobile, filters condense into a bottom sheet or compact drawer so that reading space remains comfortable.

Cards will carry a bold mono hook number, a small style stamp, and an accent field-note edge. Selecting a result opens a high-contrast parchment detail surface, which makes examples easy to scan and copy. The visual language will avoid bright gradients, overly rounded components, and generic dashboard styling.

## Library data model in the interface

The site will import the existing enriched hook data as a static client-side dataset. Each displayed entry will include the original hook, primary content style, recommended niches, five niche examples, available inspiration URL(s), and the source-status label. Results will be rendered progressively so searching and filtering remain practical while the page stays lightweight.

| Data field | How it appears in the site |
|---|---|
| Hook number and template | Result row and detail headline. |
| Content style | Filter, browse path, and classification stamp. |
| Three recommended niches | Filter and label group. |
| Five examples | Copy-ready table in the detail pane. |
| Inspiration URL(s) | Outbound reference button when available. |
| Source status | Small disclosure label in the detail pane. |

## Deliverables after approval

The implementation will include a responsive single-page web application, search and multi-filter controls, working copy buttons, source links, a dark-green Sifu Yik visual identity, and the full 1,000-hook dataset. The final handoff will include a version checkpoint and a visual verification pass.

## Planning assumption

This plan treats the 1,000-hook enriched library prepared in the previous step as the content source. The initial site will be a public, frontend-only browsing experience; it will not require accounts, payments, or user-saved collections. Those can be added later if needed.
