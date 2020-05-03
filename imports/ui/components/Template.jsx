import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { useTracker } from "meteor/react-meteor-data";
import { Tracker } from "meteor/tracker";
import { TDCollections } from "../../api/temperatureData";
import Dygraph from "dygraphs";
import { Meteor } from "meteor/meteor";

function formatForGraph(data) {
  let dataArray = [];

  for (let i = 0; i < data.length; i++) {
    let date = data[i].date;
    let roomTemperature = data[i].roomTemperature;
    let tempArray = [];
    tempArray.push(new Date(Date.parse(date)));
    tempArray.push(roomTemperature.room0)
    tempArray.push(roomTemperature.room1)
    tempArray.push(roomTemperature.room2)
    tempArray.push(roomTemperature.room3)
    tempArray.push(roomTemperature.room4)
    tempArray.push(roomTemperature.room5)
    tempArray.push(roomTemperature.room6)

    dataArray.push(tempArray);
  }
  console.log(dataArray);
  return dataArray;
}

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Meteor.subscribe("pub_temp_data");
    let DATA;

    Tracker.autorun(() => {
      DATA = TDCollections.find({
        date: {
          $gt: "2013-10-02T05:00:00",
          $lt: "2013-10-03T15:15:00",
        },
      }).fetch();
      console.log(DATA);
      if (DATA.length != 0) {
        let g = new Dygraph(document.getElementById("graph"), formatForGraph(DATA), {
          // options go here. See http://dygraphs.com/options.html
          legend: "always",
          animatedZooms: true,
          title: "dygraphs chart template",
        });
      }
    });
  }

  render() {
    return (
      <div className="Template">
        <div id="graph"></div>
      </div>
    );
  }
}

export default Template;
