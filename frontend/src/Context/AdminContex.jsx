import React, { createContext, useState } from "react";

export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [IdeaForm, setIdeaForm] = useState({
    _id: "",
    userId: {
      _id: "",
      fullname: "",
    },
    state: "",
    correspondingAddress: "",
    city: "",
    gender: "",
    title: "",
    language: "",
    categories: "",
    containt: "",
    copyright: "",
    ROCNumber: "",
    ROCAttachment: "",
    summary: "",
    termAndCondition: "",
    formId: "",
    likes: [],
    status: "",
    __v: "",
  });
  const [Pop, setPop] = useState("false");
  return (
    <AdminContext.Provider value={{ IdeaForm, setIdeaForm, Pop, setPop }}>
      {children}
    </AdminContext.Provider>
  );
};
