
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
  
  export {csvToArray};