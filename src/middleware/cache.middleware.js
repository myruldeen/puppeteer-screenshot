const NodeCache = require('node-cache');
const config = require('../config');

const cache = new NodeCache({ stdTTL: config.cache.ttl });

const cacheMiddleware = (req, res, next) => {
  const key = `${req.originalUrl || req.url}`;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.contentType('image/png');
    return res.send(cachedResponse);
  }

  res.sendResponse = res.send;
  res.send = (body) => {
    cache.set(key, body);
    res.sendResponse(body);
  };
  next();
};

module.exports = cacheMiddleware;