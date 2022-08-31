import React from "react";
import "./App.css";

import PieChart from "./components/PieChart/pieChart";
import Navbar from "./components/Navbar/NavbarComponent";
import College from "./components/College/CollegeComponent";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <PieChart />
        <College />
      </div>
    </>
  );
}

export default App;
