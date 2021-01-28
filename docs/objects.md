## Database Objects
`server/models`
avatar: String link

id: Flake String id


```js
User {
  _id: Flake,
  ^email: String,
  ^passwd: String,
  nick: String,
  status: Number,
  notes: String,
  since: Timestamp,
  avatar: String,
}

Relation {
  _id: Flake, // also DM channel id
  users: Array,
  type: Number, // relation type
  since: Timestamp,
}

Group {
  _id: Flake,
  name: String,
  notes: String,
  owner: Flake,
  popultaion: Number,
  limit: Number,
  since: Timestamp,
  avatar: String,
}

Member {
  _id: Flake,
  user: Flake,
  group: Flake,
  type: Number, // MemberType
  stop: Timestamp, // 禁言, 默认 null
  since: Timestamp,
}

Message {
  _id: Flake,
  channel: Flake, // Group or DM id
  type: Number, // Group or DM message
  author: Flake, // Member or User flake
  content: String,
  timestamp: Timestamp,
}

Audit {
  _id: BSON,
  ip: String,
  type: Number,
  count: Number,
  lastRecord: Timestamp,
}
```

## Response Objects
```js
User {
  id: Flake,
  nick: String,
  status: Number,
  notes: String,
  since: Timestamp,
  avatar: String,
}

Relation {
  id: Flake, // also DM channel id
  user: User, // 对方用户信息
  type: Number, // relation type
  since: Timestamp,
}

Group {
  id: Flake,
  name: String,
  notes: String,
  owner: UserObject,
  popultaion: Number,
  limit: Number,
  since: Timestamp,
  avatar: String,
}

Member {
  id: Flake,
  user: UserObject,
  group: Flake,
  type: Number, // MemberType
  stop: Timestamp, // 禁言, 默认 null
  since: Timestamp,
}

Message {
  id: Flake,
  channel: Flake, // Group or DM id
  type: Number, // Group or DM message
  author: Object, // Member or User object
  content: String,
  timestamp: Timestamp,
}

Audit {
  id: BSON,
  ip: String,
  type: Number,
  count: Number,
  lastRecord: Timestamp,
}
```