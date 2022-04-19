import React from "react"
import Diecomp from "./compo/die"
import dieDatabasee from "./compo/dieData"
import {nanoid} from "nanoid"
// import { faLeaf } from "@fortawesome/free-solid-svg-icons"
import Confetti from "react-confetti"
// import { Preview } from "react-mde"

export default function App(){


  //rounds counter 
  
  //STATE ROUND COUNTER
  const [roundArr, cnground]= React.useState(0)

  function roundsCount(){
    cnground(oldVal=>oldVal+1)
  }

  //get localstorge Counter value
 const localstorgeCounte = JSON.parse(localStorage.getItem("counterVal"))

 //Save highscore to State
 const [bestScore, cngBestScore]= React.useState({bestScoreA:100, bestRollA:100})



 //Save highscore to localstoege
function setBestScore(){
  
let rolllogic = rollArr < bestScore.bestRollA
let scorelogic = localstorgeCounte < bestScore.bestScoreA
let chekBothLogic = scorelogic && rolllogic


  // localStorage.setItem("bestScore", JSON.stringify(localstorgeCounte))
  // localStorage.setItem("bestRoll", JSON.stringify(rollArr))
  cngBestScore(oldVal=> chekBothLogic ? ({...oldVal, bestScoreA:localstorgeCounte, bestRollA:rollArr}) : oldVal)
  console.log(bestScore)
}



//Countdown timer
const [counter, setCounter] = React.useState(0)

  // Third Attempts
  React.useEffect(() => {
    if(!wonArr) { const timer = setInterval(() => setCounter(counter + 1), 1000);
    localStorage.setItem("counterVal", JSON.stringify(counter))
    return () => clearInterval(timer);}
    // eslint-disable-next-line
  }, [counter]);

//End Countdown timer


  

  const [diceArr] = React.useState(randomNumberGen())
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
      roundsCount()
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
        {roundArr > 0 ? <h4>Best Score is {bestScore.bestRollA} Rolls in {bestScore.bestScoreA} Seconds</h4> :<h4>Get highscore</h4>}<br></br>
        
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