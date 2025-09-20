import React, { useState, useEffect } from "react";
import DateRangePicker from "./DateRangePicker";
import RevenueChart from "./RevenueChart";
import TopProductsChart from "./TopProductsChart";
import { fetchRevenue, fetchTopProducts } from "../services/api";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [revenueData, setRevenueData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const revenueRes = await fetchRevenue(startDate.toISOString(), endDate.toISOString());
        setRevenueData(revenueRes.data);

        const productsRes = await fetchTopProducts(startDate.toISOString(), endDate.toISOString());
        setTopProducts(productsRes.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
      setLoading(false);
    };

    loadData();
  }, [startDate, endDate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Sales Analytics Dashboard</h2>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <h3>Total Revenue</h3>
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <h3>Top Products</h3>
            <TopProductsChart products={topProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
