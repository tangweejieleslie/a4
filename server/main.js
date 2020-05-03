import { Meteor } from "meteor/meteor";
import { TDCollections } from "/imports/api/temperatureData";
import * as Papa from "papaparse";
import {csvToArray} from "./csvToArray"

Meteor.startup(() => {
  // Init with empty database (to prevent duplicate data entry)
  console.log("Removing data from MongoDB...");
  TDCollections.remove({});

  // Parsing data
  console.log("Parsing data from 'room-temperature.csv'...");
  const csv = Assets.getText("room-temperatures.csv");
  const data = Papa.parse(csv).data;
  const csvArray = csvToArray(data); // 2d array index: 0-6 represents room temperature, 7 represents temperature

  // Init with newly parsed csv data
  console.log("Adding data to MongoDB...");
  for (let i = 0; i < csvArray.length; i++) {
    let temp = {
      date: csvArray[i][7],
      roomTemperature: {
        room0: csvArray[i][0],
        room1: csvArray[i][1],
        room2: csvArray[i][2],
        room3: csvArray[i][3],
        room4: csvArray[i][4],
        room5: csvArray[i][5],
        room6: csvArray[i][6],
      },
    };
    TDCollections.insert(temp);
  }

  // Publish
  Meteor.publish('pub_temp_data', function(){
    return TDCollections.find();
  });

});
