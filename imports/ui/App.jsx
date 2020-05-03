import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import Template from './components/Template'

export const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello/>
    <Info/>
    <Template/>
  </div>
);
