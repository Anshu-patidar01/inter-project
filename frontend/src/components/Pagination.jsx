import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Pagination({ totalPosts, postsPages, setCurrentPage }) {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPages) + 6; i++) {
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
    <div className="w-full bg-gray-500">
      <div className="w-60 sm:w-[20rem] m-auto p-4">
        <Slider {...settings}>
          {page.map((item, index) => (
            <div key={index} className="flex justify-center">
              <button
                className="bg-gray-700 hover:bg-slate-700 text-white p-2 px-4 rounded-lg"
                onClick={() => setCurrentPage(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>

    // <div></div>
  );
}

export default Pagination;
