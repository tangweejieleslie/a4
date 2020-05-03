# Documentation

This application was made for the CS3249 User Interface Development final project.

## Commands to run application

1. npm install 
2. meteor

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



