import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="p-2 bg-gray-800">
      <div className=" sm:items-center sm:p-10 p-3 text-white flex  flex-col gap-2 sm:flex-col sm:flex sm:justify-center items-center">
        <div className="flex items-center justify-center gap-4 flex-row">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Portfolio</Link>
          <Link to={"/contact"}>Contact</Link>
        </div>
        <div className="flex flex-row gap-5 text-center items-center">
          <a
            href="https://x.com/Scripthq0"
            className="border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg "
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
          </a>
          <a
            href="https://www.facebook.com/share/1CZj6tandM/"
            className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
          </a>
          <a
            href="https://youtube.com/@scripthqofficial?si=UXrt-JLsb2s_un9y"
            className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
          >
            <div href="https://youtube.com/@scripthqofficial?si=UXrt-JLsb2s_un9y">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </div>
          </a>
          <a
            href="https://www.threads.net/@scripthq_official"
            className=" border-2 hover:scale-110 duration-300 text-xl border-white rounded-lg p-1 "
          >
            <div href="https://www.threads.net/@scripthq_official">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-at-sign"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            </div>
          </a>
        </div>
      </div>
      <div className=" text-white text-center sm:mt-0">Copyright @2025</div>
    </div>
  );
}

export default Footer;
