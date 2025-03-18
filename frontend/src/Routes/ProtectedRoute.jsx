import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../Context/context";
import base_api from "../utility/contants";

const ProtectedRoute = ({ children, to }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const { setUser } = useContext(MyContext);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("project"); // or any auth logic
      // if (!token) {
      //   setIsAuthorized(false);
      //   return;
      // }
      console.log(token);
      try {
        await axios
          .post(
            // "https://inter-project-lnf5.onrender.com/user/validate-token",
            `${base_api}/validate-token`,
            { token: `${token}` },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            // console.log("User from proted route:", res.data);

            setUser(res.data);
            setIsAuthorized(true);
          })
          .catch((res) => {
            // console.log("User from proted route catched:", res);
            setIsAuthorized(false);
          });
      } catch (error) {
        setIsAuthorized(false);
        console.log("error while connecting to token api.");
      }
    };
    validateToken();
  }, []);

  if (isAuthorized === null) {
    return (
      <div>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Loading Please wait....
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, we are try to Load the page right know.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to={`/registration`} />;
};

export default ProtectedRoute;
