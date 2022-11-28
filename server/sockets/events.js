const Events = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CHAT: {
    MESSAGE: 'chat:message',
  },
  JOB: {
    ASSIGN: 'job:assign',
    CANCEL: 'job:cancel',
    COMPLETE: 'job:complete',
  },
};

module.exports = Events;
