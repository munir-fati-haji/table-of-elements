const mocks = require("./mocks");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(mocks.data);
const middlewares = jsonServer.defaults();
const port = 3000;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    ...mocks.endpoints,
  }),
);

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running http://localhost:${port}`);
});
