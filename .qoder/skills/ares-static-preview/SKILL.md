---
name: ares-static-preview
description: Convert ARES pages between runtime-ready form and static-preview-friendly form. Use when Codex needs a Vue2/Vant2 ARES page to render under `file://`, a simple local server, or a static preview environment by bypassing `getUserInfo.js`, enterprise WeChat JSSDK, watermark/login callbacks, `$http`, or other runtime-only dependencies, and also use when a static or preview HTML needs to be wrapped back into an ARES runtime skeleton with `getUserFinish()` and standard shared dependencies restored.
---

# ARES Static Preview

Keep ARES production pages aligned with the real runtime, but allow controlled conversion in both directions:

- runtime page -> static preview page
- static or preview page -> runtime-ready ARES page

Prefer generating a companion `*.preview.html` file instead of weakening the production HTML in place.

## Workflow

1. Read the target page's `AGENTS.md` and nearby module files first.
2. Confirm the target is an ARES page that should stay Vue2 + Vant2.
3. If the goal is local preview, generate a companion preview file with `scripts/make_static_preview.py`.
4. If the goal is to recover runtime wiring, use `scripts/restore_runtime_page.py`.
5. Inspect the page JS for immediate API calls or login-dependent code.
6. If the HTML shim is not enough, add page-local preview guards using `window.__ARES_STATIC_PREVIEW__`.
7. Keep shared `ares/common/js/` files unchanged unless the user explicitly asks otherwise.

## Quick Start

Generate a preview companion file:

```bash
python3 ~/.codex/skills/ares-static-preview/scripts/make_static_preview.py ares/<module>/<page>.html
```

Default output:

```text
ares/<module>/<page>.preview.html
```

Restore a preview page back into a runtime-ready companion:

```bash
python3 ~/.codex/skills/ares-static-preview/scripts/restore_runtime_page.py \
  ares/<module>/<page>.preview.html
```

Default output:

```text
ares/<module>/<page>.runtime.html
```

Wrap a plain static page into an ARES runtime skeleton:

```bash
python3 ~/.codex/skills/ares-static-preview/scripts/restore_runtime_page.py \
  path/to/static.html \
  --output ares/<module>/<page>.html \
  --title 页面标题 \
  --css css/<page>.css \
  --js js/<page>.js
```

Custom output:

```bash
python3 ~/.codex/skills/ares-static-preview/scripts/make_static_preview.py \
  ares/<module>/<page>.html \
  --output ares/<module>/preview/<page>.html
```

## What The Script Does

- disables `jssdk.js`, `watermark.js`, `server.js`, and `getUserInfo.js`
- replaces the runtime inline block with a preview bootstrap
- stubs `wx`, `initJSSDK`, `__canvasWM`, `$http`, and `$Upload`
- returns a mock cookie value for `user`
- calls `initFun()` directly so the Vue page can mount

## What The Restore Script Does

- if the source is a generated preview page, it re-enables runtime script tags
- replaces the preview bootstrap with the standard runtime inline block
- writes a runtime-ready companion HTML such as `*.runtime.html`
- if the source is a plain static page, it wraps the page body into the ARES standard HTML skeleton
- restores `getUserFinish()`, shared CSS/JS order, and the final `getUserInfo.js` include

## When To Patch Page JS Too

Patch the page JS only if the preview HTML still renders blank or incomplete.

Typical fixes:

- guard `mounted()` and first-load API methods with `window.__ARES_STATIC_PREVIEW__`
- seed local mock lists, tab state, or form data directly in the module JS
- skip navigation or submit side effects during preview
- keep preview-only logic page-local; do not spread it into shared common files

## Preview Guard Pattern

```javascript
if (window.__ARES_STATIC_PREVIEW__) {
    this.list = mockList;
    this.loading = false;
    this.finished = true;
    return;
}
```

## Resources

- Script: `scripts/make_static_preview.py`
- Script: `scripts/restore_runtime_page.py`
- Reference: `references/runtime-blockers.md`

Read the reference when the page still breaks after the default preview shim, or when you need a reminder of the usual ARES runtime blockers.

## Do Not

- do not convert the page away from Vue2 + Vant2 just to preview it
- do not remove ARES production login logic from the real page unless the user explicitly asks for single-file preview mode
- do not patch shared `common/js/` files for a one-page preview need
- do not claim the reverse conversion recreated real business APIs or Vue state logic unless you actually rebuilt the page JS too
