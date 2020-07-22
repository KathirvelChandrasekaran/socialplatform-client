import React, { useState, createContext } from "react";
import axios from "axios";

export const GetScreamContext = createContext();

export const GetScreamProvider = (props) => {
  const [screams, setScreams] = useState([]);

  axios
    .get("/screams")
    .then((res) => {
      console.log(res.data);
      setScreams(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <GetScreamContext.Provider value={[screams, setScreams]}>
      {props.children}
    </GetScreamContext.Provider>
  );
};
