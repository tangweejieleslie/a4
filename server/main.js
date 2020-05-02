import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import * as Papa from 'papaparse';

function insertLink({ title, url }) {
  LinksCollection.insert({title, url, createdAt: new Date()});
}

function csvToJson(csvData){
  let json = {};
  // Note: index 
  // 0: roomNumber
  // 1: date
  // https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
  // 2: temperature
  
  // Iterate through all CSV data, 0: headers
  let distinctDates = [];
  let unique = [];
  for(let i = 1; i < csvData.length; i++){
    let date = csvData[i][1];
    if(!unique[date]){
      distinctDates.push(date);
      unique[date] = 1;
    }
  }
  console.log("UniqueDates: " + distinctDates.length)
}


Meteor.startup(() => {
  const csv = Assets.getText('room-temperatures.csv');
  const data = Papa.parse(csv).data;
  console.log(data[0]);
  console.log(data[1]);
  console.log(data[3][0]);
  csvToJson(data);
});
