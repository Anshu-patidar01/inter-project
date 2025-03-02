import React, { useContext } from "react";
import { MyContext } from "../Context/context";

function CategoryPage() {
  const { allcategory, setallcategory } = useContext(MyContext);
  return <div>{allcategory.name}</div>;
}

export default CategoryPage;
