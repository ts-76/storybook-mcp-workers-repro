# @storybook/mcp on Cloudflare Workers: startup failure

Minimal reproduction. A Worker that imports `@storybook/mcp` fails at startup,
because the CJS compatibility banner at the top of `dist/index.js` calls
`fileURLToPath(import.meta.url)` and `import.meta.url` is undefined in a
bundled Worker.

Versions: `@storybook/mcp` 10.6.7, `wrangler` 4.155.0, `nodejs_compat` enabled.

## Reproduce

```sh
npm install
npm run dev
```

Result:

```
Uncaught TypeError: The "path" argument must be of type string or an instance of URL. Received undefined
    at fileURLToPath (node-internal:internal_url:155:15)
    at index.js:7807:50
The Workers runtime failed to start.
```

## Workaround

Removing the banner from the installed file lets the Worker start:

```sh
npm run patch
npm run dev
```

In another terminal:

```sh
curl -X POST http://localhost:8787/mcp \
  -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

This returns the tool list (`docs-list`, ...). Run `npm install` again after
deleting `node_modules/@storybook/mcp` to restore the published file.
