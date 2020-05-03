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

let graph_reference;

function renderGraph(data, start, end) {
  return new Dygraph(
    document.getElementById("graph"),
    formatForGraph(data),
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
      legend: "always",
      animatedZooms: true,
      title: "Room Temperature",
      visibility: [true, false, true, false, false, false, false]
    }
  );
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
      // TODO: optimize the mongoDB data load by considering the sample size as well
      DATA = TDCollections.find({
        date: {
          $gt: this.state.startDate,
          $lt: this.state.endDate,
        },
      }).fetch();
      // console.log(DATA[0]);
      if (DATA.length != 0) {
        let ReducedData = reduceData(DATA, this.state.sampleSize);
        graph_reference = renderGraph(ReducedData, this.state.startDate, this.state.endDate);
      }
    });
  }

  componentDidMount() {
    let data = {
      date: Date.now(),
      roomTemperature: {
        room0: 0,
        room1: 0,
        room2: 0,
        room3: 0,
        room4: 0,
        room5: 0,
        room6: 0,
      },
    };
    renderGraph(data, this.state.startDate, this.state.endDate);
  }

  toggleVisibility() {
    
    graph_reference.setVisibility(0, false);
  }

  render() {
    return (
      <div className="Template">
        <div
          id="graph"
          width="800px"
          height="500px"
          className="graph-container"
        ></div>
        <h3>Toggle Visibility</h3>
        Placeholder for floor plan Toggle
        {/* <checkbox>A</checkbox> */}
        <button
          onClick={() => {
            this.toggleVisibility();
          }}
        >
          Toggle Visibility for Room 0
        </button>
      </div>
    );
  }
}

export default Template;
