import React, { useContext, useEffect } from "react";
import Dashboards from "../../components/dashboard/Dashboards";

import "./adminAppCss/dashboard.scss";
const AdminDashboard = () => {
  return (
    <div className="dashboardpage">
      <Dashboards></Dashboards>
    </div>
  );
};

export default AdminDashboard;
