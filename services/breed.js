const axios = require("axios");
const base_url = "https://catshopfinal.proen.app.ruk-com.cloud";

const CatService = {
  getAll: async () => {
    console.log(`${base_url}/breeds`)
    return await axios.get(`${base_url}/breeds`);
  },

  getById: async (id) => {
    console.log(`${base_url}/breeds/${id}`)
    return await axios.get(`${base_url}/breeds/${id}`);
  },

  create: async (data) => {
    console.log(`${base_url}/breeds`)
    return await axios.post(`${base_url}/breeds`, data);
  },

  update: async (id, data) => {
    console.log(`${base_url}/breeds/${id}`)
    return await axios.put(`${base_url}/breeds/${id}`, data);
  },

  delete: async (id) => {
    console.log(`${base_url}/breeds/${id}`)
    return await axios.delete(`${base_url}/breeds/${id}`);
  },
};

module.exports = CatService;
