import slides from "../index.html";
import getStaticHandler from "./static";
import App from "./app";

const STATIC_DIR = "/static";
const STATIC_BUCKET = "STATIC_ASSETS";

const app = App(async (request, env, ctx) => {
  return new Response(slides, {
    headers: {"Content-Type": "text/html;charset=UTF-8"}
  });
});
app.addMiddleware(getStaticHandler(STATIC_DIR, STATIC_BUCKET));

export default app;
