import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

// Revenue
export const fetchRevenue = (startDate, endDate) =>
  API.get(`/revenue?startDate=${startDate}&endDate=${endDate}`);

// Top Products
export const fetchTopProducts = (startDate, endDate) =>
  API.get(`/top-products?startDate=${startDate}&endDate=${endDate}`);
