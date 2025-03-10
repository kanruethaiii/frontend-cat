const axios = require("axios");
const base_url = "https://env-7146021.proen.app.ruk-com.cloud";

const CatService = {
  getAll: async () => {
    return await axios.get(`${base_url}/breeds`);
  },

  getById: async (id) => {
    return await axios.get(`${base_url}/breeds/${id}`);
  },

  create: async (data) => {
    return await axios.post(`${base_url}/breeds`, data);
  },

  update: async (id, data) => {
    return await axios.put(`${base_url}/breeds/${id}`, data);
  },

  delete: async (id) => {
    return await axios.delete(`${base_url}/breeds/${id}`);
  },
};

module.exports = CatService;
