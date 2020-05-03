# Documentation

This application was made for the CS3249 User Interface Development final project.

## Commands to run application

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

Data Handling in Mongo, CSV
https://docs.meteor.com/api/assets.html
https://www.mongodb.com/blog/post/schema-design-for-time-series-data-in-mongodb
https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript


https://www.meteor.com/tutorials/react/collections

Exporting MongoDB Data 
https://riptutorial.com/meteor/example/12785/export-a-collection-to-json


Mounting Dygraph in React
https://stackoverflow.com/questions/44611061/using-dygraph-in-react-with-redux


Retrieving data from Mongo, Meteor
https://stackoverflow.com/questions/30447361/how-to-fetch-data-from-mongodb-in-meteor-js


Dygraph Interaction Model for Custom Events
https://github.com/danvk/dygraphs/blob/master/tests/interaction.html

## File Structure 

	client/
	imports/
		ui/		#React components
		img/		#img src files
	server/
	test/

## Floorplan Details
### Room Toggle
Toggling is achieved by maintaining a copy of entire state array, making changes to the copy and finally setting the state with new copy. 

### Colour change 
Colour change is controlled with HSLA using average temperature as parameter. 


//TODO:
minify SVG in FloorplanView
link start/end date with avgTemp 

### References

https://www.freecodecamp.org/forum/t/reactjs-using-setstate-to-update-a-single-property-on-an-object/146772
https://css-tricks.com/hsl-hsla-is-great-for-programmatic-color-control/
https://www.geeksforgeeks.org/how-to-clone-array-in-es6/



