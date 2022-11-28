import BaseRoutes from './BaseRoutes';

class CategoryApi extends BaseRoutes {
  constructor() {
    super('/categories');
  }

  getCategories = async () => {
    const res = await this._get('/');

    return res;
  };
}

export default new CategoryApi();
