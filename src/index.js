import slides from "../index.html";

export default {
	async fetch(request, env, ctx) {
		return new Response(slides, {
      headers: {"Content-Type": "text/html;charset=UTF-8"}
    });
	},
};
