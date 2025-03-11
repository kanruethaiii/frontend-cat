const axios = require("axios");
const base_url = "https://catshopfinal.proen.app.ruk-com.cloud/";
const CustomerService = {
  getAll: async () => {
    return await axios.get(`${base_url}/customers`);
  },

  getById: async (id) => {
    return await axios.get(`${base_url}/customers/${id}`);
  },

  create: async (data) => {
    return await axios.post(`${base_url}/customers`, data);
  },

  update: async (id, data) => {
    return await axios.put(`${base_url}/customers/${id}`, data);
  },

  delete: async (id) => {
    return await axios.delete(`${base_url}/customers/${id}`);
  },
};

module.exports = CustomerService;
