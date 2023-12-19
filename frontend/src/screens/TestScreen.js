import React, { useState } from 'react';
import Card from '../UI/Card';
import * as d3 from 'd3';
import Chart from '../components/Chart';
import DataScrambler from '../components/DataScrambler';
import RecordScreen from './RecordScreen';

function TestScreen() {
  <DataScrambler />
  return (
    <div>
      <h1 className="header">Japanese Candlestick Simulation</h1>
      <div>TestScreen</div>
      <div>
      <RecordScreen />
        </div>
    </div>
  );
}

export default TestScreen;
