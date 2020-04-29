### Database Objects
`server/models`
avatar: String link

id: Flake String id


```js
Users {
  id: Flake,
  ^email: String,
  ^passwd: String,
  nick: String,
  status: Integer,
  notes: String,
  since: Timestamp,
  avatar: String,
}

Relations {
  id: Flake, // also DM channel id
  users: Array,
  type: Integer, // relation type
  since: Timestamp,
}

Groups {
  id: Flake,
  name: String,
  notes: String,
  owner: Flake,
  popultaion: Integer,
  limit: Integer,
  since: Timestamp,
  avatar: String,
}

Members {
  id: Flake,
  user: Flake,
  group: Flake,
  type: MemberType, // constants/member.js
  stop: Timestamp, // 禁言, 默认 null
  since: Timestamp,
}

Messages {
  id: Flake,
  channel: Flake, // Group or DM id
  type: Integer, // Group or DM message
  author: Flake,
  content: String,
  timestamp: Timestamp,
}
```

> 层次: stores 不能互相引入, controllers 同理.