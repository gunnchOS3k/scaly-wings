export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/__runtime") {
      return env.ASSETS.fetch(new Request(new URL("/__runtime", url), request));
    }
    return env.ASSETS.fetch(request);
  },
};
