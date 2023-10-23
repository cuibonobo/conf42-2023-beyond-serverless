const getStaticHandler = (staticDir, staticAssetsBucket) => {
  return async (request, env, ctx) => {
    const url = new URL(request.url);
  
    if (url.pathname.startsWith(staticDir)) {
      const key = url.pathname.slice(staticDir.length + 1);
      const object = await env[staticAssetsBucket].get(key);
  
      if (object === null) {
        return new Response('Not Found', {status: 404});
      }
  
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
  
      return new Response(object.body, {headers});
    }
  };
};

export default getStaticHandler;
