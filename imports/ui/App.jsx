import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";
import Template from "./components/Template";
import GraphContainer from "./components/graphRelated/GraphContainer";
import Temp from "./components/info";

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <GraphContainer />
  </div>
);
