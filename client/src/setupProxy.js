const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  //app.use(proxy.createProxyMiddleware('/', { target: 'ws://localhost:4000', ws: true }));
  //app.use(proxy.createProxyMiddleware('/socket.io', { target: 'ws://localhost:4000', ws: true }));
};


/*import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    createProxyMiddleware('/socket.io', {
      target: 'ws://localhost:4000',
      ws: true
    })
  )
};*/