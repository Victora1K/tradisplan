import React, {useState, useRef} from 'react';

import Card from '../UI/Card';
import * as d3 from "d3";
import Chart from '../components/Chart';
import DataScrambler from '../components/DataScrambler';

//var list = [];
function RecordScreen() {
  const chart_width = 780;
  const chart_height = 380;
  const [isClicked, setIsClicked] = useState(false);
  var list = [];
  //let list = useRef(new Array());
  

  const randomZero = (weight = 1) => {
    return (Math.random() + Math.random() - 1) * weight;
  };

  // props should be the length of array
  const generateNewData = () => {
    let length = 60
    const seedClose = Math.random() * 150 + 50;
    let previousClose = seedClose;
    let previousVolume = Math.random() * 300 + 10;
    let trend = Math.floor(Math.random() * 2) * 2 - 1;

    return d3.range(length).map((item, i) => {

      const open = previousClose * (1 + randomZero(0.1));
      const close = open * (1 + randomZero(0.2) * trend);
      const high = Math.max(open, close) * (1 + randomZero(0.1));
      const low = Math.min(open, close) * (1 - randomZero(0.1));
      const volume = previousVolume * (1 + randomZero(0.5));

      previousClose = close;
      trend = Math.floor(Math.random() * 2) * 2 - 1;

      var data = {
        time: i,
        open,
        high,
        low,
        close,
        volume,
      };
      list.push(data);

      console.log("number generated")
      
      return data;
      
      
    });
    
  };
  const [data, setGenerateNewData] = useState(generateNewData());

  
  //console.log("actual list" + list)
  //console.log("half list" + halfList)
  //console.log("full list" + fullList)
  var newlist = [];
  const populateList = (anArray) => {
    anArray.forEach(element => {
      newlist.push(element);
  })};
  




  //const [isClicked, setIsClicked] = useState(false);
  console.log(isClicked)
  const onClickButtonHandler = () => {
    generateNewData();
    populateList(data);
    setIsClicked(true);
    
  };
  generateNewData();
  const changeData = () => {
    //let list = [];
    generateNewData();
    //setGenerateNewData(generateNewData);
    setIsClicked(false);
  };

  const onRevertButtonHandler = () => {
    setIsClicked(false);
    console.log("Revert clicked")
  };

  
  const fullList = list;
  const halfList = list.slice(0,29);
  //let content = <Chart data={halfList} width={chart_width} height={chart_height} />

  //if (isClicked) {
    //content = <Chart data={fullList} width={chart_width * 1.5} height={chart_height* 1.12} />
  
    //console.log("clicked")
  //}

  const displayedData = isClicked ? fullList : halfList;//list.slice(0, 29);
  const content = (
    <Chart 
      data={displayedData}
      width={isClicked ? chart_width * 1.5 : chart_width}
      height={isClicked ? chart_height * 1.12 : chart_height}
    />
  );
  
  return (
    <div className='header'>
      <div>
          <h1 className="header"> Japanese Candlestick Simulation</h1>
        </div>
      <div>RecordScreen</div>
      <div className="center">
          {content}
      </div>        

      <div>
      
          <button onClick={onRevertButtonHandler}className="buttons">Back List </button>
          <button onClick={onClickButtonHandler}className="buttons">Full list </button>
          <button onClick={changeData} className="buttons">New Data</button>
      </div>
      <div className="main">


      </div>

    </div>

  )
}

export default RecordScreen