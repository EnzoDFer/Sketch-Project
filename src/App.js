import { useState } from "react";


const Container = () => {
  const [rows, onRowChange] = useState(50);
  const [cols, onColChange] = useState(50);

  return (
    <>
      <div className="wrapper">
        <div className="wrapper">
          <div>Column #: {cols}</div>
          <Slider value={cols} onValueChange={onColChange} className="slider" id='rowSlider'/>
        </div>
        <div className="wrapper">
          <div>Row #: {rows}</div>
          <Slider value={rows} onValueChange={onRowChange}className="slider" id='colSlider'/>
        </div>
      </div>
      <Grid rowNum={rows} colNum={cols}/>
    </>
  );
};

const Slider = ({value,onValueChange}) => {
  function sliderHandler(e) {
    value = onValueChange(e.target.value);
  }

  return (
    <input
      type="range"
      min="10"
      max="100"
      value={value}
      onChange={(e)=>sliderHandler(e)}
    />
  );
};

const Grid = ({rowNum,colNum}) => {
  let children = [];
  for (let i=0;i<colNum*rowNum;i++) {
    children.push(<Square />);
  }

  return (
    <div 
      className="grid"
      style={{gridTemplate:`repeat(${rowNum},
        ${100/rowNum}%)/repeat(${colNum},${100/colNum}%)`}}
    >
      {children}
    </div>
  ); 
};

const Square = () => {
  const [hovered, setHover] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHover(true)}
      className={hovered?'square hovered':'square'}
    >
    </div>
  )
};

export default Container;
