import {useState} from "react"
interface ButtonProps {
    color:string
    children:string;
  
}

export function Button(props:ButtonProps){
    const [cont, setCount]= useState(1)
    function incrementButton(){
        setCount(cont + 1)
    }
    return(
        <button onClick={incrementButton} type="button" style={{backgroundColor:props.color}}>{props.children}{cont}</button>
    )
}   