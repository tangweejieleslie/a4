
# Documentation

This application was made for the CS3249 User Interface Development final project.
Github Repo: [https://github.com/tangweejieleslie/a4](https://github.com/tangweejieleslie/a4)


## Commands to run application

1. npm install
2. meteor

# Documentation

  

## Data Schema

  

The main filter for data is by rooms, as such, each unit of time will store all room data.

  

Example of single data point, i.e. single document

```
{

	"date":"2013-10-17T04:15:00.000",

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

  
  
  
## Folder Structure

  
```
client/
	images/ 							> stores icons for manifest
		icons-192.png
		icons-512.png
	Main.css 							> default fallback .css for when JavaScript is not supported
	Main.html 							> default fallback .html for when JavaScript is not supported
	Main.jsx 							> the initial entry point for the application
	Manifest.json 						> contains data to support PWA discoverability

imports/
	api/
		temperatureData.js 				> serve as the constant connection to MongoDB collections
	img/ 								> contain image assets used in the application
	ui/
		components/
			Graph.css 					> styling for graph render
			Graph.jsx 					> logic for digraph rendering
			GraphControls.css 			> styling for graph control components
			GraphControls.jsx 			> main component for various graph control components, i.e. date 			picker, slider, etc
	App.jsx 							> entry point for other React components
	Floorplan.css 						> styling for floorplan
	Floorplan.jsx 						> floorplan svg
	FloorplanView.jsx 					> floorplan component

private/
	Room-temperature.csv 				> raw data

server/
	csvToArray.js 						> process csv into format suitable for MongoDB storage
	main.js 							> backend entry point

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

  

Meteor Manifest.json, PWA

https://forums.meteor.com/t/is-meteor-creating-its-own-manifest-json-file/25627/5

https://web.dev/add-manifest/

  

Others

https://www.freecodecamp.org/forum/t/reactjs-using-setstate-to-update-a-single-property-on-an-object/146772

https://css-tricks.com/hsl-hsla-is-great-for-programmatic-color-control/

https://www.geeksforgeeks.org/how-to-clone-array-in-es6/