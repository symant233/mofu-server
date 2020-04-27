Database Objects

avater: String link
id: Flake String id

```js
Users {
  id: Flake,
  email: String,
  passwd: String,
  nick: String,
  status: Integer,
  notes: String,
  since: Timestamp,
  avater: String,
}

Relations {
  id: Flake, // also DM channel id
  users: Array,
  since: Timestamp,
}

Groups {
  id: Flake,
  name: String,
  notes: String,
  owner: Flake,
  limit: Integer,
  since: Timestamp,
  avater: String,
}

Members {
  id: Flake,
  group: Flake,
  type: MemberType, // constants/member.js
  stop: Timestamp, // 禁言, 默认 null
  since: Timestamp,
}

Messages {
  id: Flake,
  type: Integer, // Group or DM message
  channel: Flake, // Group or DM id
  author: Flake,
  content: String,
  timestamp: Timestamp,
}
```