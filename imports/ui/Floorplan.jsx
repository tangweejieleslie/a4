import React, { Component } from "react";
import FloorplanView from "./FloorplanView";
import GraphControls from "./components/GraphControls";
import "./Floorplan.css";
let values = new Array();

class Floorplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: [true, true, true, true, true, true, true, true],
      avgTemp: [0, 0, 0, 0, 0, 0, 0],
    };
  }

  computeAvg() {
    this.setState({
      avgTemp: temperatures,
    });
  }

  toggleRoom = (e) => {
    const isClickedCopy = [...this.state.isClicked]; //clone array

    if (this.state.isClicked[e]) {
      isClickedCopy[e] = false;
    } else {
      isClickedCopy[e] = true;
    }

    this.setState({
      isClicked: isClickedCopy,
    });
    // console.log(this.state.isClicked);
  };

  renderColor = () => {
    const avgTempCopy = [...this.state.avgTemp]; //clone array

    for (var i = 0; i < avgTempCopy.length; i++) {
      values[i] =
        "hsla(" + (220 - Math.floor(avgTempCopy[i])) + ", 87%, 62%," + 1 + ")";
    }

    return values;
  };

  render() {
    return (
      <div className="FPMainContainer">
        <div className="itemContainer">
          <h1>Temperature Monitoring Dashboard</h1>
          <GraphControls
            v0={this.state.isClicked[0]}
            v1={this.state.isClicked[1]}
            v2={this.state.isClicked[2]}
            v3={this.state.isClicked[3]}
            v4={this.state.isClicked[4]}
            v5={this.state.isClicked[5]}
            v6={this.state.isClicked[6]}
          />
        </div>
        <div className="itemContainer">
          <FloorplanView
            isClicked={this.state.isClicked}
            avgTemp={this.renderColor()}
            handleClick={(e) => this.toggleRoom(e)}
          />
        </div>
      </div>
    );
  }
}

export default Floorplan;
