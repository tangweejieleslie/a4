import { Meteor } from "meteor/meteor";
import { TemperatureDataCollections } from "/imports/api/temperatureData";
import * as Papa from "papaparse";

function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

function csvToArray(csvData) {
  // Note: index
  // 0: roomNumber
  // 1: date
  // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  // 2: temperature

  // We want to organize the date in by date stamp, first step is to get all unique dates
  let distinctDates = [];
  let uniqueDate = [];
  for (let i = 1; i < csvData.length; i++) {
    let date = csvData[i][1];
    if (!uniqueDate[date]) {
      distinctDates.push(date);
      uniqueDate[date] = 1;
    }
  }
  // console.log("UniqueDates: " + distinctDates[0] + distinctDates.length);

  const finalData = distinctDates.map((distinctDate) => {
    return [null, null, null, null, null, null, null, distinctDate];
    // index 0 to 6 corresponds to room number, index 7 represents date
  });

  // Iterate through all CSV data, and match data by date TODO: could be optimized if there's time
  for (let i = 0; i < distinctDates.length; i++) {
    for (let j = 1; j < csvData.length; j++) {
      if (distinctDates[i] == csvData[j][1]) {
        let roomNum = parseInt(csvData[j][0]);
        let temp = parseFloat(csvData[j][2]);
        finalData[i][roomNum] = temp;
      }
    }
  }
  return finalData;
}

Meteor.startup(() => {
  // Init with empty database (to prevent duplicate data entry)
  console.log("Removing data from MongoDB...");
  TemperatureDataCollections.remove({});

  // Parsing data
  console.log("Parsing data from 'room-temperature.csv'...");
  const csv = Assets.getText("room-temperatures.csv");
  const data = Papa.parse(csv).data;
  const csvArray = csvToArray(data); // 2d array index: 0-6 represents room temperature, 7 represents temperature
  // console.log("DATA: " + csvArray[0][0]);

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
    TemperatureDataCollections.insert(temp);
  }
});
