import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./statistics.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function StatisticsPage({ user }) {
  // Fake example data — can later be replaced with API
  const monthlyData = [
    { month: "Jan", events: 120 },
    { month: "Feb", events: 98 },
    { month: "Mar", events: 140 },
    { month: "Apr", events: 160 },
    { month: "May", events: 190 },
    { month: "Jun", events: 170 },
    { month: "Jul", events: 210 },
    { month: "Aug", events: 230 },
    { month: "Sep", events: 250 },
    { month: "Oct", events: 240 },
    { month: "Nov", events: 270 },
    { month: "Dec", events: 300 }
  ];

  const totalEvents = monthlyData.reduce((sum, m) => sum + m.events, 0);
  const growth = (((monthlyData[11].events - monthlyData[0].events) / monthlyData[0].events) * 100).toFixed(1);

  return (
    <div className="statistics-container">
      <Header user={user} />

      <div className="statistics-content">

        <h1 className="title">Statistics Dashboard</h1>
        <p className="subtitle">Events created during this year</p>

        {/* KPI Cards */}
        <div className="stats-grid">
          <div className="stats-card">
            <h2>Total Events</h2>
            <p className="stats-number">{totalEvents}</p>
          </div>

          <div className="stats-card">
            <h2>Total Volume</h2>
            <p className="stats-number">{(totalEvents * 45).toLocaleString()} USD</p>
          </div>

          <div className="stats-card">
            <h2>Year Growth</h2>
            <p className="stats-number">{growth}%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="chart-wrapper">
          <h2 className="chart-title">Events by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <Footer />
    </div>
  );
}
