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
      start: "",
      end: "",
      sampleSize: 0,
      sliderValue: 1,
      visibility: []
    };
  }

  handleStartDate(event) {
    this.setState({
      startDate: event.target.value,
    });
    this.computeStart();
  }

  handleStartTime(event) {
    this.setState({
      startTime: event.target.value,
    });
    this.computeStart();
  }

  computeStart() {
    let temp_start = this.state.startDate + "T" + this.state.startTime;
    this.setState({
      start: temp_start,
    });
  }

  handleEndDate(event) {
    this.setState({
      endDate: event.target.value,
    });
    this.computeEnd();
  }

  handleEndTime(event) {
    this.setState({
      endTime: event.target.value,
    });
    this.computeEnd();
  }

  computeEnd() {
    let temp_end = this.state.endDate + "T" + this.state.endTime;
    this.setState({
      end: temp_end,
    });
  }

  handleSliderValue(event) {
    this.setState({
      sliderValue: event.target.value,
    });
  }

  componentDidUpdate(prevProps) {

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
          max="12"
          value={this.state.sliderValue}
          onChange={() => this.handleSliderValue(event)}
        ></input>
        {Math.pow(2, this.state.sliderValue)}

        <br></br>
        <div className="container">
          <Graph startDate={this.state.start} 
          endDate={this.state.end} 
          sampleSize={Math.pow(2, this.state.sliderValue)} 
          v0={this.props.v0}
          v1={this.props.v1}
          v2={this.props.v2}
          v3={this.props.v3}
          v4={this.props.v4}
          v5={this.props.v5}
          v6={this.props.v6}
          keydata={1}
          />
        </div>
      </div>
    );
  }
}

export default Template;
