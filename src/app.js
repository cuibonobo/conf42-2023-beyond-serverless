const getFetchHandler = (defaultHandler, middlewareHandlers, errorHandler) => {
  return async (request, env, ctx) => {
    for (let idx = 0; idx < middlewareHandlers.length; idx++) {
      try {
        const response = await middlewareHandlers[idx](request, env, ctx);
        if (response) {
          return response;
        }
      } catch(e) {
        return errorHandler(e);
      }
    }
    return defaultHandler(request, env, ctx);
  };
};

const App = (defaultHandler) => {
  let middlewareHandlers = [];
  const errorHandler = (err) => {
    console.error(err);
    return new Response('Internal server error', {status: 500});
  };
  return {
    addMiddleware: (middlewareHandler) => {
      middlewareHandlers.push(middlewareHandler);
    },
    setMiddlewares: (middlewares) => {
      middlewareHandlers = middlewares;
    },
    fetch: async (request, env, ctx) => {
      return getFetchHandler(defaultHandler, middlewareHandlers, errorHandler)(request, env, ctx);
    }
  };
};

export default App;
