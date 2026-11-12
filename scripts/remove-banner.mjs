// Workaround demo: strip the CJS compatibility banner from the installed package.
// Run `npm install` again to restore the published file.
import fs from "node:fs";

const file = new URL("../node_modules/@storybook/mcp/dist/index.js", import.meta.url);
const source = fs.readFileSync(file, "utf8");
const end = "// end of CJS compatibility banner, injected by Storybook's esbuild configuration";
const index = source.indexOf(end);
if (index === -1) throw new Error("banner not found (already removed?)");
const rest = source.slice(source.indexOf("\n", source.indexOf("\n", index) + 1) + 1);
fs.writeFileSync(file, `var require = undefined;\n${rest}`);
console.log("banner removed");
