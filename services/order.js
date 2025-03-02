const axios = require("axios");
const base_url = "http://localhost:5000";

const OrderService = {
  getAll: async () => {
    return await axios.get(`${base_url}/orders`);
  },

  getById: async (id) => {
    return await axios.get(`${base_url}/orders/${id}`);
  },

  create: async (data) => {
    return await axios.post(`${base_url}/orders`, data);
  },

  update: async (id, data) => {
    return await axios.put(`${base_url}/orders/${id}`, data);
  },

  delete: async (id) => {
    return await axios.delete(`${base_url}/orders/${id}`);
  },
};

module.exports = OrderService;
