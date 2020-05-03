import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TemperatureDataCollections } from "../../api/temperatureData";

export const Info = () => {
  const data = useTracker(() => {
    return TemperatureDataCollections.find().fetch();
  });

  return (
    <div>
      <h2>Learn Meteor!</h2>
        {data}
    </div>
  );
};