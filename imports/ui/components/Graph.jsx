import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import Dygraph from "dygraphs";

import { TDCollections } from "../../api/temperatureData";

function formatForGraph(data) {
  let dataArray = [];

  for (let i = 0; i < data.length; i++) {
    let date = data[i].date;
    let roomTemperature = data[i].roomTemperature;
    let tempArray = [];
    tempArray.push(new Date(Date.parse(date)));
    tempArray.push(roomTemperature.room0);
    tempArray.push(roomTemperature.room1);
    tempArray.push(roomTemperature.room2);
    tempArray.push(roomTemperature.room3);
    tempArray.push(roomTemperature.room4);
    tempArray.push(roomTemperature.room5);
    tempArray.push(roomTemperature.room6);

    dataArray.push(tempArray);
  }
  // console.log(dataArray);
  return dataArray;
}

function reduceData(data, sampleSize) {
  let reducedData = [];
  // Filter data based on sample size
  if (sampleSize != 0) {
    if (data.length > sampleSize) {
      const skipIndex = data.length / sampleSize;
      let currentIndex = 0;

      while (reducedData.length < sampleSize) {
        reducedData.push(data[Math.floor(currentIndex)]);
        currentIndex += skipIndex;
      }
    } else {
      reducedData = data;
    }
  }
  return reducedData;
}

function renderGraph(data, start, end) {
  let g = new Dygraph(document.getElementById("graph"), formatForGraph(data), {
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
    legend: "always",
    animatedZooms: true,
    title: "Room Temperature",
  });
}

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "2013-10-02T05:00:00",
      endDate: "2013-10-03T15:15:00",
      sampleSize: 1,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.startDate !== prevProps.startDate) {
      // this.fetchData(this.props.startDate);
      this.setState({
        startDate: this.props.startDate,
      });
    }

    if (this.props.endDate !== prevProps.endDate) {
      // this.fetchData(this.props.endDate);
      this.setState({
        endDate: this.props.endDate,
      });
    }

    if (this.props.sampleSize !== prevProps.sampleSize) {
      // this.fetchData(this.props.startDate);
      this.setState({
        sampleSize: this.props.sampleSize,
      });
    }

    Meteor.subscribe("pub_temp_data");
    let DATA;

    Tracker.autorun(() => {
      DATA = TDCollections.find({
        date: {
          $gt: this.state.startDate,
          $lt: this.state.endDate,
        },
      }).fetch();
      // console.log(DATA);
      if (DATA.length != 0) {
        let ReducedData = reduceData(DATA, this.state.sampleSize);
        renderGraph(ReducedData, this.state.startDate, this.state.endDate);
      }
    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="Template">
        <div id="graph" className="graph-container"></div>
        <h1>Hi</h1>
        <h2>{this.props.startDate}</h2>
        <h2>{this.props.endDate}</h2>
      </div>
    );
  }
}

export default Template;
