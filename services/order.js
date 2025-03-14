const axios = require("axios");
const base_url = "http://10.104.21.252";
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

  getReport: async () => {
    return await axios.get(`${base_url}/reports`);
  },

  getReportByDate: async (date) => {
    return await axios.get(`${base_url}/reports/detail`, {
      params: { date }
    });
  },
};

module.exports = OrderService;
