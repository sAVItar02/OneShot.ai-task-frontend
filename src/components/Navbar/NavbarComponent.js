import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <a href="#" className="logo nav-link">
          Logo
        </a>
        <ul className="nav-links">
          <li>
            <a href="#chart" className="nav-link">
              Chart
            </a>
          </li>
          <li>
            <a href="#colleges" className="nav-link">
              Colleges
            </a>
          </li>
          <li>
            <a
              href="https://github.com/sAVItar02/Oneshot.ai-task"
              className="nav-link"
              target={"_blank"}
            >
              Github Backend
            </a>
          </li>
          <li>
            <a
              href="https://github.com/sAVItar02/OneShot.ai-task-frontend"
              className="nav-link"
              target={"_blank"}
            >
              Github FrontEnd
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
