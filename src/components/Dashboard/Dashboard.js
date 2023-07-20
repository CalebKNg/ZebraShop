import React from "react";

function Dashboard() {
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout} />
    </div>
  );
}

export default Dashboard;
