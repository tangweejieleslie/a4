import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";

import GraphControls from "./components/GraphControls";

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <GraphControls />
  </div>
);
