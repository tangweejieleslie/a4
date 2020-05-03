import React from "react";

import GraphControls from "./components/GraphControls";
import Floorplan from "./Floorplan";

export const App = () => (
  <div>
    <h1>Temperature Monitoring Dashboard</h1>
    <GraphControls />
    <Floorplan/>
  </div>

);
