import Dygraph from "dygraphs";
import { collectionsToArray } from "./graphDataHelper";

// Assume Data source to be collections from MongoDB
export function createGraph(dataSource, start, end, sample, selected) {
  return new Dygraph(
    document.getElementById("graph"),
    collectionsToArray(dataSource),
    {
      labels: [
        "Date",
        "Room 0",
        "Room 1",
        "Room 2",
        "Room 3",
        "Room 4",
        "Room 5",
        "Room 6",
      ],
      labelsDiv: "legend",
      legend: "always",
      animatedZooms: true,
      title: "Room Temperature",
    }
  );
}
