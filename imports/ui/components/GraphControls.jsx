import React, { Component } from "react";
import Graph from "./Graph";

class Template extends Component {
    constructor(props) {
      super(props);
      this.state = {
          startDate: "2013-10-03",
          startTime: "15:00:00",
          endDate: "2013-10-03",
          endTime: "15:15:00",
          sampleSize: 0
      };
    }
  

    handleChange(id){
        console.log("Something changed - " + id)
    }

    render() {
      return (
        <div className="Template">
            Start Date <input type="date" defaultValue={this.state.startDate} onChange={this.handleChange(1)}></input>
            End Date <input type="date" defaultValue={this.state.endDate} onChange={this.handleChange(2)}></input>
            <br></br>
            Start Time <input type="time" defaultValue={this.state.startTime} onChange={this.handleChange(3)}></input>
            End Time <input type="time" defaultValue={this.state.endTime} onChange={this.handleChange(4)}></input>
            <br></br>
            <br></br>
            <Graph />
        </div>
      );
    }
  }
  
  export default Template;
  