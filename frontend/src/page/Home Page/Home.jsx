import React from "react";
import AllCards from "../../components/AllCards";
function Home() {
  return (
    <div>
      <div className="p-4">
        <div className="bg-white py-24 sm:py-32">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              {} See the Creativity
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              ThinkShare – Your Platform for Creative Works.
            </p>
          </div>
        </div>
        <div>
          <AllCards state="true" />
        </div>
      </div>
    </div>
  );
}

export default Home;
