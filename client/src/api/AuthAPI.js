import BaseRoutes from './BaseRoutes';

class AuthApi extends BaseRoutes {
  constructor() {
    super('/auth');
  }

  login = async (data) => {
    const res = await this._post('/login', data);

    return res;
  };

  register = async (data) => {
    const res = await this._post('/register', data);

    return res;
  };

  logout = async () => {
    const res = await this._post('/logout');

    return res;
  };

  getCurrentUser = async () => {
    const res = await this._get('/currentUser');

    return res;
  };
}

export default new AuthApi();
