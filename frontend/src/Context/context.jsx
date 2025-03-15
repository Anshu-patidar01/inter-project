import React, { createContext, useState } from "react";

export const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [Data, setData] = useState(0);
  const [forms, setform] = useState([]);
  const [User, setUser] = useState({
    _id: "",
    fullname: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [pop, setpop] = useState("false");
  const [count, setcount] = useState(0);
  const [allcategory, setallcategory] = useState("All Category");
  return (
    <MyContext.Provider
      value={{
        Data,
        setData,
        User,
        setUser,
        forms,
        setform,
        count,
        setcount,
        pop,
        setpop,
        allcategory,
        setallcategory,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
