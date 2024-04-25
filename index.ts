import MatterPlugin from "src/main";

const plugin = new MatterPlugin();

Bun.serve({
  port: 5151,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      const entries = await plugin.getQueue();
      return new Response(JSON.stringify(entries), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response("404!");
  },
});

console.log("Server running at http://localhost:5151/");
