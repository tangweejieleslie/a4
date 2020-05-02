Commands to run application

1. npm install 
2. meteor


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