import React from 'react';
import '../styles/Main.css';
import Box from './Box'


function Main(props) {
  let makeBoxes = (n) => {
    let boxes = [];
    for (let i = 0; i < n; i++) {
      boxes.push(<Box key={i} index={i}/>);
    }
    return boxes;
  }

  return (
    <div className="Main">
    { 
      makeBoxes(10)
    }
    </div>
  );
}

export default Main;
