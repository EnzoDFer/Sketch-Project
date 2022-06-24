import { useState } from "react";


const Container = () => {
  const [rows, onRowChange] = useState(10);
  const [cols, onColChange] = useState(10);
  const [boardState, setBoard] = useState(Array(rows * cols).fill(false));

  const children = [];
  for (let i=0;i<rows*cols;i++) {
    children.push(<Square 
      currentState={boardState[i]} 
      returnState={()=>handleDraw(i)}
      key={i}
      />
      );
  }

  function resetBoard() {
    //setBoard(false);
    alert('works');
  }


  function handleDraw(i) {
    const childState = boardState.slice();
    childState[i] = 'square hovered';
    setBoard(childState); //setting drawBoard to current game drawing
  }

  return (
    <>
      <div className="wrapper">
        <div className="wrapper vertWrapper">
          <div>Column #: {cols}</div>
          <Slider value={cols} onValueChange={onColChange} />
        </div>
        <div className="wrapper vertWrapper">
          <div>Row #: {rows}</div>
          <Slider value={rows} onValueChange={onRowChange} />
        </div>
        <div className="wrapper">
          <Button handleClick={()=>resetBoard()} text='RESET'/>
        </div>
      </div>
      <Grid rowNum={rows} colNum={cols} gridChildren={children}/>
    </>
  );
};
//<Button handleClick={()=>resetBoard()} text='RESET'/>
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

const Square = ({currentState,returnState}) => {
  return (
    <div
      onMouseEnter={()=>returnState()}
      className={currentState?currentState:'square'}
    >
    </div>
  )
};



export default Container;
