import jsonfile from 'jsonfile';

const filename = process.env.NODE_ENV || 'development';

const file = jsonfile.readFileSync(`./configs/${filename}.json`);

const config = {
  port: process.env.PORT || file.port,
  apiPrefix: file.api_prefix,
  apiVersion: file.api_version,
  jwtKey: file.jwt_key,
  mongoURL: `mongodb://${file.mongo_url}`,
  redisURL: {
    host: file.redis.host,
    port: file.redis.port,
    passwd: file.redis.passwd,
  },
};

export default config;
