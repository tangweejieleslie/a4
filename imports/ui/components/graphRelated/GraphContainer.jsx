import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import Dygraph from "dygraphs";
import { createGraph } from "./createDygraph";

import { TDCollections } from "../../../api/temperatureData";

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "2013-10-02T05:00:00",
      endDate: "2013-10-03T15:15:00",
      dataSource: "",
    };
  }

  componentDidMount() {
    Meteor.subscribe("pub_temp_data");
    let DATA;

    Tracker.autorun(() => {
      DATA = TDCollections.find({
        date: {
          $gt: this.state.startDate,
          $lt: this.state.endDate,
        },
      }).fetch();
      console.log(DATA);

      this.setState((dataSource) => {
        return DATA;
      });

      console.log(this.state.dataSource);
    });
  }

  componentDidUpdate() {
    if (this.state.dataSource != "") {
      console.log("creating graph");
      createGraph(
        this.state.dataSource,
        this.state.startDate,
        this.state.endDate,
        10
      );
    }
  }

  render() {
    return (
      <div className="Template">
        This is the Graph Container
        <div id="graph"></div>
      </div>
    );
  }
}

export default GraphContainer;
