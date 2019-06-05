const socketRouter = {
    onEntryClub: 'onEntryClub',     // 监听进入俱乐部
    onLeaveClub: 'onLeaveClub',     // 监听离开俱乐部
    onEntryClubRoom: 'onEntryClubRoom',     // 监听进入俱乐部房间
    onLeaveClubRoom: 'onLeaveClubRoom',     // 监听离开俱乐部房间
    onStandUp: 'onStandUp',     // 监听俱乐部房间站起
    onSitDown: 'onSitDown',     // 监听俱乐部房间坐下

    onJoinRoom: 'onJoinRoom',       // 监听加入房间
    onLeaveRoom: 'onLeaveRoom',     // 监听离开房间
    onDestoryRoom: 'onDestoryRoom', // 监听解散房间
    onDestoryRoomRequest: 'onDestoryRoomRequest',   // 监听解散房间请求
    onReady: 'onReady',     // 监听准备
    onVoiceChat: 'onVoiceChat', // 监听语音聊天
    onFaceChat: 'onFaceChat', // 监听表情聊天
    onWordChat: 'onWordChat', // 监听快捷语聊天
    onStageProperty: 'onStageProperty',   // 监听发送道具

    onSendPoker: 'onSendPoker',     // 监听发牌
    onSettlement: 'onSettlement',   // 监听结算
    onStep: 'onStep',       // 监听牌局阶段
    onExpression: 'onExpression'    // 监听
};
export default socketRouter;
