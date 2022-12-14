import BaseRoutes from "./BaseRoutes";

const Status = {
  Active: "active",
  Inactive: "inactive",
  Assigned: "assigned",
  Completed: "completed",
  Canceled: "cancelled",
  Closed: "closed",
  Deleted: "deleted",
};

class JobAPI extends BaseRoutes {
  constructor() {
    super("/jobs");
  }

  getJobs = async ({ search, createdBy, status } = {}) => {
    let queryString = "";
    if (search || createdBy || status) {
      queryString = `?`;
    }

    if (search) {
      queryString += `search=${search}`;
    }

    if (createdBy) {
      if (queryString.length > 1) {
        queryString += `&`;
      }
      queryString += `createdBy=${createdBy}`;
    }

    if (status) {
      if (queryString.length > 1) {
        queryString += `&`;
      }
      queryString += `status=${status}`;
    }

    const res = await this._get(queryString);

    return res;
  };

  getJob = async (id) => {
    const res = await this._get(`/${id}`);

    return res;
  };
  getJobType = async (type) => {
    const res = await this._get(`/type/${type}`);

    return res;
  };

  createJob = async (data) => {
    const res = await this._post("/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  };

  // {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // createShop = async (data) => {
  //   const res = await this._post("/", data);

  //   return res;
  // };

  updateJob = async (id, data) => {
    const res = await this._put(`/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  };

  assignJob = async (id, assignedTo) => {
    const res = await this._put(`/${id}`, {
      assignedTo,
      status: Status.Assigned,
    });

    return res;
  };

  completeJob = async (id) => {
    const res = await this._put(`/${id}`, {
      status: Status.Completed,
    });

    return res;
  };

  cancelJob = async (id) => {
    const res = await this._put(`/${id}`, {
      status: Status.Canceled,
    });

    return res;
  };

  deactivateJob = async (id) => {
    const res = await this._put(`/${id}`, {
      isActive: false,
    });

    return res;
  };

  deleteJob = async (id) => {
    const res = await this._remove(`/${id}`);

    return res;
  };

  reviewJob = async ({ id, rating, comment }) => {
    const res = await this._post(`/${id}/review`, { rating, comment });

    return res;
  };
}

export default new JobAPI();
