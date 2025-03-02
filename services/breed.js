const axios = require("axios");
const base_url = "http://localhost:5000";

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
