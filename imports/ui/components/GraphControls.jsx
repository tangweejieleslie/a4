import React, { Component } from "react";
import Graph from "./Graph";
import "./GraphControls.css";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "2013-10-03",
      startTime: "15:00:00",
      endDate: "2013-10-03",
      endTime: "15:15:00",
      sampleSize: 0,
      sliderValue: 1,
    };
  }

  handleStartDate(event) {
    this.setState({
      startDate: event.target.value,
    });
  }

  handleEndDate(event) {
    this.setState({
      endDate: event.target.value,
    });
  }

  handleStartTime(event) {
    this.setState({
      startTime: event.target.value,
    });
  }

  handleEndTime(event) {
    this.setState({
      endTime: event.target.value,
    });
  }

  handleSliderValue(event) {
    this.setState({
      sliderValue: event.target.value,
    });
  }

  render() {
    return (
      <div className="GraphControls">
        <div className="container">
          Start Date
          <input
            type="date"
            value={this.state.startDate}
            onChange={() => this.handleStartDate(event)}
          />
          End Date
          <input
            type="date"
            value={this.state.endDate}
            onChange={() => this.handleEndDate(event)}
          />
        </div>
        <div className="container">
          Start Time
          <input
            type="time"
            value={this.state.startTime}
            onChange={() => this.handleStartTime(event)}
          />
          End Time
          <input
            type="time"
            value={this.state.endTime}
            onChange={() => this.handleEndTime(event)}
          />
        </div>
        <div className="container">Slider</div>
        <input
          type="range"
          id="points"
          name="points"
          min="1"
          max="13"
          value={this.state.sliderValue}
          onChange={() => this.handleSliderValue(event)}
        ></input>
        {Math.pow(2,this.state.sliderValue)}

        <br></br>
        <div className="container">
          <Graph />
        </div>
      </div>
    );
  }
}

export default Template;
