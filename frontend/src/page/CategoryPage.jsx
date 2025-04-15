import React, { useContext, useEffect } from "react";
import { MyContext } from "../Context/context";
import AllCards from "../components/AllCards";
import img from "../assets/ScriptHQ All Categories.jpg";
function CategoryPage() {
  const { allcategory } = useContext(MyContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <div className="p-2">
      {/* {allcategory} */}
      <div
        className=" h-[90vh] sm:h-[70vh] md:min-h-[80vh] w-full flex items-center justify-center relative"
        style={{
          backgroundImage: `url("${img}")`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="my-20">
        <h1 className="text-xl font-bold tracking-wider">
          Filter :{allcategory}
        </h1>
        <AllCards state="false" Filter={"false"} setFilter={""} />
      </div>
    </div>
  );
}

export default CategoryPage;
