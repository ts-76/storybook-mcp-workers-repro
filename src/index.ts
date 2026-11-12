import { createStorybookMcpHandler } from "@storybook/mcp";

// Importing the package is enough to trigger the failure: the module throws at load.
const handler = createStorybookMcpHandler({
  manifestProvider: async () => JSON.stringify({ v: 1, components: {} }),
});

export default {
  async fetch(request: Request): Promise<Response> {
    return (await handler)(request);
  },
};
