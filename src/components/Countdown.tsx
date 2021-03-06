import { useState, useEffect, useContext } from "react"

import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/countdown.module.css"

 
export function Countdown(){
    const {minutes,seconds, hasFinishied, IsActive,startCountdown,resetCountdown} = useContext(CountdownContext)
    const [minuteLeft, minuteRight]= String(minutes).padStart(2,"0").split('');
    const [secondLeft, secondRight]= String(seconds).padStart(2,"0").split('');
   
    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div> 
            </div>
            {hasFinishied?(
                <button disabled className={styles.countdownButton}> Intervalo</button>
            ):( 
            /* o <> é o fragment que n é exibido no html e serve pq tem um if ternario retornando
            um objeto ai é a limitacao do react ai a gente usa o fragment para isso*/
            <> 
                {IsActive ? <button type="button" className={styles.countdownButtonStop} onClick={resetCountdown}>Stop</button> 
                    : <button type="button" className={styles.countdownButton} onClick={startCountdown}>Start</button>
                }
            
            </>)} 

            
            
            
            
        </div>
    )
}