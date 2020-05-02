Commands to run application

1. npm install 
2. meteor

`mongoexport --db meteor --collection temperatureData --port 3001 --out temperatureData.json`

# Documentation

Data Schema

The main filter for data is by rooms, as such, each unit of time will store all room data.

Example of single data point
```
{
   "date":"2013-10-17T04:15:00.000Z",
   "RoomsTemperature":{
      "room0":20.901,
      "room1":14.325,
      "room2":15.187,
      "room3":15.187,
      "room4":15.855,
      "room5":null,
      "room6":14.804
   }
}
```



# References

https://docs.meteor.com/api/assets.html
https://www.mongodb.com/blog/post/schema-design-for-time-series-data-in-mongodb
https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript


Exporting MongoDB Data 
https://riptutorial.com/meteor/example/12785/export-a-collection-to-json
