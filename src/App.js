import { useEffect, useState } from "react";


const Container = () => {
  const [rows, onRowChange] = useState(10);
  const [cols, onColChange] = useState(10);
  const [val, setVal] = useState(0);
  const [color,setColor] = useState('#333');

  const children = []
  for (let i=0;i<rows*cols;i++) {
    children.push(<Square 
      key={`key:${i}`}
      val={val}
      color={color}
      />
    );
  }
  
  return (
    <div className="app">
      <div className="wrapper" id='controls'>
        <div className="wrapper vertWrapper">
          <div>Column #: {cols}</div>
          <Slider value={cols} onValueChange={onColChange} />
        </div>
        <div className="wrapper vertWrapper">
          <div>Row #: {rows}</div>
          <Slider value={rows} onValueChange={onRowChange} />
        </div>
        <div className="wrapper">
          <Button handleClick={()=>setVal(val+1)} text='RESET'/>
        </div>
      </div>
      <div id="settings" className="vertWrapper">
        <Button handleClick={()=>setColor('#0078d7')} text='Blue'/>
      </div>
      <div id="main">
        <Grid rowNum={rows} colNum={cols} gridChildren={children}/>
      </div>
    </div>
  );
};

const Button = ({handleClick,text}) => {
  return (
    <button
      id='reset'
      onClick={()=>handleClick()}
    >
      {text}
    </button>
  );
}


const Slider = ({value,onValueChange}) => {
  function sliderHandler(e) {
    value = onValueChange(e.target.value);
  }
  
  return (
    <input
      type="range"
      min="10"
      max="100"
      className="slider" 
      id='rowSlider'
      value={value}
      onChange={(e)=>sliderHandler(e)}
    />
  );
};

const Grid = ({rowNum,colNum,gridChildren}) => {
  return (
    <div 
      className="grid"
      style={{gridTemplate:`repeat(${rowNum},
        ${100/rowNum}%)/repeat(${colNum},${100/colNum}%)`}}
    >
      {gridChildren}
    </div>
  ); 
};

const Square = ({val,color}) => {
  const [hover,setHover] = useState(false);

  useEffect(()=>{
    setHover(false);
  },[val]);

  function handler(e) {
    if (e.buttons===1) {
      setHover(true);
    }
  }

  return (
    <div
      draggable='false'
      onMouseDown={()=>setHover(true)}
      onMouseMove={(e)=>handler(e)}
      className='square'
      style={{background:hover?color:''}}
    >
    </div>
  )
};



export default Container;