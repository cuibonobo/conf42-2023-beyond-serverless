import slides from "../index.html";

const CACHE_DAYS = 30;
const STATIC_DIR = "/static";

export default {
	async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/static")) {
      const key = url.pathname.slice(STATIC_DIR.length + 1);
      const object = await env.STATIC_ASSETS.get(key);

      if (object === null) {
        return new Response('Not Found', {status: 404});
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      return new Response(object.body, {headers});
    }

		return new Response(slides, {
      headers: {"Content-Type": "text/html;charset=UTF-8"}
    });
	},
};
