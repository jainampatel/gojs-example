import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/gojs">
        <div className="sidebar-nav rounded-r-full">DIAGRAM</div>
      </Link>
      <Link to="/palatte">
        <div className="sidebar-nav rounded-r-full">PALATTE</div>
      </Link>
      <Link to="/overview">
        <div className="sidebar-nav rounded-r-full">OVERVIEW</div>
      </Link>
      <Link to="/rnd">
        <div className="sidebar-nav rounded-r-full">RND</div>
      </Link>
    </div>
  );
};

export default Sidebar;
