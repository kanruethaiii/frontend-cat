const axios = require("axios");
const base_url = "http://10.104.21.252";
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
