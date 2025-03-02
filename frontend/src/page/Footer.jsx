import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="p-2 bg-gray-800">
      <div className=" h-10 sm:items-center sm:p-10 p-3 text-white flex  flex-col sm:flex-row sm:flex sm:justify-between">
        <div className="flex gap-4 flex-row">
          <Link to={"/"}>Home</Link>
          <Link to={"/services"}>Service</Link>
          <Link to={"/"}>Portfolio</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/"}>About</Link>
        </div>
        <div></div>
      </div>
      <div className=" text-white text-center mt-5 sm:mt-0">
        Copyright @2025
      </div>
    </div>
  );
}

export default Footer;
