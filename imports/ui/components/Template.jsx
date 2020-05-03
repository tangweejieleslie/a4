import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import Dygraph from "dygraphs";

import { TDCollections } from "../../api/temperatureData";
import './graph.css'


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
    this.state = {
        startDate: "2013-10-02T05:00:00",
        endDate: "2013-10-03T15:15:00",
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
      if (DATA.length != 0) {
        let g = new Dygraph(document.getElementById("graph"), formatForGraph(DATA), {
          // options go here. See http://dygraphs.com/options.html
          labels: ['Date', 'Room 0', 'Room 1', 'Room 2', 'Room 3', 'Room 4', 'Room 5', 'Room 6'],
          legend: "always",
          animatedZooms: true,
          title: "Room Temperature",
        });
      }
    });
  }

  render() {
    return (
      <div className="Template">
        <div id="graph" class="graph-container"></div>
      </div>
    );
  }
}

export default Template;
