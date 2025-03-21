import React, { useContext, useEffect } from "react";
import { MyContext } from "../Context/context";
import AllCards from "../components/AllCards";

function CategoryPage() {
  const { allcategory } = useContext(MyContext);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);
  return (
    <div className="p-2">
      {/* {allcategory} */}
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
