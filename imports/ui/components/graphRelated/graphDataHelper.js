// Convert MongoDB collections into array suitable for Dygraph
export function collectionsToArray(data) {
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
  console.log(dataArray);
  return dataArray;
}

