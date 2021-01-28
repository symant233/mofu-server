const jsonfile = require('jsonfile');

const filename = process.env.NODE_ENV || 'development';
const file = jsonfile.readFileSync(`./configs/${filename}.json`);

const config = Object.freeze({
  port: process.env.PORT || file.port,
  socketPort: file.socket_port,
  apiPrefix: file.api_prefix,
  apiVersion: file.api_version,
  jwtSecret: process.env.JWTSECRET || file.jwt_secret,
  mongoURL: process.env.MONGOURL || file.mongo_url,
  redisURL: {
    host: file.redis.host,
    port: file.redis.port,
    passwd: file.redis.passwd,
  },
  machine: file.machine,
});

module.exports = config;
