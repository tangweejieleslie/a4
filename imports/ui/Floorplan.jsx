import React, { Component } from "react";
import FloorplanView from "./FloorplanView";
import GraphControls from "./components/GraphControls";

let values = new Array();

class Floorplan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: [true, true, true, true, true, true, true],
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
    console.log(this.state.isClicked);
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
      <div>
        <GraphControls visibility={10} />
        <FloorplanView
          isClicked={this.state.isClicked}
          avgTemp={this.renderColor()}
          handleClick={(e) => this.toggleRoom(e)}
        />
      </div>
    );
  }
}

export default Floorplan;
