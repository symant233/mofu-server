const jsonfile = require('jsonfile');

const filename = process.env.NODE_ENV || 'development';
const file = jsonfile.readFileSync(`./configs/${filename}.json`);

const config = Object.freeze({
  port: process.env.PORT || file.port,
  apiPrefix: file.api_prefix,
  apiVersion: file.api_version,
  jwtSecret: file.jwt_secret,
  mongoURL: `mongodb://${file.mongo_url}`,
  redisURL: {
    host: file.redis.host,
    port: file.redis.port,
    passwd: file.redis.passwd,
  },
  machine: file.machine,
});

module.exports = config;
