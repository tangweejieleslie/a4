import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import Dygraph from "dygraphs";

import { TDCollections } from "../../api/temperatureData";

import "./graph.css";

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
let graph_visibility = [true, true, true, true, true, true, true];

// https://github.com/danvk/dygraphs/blob/master/tests/legend-formatter.html
function legendFormatter(data) {
  if (data.x == null) {
    // This happens when there's no selection and {legend: 'always'} is set.
    return (
      "<br>" +
      data.series
        .map(function (series) {
          return series.dashHTML + " " + series.labelHTML;
        })
        .join("<br>")
    );
  }

  var html = this.getLabels()[0] + ": " + data.xHTML;
  // console.log(data.xHTML); // this is the date display
  data.series.forEach(function (series) {
    if (!series.isVisible) return;
    var labeledData = series.labelHTML + ": " + series.yHTML;
    // console.log(labeledData);
    if (series.isHighlighted) {
      labeledData = "<b>" + labeledData + "</b>";
    }
    html += "<br>" + series.dashHTML + " " + labeledData;
    console.log(series.dashHTML); // this is the series style 
    // <div class="dygraph-legend-line" style="border-bottom-color: rgb(64,128,0);"></div>
    // console.log(series.labelHTML);
    // console.log(series.yHTML);

  });
  return html;
}

function renderGraph(data, start, end, visibility) {
  return new Dygraph(document.getElementById("graph"), formatForGraph(data), {
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
    labelsDiv: "legend",
    colors: ["red", "blue", "green", "yellow", "orange", "purple"],
    legendFormatter: legendFormatter,
    animatedZooms: true,
    // title: "Room Temperature",
    visibility: [true, true, true, true, true, true, true],
  });
}

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "2013-10-02T05:00:00",
      endDate: "2013-10-03T15:15:00",
      sampleSize: 1,
      visibility: [true, true, true, true, true, true, true],
      flip: true,
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
      this.setState({
        sampleSize: this.props.sampleSize,
      });
    }

    if (this.props.v0 !== prevProps.v0) {
      let current = graph_visibility[0];
      graph_visibility[0] = !current;
      this.toggleVisibility(0);
      this.setState({
        visibility: graph_visibility,
      });
    }

    if (this.props.v1 !== prevProps.v1) {
      let current = graph_visibility[1];
      graph_visibility[1] = !current;
      this.toggleVisibility(1);
      this.setState({
        visibility: graph_visibility,
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
        // console.log(graph_visibility);

        graph_reference = renderGraph(
          ReducedData,
          this.state.startDate,
          this.state.endDate,
          graph_visibility
        );
      }
    });

    // this.setState({
    //   flip: !this.state.flip
    // });
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
    graph_reference = renderGraph(
      data,
      this.state.startDate,
      this.state.endDate,
      graph_visibility
    );
  }

  toggleVisibility = (target) => {
    let currentVis = graph_visibility[target];
    let newVis = graph_visibility;

    let newVisStatus = !currentVis;
    newVis[target] = newVisStatus;

    if (graph_reference != undefined) {
      graph_reference.setVisibility(graph_visibility, newVisStatus);
    }
  };

  render() {
    return (
      <div className="Template" key={this.props.keydata}>
        <div className="graph-container">
          <div id="graph"></div>
          <div id="legend"></div>
        </div>

        <div>
          <h3>Toggle Visibility</h3>
          Placeholder for floor plan Toggle
          <br></br>
          <div>
            <button
              onClick={() => {
                this.toggleVisibility(0);
              }}
            >
              Room 0
            </button>
            <button
              onClick={() => {
                this.toggleVisibility(1);
              }}
            >
              Room 1
            </button>
            <button
              onClick={() => {
                this.toggleVisibility(2);
              }}
            >
              Room 2
            </button>
            <button
              onClick={() => {
                this.toggleVisibility(3);
              }}
            >
              Room 3
            </button>
            <button
              onClick={() => {
                this.toggleVisibility(4);
              }}
            >
              Room 4
            </button>
            <button
              onClick={() => {
                this.toggleVisibility(5);
              }}
            >
              Room 5
            </button>
            <button
              onClick={() => {
                this.toggleVisibility(6);
              }}
            >
              Room 6
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Template;
