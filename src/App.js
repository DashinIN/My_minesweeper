import React from "react";
import Field from "./components/Field/Field"
import makeField from "./Functions/MakeField";
import "./App.scss"
import Input from "./components/Input/Input";
import { CSSTransition, TransitionGroup } from 'react-transition-group';



function App() {

  const [n, setN] = React.useState(5);
  const [m, setM] = React.useState(10);
  const [k, setK] = React.useState(5);

  const [game, setGame] = React.useState(false);
  const [lose, setLose] = React.useState(false);
  const [win, setWin] = React.useState(false);
  const [field, setField] = React.useState(Array(5+2).fill().map(() => Array(10+2).fill()))
  const [fieldAns, setFieldAns] = React.useState(makeField(5,10,5))


  return (
    <div className="wrapper"  >
    { !game ? 
    
      <div className="inputs">
    <Input  count={n} increment={1} setCount={setN} text={"heigth"}></Input>
    <Input  count={m} increment={1} setCount={setM} text={"width"}></Input>
    <Input  count={k} increment={10} setCount={setK} text={"bombs"}></Input>
      </div>
      
      
    :<></> 
    }
        <>
        {game ?
        <> 
        
    
          <Field 
            n={n}
            m={m}
            k={k}
            lose ={lose}
            setLose= {setLose}
            win={win}
            setWin={setWin}
            field={field}
            fieldAns={fieldAns}/> 
            
            <button className="btn" onClick={() => setGame(false)}>again</button>
            </>
            :
            <button className="btn" onClick={() => { 
              setField(Array(n+2).fill().map(() => Array(m+2).fill()));  
              setFieldAns(makeField(n,m,k));  setGame(true)     }}>START</button>
          
        }
        
        </>
      
      
      </div>
  );
}

export default App;
