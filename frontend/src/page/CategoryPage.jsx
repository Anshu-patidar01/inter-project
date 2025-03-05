import React, { useContext } from "react";
import { MyContext } from "../Context/context";
import AllCards from "../components/AllCards";

function CategoryPage() {
  const { allcategory } = useContext(MyContext);
  return (
    <div>
      {allcategory}
      <div>
        <AllCards state="false" />
      </div>
    </div>
  );
}

export default CategoryPage;
