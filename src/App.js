import React from "react"
import Diecomp from "./compo/die"
import dieDatabasee from "./compo/dieData"
import {nanoid} from "nanoid"
import { faLeaf } from "@fortawesome/free-solid-svg-icons"
import Confetti from "react-confetti"
import { Preview } from "react-mde"

export default function App(){


  //get localstorge Counter value
 const localstorgeCounte = JSON.parse(localStorage.getItem("counterVal"))

 //Save highscore to State
 const [bestScore, cngBestScore]= React.useState({bestScoreA:0, bestRollA:0})

 //Save highscore to localstoege
function setBestScore(){
  
  // localStorage.setItem("bestScore", JSON.stringify(localstorgeCounte))
  // localStorage.setItem("bestRoll", JSON.stringify(rollArr))
  cngBestScore(oldVal=> ( localstorgeCounte < oldVal.bestScoreA || localstorgeCounte > 0) && ( rollArr < oldVal.bestRollA || rollArr > 0) ? ({...oldVal, bestScoreA:localstorgeCounte, bestRollA:rollArr}):oldVal)
  console.log(bestScore)
}



//Countdown timer
const [counter, setCounter] = React.useState(0)

  // Third Attempts
  React.useEffect(() => {
    if(!wonArr) { const timer = setInterval(() => setCounter(counter + 1), 1000);
    localStorage.setItem("counterVal", JSON.stringify(counter))
    return () => clearInterval(timer);}
    
  }, [counter]);

//End Countdown timer


  

  const [diceArr, cngDice] = React.useState(randomNumberGen())
  const [dicDb, cngDiceDb] = React.useState(diceArr)


  //use effect won or not state
  const [wonArr, CngWon] = React.useState(false)

  //roll count
  const [rollArr, CngRollcount] = React.useState(0)
  


  React.useEffect(()=>{

    const everyDiceHeld = dicDb.every(die => die.isHeld)
    const firstValue = dicDb[0].value
    const isAllValareEqual = dicDb.every(die => die.value===firstValue)

    if(everyDiceHeld && isAllValareEqual){ 
    
      CngWon(true)
      
    }

  }, [dicDb])


// genarate randome value

function genarateRandomDie(){
  return{
    id:nanoid(), value:Math.ceil(Math.random() * dieDatabasee.length), isHeld:false
  }
}


// assign randome value and push to array
  function randomNumberGen(){

    const newDarr = []
    for(let i=0; i<10; i++ ){
      newDarr.push(genarateRandomDie())
    } return newDarr
    
  }

//check the vaule is hold if so randomize other numbers

  function btncngDice(){
    if (wonArr){ 

      CngWon(false)
      cngDiceDb((randomNumberGen()))
      CngRollcount(1)
      setCounter(0)
      setBestScore()
     
    }else{
      
      CngRollcount(oldVal=>oldVal+1)
      
      cngDiceDb(cngHeld=> cngHeld.map(oldVal=>{
      return oldVal.isHeld ? 
      oldVal:
      genarateRandomDie() 
      
    }))
      
    }

    
   
  }


//Cnage the (isHeld value)Hold
function holdNum(id){
  cngDiceDb(cngHeld=> cngHeld.map(oldVal=> (id===oldVal.id ?{...oldVal, isHeld:!oldVal.isHeld}:oldVal)))
}


  return(
    
    <main>
      {wonArr && <Confetti/>}
        <h3>Tenzies</h3><br></br>
        <h4>Best Score is {bestScore.bestScoreA} Rolls in {bestScore.bestRollA} Seconds</h4><br></br>
        
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        {rollArr>0 &&<h1>Roll Count : {rollArr}</h1>}
        {rollArr>0 && !wonArr ? <h3>CountDown : {counter} Seconds</h3> : <h3>CountDown : {localstorgeCounte} Seconds</h3>}
        

      <div className="compo-container">
      {dicDb.map(oldVal=> <Diecomp holdBtn={()=>holdNum(oldVal.id)} isheldColor={oldVal.isHeld} key={oldVal.id} value={oldVal.value} keyId={oldVal.id} />)}
      </div>
      <button onClick={btncngDice} className="rollButton" >{wonArr ? "New Game" : "Roll"}</button> 
    </main>
    
  )
}