# ARES Static Preview Blockers

Use this reference when an ARES page opens in a browser as a static file or under a simple local server but fails before rendering.

## Common blockers

1. `getUserInfo.js`
   It starts the enterprise WeChat login chain and usually breaks static preview first.

2. `jssdk.js` and `wx.*`
   These expect the WeChat runtime and signature data.

3. `watermark.js`
   It is usually harmless, but it depends on the login callback path and is not needed for preview.

4. `server.js` / `$http`
   Mounted hooks often call APIs immediately. In preview mode, return mock resolved promises instead of firing real requests.

5. Cookie-dependent user parsing
   Pages often read `$.parseJSON($.cookie("user")).name`. In preview mode, return a mock `user` cookie value.

## Preferred approach

1. Keep the production HTML unchanged when possible.
2. Generate a companion preview file such as `index.preview.html`.
3. Disable the four runtime-only scripts:
   `jssdk.js`, `watermark.js`, `server.js`, `getUserInfo.js`
4. Inject a preview bootstrap that:
   defines `window.__ARES_STATIC_PREVIEW__ = true`
   defines no-op `wx` and `initJSSDK`
   defines no-op `__canvasWM`
   defines mock `$http` and `$Upload`
   returns a mock cookie for `user`
   calls `initFun()` directly on DOM ready

## When HTML shims are not enough

If the page JS still renders blank after the shim:

1. Check whether `mounted()` immediately requests remote data.
2. Add page-level guards like:

```javascript
if (window.__ARES_STATIC_PREVIEW__) {
    this.list = mockList;
    return;
}
```

3. Keep mock data local to the page JS. Do not change shared `common/js/` files just for preview.

## Safety rule

Prefer a companion preview file over editing the production page in place. Only patch the production HTML directly when the user explicitly asks for a single-file preview mode.

## Reverse direction

If the user wants to turn a static page back into an ARES runtime page:

1. Prefer restoring from a generated `*.preview.html` file because the original page structure is still mostly intact.
2. Re-enable the disabled runtime script tags.
3. Replace the preview bootstrap with the standard inline runtime block containing `getUserFinish()`.
4. If the source is a plain static page, wrap its body content into the ARES standard HTML skeleton and point it at the target page's private CSS and JS files.
5. Be explicit that this restores the runtime shell and entry chain, not the real backend logic unless the page JS also gets rebuilt.
