import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Pagination({ totalPosts, postsPages, setCurrentPage, CurrentPage }) {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPages); i++) {
    page.push(i);
  }
  const settings = {
    dots: false, // Disable dots if not needed
    arrows: true, // Remove navigation arrows
    draggable: false, // Prevent drag scrolling
    swipe: false, // Disable swipe on mobile
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full">
      {/* {totalPosts} */}
      <div className="w-60 bg-slate-600  rounded-lg  sm:w-[15rem] m-auto px-8 p-2">
        <Slider {...settings}>
          {page.map((item, index) => (
            <div key={index} className="flex justify-center">
              {/* { CurrentPage,item} */}
              {CurrentPage === item ? (
                <button
                  className="bg-white hover:bg-slate-800 text-black hover:text-white p-1 px-2 rounded-lg"
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              ) : (
                <button
                  className="bg-gray-400 hover:bg-slate-500 text-white p-1 px-2 rounded-lg"
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </button>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>

    // <div></div>
  );
}

export default Pagination;
