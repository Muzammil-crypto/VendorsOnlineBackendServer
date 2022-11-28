import BaseRoutes from './BaseRoutes';

class ChatApi extends BaseRoutes {
  constructor() {
    super('/chats');
  }

  createChat = async (users) => {
    return await this._post('', { users });
  };

  getChats = async () => {
    return await this._get('');
  };

  getChat = async (id) => {
    return await this._get(`/${id}`);
  };

  addTextMessage = async ({ id, text, receiverId }) => {
    return await this._post(`/${id}/text`, { text, receiverId });
  };

  addReferenceMessage = async ({
    id,
    text,
    job,
    referenceType,
    receiverId,
  }) => {
    return await this._post(`/${id}/reference`, {
      text,
      job,
      referenceType,
      receiverId,
    });
  };
}

export default new ChatApi();
