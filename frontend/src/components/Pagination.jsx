import React, { useState } from "react";

function Pagination({ totalPosts, postsPages, setCurrentPage }) {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPages); i++) {
    page.push(i);
  }
  return (
    <div className="flex flex-row gap-3 overflow-x-scroll border-2   my-10 w-full justify-center">
      {page.map((item, index) => {
        return (
          <div key={index}>
            <button
              key={index}
              className="bg-gray-700  hover:bg-slate-700 text-white p-1 px-3 rounded-lg"
              onClick={() => {
                setCurrentPage(item);
              }}
            >
              {item}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Pagination;
