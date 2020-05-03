import React from "react";
import { Hello } from "./Hello.jsx";
import { Info } from "./Info.jsx";

import GraphControls from "./components/GraphControls";

export const App = () => (
  <div>
    <h1>Temperature Monitoring Dashboard</h1>
    <GraphControls />
  </div>
);
