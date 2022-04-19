import React from "react";

export default function Die(props){

    const styles = {
        backgroundColor: props.isheldColor ? "#59E391" : "white"
    }

return(
    <div onClick={props.holdBtn}  className="die-style" style={styles}> 
    <h2  className="diecompo-style">{props.value}</h2>
    </div>
    
)
}