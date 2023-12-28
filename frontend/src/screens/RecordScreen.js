
import React, { useState } from "react";
import Chart from "../components/Chart";
import * as d3 from "d3";

function RecordScreen() {
  const chart_width = 780;
  const chart_height = 380;
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(...data);
  const [delay, setIsDelay] = useState(false);
  var intervalHandle = null;
  const randomZero = (weight = 1) => {
    return (Math.random() + Math.random() - 1) * weight;
  };

  // Function to generate new data for each click
  const generateNewData = () => {
    const length = 15;
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
    setIsDelay(false);
    generateNewData();
    setIsClicked(false);
    console.log("timer stopped")
    
  };

  const onRevertButtonHandler = () => {
    setIsClicked(false);
    //setData([]); // Clear all data on revert
    console.log("Revert clicked");
    setIsDelay(false);
    clearInterval(startTimer);
    console.log("timer stopped")

  };


  const displayedData = isClicked ? data : data.slice(0, 15);
  const content = (
    <Chart
      data={displayedData}
      width={isClicked ? chart_width * 1.5 : chart_width}
      height={isClicked ? chart_height * 1.12 : chart_height}
    />
  );

  var list = [...data];
  const timeDelayRandom = () => {
    setIsDelay(true);
    console.log(list, "list");
    let loadClose = list[list.length - 1].close ;
    const loadVolume = list[list.length - 1].volume ;
    const loadTime = list[list.length - 1].time ;
    const loadedData =[];
    let trend = Math.floor(Math.random() * 2) * 2 - 1;
    
    
    let open = loadClose * (1 + randomZero(0.1));
    let close = open * (1 + randomZero(0.2) * trend);
    let high = Math.max(open, close) * (1 + randomZero(0.1));
    let low = Math.min(open, close) * (1 - randomZero(0.1));
    let volume = loadVolume * (1 + randomZero(0.5));

    loadClose = close;
    console.log(loadClose,"load close pain")
    trend = Math.floor(Math.random() * 2) * 2 - 1;
    var nextDataItem = {
      time: parseInt(1 + parseInt(loadTime)), // Calculate the time for new data
      open,
      high,
      low,
      close,
      volume,
    };
    loadedData.push(nextDataItem);
    console.log("for statement running ", loadedData)
    list = [...list, ...loadedData];
    setLoadData([...list]);
    console.log(list, "additional data looped")
  };
  
  const startTimer = () => {
    intervalHandle = setInterval(timeDelayRandom, 1500)
    //timeDelayRandom();
    console.log("timer started")
  }

  const stopTimer = () => {
    clearInterval(startTimer);
    clearInterval();
    clearInterval(intervalHandle);
    console.log("timer stopped")
  }
  
  let contentB = (
    <Chart
      data={loadData}
      width={chart_width * 1.5}
      height={chart_height * 1.12}
    />
  );
  console.log(delay);
  return (
    <div className="header">
      <div>
        <h1 className="header"> Japanese Candlestick Simulation</h1>
      </div>
      <div>RecordScreen</div>
      <div className="center">{!delay ? content: contentB}</div>

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
        <button onClick={startTimer} className="buttons">
          Load Data slowly
        </button>
        <button onClick={stopTimer} className="buttons">
          Pause Load Data 
        </button>
      </div>
      <div className="main"></div>
    </div>
  );
}

export default RecordScreen;
