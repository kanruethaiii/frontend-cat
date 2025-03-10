const axios = require("axios");
const base_url = "https://env-7146021.proen.app.ruk-com.cloud";
const CatService = {
  getAll: async () => {
    return await axios.get(`${base_url}/cats`);
  },

  getById: async (id) => {
    return await axios.get(`${base_url}/cats/${id}`);
  },

  create: async (data) => {
    return await axios.post(`${base_url}/cats`, data);
  },

  update: async (id, data) => {
    return await axios.put(`${base_url}/cats/${id}`, data);
  },

  delete: async (id) => {
    return await axios.delete(`${base_url}/cats/${id}`);
  },
};

module.exports = CatService;
