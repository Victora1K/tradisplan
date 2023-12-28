
import Card from '../UI/Card';

import DataScrambler from '../components/DataScrambler';
import RecordScreen from './RecordScreen';
import React, { useState, useMemo } from "react";
import * as d3 from "d3";
import Chart from "../components/Chart";

function TestScreen() {
  const chart_width = 780;
  const chart_height = 380;
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState([]);
  const [portfolio, setPortfolio] = useState(1000);
  const randomZero = (weight = 1) => {
    return (Math.random() + Math.random() - 1) * weight;
  };

  // Function to generate new data for each click
  const generateNewData = () => {
    const length = 50;
    const newData = [];

    const seedClose = Math.random() * 150 + 50;
    let previousClose = seedClose;
    let previousVolume = Math.random() * 300 + 10;
    let trend = Math.floor(Math.random() * 2) * 2 - 1;

    for (let i = 0; i < length; i++) {
      const open = previousClose * (1 + randomZero(0.1));
      const close = open * (1 + randomZero(0.2) * trend);
      const high = Math.max(open, close) * (1 + randomZero(0.1));
      const low = Math.min(open, close) * (1 - randomZero(0.1));
      const volume = previousVolume * (1 + randomZero(0.5));

      previousClose = close;
      trend = Math.floor(Math.random() * 2) * 2 - 1;

      const newDataItem = {
        time: i + (data.length > 0 ? data[data.length - 1].time + 1 : 0), // Calculate the time for new data
        open,
        high,
        low,
        close,
        volume,
      };

      newData.push(newDataItem);
    }

    setData(prevData => [...prevData, ...newData]); // Append new data to existing data
    //console.log("Previous data", newData[59].close)
    console.log("New data generated");
  };

  const onClickButtonHandler = () => {
    //generateNewData();
    setIsClicked(true);
  };

  const changeData = () => {
    setData([]);
    generateNewData();
    setIsClicked(false);
    console.log("timer stopped")
    
  };

  const onRevertButtonHandler = () => {
    setIsClicked(false);
    //setData([]); // Clear all data on revert
    console.log("Revert clicked");
    console.log("timer stopped")

  };


  const displayedData = isClicked ? data : data.slice(0, 25);
  const content = (
    <Chart
      data={displayedData}
      width={isClicked ? chart_width * 1.5 : chart_width}
      height={isClicked ? chart_height * 1.12 : chart_height}
    />
  );

  let entryClose = data ?? data[25].close
  let exitClose = data ?? data[data.length - 1].close
  let difference = entryClose - exitClose
  let buycount = 0;
  let sellcount = 0;
  const addNewPosition = () => {
    buycount++;
    console.log("BUY")
    if (difference > 0) {
      setPortfolio(portfolio - (buycount * difference));
    }

    else
    setPortfolio(portfolio + (buycount * difference));
  }

  const addNewPositionNeg = () => {
    sellcount++
    console.log("SELL")
    if (difference > 0) {
      setPortfolio(portfolio + (sellcount * difference));
    }

    else
    setPortfolio(portfolio - (sellcount * difference));
  }

  

  return (
    <div className="header">
      <div>
        <h1 className="header"> Japanese Candlestick Simulation</h1>
      </div>
      <div>RecordScreen</div>
      <div className="center">{content}</div>
      <section>
        ${portfolio}
      </section>

      <div>
        <button onClick={onRevertButtonHandler} className="buttons">
          Back List
        </button>
        <button onClick={onClickButtonHandler} className="buttons">
          Full list
        </button>
        <button onClick={changeData} className="buttons">
          New Data
        </button>
      </div>
      <div className="main">
      <div>
      <button onClick={addNewPosition} className="buttons"> BUY +$100 </button>
      <button onClick={addNewPositionNeg} className="buttons">SHORT -$100 </button>   
      </div>
      </div>
    </div>
  );
}

export default TestScreen;
