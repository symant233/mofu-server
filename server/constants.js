export const MemberType = Object.freeze({
  REQUEST: 0, // 等待审核
  OWNER: 1, // 群主
  MANAGER: 2, // 管理员
  NORMAL: 3, // 普通
  BANNED: 4, // 屏蔽中
  // ROBOT: 5, // 机器人
});

export const MessageType = Object.freeze({
  GROUP: 1,
  DIRECT: 2,
});

export const RelationType = Object.freeze({
  REFUSED: 0, // 请求
  REQUEST: 1, // 拒绝
  FRIEND: 2, // 好友
  TEMPORARY: 3, // 临时
  BANNED: 4, // 屏蔽
});
