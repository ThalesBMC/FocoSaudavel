import {  useContext } from "react";
import styles from "../styles/components/challengeBox.module.css";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge}= useContext(ChallengesContext)
    const {resetCountdown} = useContext(CountdownContext)
    function HandleChallengeSuccess(){
        completeChallenge();
        resetCountdown();
    }
    function HandleChallengeFailure(){
        resetChallenge();
        resetCountdown();
    }
    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}> 
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src= {`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer> 
                        <button type="button" className={styles.challengeFailedButton} onClick={HandleChallengeFailure}>
                            Falhei
                        </button>
                        <button type="button" className={styles.challengeSucceededButton} onClick={HandleChallengeSuccess}> 
                            Completei
                        </button>
                    </footer>
                </div>
                ) :
            (
            <div className={styles.challengeNotActive}>
                <strong>Termine um Pomodoro para receber um desafio</strong>
                <p>
                    <img src= 'icons/level-up.svg'></img>
                    Evolua de level terminando desafios
                </p>
            </div>)
        }
        </div>
            
    )
}