import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="p-2 bg-gray-800">
      <div className=" h-10 items-center p-10 text-white flex justify-between">
        <div className="font-bold ">Quick Links</div>
        <div className="flex gap-4 flex-row">
          <Link to={"/"}>Home</Link>
          <Link to={"/services"}>Our Service</Link>
          <Link to={"/"}>Portfolio</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/"}>About us</Link>
        </div>
        <div></div>
      </div>
      <div className=" text-white text-center">Copyright @2025</div>
    </div>
  );
}

export default Footer;
