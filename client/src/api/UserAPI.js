import BaseRoutes from './BaseRoutes';

class UserApi extends BaseRoutes {
  constructor() {
    super('/users');
  }

  getProfile = async () => {
    const res = await this._get('/profile');

    return res;
  };

  updateProfile = async (data) => {
    const res = await this._put('/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res;
  };

  reportUser = async (data) => {
    const res = await this._post('/report', data);

    return res;
  };
}

export default new UserApi();
