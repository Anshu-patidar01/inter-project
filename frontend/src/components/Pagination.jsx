import React, { useState } from "react";

function Pagination({ totalPosts, postsPages, setCurrentPage }) {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPages); i++) {
    page.push(i);
  }
  return (
    <div className="flex flex-row gap-3 overflow-x-scroll  my-10 bg-gray-500 w-full rounded-lg justify-center p-2">
      {page.map((item, index) => {
        return (
          <div>
            <button
              key={index}
              className="bg-gray-950 hover:bg-slate-700 text-white p-1 px-3 rounded-lg"
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
