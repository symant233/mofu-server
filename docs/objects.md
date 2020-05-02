## Database Objects
`server/models`
avatar: String link

id: Flake String id


```js
User {
  id: Flake,
  ^email: String,
  ^passwd: String,
  nick: String,
  status: Integer,
  notes: String,
  since: Timestamp,
  avatar: String,
}

Relation {
  id: Flake, // also DM channel id
  users: Array,
  type: Integer, // relation type
  since: Timestamp,
}

Group {
  id: Flake,
  name: String,
  notes: String,
  owner: Flake,
  popultaion: Integer,
  limit: Integer,
  since: Timestamp,
  avatar: String,
}

Member {
  id: Flake,
  user: Flake,
  group: Flake,
  type: MemberType,
  stop: Timestamp, // 禁言, 默认 null
  since: Timestamp,
}

Message {
  id: Flake,
  channel: Flake, // Group or DM id
  type: Integer, // Group or DM message
  author: Flake,
  content: String,
  timestamp: Timestamp,
}
```

## Response Objects
```js
User {
  id: Flake,
  nick: String,
  status: Integer,
  notes: String,
  since: Timestamp,
  avatar: String,
}

Relation {
  id: Flake, // also DM channel id
  users: Array,
  type: Integer, // relation type
  since: Timestamp,
}

Group {
  id: Flake,
  name: String,
  notes: String,
  owner: UserObject,
  popultaion: Integer,
  limit: Integer,
  since: Timestamp,
  avatar: String,
}

Member {
  id: Flake,
  user: UserObject,
  group: Flake,
  type: MemberType,
  stop: Timestamp, // 禁言, 默认 null
  since: Timestamp,
}

Message {
  id: Flake,
  channel: Flake, // Group or DM id
  type: Integer, // Group or DM message
  author: UserObject,
  content: String,
  timestamp: Timestamp,
}
```